import {
  formatCustomUploadName,
  formatLadiesCatalogProductName,
  formatMenKurtaProductName,
} from "../utils/productDisplayNames";
import { catalogImageUrl, catalogItemKey, type LadiesCatalog, type LadiesCatalogSelection } from "../services/ladiesCatalog";
import { garmentImageUrl, type GarmentGallery } from "../services/garments";
import type { CartProductInput } from "./shoppingCart";

const LADIES_PRICES: Record<string, string> = {
  kids: "Rs 2,490",
  "texture try on": "Rs 3,790",
  "user image ladies": "Rs 4,290",
};

const MEN_PRICE = "Rs 3,290";
const CUSTOM_UPLOAD_PRICE = "Rs 3,590";

function ladiesPrice(categoryId: string): string {
  return LADIES_PRICES[categoryId.toLowerCase()] ?? "Rs 3,990";
}

export function menGarmentCartProduct(name: string, gallery: GarmentGallery): CartProductInput {
  const imageUrl = garmentImageUrl(name, gallery);
  return {
    id: `2d-men-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
    label: formatMenKurtaProductName(name),
    price: MEN_PRICE,
    publicPath: imageUrl,
    imageUrl,
  };
}

export function ladiesCatalogCartProduct(
  selection: LadiesCatalogSelection,
  catalog: LadiesCatalog,
): CartProductInput {
  const cat = catalog.categories.find((c) => c.id === selection.categoryId);
  const folderLabel = cat?.label ?? selection.categoryId;
  const imageUrl = catalogImageUrl(selection.categoryId, selection.name);
  const baked = cat?.displayNames?.[selection.name];
  return {
    id: `2d-ladies-${catalogItemKey(selection.categoryId, selection.name).replace(/[^a-z0-9]+/gi, "-")}`,
    label: baked ?? formatLadiesCatalogProductName(folderLabel, selection.name),
    price: ladiesPrice(selection.categoryId),
    publicPath: imageUrl,
    imageUrl,
  };
}

export function customGarmentCartProduct(
  label: string,
  previewUrl: string,
  channel: "men" | "ladies",
): CartProductInput {
  return {
    id: `2d-${channel}-custom-${Date.now()}`,
    label: formatCustomUploadName(channel, label || "Custom upload"),
    price: CUSTOM_UPLOAD_PRICE,
    publicPath: previewUrl,
    imageUrl: previewUrl,
  };
}

export function cartProductFromTryOnSelection(input: {
  customGarment: { name: string; previewUrl: string } | null;
  catalogSelection: LadiesCatalogSelection | null;
  ladiesCatalog: LadiesCatalog;
  garmentName: string | null;
  garmentGallery: GarmentGallery;
  channel: "men" | "ladies";
}): CartProductInput | null {
  if (input.customGarment) {
    return customGarmentCartProduct(
      input.customGarment.name,
      input.customGarment.previewUrl,
      input.channel,
    );
  }
  if (input.catalogSelection) {
    return ladiesCatalogCartProduct(input.catalogSelection, input.ladiesCatalog);
  }
  if (input.garmentName) {
    return menGarmentCartProduct(input.garmentName, input.garmentGallery);
  }
  return null;
}
