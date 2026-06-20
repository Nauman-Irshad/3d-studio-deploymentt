import { useGLTF } from "@react-three/drei";
import {
  DEFAULT_LANDING_MODEL_PATH,
  LANDING_STUDIO_PRODUCTS,
  landingModelPublicPath,
} from "../data/landingProducts";
import { LEGACY_STUDIO_PRODUCTS, legacyModelPublicPath } from "../data/legacyProducts";
import { absoluteModelUrl } from "../lib/absoluteModelUrl";
import { DEFAULT_BACKGROUND_PATH } from "./backgroundScenes";
import { preloadBackdrop } from "./backdropPreload";

const prefetched = new Set<string>();

function prefetchUrl(url: string): void {
  if (!url || prefetched.has(url) || typeof document === "undefined") return;
  prefetched.add(url);
  try {
    useGLTF.preload(url);
  } catch {
    /* ignore */
  }
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "fetch";
  link.href = url;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

/** Start every garment fetch immediately — before React mounts. */
export function preloadAllGarments(): void {
  prefetchUrl(absoluteModelUrl(DEFAULT_LANDING_MODEL_PATH));
  prefetchUrl(absoluteModelUrl("/brand-kurta-logo.glb"));

  for (const p of LANDING_STUDIO_PRODUCTS) {
    prefetchUrl(absoluteModelUrl(landingModelPublicPath(p.relativePath)));
  }
  for (const p of LEGACY_STUDIO_PRODUCTS) {
    prefetchUrl(absoluteModelUrl(legacyModelPublicPath(p.publicPath)));
  }

  // Default backdrop preset path — EXR deferred until user hovers header swatches.
  preloadBackdrop(DEFAULT_BACKGROUND_PATH);
}

preloadAllGarments();
