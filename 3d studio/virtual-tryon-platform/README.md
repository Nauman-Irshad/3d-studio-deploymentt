# Virtual Try-On Platform

Production-style **hybrid** virtual try-on: **React + React Three Fiber** for a 3D avatar and PNG texture mapping, plus a **FastAPI** backend for **2D AI try-on** (CatVTON / custom service) using a viewport capture + garment image.

> **No model training.** Plug in pretrained services only.

## Architecture

| Path | What it does |
|------|----------------|
| **A – AI try-on** | Renders the current 3D view → PNG → `POST /api/try-on` with the clothing PNG → displays the returned image. |
| **B – 3D texture** | Maps the uploaded PNG onto a simple garment shell (torso cylinder, long “kurta” cylinder, or plane) with UV repeat and position sliders. |

**CatVTON:** The public Hugging Face **Inference API does not reliably host CatVTON** as a one-click endpoint. For real CatVTON quality, run the [official project / Space](https://huggingface.co/spaces/zhengchong/CatVTON) (or your own GPU worker) and point this backend at it with `TRYON_MODE=remote` and `REMOTE_TRYON_URL`.

**Default backend mode** (`TRYON_MODE=placeholder`) uses a small **PIL composite** so the full stack runs offline for demos.

## Local 3D products (`models/`)

Place garment (or body) GLTFs under `D:\try on cloth pretrain\models\productN\` (or the repo `models/` folder). For the Vite app to load them, keep a copy under **`frontend/public/models/`** (same folder layout). After adding files, refresh the dev server.

The sidebar **Your 3D products** lists entries from `src/data/productCatalog.ts`. Extend that array when you add `product6`, etc.

The default **Cloth mannequin** is a procedural, faceless body used for PNG texture shells and for mounting your GLTF products.

## Project layout

```
virtual-tryon-platform/
├── frontend/          # Vite + React + TypeScript + R3F + drei
│   └── src/
│       ├── App.tsx              # Sidebar UI, AI trigger, state
│       ├── components/
│       │   ├── Scene3D.tsx      # Canvas, lights, orbit controls, capture hook
│       │   ├── AvatarModel.tsx  # GLB via useGLTF
│       │   ├── TexturedGarment.tsx  # PNG → meshStandardMaterial.map
│       │   └── ...
│       ├── context/CaptureContext.tsx
│       └── lib/api.ts           # fetch /api/try-on
├── backend/           # FastAPI
│   └── app/
│       ├── main.py              # CORS, /health, /api/try-on
│       ├── providers/
│       │   ├── placeholder.py   # Demo compositor
│       │   └── remote.py        # httpx multipart → your CatVTON HTTP API
│       └── services/tryon_service.py
└── README.md
```

## Prerequisites

- **Node.js** 18+
- **Python** 3.10+

## Backend setup

```bash
cd backend
python -m venv .venv
# Windows:
.\.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
copy .env.example .env   # Windows: copy; adjust TRYON_MODE / REMOTE_TRYON_URL
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Remote CatVTON (or any compatible service)

Your service should accept **multipart/form-data** with:

- `person` — PNG/JPEG (avatar render or photo)
- `garment` — clothing image
- `mask` — optional

and return **raw image bytes** (`image/png` or `image/jpeg`). If your API uses JSON + base64, extend `backend/app/providers/remote.py`.

```env
TRYON_MODE=remote
REMOTE_TRYON_URL=https://your-catvton-or-wrapper.example/api/tryon
```

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` and `/health` to `http://127.0.0.1:8000`.

**Production API base:** set `VITE_API_BASE` to your API origin (e.g. `https://api.example.com`) before `npm run build`.

## Using the app

1. **Avatar:** Keep the default Khronos sample GLB or paste any **HTTPS** GLB URL (or add `public/avatar.glb` and set the field to `/avatar.glb`).
2. **Clothing:** Drag/drop a **PNG/JPEG/WebP** (flat-lay or product shot).
3. **3D path:** Pick a shell preset and tune UV repeat / offsets until the texture lines up.
4. **AI path:** Click **Render → AI try-on** to capture the WebGL view and call the backend.

## Optional enhancements (not implemented here)

- **Segmentation** (e.g. rembg) on the garment PNG before upload.
- **Pose estimation** (MediaPipe) to drive mesh placement.
- **Skinned cloth GLB** loaded with `useGLTF` and the same `map` workflow.

## Relation to `virtual_tryon_v5 (2) (1).html`

The legacy single-file demo used inline GLB + procedural cylinders. This repo replaces that with a **modular** stack: real **texture maps** on garment shells, **pluggable** try-on backends, and a path to **CatVTON** via your own HTTP deployment.
