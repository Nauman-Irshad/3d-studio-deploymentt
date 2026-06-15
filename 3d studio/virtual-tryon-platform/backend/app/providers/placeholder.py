"""
Offline-friendly demo: composites garment onto lower torso region of person image.
Not a real VTON model — use remote CatVTON/Gradio for quality results.
"""

from io import BytesIO

from PIL import Image

from .base import TryOnProvider


class PlaceholderTryOnProvider(TryOnProvider):
    async def infer(self, person_png: bytes, garment_png: bytes, mask_png: bytes | None) -> bytes:
        person = Image.open(BytesIO(person_png)).convert("RGBA")
        garment = Image.open(BytesIO(garment_png)).convert("RGBA")

        pw, ph = person.size
        # Target region: upper body / shirt zone
        gw = int(pw * 0.72)
        gh = int(ph * 0.55)
        garment_resized = garment.resize((gw, gh), Image.Resampling.LANCZOS)

        if garment_resized.mode != "RGBA":
            garment_resized = garment_resized.convert("RGBA")

        ox = (pw - gw) // 2
        oy = int(ph * 0.18)

        layer = Image.new("RGBA", person.size, (0, 0, 0, 0))
        layer.paste(garment_resized, (ox, oy), garment_resized)

        if mask_png:
            mask = Image.open(BytesIO(mask_png)).convert("L")
            mask = mask.resize((pw, ph), Image.Resampling.LANCZOS)
            layer.putalpha(mask)

        out = Image.alpha_composite(person, layer)
        rgb = Image.new("RGB", out.size, (255, 255, 255))
        rgb.paste(out, mask=out.split()[3] if out.mode == "RGBA" else None)

        buf = BytesIO()
        rgb.save(buf, format="PNG", optimize=True)
        return buf.getvalue()
