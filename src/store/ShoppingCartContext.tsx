import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  addProductToCart,
  loadCartLines,
  removeCartLine,
  type CartLine,
  type CartProductInput,
} from "./shoppingCart";
import { TryOnCartDrawer } from "../components/common/TryOnCartDrawer";

export type CartDrawerStep = "product" | "tailors" | "checkout" | "success";

type ShoppingCartContextValue = {
  lines: CartLine[];
  cartCount: number;
  drawerOpen: boolean;
  drawerStep: CartDrawerStep;
  selectedTailorId: string | null;
  activeProduct: CartProductInput | null;
  setActiveProduct: (product: CartProductInput | null) => void;
  addToCart: (product: CartProductInput) => void;
  buyNow: (product: CartProductInput) => void;
  addActiveToCart: () => void;
  buyNowActive: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  goToTailors: () => void;
  setDrawerStep: (step: CartDrawerStep) => void;
  selectTailor: (tailorId: string) => void;
  removeLine: (lineId: string) => void;
  requestStudioAddActive: () => void;
};

const ShoppingCartContext = createContext<ShoppingCartContextValue | null>(null);

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => loadCartLines());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState<CartDrawerStep>("product");
  const [selectedTailorId, setSelectedTailorId] = useState<string | null>(null);
  const [activeProduct, setActiveProductState] = useState<CartProductInput | null>(null);

  const setActiveProduct = useCallback((product: CartProductInput | null) => {
    setActiveProductState(product);
  }, []);

  const refresh = useCallback(() => {
    setLines(loadCartLines());
  }, []);

  useEffect(() => {
    const onUpdate = () => refresh();
    window.addEventListener("smartfitao-cart-updated", onUpdate);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "smartfitao_cart_v1") refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("smartfitao-cart-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      setDrawerStep("success");
      setDrawerOpen(true);
      params.delete("checkout");
      const q = params.toString();
      const next = `${window.location.pathname}${q ? `?${q}` : ""}`;
      window.history.replaceState({}, "", next);
    }
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setDrawerStep("product");
    setSelectedTailorId(null);
  }, []);

  const addToCart = useCallback((product: CartProductInput) => {
    setLines(addProductToCart(product));
    setDrawerStep("product");
    setSelectedTailorId(null);
    setDrawerOpen(true);
  }, []);

  const goToTailors = useCallback(() => {
    setDrawerStep("tailors");
    setDrawerOpen(true);
  }, []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);

  const buyNow = useCallback((product: CartProductInput) => {
    setLines(addProductToCart(product));
    setSelectedTailorId(null);
    setDrawerStep("tailors");
    setDrawerOpen(true);
  }, []);

  const selectTailor = useCallback((tailorId: string) => {
    setSelectedTailorId(tailorId);
  }, []);

  const addActiveToCart = useCallback(() => {
    if (!activeProduct) return;
    addToCart(activeProduct);
  }, [activeProduct, addToCart]);

  const buyNowActive = useCallback(() => {
    if (!activeProduct) return;
    buyNow(activeProduct);
  }, [activeProduct, buyNow]);

  const requestStudioAddActive = useCallback(() => {
    const frame = document.querySelector<HTMLIFrameElement>(".studio-shell-frame");
    frame?.contentWindow?.postMessage({ type: "TRYKURTI_ADD_ACTIVE_TO_CART" }, "*");
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines(removeCartLine(lineId));
    setDrawerStep("product");
    setSelectedTailorId(null);
  }, []);

  const value = useMemo(
    (): ShoppingCartContextValue => ({
      lines,
      cartCount: lines.length,
      drawerOpen,
      drawerStep,
      selectedTailorId,
      activeProduct,
      setActiveProduct,
      addToCart,
      buyNow,
      addActiveToCart,
      buyNowActive,
      openDrawer,
      closeDrawer,
      goToTailors,
      setDrawerStep,
      selectTailor,
      removeLine,
      requestStudioAddActive,
    }),
    [
      lines,
      drawerOpen,
      drawerStep,
      selectedTailorId,
      activeProduct,
      setActiveProduct,
      addToCart,
      buyNow,
      addActiveToCart,
      buyNowActive,
      openDrawer,
      closeDrawer,
      goToTailors,
      selectTailor,
      removeLine,
      requestStudioAddActive,
    ],
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
      <TryOnCartDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        lines={lines}
        onRemoveLine={removeLine}
        drawerStep={drawerStep}
        selectedTailorId={selectedTailorId}
        onStepChange={setDrawerStep}
        onSelectTailor={selectTailor}
      />
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart(): ShoppingCartContextValue {
  const ctx = useContext(ShoppingCartContext);
  if (!ctx) {
    throw new Error("useShoppingCart must be used within ShoppingCartProvider");
  }
  return ctx;
}
