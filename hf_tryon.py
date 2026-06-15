"""
Hugging Face virtual try-on via gradio_client.
Default: yisol/IDM-VTON (works reliably via API).
Optional: zhengchong/CatVTON (often fails on HF GPU — experimental).
"""

from __future__ import annotations

import io
import os
import threading
from pathlib import Path
from typing import Any

IDM_VTON_SPACE = "yisol/IDM-VTON"
CATVTON_SPACE = "zhengchong/CatVTON"
_PREDICT_TIMEOUT = int(os.environ.get("HF_TRYON_TIMEOUT_SEC", "600"))
_MAX_SIDE = int(os.environ.get("TRYON_MAX_SIDE", "1280"))
_PERSON_MAX_SIDE = int(os.environ.get("TRYON_PERSON_MAX_SIDE", "768") or 768)
_GARM_MAX_SIDE = int(os.environ.get("TRYON_GARM_MAX_SIDE", os.environ.get("TRYON_MAX_SIDE", "512")) or 512)
_PERSON_MIN_SIDE = int(os.environ.get("TRYON_PERSON_MIN_SIDE", "384") or 384)
_JPEG_QUALITY = int(os.environ.get("TRYON_JPEG_QUALITY", "85") or 85)

_client_lock = threading.Lock()
_client_cache: dict[str, Any] = {}
_warmup_started = False


def _is_fast_mode() -> bool:
    return (os.environ.get("TRYON_FAST") or "").strip().lower() in (
        "1",
        "true",
        "yes",
        "on",
    )


