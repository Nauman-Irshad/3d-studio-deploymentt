"""Fast local try-on preview (~1 second). Set TRYON_MOCK=1 in .env."""

from __future__ import annotations

import io
import os

from hf_tryon import _to_rgb_jpeg_bytes

_FAST_MAX = int(os.environ.get("TRYON_MAX_SIDE", "720"))


def run_mock_tryon(human_bytes: bytes, garm_bytes: bytes) -> bytes:
    from PIL import Image

    person = Image.open(io.BytesIO(_to_rgb_jpeg_bytes(human_bytes, _FAST_MAX))).convert("RGB")
    garment = Image.open(io.BytesIO(_to_rgb_jpeg_bytes(garm_bytes, _FAST_MAX))).convert("RGBA")

    pw, ph = person.size
    target_w = int(pw * 0.58)
    scale = target_w / max(garment.width, 1)
    target_h = max(1, int(garment.height * scale))
    garment = garment.resize((target_w, target_h), Image.Resampling.BILINEAR)

    x = (pw - target_w) // 2
    y = int(ph * 0.14)
    base = person.copy()
    if garment.mode == "RGBA":
        base.paste(garment, (x, y), garment)
    else:
        base.paste(garment, (x, y))

    buf = io.BytesIO()
    base.save(buf, format="JPEG", quality=88, optimize=True)
    return buf.getvalue()
