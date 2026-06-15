import { isExcludedLadiesCategory } from "../constants/catalogFilters";
import { formatLadiesCatalogProductName } from "../utils/productDisplayNames";
import bakedLadiesManifest from "../../public/ladies-catalog/manifest.json";

export type LadiesCategory = {
  id: string;
  label: string;
  names: string[];
  /** Baked J. Ladies titles from manifest (production). */
  displayNames?: Record<string, string>;
};

export type LadiesCatalog = {
  categories: LadiesCategory[];
};

export type LadiesCatalogSelection = {
  categoryId: string;
  name: string;
};

const embedBase = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

export function formatCategoryLabel(folderName: string): string {
  return folderName
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function catalogManifestUrl(): string {
  if (import.meta.env.PROD) {
    return `${embedBase}ladies-catalog/manifest.json`;
  }
  return "/__media/ladies-catalog/manifest";
}

export function catalogImageUrl(categoryId: string, name: string): string {
  if (import.meta.env.PROD) {
    return `${embedBase}ladies-catalog/${encodeURIComponent(categoryId)}/${encodeURIComponent(name)}`;
  }
  return `/__media/ladies-catalog/image?category=${encodeURIComponent(categoryId)}&name=${encodeURIComponent(name)}`;
}

export function catalogItemKey(categoryId: string, name: string): string {
  return `${categoryId}/${name}`;
}

function normalizeLadiesCatalog(data: LadiesCatalog): LadiesCatalog {
  const categories = (data.categories ?? [])
    .map((c) => ({
      id: c.id,
      label: c.label || formatCategoryLabel(c.id),
      names: [...(c.names ?? [])].sort(),
      displayNames: c.displayNames ?? undefined,
    }))
    .filter((c) => c.names.length > 0 && !isExcludedLadiesCategory(c.id))
    .sort((a, b) => a.label.localeCompare(b.label));
  return { categories };
}

export async function fetchLadiesCatalog(): Promise<LadiesCatalog> {
  const urls = import.meta.env.PROD
    ? [`${embedBase}ladies-catalog/manifest.json`]
    : ["/__media/ladies-catalog/manifest", "/ladies-catalog/manifest.json"];

  let lastError: Error | null = null;
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = (await res.json()) as LadiesCatalog;
      const normalized = normalizeLadiesCatalog(data);
      if (normalized.categories.length) return normalized;
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
    }
  }

  const baked = normalizeLadiesCatalog(bakedLadiesManifest as unknown as LadiesCatalog);
  if (baked.categories.length) return baked;

  throw lastError ?? new Error("Could not load ladies collection.");
}

export function displayCatalogItemName(
  name: string,
  categoryLabel = "",
  displayNames?: Record<string, string>,
): string {
  const baked = displayNames?.[name];
  if (baked) return baked;
  return formatLadiesCatalogProductName(categoryLabel, name);
}
