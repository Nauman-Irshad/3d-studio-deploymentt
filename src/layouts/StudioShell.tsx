import { useEffect, useState } from "react";
import { SiteHeader } from "./SiteChrome";
import { STUDIO_3D_APP_PATH } from "../constants/studioUrls";

function studioEmbedSrc(): string {
  if (typeof window === "undefined") return STUDIO_3D_APP_PATH;
  const narrow = window.matchMedia("(max-width: 900px)").matches;
  return narrow ? `${STUDIO_3D_APP_PATH}?mobile=1` : STUDIO_3D_APP_PATH;
}

export function StudioShell() {
  const [frameSrc, setFrameSrc] = useState(STUDIO_3D_APP_PATH);

  useEffect(() => {
    const apply = () => setFrameSrc(studioEmbedSrc());
    apply();
    const mq = window.matchMedia("(max-width: 900px)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="app studio-shell-app">
      <SiteHeader brandHref="/studio/" />
      <iframe
        className="studio-shell-frame"
        src={frameSrc}
        title="3D Garment Studio"
        allow="fullscreen"
      />
    </div>
  );
}
