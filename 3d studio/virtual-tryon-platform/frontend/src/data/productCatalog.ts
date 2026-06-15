import {
  LANDING_STUDIO_PRODUCTS,
  landingModelPublicPath,
} from "./landingProducts";
import {
  LEGACY_STUDIO_PRODUCTS,
  legacyModelPublicPath,
} from "./legacyProducts";

/** 3D garments served from `public/landing page product/` and `public/models/`. */
export type ProductEntry = {
  id: string;
  label: string;
  gltfPath: string;
};

export const LOCAL_3D_PRODUCTS: ProductEntry[] = [
  ...LANDING_STUDIO_PRODUCTS.map((p) => ({
    id: p.id,
    label: p.label,
    gltfPath: landingModelPublicPath(p.relativePath),
  })),
  ...LEGACY_STUDIO_PRODUCTS.map((p) => ({
    id: p.id,
    label: p.label,
    gltfPath: legacyModelPublicPath(p.publicPath),
  })),
];
