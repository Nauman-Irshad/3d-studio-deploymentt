/**
 * Landing GLBs + legacy studio sample GLTFs in “Available products”.
 */
import {
  LANDING_STUDIO_PRODUCTS,
  landingModelPublicPath,
} from "../data/landingProducts";
import {
  LEGACY_STUDIO_PRODUCTS,
  legacyModelPublicPath,
} from "../data/legacyProducts";
import { encodePublicPath, publicUrl } from "../lib/publicUrl";
import manifest from "./localModels.manifest.json";

export type LocalModelEntry = {
  id: string;
  label: string;
  fileLabel: string;
  publicPath: string;
  price: string;
};

type ManifestProduct = {
  id: string;
  label: string;
  fileLabel: string;
  publicPath: string;
  price?: string;
};

export function buildLandingEntries(): LocalModelEntry[] {
  return LANDING_STUDIO_PRODUCTS.map((p) => ({
    id: p.id,
    label: p.label,
    fileLabel: p.fileLabel,
    publicPath: landingModelPublicPath(p.relativePath),
    price: p.price,
  }));
}

export function buildLegacyEntries(): LocalModelEntry[] {
  return LEGACY_STUDIO_PRODUCTS.map((p) => ({
    id: p.id,
    label: p.label,
    fileLabel: p.fileLabel,
    publicPath: legacyModelPublicPath(p.publicPath),
    price: p.price,
  }));
}

function buildCatalog(): LocalModelEntry[] {
  const landing = buildLandingEntries();
  const legacy = buildLegacyEntries();

  const knownPaths = new Set([
    ...LANDING_STUDIO_PRODUCTS.map((p) => `/${p.relativePath.replace(/^\/+/, "")}`),
    ...LEGACY_STUDIO_PRODUCTS.map((p) => p.publicPath),
  ]);

  const manifestProducts: ManifestProduct[] =
    (manifest as { products?: ManifestProduct[] }).products ?? [];

  const extras = manifestProducts
    .filter((p) => !knownPaths.has(p.publicPath))
    .map((p) => ({
      id: p.id,
      label: p.label,
      fileLabel: p.fileLabel,
      publicPath: publicUrl(encodePublicPath(p.publicPath)),
      price: p.price && p.price.length > 0 ? p.price : "—",
    }));

  return [...landing, ...legacy, ...extras];
}

export const LANDING_MODELS = buildLandingEntries();
export const LEGACY_MODELS = buildLegacyEntries();
export const LOCAL_MODELS: LocalModelEntry[] = buildCatalog();

export const ALL_LOCAL_MODEL_PATHS = LOCAL_MODELS.map((m) => m.publicPath);
