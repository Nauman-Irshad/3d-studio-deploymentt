import { useGLTF } from "@react-three/drei";
import { DEFAULT_LANDING_MODEL_PATH } from "../data/landingProducts";
import { absoluteModelUrl } from "../lib/absoluteModelUrl";

/** Kick off default GLB fetch as soon as the studio bundle loads (before React mount). */
export function preloadDefaultGarment(): void {
  try {
    useGLTF.preload(absoluteModelUrl(DEFAULT_LANDING_MODEL_PATH));
    useGLTF.preload(absoluteModelUrl("/brand-kurta-logo.glb"));
  } catch {
    /* ignore — preload is best-effort */
  }
}

preloadDefaultGarment();
