import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { CanvasStageHeader } from "./CanvasStageHeader";
import { ControlPanel } from "./ControlPanel";
import { GarmentViewer } from "./GarmentViewer";
import { DEFAULT_LANDING_MODEL_PATH, LANDING_STUDIO_PRODUCTS, landingModelPublicPath } from "../data/landingProducts";
import { LEGACY_STUDIO_PRODUCTS, legacyModelPublicPath } from "../data/legacyProducts";
import { absoluteModelUrl } from "../lib/absoluteModelUrl";
import { LANDING_MODELS, LEGACY_MODELS } from "./localModels";
import { reloadCartFromStorage, useCustomizerStore } from "./store";

import { useMobileEmbedMode } from "./useMobileEmbedMode";

const CART_STORAGE_KEY = "smartfitao_cart_v1";
const ALL_STUDIO_PRODUCTS = [...LANDING_MODELS, ...LEGACY_MODELS];

function useCartShellBridge() {
  useEffect(() => {
    const onUpdate = () => reloadCartFromStorage();
    window.addEventListener("smartfitao-cart-updated", onUpdate);
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) onUpdate();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("smartfitao-cart-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type !== "TRYKURTI_ADD_ACTIVE_TO_CART") return;
      const { activeModelPath, addToCart, setShoppingCartOpen } = useCustomizerStore.getState();
      const model = ALL_STUDIO_PRODUCTS.find((m) => m.publicPath === activeModelPath);
      if (!model) return;
      addToCart({
        id: model.id,
        label: model.label,
        price: model.price,
        publicPath: model.publicPath,
      });
      setShoppingCartOpen(true);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
}

/** Preload default garment first; defer the rest so the studio opens faster. */
function usePreloadGarments() {
  useEffect(() => {
    useGLTF.preload(absoluteModelUrl(DEFAULT_LANDING_MODEL_PATH));

    const deferRest = () => {
      useGLTF.preload(absoluteModelUrl("/brand-kurta-logo.glb"));
      for (const p of LANDING_STUDIO_PRODUCTS.slice(1)) {
        useGLTF.preload(absoluteModelUrl(landingModelPublicPath(p.relativePath)));
      }
      for (const p of LEGACY_STUDIO_PRODUCTS) {
        useGLTF.preload(absoluteModelUrl(legacyModelPublicPath(p.publicPath)));
      }
    };

    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(deferRest, { timeout: 4000 })
        : window.setTimeout(deferRest, 2000);

    return () => {
      if (typeof idleId === "number") {
        window.clearTimeout(idleId);
      } else if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);
}

export function FashionApp() {
  usePreloadGarments();
  useCartShellBridge();
  const mobileEmbed = useMobileEmbedMode();

  return (
    <div
      className={
        mobileEmbed
          ? "flex h-full min-h-0 w-full flex-row overflow-hidden bg-slate-100 text-zinc-900"
          : "flex h-full min-h-0 w-full flex-col overflow-hidden bg-slate-100 text-zinc-900 md:flex-row"
      }
    >
      <ControlPanel />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <CanvasStageHeader />
        <div className="relative min-h-0 min-w-0 flex-1 blender-viewport-bg">
          <GarmentViewer />
        </div>
      </div>
    </div>
  );
}
