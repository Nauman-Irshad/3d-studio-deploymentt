/**
 * Dev (:5173): relative /api → Vite proxy → Python :8765
 * Prod (Vercel): Render API — override with VITE_TRYON_BACKEND if needed
 */
const PRODUCTION_TRYON_BACKEND = "https://threed-studio-deploymentt.onrender.com";

const envBackend = (
  import.meta.env.VITE_TRYON_BACKEND?.trim() ||
  (import.meta.env.PROD ? PRODUCTION_TRYON_BACKEND : "")
).replace(/\/$/, "");

export const apiBase = envBackend;

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return apiBase ? `${apiBase}${p}` : p;
}

export function formatApiError(status: number, detail: unknown): string {
  const msg =
    typeof detail === "string"
      ? detail
      : Array.isArray(detail)
        ? (detail as { msg?: string }[]).map((d) => d.msg).filter(Boolean).join("; ")
        : `Request failed (${status})`;

  if (status === 404 && msg === "Not Found") {
    return (
      "API route not found. Start Python API: npm run api — then refresh. " +
      "Use the same dev URL (e.g. http://localhost:5174) with npm run dev running."
    );
  }
  if (status === 404) {
    return msg;
  }
  if (status === 502 && msg.toLowerCase().includes("not found")) {
    return (
      "Hugging Face CatVTON endpoint error. HF token is usually optional — " +
      "try again in a few minutes if the Space is busy. Details: " + msg
    );
  }
  return msg;
}
