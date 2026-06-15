"""
Vercel serverless: POST /api/tryon — CatVTON via Hugging Face.
Set HF_TOKEN in Vercel env (optional for public Space).
"""

from __future__ import annotations

import base64
import cgi
import io
import json
import os
import sys
from http.server import BaseHTTPRequestHandler

# Vercel bundles project root
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from hf_tryon import run_hf_tryon  # noqa: E402


def _parse_multipart(body: bytes, content_type: str) -> dict[str, tuple[bytes, str]]:
    environ = {
        "REQUEST_METHOD": "POST",
        "CONTENT_TYPE": content_type,
        "CONTENT_LENGTH": str(len(body)),
    }
    fields: dict[str, tuple[bytes, str]] = {}
    fp = io.BytesIO(body)
    form = cgi.FieldStorage(fp=fp, environ=environ, keep_blank_values=True)
    for key in form.keys():
        field = form[key]
        if isinstance(field, list):
            field = field[0]
        if getattr(field, "filename", None) or getattr(field, "file", None):
            data = field.file.read() if field.file else b""
            name = field.filename or f"{key}.jpg"
            fields[key] = (data, name)
        elif field.value is not None:
            fields[key] = (str(field.value).encode(), "")
    return fields


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_POST(self) -> None:
        try:
            length = int(self.headers.get("Content-Length", "0"))
            body = self.rfile.read(length) if length else b""
            ctype = self.headers.get("Content-Type", "")
            if "multipart/form-data" not in ctype:
                self._json(400, {"detail": "Expected multipart/form-data"})
                return

            fields = _parse_multipart(body, ctype)
            human = fields.get("human_img")
            garm = fields.get("garm_img")
            if not human or not garm:
                self._json(400, {"detail": "Missing human_img or garm_img"})
                return

            url, raw = run_hf_tryon(human[0], garm[0], "", "upper")
            if url:
                self._json(200, {"url": url})
            elif raw:
                self._json(
                    200,
                    {"image_base64": base64.standard_b64encode(raw).decode("ascii")},
                )
            else:
                self._json(502, {"detail": "No output from CatVTON"})
        except Exception as e:
            self._json(502, {"detail": str(e)})

    def _cors(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json(self, status: int, payload: dict) -> None:
        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())
