import { garmentImageUrl, displayGarmentName } from "../../services/garments";
import type { GarmentGallery } from "../../services/garments";
import {
  catalogImageUrl,
  catalogItemKey,
  displayCatalogItemName,
  type LadiesCatalog,
  type LadiesCatalogSelection,
} from "../../services/ladiesCatalog";
import { ladiesCatalogCartProduct, menGarmentCartProduct } from "../../store/cartProducts";
import { ProductCartActions } from "./ProductCartActions";
import { useShoppingCart } from "../../store/ShoppingCartContext";

export type PipelineStripItem =
  | { kind: "ladies"; categoryId: string; name: string }
  | { kind: "men"; name: string };

type Props = {
  items: PipelineStripItem[];
  label?: string;
  gallery: GarmentGallery;
  catalog: LadiesCatalog | null;
  catalogSelection: LadiesCatalogSelection | null;
  garmentName: string | null;
  customGarment: boolean;
  brokenMen: Set<string>;
  brokenCatalog: Set<string>;
  onSelectLadies: (item: LadiesCatalogSelection) => void;
  onSelectMen: (name: string) => void;
  onMenImageError: (name: string) => void;
  onCatalogImageError: (item: LadiesCatalogSelection) => void;
  /** Cart buttons only on sidebar — not on try-on garment column. */
  showCartActions?: boolean;
};

function itemKey(item: PipelineStripItem): string {
  return item.kind === "ladies" ? catalogItemKey(item.categoryId, item.name) : item.name;
}

function isSelected(
  item: PipelineStripItem,
  catalogSelection: LadiesCatalogSelection | null,
  garmentName: string | null,
  customGarment: boolean,
): boolean {
  if (customGarment) return false;
  if (item.kind === "ladies" && catalogSelection) {
    return catalogSelection.categoryId === item.categoryId && catalogSelection.name === item.name;
  }
  if (item.kind === "men") return garmentName === item.name;
  return false;
}

export function PipelineProductStrip({
  items,
  label = "Quick picks",
  gallery,
  catalog,
  catalogSelection,
  garmentName,
  customGarment,
  brokenMen,
  brokenCatalog,
  onSelectLadies,
  onSelectMen,
  onMenImageError,
  onCatalogImageError,
  showCartActions = false,
  maxItems = 4,
  gridCols = 2,
  variant = "default",
}: Props & { maxItems?: number; gridCols?: number; variant?: "default" | "studio" }) {
  const { addToCart, buyNow } = useShoppingCart();
  const visible = items.slice(0, maxItems);
  if (visible.length < 1) return null;

  const gridClass =
    variant === "studio"
      ? `pipeline-product-strip-grid studio-grid cols-${gridCols}`
      : "pipeline-product-strip-grid";

  return (
    <div className="pipeline-product-strip" aria-label={label || "Examples"}>
      {label ? <p className="pipeline-product-strip-label">{label}</p> : null}
      <div className={gridClass}>
        {visible.map((item) => {
          const key = itemKey(item);
          const selected = isSelected(item, catalogSelection, garmentName, customGarment);
          const broken =
            item.kind === "ladies"
              ? brokenCatalog.has(key)
              : brokenMen.has(item.name);
          const product =
            item.kind === "ladies" && catalog
              ? ladiesCatalogCartProduct({ categoryId: item.categoryId, name: item.name }, catalog)
              : menGarmentCartProduct(item.kind === "men" ? item.name : "", gallery);

          const select = () =>
            item.kind === "ladies"
              ? onSelectLadies({ categoryId: item.categoryId, name: item.name })
              : onSelectMen(item.name);

          const title =
            item.kind === "ladies"
              ? displayCatalogItemName(
                  item.name,
                  catalog?.categories.find((c) => c.id === item.categoryId)?.label ?? item.categoryId,
                  catalog?.categories.find((c) => c.id === item.categoryId)?.displayNames,
                )
              : displayGarmentName(item.name);

          return (
            <div
              key={key}
              className={`pipeline-product-strip-wrap${selected ? " selected" : ""}${broken ? " broken" : ""}${showCartActions ? "" : " pipeline-product-strip-wrap--tryon"}`}
            >
              <button
                type="button"
                className="pipeline-product-strip-card"
                onClick={select}
                title={title}
              >
                {broken ? (
                  <span className="pipeline-product-strip-broken">!</span>
                ) : (
                  <img
                    src={
                      item.kind === "ladies"
                        ? catalogImageUrl(item.categoryId, item.name)
                        : garmentImageUrl(item.name, gallery)
                    }
                    alt={title}
                    loading="lazy"
                    onError={() =>
                      item.kind === "ladies"
                        ? onCatalogImageError({ categoryId: item.categoryId, name: item.name })
                        : onMenImageError(item.name)
                    }
                  />
                )}
              </button>
              <p className="pipeline-product-strip-name">{title}</p>
              {showCartActions ? (
                <ProductCartActions
                  layout="inline"
                  onAddToCart={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  onBuyNow={(e) => {
                    e.stopPropagation();
                    buyNow(product);
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