def hf_token() -> str | None:
    token = (os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_TOKEN") or "").strip()
    token = token.strip('"').strip("'") or None
    return token


def _is_index_error(exc: BaseException) -> bool:
    if isinstance(exc, IndexError):
        return True
    msg = str(exc).lower()
    return "indexerror" in msg


def _denoise_steps() -> int:
    """IDM-VTON Gradio Space requires denoise_steps >= 20."""
    raw = (os.environ.get("TRYON_DENOISE_STEPS") or "").strip()
    if raw.isdigit():
        return max(20, min(50, int(raw)))
    return 20 if _is_fast_mode() else 30


def _format_error(exc: BaseException) -> str:
    msg = str(exc).strip()
    low = msg.lower()
    if _is_index_error(exc):
        return (
            "Could not detect your upper body in the photo. "
            "Use a clear front-facing portrait (head + chest visible), good lighting, "
            "and avoid group photos or heavy cropping — then try again."
        )
    if "validation error" in low and "gradio.filedata" in low.replace(" ", ""):
        return (
            "Image format rejected by Hugging Face API. Retry — server now sends correct file metadata."
        )
    if "rgba" in low and "jpeg" in low:
        return (
            "CatVTON Space error on Hugging Face (RGBA/JPEG). "
            "Set TRYON_PROVIDER=idm-vton in .env and restart npm run api — IDM-VTON works on HF."
        )
    if "queue" in low or "busy" in low or "timeout" in low:
        return f"Hugging Face is busy or timed out. Wait and try again. Details: {msg}"
    if "gradio_client" in low or "no module named" in low:
        return "Install dependencies: pip install -r requirements.txt"
    return f"Try-on error: {msg}"


def _to_rgb_jpeg_bytes(data: bytes, max_side: int = _MAX_SIDE) -> bytes:
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
    img.save(buf, format="JPEG", quality=max(72, min(96, _JPEG_QUALITY)), optimize=True)
    return buf.getvalue()


def prepare_person_bytes(data: bytes, max_side: int | None = None, min_side: int | None = None) -> bytes:
    """Resize person photo for IDM-VTON pose detection (needs enough pixels)."""
    from PIL import Image

    max_side = max_side if max_side is not None else _PERSON_MAX_SIDE
    min_side = min_side if min_side is not None else _PERSON_MIN_SIDE
    out = _to_rgb_jpeg_bytes(data, max_side=max_side)
    img = Image.open(io.BytesIO(out))
    w, h = img.size
    if min(w, h) < min_side:
        scale = min_side / min(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=max(72, min(96, _JPEG_QUALITY)), optimize=True)
        return buf.getvalue()
    return out


def prepare_garm_bytes(data: bytes, max_side: int | None = None) -> bytes:
    return _to_rgb_jpeg_bytes(data, max_side=max_side if max_side is not None else _GARM_MAX_SIDE)


def _write_jpeg(data: bytes, out_path: str) -> None:
    Path(out_path).write_bytes(_to_rgb_jpeg_bytes(data))


def _wrap_file(handle_file: Any, value: Any) -> Any:
    if value is None:
        return None
    if isinstance(value, str):
        return handle_file(value)
    if isinstance(value, dict):
        if value.get("meta", {}).get("_type") == "gradio.FileData":
            return value
        if value.get("path"):
            return handle_file(str(value["path"]))
    return value


def _editor_from_person(handle_file: Any, person_path: str, mask_path: str | None = None) -> dict:
    """Gradio ImageEditor payload with required FileData meta."""
    layers: list[Any] = []
    if mask_path and Path(mask_path).is_file():
        layers = [handle_file(mask_path)]
    return {
        "background": handle_file(person_path),
        "layers": layers,
        "composite": handle_file(person_path),
        "id": None,
    }


def _normalize_editor(handle_file: Any, editor: Any, mask_path: str | None) -> dict:
    if not isinstance(editor, dict):
        return _editor_from_person(handle_file, str(editor), mask_path)

    layers = editor.get("layers") or []
    if not layers and mask_path:
        layers = [mask_path]

    return {
        "background": _wrap_file(handle_file, editor.get("background")),
        "layers": [_wrap_file(handle_file, layer) for layer in layers],
        "composite": _wrap_file(handle_file, editor.get("composite")),
        "id": editor.get("id"),
    }


def _extract_url(result: Any) -> str | None:
    if isinstance(result, str) and result.startswith("http"):
        return result
    if isinstance(result, dict):
        url = result.get("url")
        if isinstance(url, str) and url.startswith("http"):
            return url
    if isinstance(result, (list, tuple)) and result:
        return _extract_url(result[0])
    return None


def _read_local_output(result: Any) -> bytes | None:
    candidates: list[Any] = []
    if isinstance(result, (list, tuple)):
        candidates.extend(result)
    elif isinstance(result, dict):
        if result.get("path"):
            candidates.append(result)
    else:
        candidates.append(result)

    for item in candidates:
        if isinstance(item, dict) and item.get("path"):
            p = Path(str(item["path"]))
            if p.is_file():
                return _to_rgb_jpeg_bytes(p.read_bytes())
        if isinstance(item, (str, Path)):
            p = Path(str(item))
            if p.is_file():
                return _to_rgb_jpeg_bytes(p.read_bytes())
    return None


def _client(space: str, token: str | None):
    from gradio_client import Client

    return Client(
        space,
        token=token,
        httpx_kwargs={"timeout": _PREDICT_TIMEOUT},
    )


def get_hf_client(token: str | None = None, *, space: str | None = None) -> Any:
    """Reuse one Gradio client per Space — avoids ~5–15s reconnect each try-on."""
    space_id = space or (
        IDM_VTON_SPACE if _provider() == "idm-vton" else CATVTON_SPACE
    )
    key = f"{space_id}:{token or ''}"
    with _client_lock:
        cached = _client_cache.get(key)
        if cached is not None:
            return cached
        client = _client(space_id, token)
        _client_cache[key] = client
        return client


def warmup_hf_client() -> None:
    """Connect to HF Space at API startup (same as opening the Space in browser)."""
    global _warmup_started
    mock = (os.environ.get("TRYON_MOCK") or "").strip().lower() in (
        "1",
        "true",
        "yes",
        "on",
    )
    if mock or _warmup_started:
        return
    _warmup_started = True

    def _run() -> None:
        try:
            client = get_hf_client(hf_token())
            client.view_api()
            print(
                f"HF try-on ready ({_provider()} · {_denoise_steps()} steps · "
                f"person≤{_PERSON_MAX_SIDE}px garment≤{_GARM_MAX_SIDE}px)"
            )
        except Exception as exc:
            print("HF warmup skipped (first try-on will connect):", exc)

    threading.Thread(target=_run, daemon=True, name="hf-tryon-warmup").start()


def _provider() -> str:
    p = (os.environ.get("TRYON_PROVIDER") or "idm-vton").strip().lower()
    if p in ("idm", "idm-vton", "idmvton"):
        return "idm-vton"
    if p in ("catvton", "cat"):
        return "catvton"
    return "idm-vton"


def _download_url(url: str) -> bytes:
    import urllib.request

    with urllib.request.urlopen(url, timeout=120) as resp:
        return _to_rgb_jpeg_bytes(resp.read())


def _result_to_bytes(url: str | None, raw: bytes | None) -> bytes:
    if raw:
        return raw
    if url:
        return _download_url(url)
    raise RuntimeError("Try-on step returned no image.")


def _parse_idm_result(result: Any) -> tuple[str | None, bytes | None]:
    """IDM-VTON returns (output_image, masked_image)."""
    if isinstance(result, (list, tuple)) and result:
        for item in result:
            url = _extract_url(item)
            if url:
                return url, None
            raw = _read_local_output(item)
            if raw:
                return None, raw
    url = _extract_url(result)
    if url:
        return url, None
    raw = _read_local_output(result)
    if raw:
        return None, raw
    return None, None


def _idm_predict(
    client: Any,
    editor: dict,
    cloth_path: str,
    des: str,
    use_crop: bool,
) -> Any:
    from gradio_client import handle_file

    return client.predict(
        editor,
        handle_file(cloth_path),
        des,
        True,
        use_crop,
        _denoise_steps(),
        42,
        api_name="/tryon",
    )


def run_idm_vton(
    person_bytes: bytes,
    cloth_bytes: bytes,
    garment_des: str = "",
    tryon_mode: str = "upper",
) -> tuple[str | None, bytes | None]:
    import tempfile

    from gradio_client import handle_file

    token = hf_token()

    person_bytes = prepare_person_bytes(person_bytes)
    cloth_bytes = prepare_garm_bytes(cloth_bytes)

    with tempfile.TemporaryDirectory() as td:
        person_path = os.path.join(td, "person.jpg")
        cloth_path = os.path.join(td, "cloth.jpg")
        Path(person_path).write_bytes(person_bytes)
        Path(cloth_path).write_bytes(cloth_bytes)

        editor = _editor_from_person(handle_file, person_path)
        client = get_hf_client(token)
        des = (garment_des or "").strip()
        mode = (tryon_mode or "upper").strip().lower()
        if mode == "lower":
            des = des or "Pakistani shalwar pants lower body loose traditional"
            crop_attempts = (False,)
        elif mode == "upper":
            des = des or "Pakistani full length shalwar kameez complete kurta dress traditional festive full dress"
            crop_attempts = (True,) if _is_fast_mode() else (True, False)
        else:
            des = des or (
                "traditional Pakistani shalwar kameez, loose festive Eid wear"
            )
            crop_attempts = (False,)

        last_err: BaseException | None = None
        for use_crop in crop_attempts:
            try:
                result = _idm_predict(client, editor, cloth_path, des, use_crop)
                url, raw = _parse_idm_result(result)
                if url or raw:
                    return url, raw
                raise RuntimeError(f"Unexpected IDM-VTON output: {result!r}")
            except Exception as e:
                last_err = e
                if not _is_index_error(e):
                    raise
        if last_err:
            raise last_err
        raise RuntimeError("IDM-VTON failed with no result.")


def run_catvton(
    person_bytes: bytes,
    cloth_bytes: bytes,
    tryon_mode: str = "upper",
) -> tuple[str | None, bytes | None]:
    import tempfile

    from gradio_client import Client, handle_file
    from PIL import Image

    token = hf_token()

    mode = (tryon_mode or "upper").strip().lower()
    if mode == "lower":
        cloth_type = "lower"
    elif mode == "full":
        cloth_type = "overall"
    else:
        cloth_type = "upper"

    with tempfile.TemporaryDirectory() as td:
        person_path = os.path.join(td, "person.jpg")
        cloth_path = os.path.join(td, "cloth.jpg")
        mask_path = os.path.join(td, "mask.png")
        _write_jpeg(person_bytes, person_path)
        _write_jpeg(cloth_bytes, cloth_path)
        Image.new("L", (512, 512), 255).save(mask_path, format="PNG")

        client = get_hf_client(token, space=CATVTON_SPACE)

        raw_editor = client.predict(
            image_path=handle_file(person_path),
            api_name="/person_example_fn",
        )
        editor = _normalize_editor(handle_file, raw_editor, mask_path)

        result = client.predict(
            person_image=editor,
            cloth_image=handle_file(cloth_path),
            cloth_type=cloth_type,
            num_inference_steps=50,
            guidance_scale=2.5,
            seed=42,
            show_type="result only",
            api_name="/submit_function",
        )

    url = _extract_url(result)
    if url:
        return url, None
    raw = _read_local_output(result)
    if raw:
        return None, raw
    raise RuntimeError(f"Unexpected CatVTON output: {result!r}")


def run_single_tryon(
    person_bytes: bytes,
    cloth_bytes: bytes,
    garment_des: str = "",
    tryon_mode: str = "upper",
) -> tuple[str | None, bytes | None]:
    mode = (tryon_mode or "upper").strip().lower()
    if mode not in ("full", "upper", "lower"):
        mode = "upper"
    if _provider() == "catvton":
        return run_catvton(person_bytes, cloth_bytes, mode)
    return run_idm_vton(person_bytes, cloth_bytes, garment_des, mode)


def run_hf_tryon(
    person_bytes: bytes,
    cloth_bytes: bytes,
    garment_des: str = "",
    tryon_mode: str = "upper",
) -> tuple[str | None, bytes | None]:
    try:
        return run_single_tryon(person_bytes, cloth_bytes, garment_des, tryon_mode)
    except Exception as e:
        raise RuntimeError(_format_error(e)) from e
