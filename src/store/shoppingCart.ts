/** Shared with 3D studio (`smartfitao_cart_v1`). */
export const CART_STORAGE_KEY = "smartfitao_cart_v1";

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

export type CartProductInput = {
  id: string;
  label: string;
  price: string;
  publicPath: string;
  imageUrl?: string;
};

export function loadCartLines(): CartLine[] {
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

export function addProductToCart(product: CartProductInput): CartLine[] {
  const line: CartLine = {
    lineId: newLineId(),
    productId: product.id,
    label: product.label,
    price: product.price,
    publicPath: product.publicPath,
    fitSnapshot: null,
    wizardPayload: null,
    addedAt: new Date().toISOString(),
  };
  const cartLines = [line];
  persistCart(cartLines);
  return cartLines;
}

export function removeCartLine(lineId: string): CartLine[] {
  const cartLines = loadCartLines().filter((l) => l.lineId !== lineId);
  persistCart(cartLines);
  return cartLines;
}

export function clearCartLines(): CartLine[] {
  persistCart([]);
  return [];
}
