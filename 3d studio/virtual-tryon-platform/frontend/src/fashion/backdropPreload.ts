import { useEnvironment } from "@react-three/drei";
import { ALL_BACKGROUND_PATHS, DEFAULT_BACKGROUND_PATH } from "./backgroundScenes";

let preloadStarted = false;

export function backdropAbsoluteUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (typeof window === "undefined") return path;
  return new URL(path, window.location.origin).href;
}

/** Warm one backdrop in the R3F loader cache. */
export function preloadBackdrop(path: string) {
  if (!path || typeof window === "undefined") return;
  try {
    useEnvironment.preload({ files: backdropAbsoluteUrl(path) });
  } catch {
    /* ignore duplicate preload */
  }
}

/** Preload active backdrop first; stagger the rest so garments keep GPU headroom. */
export function preloadAllBackdrops(activePath: string = DEFAULT_BACKGROUND_PATH) {
  if (typeof window === "undefined") return;
  preloadBackdrop(activePath);

  if (preloadStarted) return;
  preloadStarted = true;

  const rest = ALL_BACKGROUND_PATHS.filter((p) => p !== activePath);
  const loadRest = () => {
    rest.forEach((p, i) => {
      window.setTimeout(() => preloadBackdrop(p), 800 + i * 600);
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadRest, { timeout: 12_000 });
  } else {
    window.setTimeout(loadRest, 4_000);
  }
}
