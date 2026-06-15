"""
POST multipart to your own CatVTON / Gradio / custom service.

Expected contract (configurable field names via env in a fuller version):
  - person: image file
  - cloth / garment: image file
  - mask: optional image file

Response: raw image bytes (Content-Type image/png or image/jpeg).
If your API returns JSON with base64, extend this class.
"""

import httpx

from .base import TryOnProvider


class RemoteTryOnProvider(TryOnProvider):
    def __init__(self, url: str):
        if not url:
            raise ValueError("remote_tryon_url is empty")
        self.url = url.rstrip("/")

    async def infer(self, person_png: bytes, garment_png: bytes, mask_png: bytes | None) -> bytes:
        files = {
            "person": ("person.png", person_png, "image/png"),
            "garment": ("garment.png", garment_png, "image/png"),
        }
        if mask_png:
            files["mask"] = ("mask.png", mask_png, "image/png")

        async with httpx.AsyncClient(timeout=120.0) as client:
            r = await client.post(self.url, files=files)
            r.raise_for_status()
            ct = r.headers.get("content-type", "")
            if "application/json" in ct:
                raise RuntimeError(
                    "Remote endpoint returned JSON; adapt RemoteTryOnProvider to parse your schema."
                )
            return r.content
