export const WEBSITE_BASE =
  (typeof import.meta.env.VITE_WEBSITE_URL === 'string' && import.meta.env.VITE_WEBSITE_URL.trim()) ||
  'http://127.0.0.1:5177';

export function websitePath(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${WEBSITE_BASE.replace(/\/$/, '')}${p}`;
}
