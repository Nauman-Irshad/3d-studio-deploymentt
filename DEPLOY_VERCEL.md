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

## 2. Import on Vercel

1. [vercel.com/new](https://vercel.com/new) → Import `3d-studio-deploymentt`
2. Framework: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

`vercel.json` in this repo already configures routes for:

- `/` — Men's 2D try-on
- `/ladies_try_on/` — Women's try-on
- `/studio/` — 3D studio shell
- `/garment-3d/` — Embedded 3D app
- `/api/tryon` — Serverless AI try-on (Python)
- `/api/tryon/health` — API health check

## 3. Environment variables (Vercel → Settings → Environment Variables)

### Server-only (never use `VITE_` prefix — not exposed to browsers)

| Variable | Required | Description |
|----------|----------|-------------|
| `HF_TOKEN` | Recommended | Hugging Face token for IDM-VTON Space. **Stays on server only.** |
| `TRYON_PROVIDER` | No | `idm-vton` (default) |
| `TRYON_MOCK` | No | `0` for real AI, `1` for preview overlay only |
| `TRYON_FAST` | No | `1` for faster try-on (~30s) |
| `TRYON_MAX_SIDE` | No | `512` default |
| `TRYON_PERSON_MAX_SIDE` | No | `768` default |
| `TRYON_DENOISE_STEPS` | No | `20` minimum for IDM-VTON |

### Client-safe (optional `VITE_` prefix)

| Variable | Description |
|----------|-------------|
| `VITE_CV_PHONE_URL` | HTTPS phone capture page, e.g. `https://qr-code-web-deploy.vercel.app/phone-capture` |

### Do NOT set on Vercel

| Variable | Why |
|----------|-----|
| `VITE_TRYON_BACKEND` | Leave unset — production uses same-origin `/api` |
| `HF_TOKEN` with `VITE_` | **Never** — would leak your token in the browser bundle |

## 4. How API security works

- Browser calls `POST /api/tryon` on **your Vercel domain** (same origin).
- Vercel runs `api/tryon.py` as a **serverless function**.
- `HF_TOKEN` is read from `process.env` / `os.environ` **only inside that function**.
- Users never see the token in Network tab or page source.

Local dev: `npm run api` (Python on :8765) + `npm run dev` (Vite proxies `/api`).

## 5. After deploy — test

1. `https://YOUR-PROJECT.vercel.app/` — men's try-on
2. `https://YOUR-PROJECT.vercel.app/ladies_try_on/` — ladies (J. Ladies product names in sidebar)
3. `https://YOUR-PROJECT.vercel.app/api/tryon/health` — should return `"status":"ok"`
4. Upload photo + pick garment → Run Try-On

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
