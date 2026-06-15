import { STORAGE_KEY_LAST_FIT, type StoredFitPayload } from "./snapmeasureBridge";

function fromBase64Url(b64: string): string {
  let s = b64.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const binary = atob(s);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

/** Apply `?snapmeasure=<base64url>` from AI Size Finder (cross-origin) then strip the query. */
export function consumeSnapmeasureFromUrl(): void {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("snapmeasure");
  if (!raw) return;
  try {
    const json = fromBase64Url(raw);
    const j = JSON.parse(json) as StoredFitPayload;
    if (j && typeof j.shirt === "string" && typeof j.pantWaist === "number") {
      localStorage.setItem(STORAGE_KEY_LAST_FIT, JSON.stringify(j));
      params.delete("snapmeasure");
      const q = params.toString();
      const next = window.location.pathname + (q ? `?${q}` : "") + window.location.hash;
      window.history.replaceState(null, "", next);
    }
  } catch {
    /* ignore malformed */
  }
}
