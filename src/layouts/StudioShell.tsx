import { SiteHeader } from "./SiteChrome";
import { STUDIO_3D_APP_PATH } from "../constants/studioUrls";

export function StudioShell() {
  return (
    <div className="app studio-shell-app">
      <SiteHeader brandHref="/studio/" />
      <iframe
        className="studio-shell-frame"
        src={STUDIO_3D_APP_PATH}
        title="3D Garment Studio"
        allow="fullscreen"
      />
    </div>
  );
}
