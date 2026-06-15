/** Men's kurta filenames hidden from 2D gallery */
export const EXCLUDED_MEN_GARMENTS = new Set(["17.png"]);

/** Ladies catalog folder ids hidden from women's 2D try-on */
export const EXCLUDED_LADIES_CATEGORIES = new Set(["kids", "kid", "children", "child"]);

export function isExcludedLadiesCategory(id: string): boolean {
  const norm = id.trim().toLowerCase().replace(/[-_]/g, " ");
  if (EXCLUDED_LADIES_CATEGORIES.has(norm)) return true;
  return norm.includes("kid");
}

export function filterMenGarmentNames(names: string[]): string[] {
  return names.filter((n) => !EXCLUDED_MEN_GARMENTS.has(n)).sort();
}
