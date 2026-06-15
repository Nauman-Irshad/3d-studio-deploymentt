import { useMemo } from "react";

export type HeaderRouteState = {
  onStudioPage: boolean;
  on2dTryOnPage: boolean;
};

export function useHeaderRoute(): HeaderRouteState {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return { onStudioPage: false, on2dTryOnPage: false };
    }
    const path = window.location.pathname;
    const onStudioPage = path === "/studio" || path.startsWith("/studio/");
    const on2dTryOnPage =
      !onStudioPage && (path === "/" || path.startsWith("/ladies_try_on"));
    return { onStudioPage, on2dTryOnPage };
  }, []);
}
