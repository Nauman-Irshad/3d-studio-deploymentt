"""Save try-on inputs and results to tryon-archive/ for demos and review."""

from __future__ import annotations

import json
import re
import secrets
from datetime import datetime, timezone
from pathlib import Path

_ROOT = Path(__file__).resolve().parent
ARCHIVE_ROOT = _ROOT / "tryon-archive"
USER_INPUTS_DIR = ARCHIVE_ROOT / "user-inputs"
SELECTED_GARMENTS_DIR = ARCHIVE_ROOT / "selected-garments"
RESULTS_DIR = ARCHIVE_ROOT / "results"
MANIFEST_PATH = ARCHIVE_ROOT / "manifest.jsonl"

_SAFE = re.compile(r"[^a-zA-Z0-9._-]+")


def _ensure_dirs() -> None:
    for d in (USER_INPUTS_DIR, SELECTED_GARMENTS_DIR, RESULTS_DIR):
        d.mkdir(parents=True, exist_ok=True)


def _safe_label(label: str) -> str:
    cleaned = _SAFE.sub("-", (label or "item").strip()).strip("-")
    return cleaned[:48] or "item"


def save_tryon_archive(
    human_bytes: bytes,
    garm_bytes: bytes,
    result_bytes: bytes,
    *,
    garment_label: str = "",
    page: str = "tryon",
) -> dict[str, str]:
    _ensure_dirs()
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    uid = secrets.token_hex(4)
    label = _safe_label(garment_label)
    base = f"{stamp}_{uid}_{page}_{label}"

    person_path = USER_INPUTS_DIR / f"{base}_person.jpg"
    garment_path = SELECTED_GARMENTS_DIR / f"{base}_garment.jpg"
    result_path = RESULTS_DIR / f"{base}_result.jpg"

    person_path.write_bytes(human_bytes)
    garment_path.write_bytes(garm_bytes)
    result_path.write_bytes(result_bytes)

    entry = {
        "id": f"{stamp}_{uid}",
        "saved_at": datetime.now(timezone.utc).isoformat(),
        "page": page,
        "garment_label": garment_label,
        "person": person_path.relative_to(_ROOT).as_posix(),
        "garment": garment_path.relative_to(_ROOT).as_posix(),
        "result": result_path.relative_to(_ROOT).as_posix(),
    }
    with MANIFEST_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")

    return entry
