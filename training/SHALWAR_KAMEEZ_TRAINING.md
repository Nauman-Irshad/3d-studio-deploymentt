# Shalwar kameez fine-tuning (IDM-VTON)

Smart Fiatio uses **Hugging Face `yisol/IDM-VTON`** via the public Gradio API. That shared Space **cannot load your own fine-tuned weights**. To truly train on a shalwar kameez dataset and use custom weights, you need a **local GPU** (or your own HF Space with uploaded checkpoints).

## What the app does today (no training)

- Always sends **`TRYON_MODE=full`** — full-length try-on, no tight shirt crop.
- Uses a **shalwar kameez prompt** (festive, loose, big shalwar — not shirt/jeans).
- This improves results but is **not** the same as fine-tuning.

## Dataset layout (for training)

Prepare paired data similar to [DressCode / IDM-VTON](https://github.com/yisol/IDM-VTON):

```
shalwar_kameez_dataset/
├── train/
│   ├── image/          # person photos (full or upper body)
│   ├── cloth/          # flat-lay kurta / shalwar kameez images
│   ├── image-densepose/  # precomputed (see IDM-VTON repo)
│   └── captions.txt    # one line per sample: "traditional shalwar kameez ..."
└── test/
    └── ...
```

Use **Affordable.pk** (or your own) kurta images as `cloth/` and model photos as `image/`. Captions should describe **Pakistani shalwar kameez**, not western wear.

## Fine-tune IDM-VTON (local GPU)

1. Clone: https://github.com/yisol/IDM-VTON  
2. Install env + download checkpoints (see repo README).  
3. Train / adapt on your dataset (see `train_xl.py`, `inference_dc.py`, category `upper_body` or custom pipeline for full outfit).  
4. Run **local Gradio** or export weights to **your own HF Space**.  
5. Point this app at your Space by changing `IDM_VTON_SPACE` in `hf_tryon.py` or add `IDM_VTON_SPACE` env var.

## Minimum GPU

- Training: NVIDIA GPU with **16GB+ VRAM** recommended.  
- Inference only: can use HF ZeroGPU (free queue) with the public Space.

## After you have custom weights

1. Deploy a private HF Space with your checkpoint.  
2. Set `HF_TOKEN` in `.env`.  
3. Update the Space id in `hf_tryon.py` to your Space.  
4. Restart `npm run api`.

Until then, keep `TRYON_MODE=full` and shalwar kameez garment images (full outfit flat-lays work best).
