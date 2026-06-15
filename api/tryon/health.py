"""Vercel serverless: GET /api/tryon/health"""

from __future__ import annotations

import json
import os
import sys
from http.server import BaseHTTPRequestHandler

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from hf_tryon import _denoise_steps, _is_fast_mode, hf_token  # noqa: E402


def _health_payload() -> dict:
    mock = (os.environ.get("TRYON_MOCK") or "").strip().lower() in ("1", "true", "yes", "on")
    provider = (os.environ.get("TRYON_PROVIDER") or "idm-vton").strip()
    has_token = bool(hf_token())
    fast = _is_fast_mode()
    eta = 0 if mock else (30 if fast else 90)
    return {
        "status": "ok",
        "provider": "mock" if mock else provider,
        "vton_mode": "preview" if mock else "real",
        "engine": "IDM-VTON (Hugging Face)" if not mock and provider.startswith("idm") else provider,
        "hf_token_set": has_token,
        "tryon_fast": fast,
        "eta_seconds": eta,
        "eta_minutes": "0" if mock else (f"~{eta} sec" if fast else "~1–2 min"),
        "denoise_steps": _denoise_steps(),
    }


class handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(_health_payload()).encode())

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.end_headers()
