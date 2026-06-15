const MAX_SIDE = 1280;
/** Smaller uploads = faster try-on (local mock ~1s). */
export const TRYON_UPLOAD_MAX_SIDE = 720;

export function tryOnUploadFilename(blob: Blob, base: string): string {
  return blob.type === "image/png" ? `${base}.png` : `${base}.jpg`;
}
const JPEG_QUALITY = 0.88;
/** Accept any image the browser can decode; output is always JPEG (no alpha). */
export async function normalizeToJpegBlob(
  input: Blob | File,
  maxSide = MAX_SIDE,
): Promise<Blob> {
  const url = URL.createObjectURL(input);
  try {
    const img = await loadImage(url);
    if (img.naturalWidth < 1 || img.naturalHeight < 1) {
      throw new Error("Image has no visible pixels.");
    }

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

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    const blob = await canvasToJpeg(canvas);
    if (!blob?.size) throw new Error("Could not convert image to JPEG.");
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Unsupported or corrupted image file."));
    img.src = src;
  });
}

function canvasToJpeg(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
}

export async function validateImageBlob(
  blob: Blob,
): Promise<{ ok: true; jpeg: Blob } | { ok: false; message: string }> {
  if (!blob.size) {
    return { ok: false, message: "Image file is empty." };
  }
  try {
    const jpeg = await normalizeToJpegBlob(blob, TRYON_UPLOAD_MAX_SIDE);
    return { ok: true, jpeg };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Unsupported image format.",
    };
  }
}

/** Person photo rules for shalwar kameez virtual try-on (portrait, standing/front). */
export async function validatePersonPhotoForTryOn(
  blob: Blob,
  options?: { relaxed?: boolean },
): Promise<{ ok: true; jpeg: Blob } | { ok: false; message: string }> {
  const base = await validateImageBlob(blob);
  if (!base.ok) return base;

  const url = URL.createObjectURL(base.jpeg);
  try {
    const img = await loadImage(url);
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    if (w < 200 || h < 280) {
      return {
        ok: false,
        message:
          "Photo is too small. Upload a clear image of yourself (full or upper body, front view).",
      };
    }

    if (options?.relaxed) {
      return { ok: true, jpeg: base.jpeg };
    }

    if (w > h) {
      return {
        ok: false,
        message:
          "Use a portrait photo of yourself (standing, front view) for shalwar kameez try-on — not a wide or landscape image.",
      };
    }

    const ratio = h / w;
    if (ratio < 1.08) {
      return {
        ok: false,
        message:
          "Upload a photo of yourself in shalwar kameez or plain clothes — not a flat kurta/garment-only picture.",
      };
    }

    if (ratio > 3.5) {
      return {
        ok: false,
        message: "Use a normal front-facing person photo (not an extremely narrow crop).",
      };
    }

    return { ok: true, jpeg: base.jpeg };
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Decode API base64 JPEG (sync — avoids fetch data-URL hangs on large payloads). */
export function jpegBase64ToBlob(b64: string): Blob {
  const clean = b64.replace(/\s/g, "");
  const bin = atob(clean);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  if (!bytes.length) throw new Error("Try-on result image is empty.");
  return new Blob([bytes], { type: "image/jpeg" });
}

/** Browser fallback — same quick overlay as mock_tryon.py when API is slow/offline. */
export async function clientSideMockTryOn(
  human: Blob,
  garment: Blob,
  maxSide = TRYON_UPLOAD_MAX_SIDE,
): Promise<Blob> {
  const personJpeg = await normalizeToJpegBlob(human, maxSide);
  const garmJpeg = await normalizeToJpegBlob(garment, maxSide);
  const personUrl = URL.createObjectURL(personJpeg);
  const garmUrl = URL.createObjectURL(garmJpeg);
  try {
    const [person, garm] = await Promise.all([loadImage(personUrl), loadImage(garmUrl)]);
    const pw = person.naturalWidth;
    const ph = person.naturalHeight;
    const targetW = Math.round(pw * 0.58);
    const scale = targetW / Math.max(garm.naturalWidth, 1);
    const targetH = Math.max(1, Math.round(garm.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = pw;
    canvas.height = ph;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not render try-on preview.");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pw, ph);
    ctx.drawImage(person, 0, 0, pw, ph);
    const x = Math.floor((pw - targetW) / 2);
    const y = Math.floor(ph * 0.14);
    ctx.drawImage(garm, x, y, targetW, targetH);

    const blob = await canvasToJpeg(canvas);
    if (!blob?.size) throw new Error("Could not create try-on preview.");
    return blob;
  } finally {
    URL.revokeObjectURL(personUrl);
    URL.revokeObjectURL(garmUrl);
  }
}

export function validateImageUrl(src: string): Promise<{ ok: true } | { ok: false; message: string }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth < 1 || img.naturalHeight < 1) {
        resolve({ ok: false, message: "Image has no visible pixels." });
        return;
      }
      resolve({ ok: true });
    };
    img.onerror = () =>
      resolve({
        ok: false,
        message: "Image failed to load.",
      });
    img.src = src;
  });
}
