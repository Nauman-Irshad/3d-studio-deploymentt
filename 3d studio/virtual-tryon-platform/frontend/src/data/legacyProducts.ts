import {
  LANDING_STUDIO_PRODUCTS,
  landingModelPublicPath,
} from "../data/landingProducts";
import { encodePublicPath, publicUrl } from "../lib/publicUrl";

/** Original studio sample outfits under `public/models/productN/`. */
export const LEGACY_STUDIO_PRODUCTS = [
  {
    id: "legacy-p1",
    label: "Classic Kurta",
    fileLabel: "sample1.gltf",
    publicPath: "/models/product1/sample1.gltf",
    price: "Rs 8,990",
  },
  {
    id: "legacy-p2",
    label: "Shalwar Kameez · Ivory",
    fileLabel: "sample1.gltf",
    publicPath: "/models/product2/sample1.gltf",
    price: "Rs 11,500",
  },
  {
    id: "legacy-p3",
    label: "Embroidered Festive Suit",
    fileLabel: "sample5.gltf",
    publicPath: "/models/product3/sample5.gltf",
    price: "Rs 18,900",
  },
  {
    id: "legacy-p4",
    label: "Lawn Pret · J. Studio",
    fileLabel: "sample8.gltf",
    publicPath: "/models/product4/sample8.gltf",
    price: "Rs 9,450",
  },
  {
    id: "legacy-p5",
    label: "Formal Waistcoat Set",
    fileLabel: "sample4.gltf",
    publicPath: "/models/product5/sample4.gltf",
    price: "Rs 14,200",
  },
] as const;

export function legacyModelPublicPath(publicPath: string): string {
  return publicUrl(encodePublicPath(publicPath));
}

export const DEFAULT_LEGACY_MODEL_PATH = legacyModelPublicPath(
  LEGACY_STUDIO_PRODUCTS[0].publicPath,
);
