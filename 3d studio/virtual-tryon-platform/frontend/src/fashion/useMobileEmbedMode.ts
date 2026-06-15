import { useEffect, useState } from "react";

/** Flutter / phone embed: force landscape row layout + full-height product strip. */
export function useMobileEmbedMode(): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMobile(params.get("mobile") === "1" || params.get("embed") === "1");
  }, []);

  return mobile;
}
