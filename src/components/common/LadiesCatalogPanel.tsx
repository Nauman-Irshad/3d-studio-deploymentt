import { useMemo } from "react";
import {
  catalogImageUrl,
  catalogItemKey,
  displayCatalogItemName,
  type LadiesCatalog,
  type LadiesCatalogSelection,
} from "../../services/ladiesCatalog";
import {
  ladiesCatalogNames,
  limitSidebarProducts,
  SIDEBAR_PRODUCTS_PER_CATEGORY,
  sidebarProductCount,
} from "../../constants/catalogDisplay";
import { ladiesCatalogCartProduct } from "../../store/cartProducts";
import { ProductCartActions } from "./ProductCartActions";
import { useShoppingCart } from "../../store/ShoppingCartContext";

export const LADIES_FILTER_ALL = "all";

type Props = {
  catalog: LadiesCatalog;
  activeCategoryId: string | null;
  selection: LadiesCatalogSelection | null;
  brokenKeys: Set<string>;
  onCategoryChange: (categoryId: string) => void;
  onSelect: (item: LadiesCatalogSelection) => void;
  onImageError: (item: LadiesCatalogSelection) => void;
};

export function LadiesCatalogPanel({
  catalog,
  activeCategoryId,
  selection,
  brokenKeys,
  onCategoryChange,
  onSelect,
  onImageError,
}: Props) {
  const { addToCart, buyNow } = useShoppingCart();
  const filterId = activeCategoryId ?? LADIES_FILTER_ALL;

  const visibleItems = useMemo(() => {
    if (filterId === LADIES_FILTER_ALL) {
      return catalog.categories
        .flatMap((cat) =>
          ladiesCatalogNames(cat.names).map((name) => ({
            categoryId: cat.id,
            name,
            folderLabel: cat.label,
          })),
        )
        .slice(0, SIDEBAR_PRODUCTS_PER_CATEGORY);
    }
    const cat = catalog.categories.find((c) => c.id === filterId);
    if (!cat) return [];
    return limitSidebarProducts(ladiesCatalogNames(cat.names)).map((name) => ({
      categoryId: cat.id,
      name,
      folderLabel: cat.label,
    }));
  }, [catalog.categories, filterId]);

  const activeCategoryLabel =
    filterId === LADIES_FILTER_ALL
      ? "All collections"
      : catalog.categories.find((c) => c.id === filterId)?.label ?? "Spotlight";

  return (
    <aside id="tryon-spotlight-sidebar" className="product-rail-fixed ladies-product-sidebar" aria-label="Ladies outfit collections">
      <div className="product-sidebar-head">
        <h2>Spotlight</h2>
        <span>{visibleItems.length} items</span>
      </div>

      <p className="product-spotlight-active-label">{activeCategoryLabel}</p>

      <div className="product-rail-filters product-spotlight-tabs" role="tablist" aria-label="Spotlight collections">
        <button
          type="button"
          role="tab"
          aria-selected={filterId === LADIES_FILTER_ALL}
          className={`product-spotlight-btn${filterId === LADIES_FILTER_ALL ? " active" : ""}`}
          onClick={() => onCategoryChange(LADIES_FILTER_ALL)}
        >
          All
          <span>
            {Math.min(
              catalog.categories.reduce((n, c) => n + ladiesCatalogNames(c.names).length, 0),
              SIDEBAR_PRODUCTS_PER_CATEGORY,
            )}
          </span>
        </button>
        {catalog.categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filterId === cat.id}
            className={`product-spotlight-btn${filterId === cat.id ? " active" : ""}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
            <span>{sidebarProductCount(ladiesCatalogNames(cat.names).length)}</span>
          </button>
        ))}
      </div>

      <div className="product-sidebar-grid product-rail-grid product-rail-grid--spotlight">
        {visibleItems.map((item) => {
          const key = catalogItemKey(item.categoryId, item.name);
          const isSelected =
            selection?.categoryId === item.categoryId && selection?.name === item.name;
          const broken = brokenKeys.has(key);
          const product = ladiesCatalogCartProduct(
            { categoryId: item.categoryId, name: item.name },
            catalog,
          );
          const cat = catalog.categories.find((c) => c.id === item.categoryId);
          const displayName = displayCatalogItemName(
            item.name,
            cat?.label ?? item.categoryId,
            cat?.displayNames,
          );

          return (
            <div
              key={key}
              className={`product-sidebar-card-wrap product-sidebar-card-wrap--shop${isSelected ? " selected" : ""}${broken ? " broken" : ""}`}
            >
              <button
                type="button"
                className="product-sidebar-thumb"
                onClick={() => onSelect({ categoryId: item.categoryId, name: item.name })}
                title={`${item.folderLabel} · ${displayName}`}
              >
                {broken ? (
                  <span className="product-sidebar-broken">!</span>
                ) : (
                  <img
                    src={catalogImageUrl(item.categoryId, item.name)}
                    alt={displayName}
                    loading="lazy"
                    onError={() => onImageError({ categoryId: item.categoryId, name: item.name })}
                  />
                )}
                {filterId === LADIES_FILTER_ALL ? (
                  <span className="product-rail-folder-tag">{item.folderLabel}</span>
                ) : null}
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
