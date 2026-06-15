import QRCode from "qrcode";
import { apiUrl } from "./api";

const FIRESTORE_PROJECT_ID =
  (import.meta.env.VITE_FIRESTORE_PROJECT_ID as string | undefined)?.trim() ||
  "smart-fitao-web-app";
const FIRESTORE_API_KEY =
  (import.meta.env.VITE_FIRESTORE_API_KEY as string | undefined)?.trim() ||
  "AIzaSyBjYPdRnwuRSAfTZDZ9fkS-f7hDQccOjOY";

const PERSISTENT_SESSION_KEY = "smartfitao_phone_session_id";

export function createPhoneSessionId(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** One QR per browser tab — reused for every scan/photo until tab is closed. */
export function getPersistentPhoneSessionId(): string {
  try {
    const existing = sessionStorage.getItem(PERSISTENT_SESSION_KEY)?.trim();
    if (existing) return existing;
    const id = createPhoneSessionId();
    sessionStorage.setItem(PERSISTENT_SESSION_KEY, id);
    return id;
  } catch {
    return createPhoneSessionId();
  }
}

export type NetworkInfo = {
  lan_ip: string | null;
  port: number;
  phone_base: string | null;
};

export async function fetchNetworkInfo(): Promise<NetworkInfo | null> {
  try {
    const res = await fetch("/__network/info");
    if (!res.ok) return null;
    const data = (await res.json()) as {
      lanIp?: string | null;
      port?: number;
      captureBase?: string | null;
    };
    const captureBase = data.captureBase?.replace(/\/$/, "") ?? null;
    return {
      lan_ip: data.lanIp ?? null,
      port: data.port ?? 5173,
      phone_base: captureBase ? `${captureBase}/phone-capture` : null,
    };
  } catch {
    return null;
  }
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/** iPhone camera only works on https:// — never use LAN http:// in QR. */
export function resolveHttpsPhoneCaptureBase(phoneBase?: string | null): string {
  const envRaw = (import.meta.env.VITE_CV_PHONE_URL as string | undefined)?.trim();
  if (envRaw) {
    const envUrl = envRaw.includes("://") ? envRaw : `https://${envRaw}`;
    if (isHttpsUrl(envUrl)) {
      const u = new URL(envUrl);
      const path = u.pathname.replace(/\/$/, "") || "/phone-capture";
      return `${u.origin}${path.endsWith("/phone-capture") ? path : `${path}/phone-capture`}`.replace(
        /\/phone-capture\/phone-capture$/,
        "/phone-capture",
      );
    }
  }

  const lan = phoneBase?.trim().replace(/\/$/, "");
  if (lan && isHttpsUrl(lan)) return lan;

  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    return `${window.location.origin}/phone-capture`.replace(/\/$/, "");
  }

  throw new Error(
    "Phone camera needs HTTPS. Add to .env:\nVITE_CV_PHONE_URL=https://qr-code-web-deploy.vercel.app/phone-capture\nThen restart npm run dev and scan QR again.",
  );
}

/** QR opens phone capture on HTTPS (Vercel). */
export function buildPhoneCaptureUrl(sessionId: string, phoneBase?: string | null): string {
  const base = resolveHttpsPhoneCaptureBase(phoneBase);
  const url = new URL(base.endsWith("/") ? base : `${base}/`);
  url.searchParams.set("phone_session", sessionId);
  return url.toString();
}

export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 280,
    margin: 2,
    color: { dark: "#1a1612", light: "#ffffff" },
  });
}

type FirestoreDoc = {
  fields?: {
    imageDataUrl?: { stringValue?: string };
    updatedAt?: { stringValue?: string };
    phoneScanned?: { booleanValue?: boolean };
    phoneScannedAt?: { stringValue?: string };
    photoReady?: { booleanValue?: boolean };
    desktopReceived?: { booleanValue?: boolean };
    desktopReceivedAt?: { stringValue?: string };
  };
};

export type PhoneSessionState = {
  phoneScanned: boolean;
  hasPhoto: boolean;
  desktopReceived: boolean;
  imageDataUrl: string | null;
  updatedAt: string | null;
};

export type PhoneSyncUiStatus =
  | "idle"
  | "waiting_scan"
  | "phone_connected"
  | "photo_received"
  | "photo_failed";

function firestoreSessionUrl(sessionId: string, mask?: string[]): string {
  const base =
    `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}` +
    `/databases/(default)/documents/phone_tryon_sync/${encodeURIComponent(sessionId)}` +
    `?key=${FIRESTORE_API_KEY}`;
  if (!mask?.length) return base;
  return `${base}&${mask.map((f) => `updateMask.fieldPaths=${f}`).join("&")}`;
}

