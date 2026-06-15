/** CV body-scan / phone QR → 2D try-on photo handoff. */

export const CV_PAYLOAD_KEY = "smartfitao_cv_payload";

export type CvCaptureHandoff = {
  image_url?: string;
  human_detected?: boolean;
  simple_mode?: boolean;
  landmarks_count?: number;
  saved_filename?: string;
  phase?: string;
};

export type TryOnHandoffPayload = {
  capture?: CvCaptureHandoff;
  garment?: string;
};

export const CV_CAPTURE_MESSAGE_TYPE = "smartfitao_cv_capture";

export function isCvCaptureMessage(data: unknown): data is { type: string; payload: CvCaptureHandoff } {
  if (!data || typeof data !== "object") return false;
  const d = data as { type?: string; payload?: CvCaptureHandoff };
  return d.type === CV_CAPTURE_MESSAGE_TYPE && !!d.payload?.image_url;
}

function readHandoffFromSessionStorage(): TryOnHandoffPayload | null {
  try {
    const raw = sessionStorage.getItem(CV_PAYLOAD_KEY);
    if (!raw) return null;
    const capture = JSON.parse(raw) as CvCaptureHandoff;
    if (!capture?.image_url) return null;
    return { capture };
  } catch {
    return null;
  }
}

export function clearCvCaptureSession(): void {
  try {
    sessionStorage.removeItem(CV_PAYLOAD_KEY);
  } catch {
    /* ignore */
  }
}

function decodeHandoffParam(raw: string): TryOnHandoffPayload | null {
  try {
    const json = decodeURIComponent(escape(atob(raw.replace(/-/g, "+").replace(/_/g, "/"))));
    return JSON.parse(json) as TryOnHandoffPayload;
  } catch {
    try {
      return JSON.parse(atob(raw)) as TryOnHandoffPayload;
    } catch {
      return null;
    }
  }
}

export function readHandoffFromLocation(): TryOnHandoffPayload | null {
  const params = new URLSearchParams(window.location.search);
  if (params.get("from_cv") === "1" || params.get("cv_session") === "1") {
    return readHandoffFromSessionStorage();
  }
  const raw = params.get("handoff");
  if (!raw) return null;
  return decodeHandoffParam(raw);
}

export async function fetchCapturePhotoBlob(imageUrl: string): Promise<Blob> {
  if (imageUrl.startsWith("data:")) {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    if (!blob.size) throw new Error("Body-scan photo is empty.");
    return blob;
  }
  const res = await fetch(imageUrl, { mode: "cors", credentials: "omit" });
  if (!res.ok) throw new Error(`Could not load your body-scan photo (${res.status}).`);
  const blob = await res.blob();
  if (!blob.size) throw new Error("Body-scan photo is empty.");
  return blob;
}
