import { limitSidebarProducts } from "../../constants/catalogDisplay";
import { garmentImageUrl, displayGarmentName } from "../../services/garments";
import type { GarmentGallery } from "../../services/garments";
import { menGarmentCartProduct } from "../../store/cartProducts";
import { ProductCartActions } from "./ProductCartActions";
import { useShoppingCart } from "../../store/ShoppingCartContext";

type Props = {
  garmentList: string[];
  garmentName: string | null;
  brokenKurtas: Set<string>;
  gallery: GarmentGallery;
  onSelect: (name: string) => void;
  onImageError: (name: string) => void;
};

export function KurtaProductSidebar({
  garmentList,
  garmentName,
  brokenKurtas,
  gallery,
  onSelect,
  onImageError,
}: Props) {
  const { addToCart, buyNow } = useShoppingCart();
  const visibleGarments = limitSidebarProducts(garmentList);

  return (
    <aside id="tryon-spotlight-sidebar" className="product-rail-fixed product-sidebar" aria-label="Kurta products">
      <div className="product-sidebar-head">
        <h2>Spotlight</h2>
        <span>{visibleGarments.length} items</span>
      </div>
      <div className="product-sidebar-grid product-rail-grid product-rail-grid--spotlight">
        {visibleGarments.map((n) => {
          const product = menGarmentCartProduct(n, gallery);
          const displayName = displayGarmentName(n);
          return (
            <div
              key={n}
              className={`product-sidebar-card-wrap product-sidebar-card-wrap--shop${n === garmentName ? " selected" : ""}${brokenKurtas.has(n) ? " broken" : ""}`}
            >
              <button
                type="button"
                className="product-sidebar-thumb"
                onClick={() => onSelect(n)}
                title={displayName}
              >
                {brokenKurtas.has(n) ? (
                  <span className="product-sidebar-broken">!</span>
                ) : (
                  <img
                    src={garmentImageUrl(n, gallery)}
                    alt={displayName}
                    loading="lazy"
                    onError={() => onImageError(n)}
                  />
                )}
              </button>
              <p className="product-sidebar-name">{displayName}</p>
              <p className="product-sidebar-price">{product.price}</p>
              <ProductCartActions
                onAddToCart={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                onBuyNow={(e) => {
                  e.stopPropagation();
                  buyNow(product);
                }}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
}
