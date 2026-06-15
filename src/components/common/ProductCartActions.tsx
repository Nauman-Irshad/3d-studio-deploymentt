import type { MouseEvent } from "react";
import { SlideBuyButton } from "../ui/FancyButtons";

type Props = {
  onAddToCart: (e: MouseEvent) => void;
  onBuyNow: (e: MouseEvent) => void;
  layout?: "stack" | "inline";
};

export function ProductCartActions({ onAddToCart, onBuyNow, layout = "stack" }: Props) {
  return (
    <div
      className={`product-cart-actions${layout === "inline" ? " product-cart-actions--inline" : ""}`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <button type="button" className="product-cart-btn product-cart-btn--add" onClick={onAddToCart}>
        Add to cart
      </button>
      <SlideBuyButton compact className="product-cart-buy-fancy" onClick={onBuyNow}>
        Buy now
      </SlideBuyButton>
    </div>
  );
}
