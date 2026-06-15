import { TRYON_UPLOAD_MAX_SIDE, normalizeToJpegBlob } from "./imageUtils";

/** Smaller = faster AI cutout; final PNG is upscaled to try-on size. */
export const BG_REMOVAL_INFERENCE_MAX_SIDE = 448;

const IMG_LY_ASSETS =
  "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/";

type BgModel = "isnet_quint8" | "isnet_fp16" | "isnet";
type BgDevice = "cpu" | "gpu";

const MODEL_ATTEMPTS: { model: BgModel; device: BgDevice }[] = [
  { model: "isnet_quint8", device: "cpu" },
  { model: "isnet_quint8", device: "gpu" },
  { model: "isnet_fp16", device: "cpu" },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image for background removal."));
    img.src = src;
  });
}

function canvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob?.size ? resolve(blob) : reject(new Error("Could not encode PNG."))),
      "image/png",
    );
  });
}

/** Resize cutout PNG and keep alpha (transparent background). */
export async function resizeCutoutPng(source: Blob, maxSide = TRYON_UPLOAD_MAX_SIDE): Promise<Blob> {
  const url = URL.createObjectURL(source);
  try {
    const img = await loadImage(url);
    let w = img.naturalWidth;
    let h = img.naturalHeight;
    if (Math.max(w, h) > maxSide) {
      const scale = maxSide / Math.max(w, h);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not process image.");
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    return canvasToPng(canvas);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export type BackgroundRemovalResult = {
  blob: Blob;
  backgroundRemoved: boolean;
};

async function fallbackForTryOn(source: Blob, maxSide: number): Promise<Blob> {
  try {
    return await normalizeToJpegBlob(source, maxSide);
  } catch {
    return source;
  }
}

let imglyModule: Promise<typeof import("@imgly/background-removal")> | null = null;

function getImglyModule() {
  imglyModule ??= import("@imgly/background-removal");
  return imglyModule;
}

let preloadPromise: Promise<void> | null = null;

function bgConfig(model: BgModel, device: BgDevice) {
  return {
    publicPath: IMG_LY_ASSETS,
    model,
    device,
    proxyToWorker: true,
    rescale: true,
    output: { format: "image/png" as const, quality: 0.92 },
  };
}

/** Download + warm the fastest model as soon as the try-on page loads. */
export function preloadBackgroundRemovalModel(): void {
  if (typeof window === "undefined") return;
  const first = MODEL_ATTEMPTS[0]!;
  preloadPromise ??= getImglyModule()
    .then((m) => m.preload(bgConfig(first.model, first.device)))
    .catch(() => {})
    .then(() => {});
  void preloadPromise;
}

async function runCutout(
  source: Blob,
  onProgress?: (p: number) => void,
): Promise<Blob> {
  if (preloadPromise) await preloadPromise.catch(() => {});
  const inferenceBlob = await normalizeToJpegBlob(source, BG_REMOVAL_INFERENCE_MAX_SIDE);
  const { removeBackground } = await getImglyModule();
  let lastError: unknown;
  for (const { model, device } of MODEL_ATTEMPTS) {
    try {
      return await removeBackground(inferenceBlob, {
        ...bgConfig(model, device),
        progress: (_key, current, total) => {
          if (total > 0) onProgress?.(Math.round((current / total) * 100));
        },
      });
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Background removal failed.");
}

/**
 * Fast in-browser background removal — transparent PNG (best for 2D try-on preview).
 * Never throws — on failure returns JPEG fallback so try-on can continue.
 */
export async function removeBackgroundToJpeg(
  source: Blob,
  maxSide = TRYON_UPLOAD_MAX_SIDE,
  onProgress?: (p: number) => void,
): Promise<BackgroundRemovalResult> {
  const fallback = await fallbackForTryOn(source, maxSide);
  try {
    const cutout = await runCutout(source, onProgress);
    const blob = await resizeCutoutPng(cutout, maxSide);
    return { blob, backgroundRemoved: true };
  } catch (e) {
    console.warn("[background-removal] failed, using original photo:", e);
    return { blob: fallback, backgroundRemoved: false };
  }
}
