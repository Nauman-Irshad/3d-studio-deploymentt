/**
 * Target for every **Open size finder wizard** link (new tab).
 * Local dev points at Ai Cloth's Vite server; deployed Vercel builds serve it under `/size-finder/`.
 */
const defaultSizeFinderUrl = import.meta.env.DEV ? "http://127.0.0.1:3000/" : "/size-finder/";

export const SIZE_FINDER_URL =
  (typeof import.meta.env.VITE_SIZE_FINDER_URL === "string" && import.meta.env.VITE_SIZE_FINDER_URL.trim()) ||
  defaultSizeFinderUrl;
