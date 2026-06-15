/**
 * Base body / mannequin models under `public/base-models/`.
 * Synced from `pifuhd-main/3d studio/base models/` via `npm run sync-models`.
 */
import { encodePublicPath, publicUrl } from "../lib/publicUrl";
import manifest from "./baseModels.manifest.json";

export type BaseModelEntry = {
  id: string;
  label: string;
  publicPath: string;
};

function resolveBaseModelPath(manifestPath: string): string {
  // Manifest may already encode segments; normalize then apply studio base.
  const decoded = manifestPath.startsWith("/") ? manifestPath : `/${manifestPath}`;
  if (decoded.includes("%")) {
    return publicUrl(decoded);
  }
  return publicUrl(encodePublicPath(decoded));
}

export const BASE_MODELS: BaseModelEntry[] = manifest.models.map((m) => ({
  ...m,
  publicPath: resolveBaseModelPath(m.publicPath),
}));

export const ALL_BASE_MODEL_PATHS = BASE_MODELS.map((m) => m.publicPath);
