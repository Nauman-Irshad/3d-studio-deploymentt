"""
CatVTON virtual try-on via Hugging Face Space zhengchong/CatVTON (gradio_client).
"""

from __future__ import annotations

import io
import os
import tempfile
from pathlib import Path
from typing import Any

SPACE_NAME = "zhengchong/CatVTON"
_PREDICT_TIMEOUT = int(os.environ.get("CATVTON_TIMEOUT_SEC", "600"))
_MAX_SIDE = int(os.environ.get("CATVTON_MAX_SIDE", "1024"))


def _format_error(exc: BaseException) -> str:
    msg = str(exc).strip()
    low = msg.lower()
    if "insufficient credit" in low or "replicate" in low:
        return (
            "Replicate is disabled. Restart API: npm run api (uses CatVTON on Hugging Face)."
        )
    if "queue" in low or "busy" in low or "timeout" in low:
        return (
            "Hugging Face CatVTON is busy or timed out. Wait a minute and try again. "
            f"Details: {msg}"
        )
    if "gradio_client" in low or "no module named" in low:
        return "Install dependencies: pip install -r requirements.txt"
    return f"CatVTON error: {msg}"


def _to_rgb_jpeg_bytes(data: bytes, max_side: int = _MAX_SIDE) -> bytes:
    """Any image bytes → RGB JPEG bytes (handles PNG/RGBA/WebP/CMYK/etc.)."""
    from PIL import Image

    img = Image.open(io.BytesIO(data))
    img.load()

    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        rgba = img.convert("RGBA")
        background = Image.new("RGB", rgba.size, (255, 255, 255))
        background.paste(rgba, mask=rgba.split()[-1])
        img = background
    elif img.mode != "RGB":
        img = img.convert("RGB")

    w, h = img.size
    if max(w, h) > max_side:
        scale = max_side / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=92, optimize=True)
    return buf.getvalue()


def _write_jpeg(data: bytes, out_path: str) -> None:
    jpeg = _to_rgb_jpeg_bytes(data)
    Path(out_path).write_bytes(jpeg)


def _extract_url(result: Any) -> str | None:
    if isinstance(result, str) and result.startswith("http"):
        return result
    if isinstance(result, dict):
        url = result.get("url")
        if isinstance(url, str) and url.startswith("http"):
            return url
    if isinstance(result, (list, tuple)) and result:
        return _extract_url(result[0])
    path = getattr(result, "url", None)
    if isinstance(path, str) and path.startswith("http"):
        return path
    return None


def _read_local_output(result: Any) -> bytes | None:
    if isinstance(result, dict):
        p = result.get("path")
        if p and Path(str(p)).is_file():
            return _to_rgb_jpeg_bytes(Path(str(p)).read_bytes())
    candidates: list[Any] = list(result) if isinstance(result, (list, tuple)) else [result]
    for item in candidates:
        if isinstance(item, dict) and item.get("path"):
            p = Path(str(item["path"]))
            if p.is_file():
                return _to_rgb_jpeg_bytes(p.read_bytes())
        if isinstance(item, (str, Path)):
            p = Path(str(item))
            if p.is_file():
                return _to_rgb_jpeg_bytes(p.read_bytes())
        path = getattr(item, "name", None) or getattr(item, "path", None)
        if path:
            p = Path(str(path))
            if p.is_file():
                return _to_rgb_jpeg_bytes(p.read_bytes())
    return None


def run_catvton(person_bytes: bytes, cloth_bytes: bytes) -> tuple[str | None, bytes | None]:
    try:
        from gradio_client import Client, handle_file
    except ImportError as e:
        raise RuntimeError(
            "gradio_client is not installed. Run: pip install -r requirements.txt"
        ) from e

    token = (os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_TOKEN") or "").strip()
    token = token.strip('"').strip("'") or None

    cloth_type = (os.environ.get("CATVTON_CLOTH_TYPE") or "upper").strip().lower()
    if cloth_type not in ("upper", "lower", "overall"):
        cloth_type = "upper"

    try:
        client = Client(
            SPACE_NAME,
            token=token,
            httpx_kwargs={"timeout": _PREDICT_TIMEOUT},
        )

        with tempfile.TemporaryDirectory() as td:
            person_path = os.path.join(td, "person.jpg")
            cloth_path = os.path.join(td, "cloth.jpg")

            _write_jpeg(person_bytes, person_path)
            _write_jpeg(cloth_bytes, cloth_path)

            # Let HF Space build person editor + mask (avoids RGBA/JPEG issues)
            person_editor = client.predict(
                image_path=handle_file(person_path),
                api_name="/person_example_fn",
            )

            result = client.predict(
                person_image=person_editor,
                cloth_image=handle_file(cloth_path),
                cloth_type=cloth_type,
                num_inference_steps=50,
                guidance_scale=2.5,
                seed=42,
                show_type="result only",
                api_name="/submit_function",
            )
    except Exception as e:
        raise RuntimeError(_format_error(e)) from e

    url = _extract_url(result)
    if url:
        return url, None
    raw = _read_local_output(result)
    if raw:
        return None, raw
    raise RuntimeError(f"Unexpected CatVTON output: {result!r}")
