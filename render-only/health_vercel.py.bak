"""Vercel: GET /api/tryon/health — lightweight (no gradio import)."""

from __future__ import annotations

import json
import os
from http.server import BaseHTTPRequestHandler


def _health_payload() -> dict:
    mock = (os.environ.get("TRYON_MOCK") or "").strip().lower() in ("1", "true", "yes", "on")
    provider = (os.environ.get("TRYON_PROVIDER") or "idm-vton").strip()
    has_token = bool((os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_TOKEN") or "").strip())
    fast = (os.environ.get("TRYON_FAST") or "").strip().lower() in ("1", "true", "yes", "on")
    eta = 0 if mock else (30 if fast else 90)
    steps_raw = (os.environ.get("TRYON_DENOISE_STEPS") or "").strip()
    steps = max(20, int(steps_raw)) if steps_raw.isdigit() else (20 if fast else 30)
    return {
        "status": "ok",
        "provider": "mock" if mock else provider,
        "vton_mode": "preview" if mock else "real",
        "engine": "IDM-VTON (Hugging Face)" if not mock and provider.startswith("idm") else provider,
        "hf_token_set": has_token,
        "tryon_fast": fast,
        "eta_seconds": eta,
        "eta_minutes": "0" if mock else (f"~{eta} sec" if fast else "~1–2 min"),
        "denoise_steps": steps,
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
