/** Same key as `Ai Cloth Size Prediction/frontend/src/lib/clothSizes.ts` (localStorage handoff). */
export const STORAGE_KEY_LAST_FIT = "snapmeasure_last_fit";

export type StoredFitPayload = {
  shirt: string;
  pantWaist: number;
  chestIn: number;
  waistIn: number;
  fitPreference: string;
  updatedAt: string;
  /** Set by AI Cloth Size Prediction when saving full measurements */
  measurementsCm?: Record<string, number>;
  accuracyR2ByField?: Record<string, number>;
  meanR2?: number;
};

/** Last AI / wizard fit from localStorage (same key as size finder). */
export function readStoredFit(): StoredFitPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAST_FIT);
    if (!raw) return null;
    const j = JSON.parse(raw) as StoredFitPayload;
    if (j && typeof j.shirt === "string" && typeof j.pantWaist === "number") return j;
  } catch {
    /* ignore */
  }
  return null;
}
