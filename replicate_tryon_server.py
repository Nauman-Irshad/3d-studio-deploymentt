"""
Try-on API: IDM-VTON on Hugging Face (gradio_client). No Replicate.

  pip install -r requirements.txt
  npm run api
"""

from __future__ import annotations

import asyncio
import base64
import os
import secrets
import time
from contextlib import asynccontextmanager
from typing import Any

from dotenv import load_dotenv
from fastapi import Body, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from pathlib import Path

_ROOT = Path(__file__).resolve().parent
load_dotenv(_ROOT / ".env")
load_dotenv()

TRYON_PROVIDER = (os.environ.get("TRYON_PROVIDER") or "idm-vton").strip().lower()
KURTA_DES = (
    os.environ.get("KURTA_DES")
    or "Pakistani full length shalwar kameez, complete kurta dress, traditional festive outfit, full dress"
).strip()


@asynccontextmanager
async def _lifespan(app: FastAPI):
    from hf_tryon import warmup_hf_client

    warmup_hf_client()
    yield


app = FastAPI(title="Smart Fiatio Try-On API", lifespan=_lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

_SESSION_TTL = 3600
_sessions: dict[str, dict[str, Any]] = {}


def _purge_sessions() -> None:
    now = time.time()
    expired = [sid for sid, s in _sessions.items() if now - s["created"] > _SESSION_TTL]
    for sid in expired:
        _sessions.pop(sid, None)


def _get_session(session_id: str) -> dict[str, Any]:
    _purge_sessions()
    session = _sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or expired.")
    return session


def _run_tryon(
    human_bytes: bytes,
    garm_bytes: bytes,
    garment_des: str,
    tryon_mode: str,
) -> tuple[str | None, bytes | None]:
    from hf_tryon import run_hf_tryon

    return run_hf_tryon(human_bytes, garm_bytes, garment_des, tryon_mode)


@app.get("/")
def root() -> dict[str, str]:
    return {"status": "ok", "service": "Smart Fiatio Try-On API", "provider": TRYON_PROVIDER}


@app.get("/health", response_model=None)
def health():
    from hf_tryon import _denoise_steps, _is_fast_mode, hf_token

    mock = (os.environ.get("TRYON_MOCK") or "").strip().lower() in (
        "1",
        "true",
        "yes",
        "on",
    )
    has_token = bool(hf_token())
    fast = _is_fast_mode()
    eta = 0 if mock else (30 if fast else 90)
    return {
        "status": "ok",
        "provider": "mock" if mock else TRYON_PROVIDER,
        "vton_mode": "preview" if mock else "real",
        "engine": "IDM-VTON (Hugging Face)" if not mock and TRYON_PROVIDER.startswith("idm") else TRYON_PROVIDER,
        "hf_token_set": has_token,
        "tryon_fast": fast,
        "eta_seconds": eta,
        "eta_minutes": "0" if mock else (f"~{eta} sec" if fast else "~1–2 min"),
        "max_side": int(os.environ.get("TRYON_MAX_SIDE", "512") or 512),
        "person_max_side": int(os.environ.get("TRYON_PERSON_MAX_SIDE", "768") or 768),
        "garm_max_side": int(os.environ.get("TRYON_GARM_MAX_SIDE", "512") or 512),
        "denoise_steps": _denoise_steps(),
    }


@app.get("/api/health", response_model=None)
def api_health():
    return health()


@app.get("/api/tryon/health", response_model=None)
def tryon_health():
    return health()


@app.post("/api/sessions")
def create_session() -> dict[str, str]:
    _purge_sessions()
    session_id = secrets.token_urlsafe(16)
    _sessions[session_id] = {
        "created": time.time(),
        "photo": None,
        "mime": "image/jpeg",
        "filename": "phone-photo.jpg",
    }
    return {"session_id": session_id}


@app.get("/api/sessions/{session_id}")
def session_status(session_id: str) -> dict[str, bool]:
    _purge_sessions()
    session = _sessions.get(session_id)
    if not session:
        return {"ready": False}
    return {"ready": session["photo"] is not None}


@app.post("/api/sessions/{session_id}/photo")
async def upload_session_photo(
    session_id: str,
    photo: UploadFile = File(...),
) -> dict[str, str]:
    _purge_sessions()
    session = _sessions.get(session_id)
    if not session:
        session = {
            "created": time.time(),
            "photo": None,
            "mime": "image/jpeg",
            "filename": "phone-photo.jpg",
        }
        _sessions[session_id] = session
    data = await photo.read()
    if not data:
        raise HTTPException(status_code=400, detail="Empty photo upload.")
    session["photo"] = data
    session["mime"] = photo.content_type or "image/jpeg"
    session["filename"] = photo.filename or "phone-photo.jpg"
    return {"status": "ok"}


@app.get("/api/sessions/{session_id}/photo")
def get_session_photo(session_id: str) -> Response:
    session = _get_session(session_id)
    if not session["photo"]:
        raise HTTPException(status_code=404, detail="No photo uploaded yet.")
    return Response(content=session["photo"], media_type=session["mime"])


@app.post("/api/tryon")
async def tryon(
    human_img: UploadFile = File(..., description="User / camera photo"),
    garm_img: UploadFile = File(..., description="Kurta / kameez image"),
    garment_des: str = Form(""),
    tryon_mode: str = Form("upper"),
) -> JSONResponse:
    from hf_tryon import run_hf_tryon

    human_bytes = await human_img.read()
    garm_bytes = await garm_img.read()
    if not human_bytes or not garm_bytes:
        raise HTTPException(status_code=400, detail="Missing image bytes")

    des = (garment_des or "").strip() or KURTA_DES
    mode = (tryon_mode or "upper").strip().lower() or "upper"

    use_mock = (os.environ.get("TRYON_MOCK") or "").strip().lower() in (
        "1",
        "true",
        "yes",
        "on",
    )
    mock_fallback = (os.environ.get("TRYON_MOCK_FALLBACK") or "1").strip().lower() in (
        "1",
        "true",
        "yes",
        "on",
    )

    url: str | None = None
    raw: bytes | None = None
    used_fallback = False

    try:
        if use_mock:
            from mock_tryon import run_mock_tryon

            raw = await asyncio.to_thread(run_mock_tryon, human_bytes, garm_bytes)
        else:
            try:
                url, raw = await asyncio.to_thread(
                    run_hf_tryon, human_bytes, garm_bytes, des, mode
                )
            except Exception as hf_err:
                if not mock_fallback:
                    raise HTTPException(status_code=502, detail=str(hf_err)) from hf_err
                from mock_tryon import run_mock_tryon

                raw = await asyncio.to_thread(run_mock_tryon, human_bytes, garm_bytes)
                used_fallback = True
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e)) from e

    if url:
        body: dict[str, str] = {"url": url}
        if used_fallback:
            body["fallback"] = "mock"
        return JSONResponse(body)
    if raw:
        body = {"image_base64": base64.standard_b64encode(raw).decode("ascii")}
        if used_fallback:
            body["fallback"] = "mock"
        if use_mock:
            body["mode"] = "mock"
        else:
            body["mode"] = "real"
        return JSONResponse(body)

    raise HTTPException(status_code=502, detail="Unexpected try-on output.")


