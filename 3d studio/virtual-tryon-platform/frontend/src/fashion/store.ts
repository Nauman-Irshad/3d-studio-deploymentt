import { create } from "zustand";
import { useGLTF } from "@react-three/drei";
import { DEFAULT_LANDING_MODEL_PATH } from "../data/landingProducts";
import { absoluteModelUrl } from "../lib/absoluteModelUrl";
import { format3dStudioProductName } from "../utils/productDisplayNames";
import type { GarmentStyle, SleeveStyle } from "./types";

const CART_STORAGE_KEY = "smartfitao_cart_v1";

export type CartFitSnapshot = {
  shirt: string;
  pantWaist: number;
  chestIn: number;
  waistIn: number;
  fitPreference: string;
};

export type CartLine = {
  lineId: string;
  productId: string;
  label: string;
  price: string;
  publicPath: string;
  fitSnapshot: CartFitSnapshot | null;
  wizardPayload?: unknown | null;
  addedAt: string;
};

function loadCartLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const j = JSON.parse(raw) as unknown;
    if (!Array.isArray(j)) return [];
    return j.filter(
      (row): row is CartLine =>
        row &&
        typeof row === "object" &&
        typeof (row as CartLine).lineId === "string" &&
        typeof (row as CartLine).productId === "string" &&
        typeof (row as CartLine).label === "string",
    );
  } catch {
    return [];
  }
}

function persistCart(lines: CartLine[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    window.dispatchEvent(new CustomEvent("smartfitao-cart-updated"));
  } catch {
    /* ignore quota */
  }
}

function newLineId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export type CustomizerState = {
  garmentStyle: GarmentStyle;
  sleeveStyle: SleeveStyle;
  activeModelPath: string;
  /** EXR path for main canvas Environment */
  activeBackgroundPath: string;
  fabricObjectUrl: string | null;
  fabricFile: File | null;
  /** Main canvas uses fabric only when `activeModelPath` matches this (set on upload). */
  fabricTargetModelPath: string | null;
  /** Shown in canvas header — change default in store if needed */
  userDisplayName: string;
  cartLines: CartLine[];
  /** Controlled from header + product “Buy now” so the drawer can open app-wide */
  shoppingCartOpen: boolean;
  setGarmentStyle: (g: GarmentStyle) => void;
  setSleeveStyle: (s: SleeveStyle) => void;
  setActiveModelPath: (path: string) => void;
  setActiveBackgroundPath: (path: string) => void;
  setFabric: (file: File | null) => void;
  addToCart: (product: { id: string; label: string; price: string; publicPath: string }) => void;
  removeCartLine: (lineId: string) => void;
  clearCart: () => void;
  setShoppingCartOpen: (open: boolean) => void;
};

const initialGarment: GarmentStyle = "top";
const initialSleeve: SleeveStyle = "sleeved";

export const useCustomizerStore = create<CustomizerState>((set) => ({
  garmentStyle: initialGarment,
  sleeveStyle: initialSleeve,
  activeModelPath: DEFAULT_LANDING_MODEL_PATH,
  activeBackgroundPath: "",
  fabricObjectUrl: null,
  fabricFile: null,
  fabricTargetModelPath: null,
  userDisplayName: "Designer",
  cartLines: loadCartLines(),
  shoppingCartOpen: false,

  setShoppingCartOpen: (shoppingCartOpen) => set({ shoppingCartOpen }),

  addToCart: (product) =>
    set(() => {
      const line: CartLine = {
        lineId: newLineId(),
        productId: product.id,
        label: format3dStudioProductName(product.label),
        price: product.price,
        publicPath: product.publicPath,
        fitSnapshot: null,
        wizardPayload: null,
        addedAt: new Date().toISOString(),
      };
      const cartLines = [line];
      persistCart(cartLines);
      return { cartLines, shoppingCartOpen: true };
    }),

  removeCartLine: (lineId) =>
    set((s) => {
      const cartLines = s.cartLines.filter((l) => l.lineId !== lineId);
      persistCart(cartLines);
      return { cartLines };
    }),

  clearCart: () => {
    persistCart([]);
    set({ cartLines: [] });
  },

  setGarmentStyle: (garmentStyle) =>
    set((s) => ({
      garmentStyle,
      activeModelPath: resolveGarmentModelPath(garmentStyle, s.sleeveStyle),
    })),

  setSleeveStyle: (sleeveStyle) =>
    set((s) => ({
      sleeveStyle,
      activeModelPath: resolveGarmentModelPath(s.garmentStyle, sleeveStyle),
    })),

  setActiveModelPath: (activeModelPath) => {
    try {
      useGLTF.preload(absoluteModelUrl(activeModelPath));
    } catch {
      /* ignore */
    }
    set({ activeModelPath, fabricObjectUrl: null, fabricTargetModelPath: null });
  },

  setActiveBackgroundPath: (activeBackgroundPath) => set({ activeBackgroundPath }),

  setFabric: (file) =>
    set((state) => {
      if (state.fabricObjectUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(state.fabricObjectUrl);
      }
      if (!file) {
        return {
          fabricFile: null,
          fabricObjectUrl: null,
          fabricTargetModelPath: null,
        };
      }
      return {
        fabricFile: file,
        fabricObjectUrl: URL.createObjectURL(file),
        fabricTargetModelPath: state.activeModelPath,
      };
    }),
}));

export function reloadCartFromStorage(): CartLine[] {
  const cartLines = loadCartLines();
  useCustomizerStore.setState({ cartLines });
  return cartLines;
}
