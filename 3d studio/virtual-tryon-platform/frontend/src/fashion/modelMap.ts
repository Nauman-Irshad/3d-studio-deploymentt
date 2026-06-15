import {
  DEFAULT_LANDING_MODEL_PATH,
  KURTA_STUDIO_PRODUCTS,
  landingModelPublicPath,
  SHALWAR_STUDIO_PRODUCTS,
} from "../data/landingProducts";
import { ALL_LOCAL_MODEL_PATHS } from "./localModels";
import type { GarmentStyle, SleeveStyle } from "./types";

/**
 * Maps UI garment presets to landing-page GLB paths under `/public/landing page product/`.
 */
export function resolveGarmentModelPath(
  garment: GarmentStyle,
  sleeve: SleeveStyle,
): string {
  const kurta = KURTA_STUDIO_PRODUCTS;
  const shalwar = SHALWAR_STUDIO_PRODUCTS;
  const key = `${garment}:${sleeve}`;
  const map: Record<string, string> = {
    "top:sleeved": landingModelPublicPath(kurta[0]?.relativePath ?? ""),
    "top:sleeveless": landingModelPublicPath(kurta[2]?.relativePath ?? ""),
    "full:sleeved": landingModelPublicPath(kurta[1]?.relativePath ?? ""),
    "full:sleeveless": landingModelPublicPath(shalwar[2]?.relativePath ?? ""),
    "bottom:sleeved": landingModelPublicPath(shalwar[0]?.relativePath ?? ""),
    "bottom:sleeveless": landingModelPublicPath(shalwar[1]?.relativePath ?? ""),
  };
  return map[key] ?? DEFAULT_LANDING_MODEL_PATH;
}

export const ALL_GARMENT_MODEL_PATHS = ALL_LOCAL_MODEL_PATHS;
