/**
 * Vite `base` (e.g. `/studio/`). All paths to files under `public/` must include this prefix
 * or the app breaks when opened at `http://127.0.0.1:5174/studio/`.
 */
const rawBase = import.meta.env.BASE_URL || "/";
export const APP_BASE = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

/** Encode each path segment so spaces and special chars load correctly in useGLTF. */
export function encodePublicPath(absolutePublicPath: string): string {
  const parts = absolutePublicPath.split("/").filter(Boolean);
  return `/${parts.map((seg) => encodeURIComponent(seg)).join("/")}`;
}

/** Turn `/models/foo.gltf` into `/studio/models/foo.gltf` when base is `/studio/`. */
export function publicUrl(absolutePublicPath: string): string {
  const path = absolutePublicPath.startsWith("/")
    ? absolutePublicPath.slice(1)
    : absolutePublicPath;
  return `${APP_BASE}${path}`;
}
