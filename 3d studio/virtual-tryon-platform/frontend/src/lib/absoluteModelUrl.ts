/** Full URL for GLTF/GLB loaders (Edge resolves relative `/studio/…` paths more reliably). */
export function absoluteModelUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (typeof window === "undefined") return path;
  return new URL(path, window.location.origin).href;
}