@app.post("/api/checkout/create-session")
async def create_checkout_session(body: dict[str, Any] = Body(...)) -> dict[str, Any]:
    secret = (os.environ.get("STRIPE_SECRET_KEY") or "").strip()
    if not secret:
        raise HTTPException(status_code=503, detail="Stripe is not configured (set STRIPE_SECRET_KEY).")

    try:
        import stripe
    except ImportError as e:
        raise HTTPException(status_code=503, detail="Install stripe: pip install stripe") from e

    stripe.api_key = secret

    product_label = str(body.get("product_label") or "Outfit").strip() or "Outfit"
    product_amount = int(body.get("product_amount_pkr") or 0)
    tailor_name = str(body.get("tailor_name") or "Tailor").strip() or "Tailor"
    stitch_amount = int(body.get("stitch_amount_pkr") or 0)
    success_url = str(body.get("success_url") or "").strip()
    cancel_url = str(body.get("cancel_url") or "").strip()

    if product_amount <= 0 or stitch_amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid product or stitch amount.")
    if not success_url or not cancel_url:
        raise HTTPException(status_code=400, detail="Missing success_url or cancel_url.")

    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            success_url=success_url,
            cancel_url=cancel_url,
            line_items=[
                {
                    "price_data": {
                        "currency": "pkr",
                        "unit_amount": product_amount * 100,
                        "product_data": {"name": product_label},
                    },
                    "quantity": 1,
                },
                {
                    "price_data": {
                        "currency": "pkr",
                        "unit_amount": stitch_amount * 100,
                        "product_data": {"name": f"Stitching — {tailor_name}"},
                    },
                    "quantity": 1,
                },
            ],
            metadata={
                "tailor_id": str(body.get("tailor_id") or ""),
                "product_label": product_label,
            },
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Stripe error: {e}") from e

    if not session.url:
        raise HTTPException(status_code=502, detail="Stripe session missing redirect URL.")
    return {"url": session.url, "mode": "stripe"}


@app.post("/api/archive/tryon")
async def archive_tryon(
    human_img: UploadFile = File(...),
    garm_img: UploadFile = File(...),
    result_img: UploadFile = File(...),
    garment_label: str = Form(""),
    page: str = Form("tryon"),
) -> dict[str, str]:
    from tryon_archive import save_tryon_archive

    human_bytes = await human_img.read()
    garm_bytes = await garm_img.read()
    result_bytes = await result_img.read()
    if not human_bytes or not garm_bytes or not result_bytes:
        raise HTTPException(status_code=400, detail="Missing archive image bytes")

    entry = save_tryon_archive(
        human_bytes,
        garm_bytes,
        result_bytes,
        garment_label=(garment_label or "").strip(),
        page=(page or "tryon").strip().lower() or "tryon",
    )
    return {"status": "ok", "id": entry["id"]}
