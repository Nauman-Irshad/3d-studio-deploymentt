import os
from io import BytesIO

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from PIL import Image

from app.catalog import catalog_payload
from app.config import get_settings
from app.services.tryon_service import run_try_on

app = FastAPI(title="Virtual Try-On API", version="1.0.0")

_settings = get_settings()
_origins = [o.strip() for o in _settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_studio_base = os.environ.get("STUDIO_PUBLIC_BASE", "/studio").rstrip("/")


@app.get("/health")
def health():
    return {"status": "ok", "mode": get_settings().tryon_mode}


@app.get("/api/catalog")
def get_catalog():
    """All 3D studio GLB/GLTF products for Flutter web / mobile."""
    return catalog_payload(_studio_base)


@app.post("/api/try-on")
async def try_on(
    person: UploadFile = File(..., description="Person / avatar render (PNG/JPEG)"),
    garment: UploadFile = File(..., description="Clothing flat-lay or PNG"),
    mask: UploadFile | None = File(None, description="Optional mask PNG (white = apply region)"),
):
    try:
        person_bytes = await person.read()
        garment_bytes = await garment.read()
        mask_bytes = await mask.read() if mask else None

        for label, raw in ("person", person_bytes), ("garment", garment_bytes):
            try:
                Image.open(BytesIO(raw)).load()
            except Exception as e:
                raise HTTPException(400, f"Invalid {label} image") from e

        if mask_bytes:
            try:
                Image.open(BytesIO(mask_bytes)).load()
            except Exception as e:
                raise HTTPException(400, "Invalid mask image") from e

        out = await run_try_on(person_bytes, garment_bytes, mask_bytes)
        return Response(content=out, media_type="image/png")
    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(500, str(e)) from e
    except Exception as e:
        raise HTTPException(502, f"Try-on failed: {e}") from e