export async function fetchPhoneSessionState(sessionId: string): Promise<PhoneSessionState> {
  const res = await fetch(firestoreSessionUrl(sessionId));
  if (res.status === 404) {
    return {
      phoneScanned: false,
      hasPhoto: false,
      desktopReceived: false,
      imageDataUrl: null,
      updatedAt: null,
    };
  }
  if (!res.ok) {
    throw new Error(`Firestore read failed (${res.status}). Check phone_tryon_sync rules.`);
  }
  const doc = (await res.json()) as FirestoreDoc;
  const imageDataUrl = doc.fields?.imageDataUrl?.stringValue ?? null;
  return {
    phoneScanned: doc.fields?.phoneScanned?.booleanValue === true,
    hasPhoto: !!imageDataUrl,
    desktopReceived: doc.fields?.desktopReceived?.booleanValue === true,
    imageDataUrl,
    updatedAt: doc.fields?.updatedAt?.stringValue ?? null,
  };
}

/** Phone polls this after upload — desktop sets it when QR modal gets the photo. */
export async function markDesktopReceived(sessionId: string): Promise<void> {
  const url = firestoreSessionUrl(sessionId, ["desktopReceived", "desktopReceivedAt"]);
  await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        desktopReceived: { booleanValue: true },
        desktopReceivedAt: { stringValue: new Date().toISOString() },
      },
    }),
  });
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read phone photo."));
    reader.readAsDataURL(blob);
  });
}

/** When QR is on a separate Vercel project, poll that origin for session photos. */
function phoneSyncApiUrl(path: string): string {
  const envPhone = (import.meta.env.VITE_CV_PHONE_URL as string | undefined)?.trim();
  if (envPhone) {
    try {
      const origin = new URL(envPhone).origin;
      const p = path.startsWith("/") ? path : `/${path}`;
      return `${origin}${p}`;
    } catch {
      /* fall through */
    }
  }
  return apiUrl(path);
}

/** Vercel Blob / Python API session sync (preferred on deployed site). */
export async function fetchPhonePhotoFromSessionApi(sessionId: string): Promise<string | null> {
  try {
    const statusRes = await fetch(phoneSyncApiUrl(`/api/sessions/${encodeURIComponent(sessionId)}`));
    if (!statusRes.ok) return null;
    const status = (await statusRes.json()) as { ready?: boolean; detail?: string };
    if (!status.ready) return null;

    const imgRes = await fetch(phoneSyncApiUrl(`/api/sessions/${encodeURIComponent(sessionId)}/photo`));
    if (!imgRes.ok) return null;
    const blob = await imgRes.blob();
    if (!blob.size) return null;
    return blobToDataUrl(blob);
  } catch {
    return null;
  }
}

export async function fetchPhonePhotoFromFirestore(sessionId: string): Promise<string | null> {
  const state = await fetchPhoneSessionState(sessionId);
  return state.imageDataUrl;
}

export function pollPhoneSession(
  sessionId: string,
  handlers: {
    onScanned?: () => void;
    onPhoto: (dataUrl: string) => void;
    onError: (message: string) => void;
    onWaiting?: (ticks: number) => void;
  },
  signal?: AbortSignal,
): void {
  let stopped = false;
  let failures = 0;
  let ticks = 0;
  let scannedNotified = false;
  let lastDeliveredKey: string | null = null;

  const deliverPhoto = (dataUrl: string, key: string) => {
    if (key === lastDeliveredKey) return;
    lastDeliveredKey = key;
    handlers.onPhoto(dataUrl);
  };

  const stop = () => {
    stopped = true;
  };
  signal?.addEventListener("abort", stop);

  const tick = async () => {
    if (stopped || signal?.aborted) return;
    ticks += 1;
    handlers.onWaiting?.(ticks);

    try {
      try {
        const state = await fetchPhoneSessionState(sessionId);
        failures = 0;
        if (state.phoneScanned && !scannedNotified) {
          scannedNotified = true;
          handlers.onScanned?.();
        }
        if (state.imageDataUrl) {
          const key = state.updatedAt ?? `len:${state.imageDataUrl.length}`;
          deliverPhoto(state.imageDataUrl, key);
        }
      } catch (fireErr) {
        failures += 1;
        if (failures >= 8) {
          handlers.onError(
            fireErr instanceof Error
              ? `${fireErr.message} Session: ${sessionId}`
              : `Could not read phone photo from Firestore. Session: ${sessionId}`,
          );
          return;
        }
      }

      const fromApi = await fetchPhonePhotoFromSessionApi(sessionId);
      if (fromApi) {
        deliverPhoto(fromApi, `api:${fromApi.length}:${fromApi.slice(0, 48)}`);
      }
    } catch (e) {
      failures += 1;
      if (failures >= 8) {
        handlers.onError(
          e instanceof Error
            ? e.message
            : "Could not reach phone sync. Add BLOB on Vercel or fix Firestore rules.",
        );
        return;
      }
    }

    if (!stopped && !signal?.aborted) {
      window.setTimeout(tick, 1000);
    }
  };

  void tick();
}

/** @deprecated Use pollPhoneSession */
export function pollPhonePhoto(
  sessionId: string,
  onPhoto: (dataUrl: string) => void,
  onError: (message: string) => void,
  signal?: AbortSignal,
  onWaiting?: (ticks: number) => void,
): void {
  pollPhoneSession(sessionId, { onPhoto, onError, onWaiting }, signal);
}
