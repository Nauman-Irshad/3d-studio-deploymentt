# Deploy SmartFitao 2D Try-On + 3D Studio on Vercel

Repo: [Nauman-Irshad/3d-studio-deploymentt](https://github.com/Nauman-Irshad/3d-studio-deploymentt)

## 1. Push this folder to GitHub

This project should be the **root** of the deployment repo (not the whole `fyp whole backend` parent folder).

```powershell
cd "E:\fyp whole backend\id-2d-try-on"
git init
git add .
git commit -m "SmartFitao 2D try-on + 3D studio for Vercel"
git branch -M main
git remote add origin https://github.com/Nauman-Irshad/3d-studio-deploymentt.git
git push -u origin main
```

## 2. Import on Vercel (frontend only)

1. [vercel.com/new](https://vercel.com/new) → Import `3d-studio-deploymentt`
2. Framework: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. **Environment variable (required when API is on Render):**

| Key | Value |
|-----|--------|
| `VITE_TRYON_BACKEND` | `https://threed-studio-deploymentt.onrender.com` |

6. Deploy

**No Python on Vercel** — `api/tryon.py` was moved to `render-only/` so you will **not** get the 500MB / 2GB bundle error.

Try-on API runs on **Render** (`replicate_tryon_server.py`). Token stays on Render only.

## 3. Environment variables

### Vercel (frontend)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_TRYON_BACKEND` | **Yes** | `https://threed-studio-deploymentt.onrender.com` (no trailing slash) |
| `VITE_CV_PHONE_URL` | Optional | Phone capture page, e.g. `https://qr-code-web-deploy.vercel.app/phone-capture` |

**Do not** set `HF_TOKEN` on Vercel — it stays on Render only.

### Render (API)

| Variable | Required | Description |
|----------|----------|-------------|
| `HF_TOKEN` | Recommended | Hugging Face token for IDM-VTON |
| `TRYON_PROVIDER` | No | `idm-vton` (default) |
| `TRYON_MOCK` | No | `0` for real AI, `1` for preview overlay |
| `TRYON_FAST` | No | `1` for faster try-on (~30s) |

## 4. How it works (no size error on Vercel)

| Service | Role |
|---------|------|
| **Vercel** | Static React app + `public/garment-3d/` (~1.3 GB on CDN — OK) |
| **Render** | Python try-on API (`replicate_tryon_server.py`) |

The browser calls `https://threed-studio-deploymentt.onrender.com/api/tryon` because `VITE_TRYON_BACKEND` is set. Python is **not** bundled into Vercel Lambdas, so you avoid the **500 MB / 2 GB** serverless limit.

`api/sessions/*.ts` on Vercel still handles phone-capture sessions (small Node functions).

Local dev: `npm run api` (Python on :8765) + `npm run dev` (Vite proxies `/api`).

## 5. After deploy — test

1. `https://YOUR-PROJECT.vercel.app/` — men's try-on
2. `https://YOUR-PROJECT.vercel.app/ladies_try_on/` — ladies (J. Ladies product names)
3. Open DevTools → Network → try-on should hit `threed-studio-deploymentt.onrender.com/api/tryon`
4. Health: `https://threed-studio-deploymentt.onrender.com/api/tryon/health` → `"status":"ok"`
5. Upload photo + pick garment → Run Try-On

## 6. Ladies catalog images

`npm run build` runs `sync-ladies-catalog` which copies images into `public/ladies-catalog/` and bakes **J. Ladies** display names into `manifest.json`. Commit `public/ladies-catalog/` or ensure `ladies all work/` exists on the build machine.

## 7. 3D studio on Vercel (no nested build)

Vercel does **not** rebuild `3d studio/virtual-tryon-platform/frontend` (avoids Tailwind/postcss errors). It uses the **committed** `public/garment-3d/` folder.

Before pushing to GitHub, refresh locally:

```powershell
cd "E:\fyp whole backend\id-2d-try-on"
npm run sync:3d-studio
git add public/garment-3d
git commit -m "Update committed 3D studio bundle for Vercel"
git push
```

Then redeploy on Vercel (or push triggers auto-deploy).
