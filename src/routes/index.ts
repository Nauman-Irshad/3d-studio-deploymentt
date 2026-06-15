export { HomePage as App } from "../pages/Home/HomePage";
export { TryOnApp } from "../pages/Product/TryOnApp";
export { CapturePage } from "../pages/Product/CapturePage";
export { LadiesTryOnPage } from "../pages/Product/LadiesTryOnPage";
export { StudioShell as StudioPage } from "../layouts/StudioShell";
export { StudioShell } from "../layouts/StudioShell";

export function getCaptureSessionId(): string | null {
  const match = window.location.pathname.match(/^\/capture\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}
