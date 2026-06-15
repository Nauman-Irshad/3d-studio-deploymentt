/** Spotlight grid: 2 products per row. */
export const SIDEBAR_PRODUCT_GRID_COLUMNS = 2;

/** Fixed thumbnail height (px) — do not shrink when more products load. */
export const SIDEBAR_PRODUCT_THUMB_HEIGHT_PX = 150;

/** Max products in left Spotlight sidebar (men + ladies). */
export const SIDEBAR_PRODUCTS_PER_CATEGORY = 6;

/** Max outfits in Select Garment → Try-on picks strip only. */
export const GARMENT_TRYON_PICKS_MAX = 4;

/** Skip first image in each ladies category (hidden from sidebar + picks). */
export const LADIES_SKIP_FIRST_IMAGE_PER_CATEGORY = true;

export function ladiesCatalogNames(names: string[]): string[] {
  if (!LADIES_SKIP_FIRST_IMAGE_PER_CATEGORY) return names;
  return names.slice(1);
}

export function limitSidebarProducts<T>(items: T[]): T[] {
  if (SIDEBAR_PRODUCTS_PER_CATEGORY <= 0) return items;
  return items.slice(0, SIDEBAR_PRODUCTS_PER_CATEGORY);
}

export function sidebarProductCount(total: number): number {
  if (SIDEBAR_PRODUCTS_PER_CATEGORY <= 0) return total;
  return Math.min(total, SIDEBAR_PRODUCTS_PER_CATEGORY);
}
