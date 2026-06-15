"""Studio product catalog for Flutter / mobile clients."""
from __future__ import annotations

import json
from pathlib import Path

_CATALOG_PATHS = [
    Path(__file__).resolve().parents[2]
    / "frontend"
    / "src"
    / "fashion"
    / "localModels.manifest.json",
    Path(__file__).resolve().parents[2]
    / "frontend"
    / "public"
    / "catalog.json",
]


def load_catalog_products() -> list[dict]:
    for path in _CATALOG_PATHS:
        if not path.is_file():
            continue
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
            if isinstance(data, dict) and isinstance(data.get("products"), list):
                return data["products"]
            if isinstance(data, list):
                return data
        except (json.JSONDecodeError, OSError):
            continue
    return []


def catalog_payload(studio_base: str = "/") -> dict:
    products = load_catalog_products()
    base = studio_base.rstrip("/") or ""
    out = []
    for p in products:
        if not isinstance(p, dict):
            continue
        public_path = str(p.get("publicPath") or "")
        model_url = public_path
        if public_path.startswith("/") and base:
            model_url = f"{base}{public_path}"
        out.append(
            {
                "id": p.get("id", ""),
                "label": p.get("label", ""),
                "fileLabel": p.get("fileLabel", ""),
                "publicPath": public_path,
                "modelUrl": model_url,
                "price": p.get("price") or "",
            }
        )
    return {
        "products": out,
        "count": len(out),
        "studioBase": base or "/",
    }
