import { encodePublicPath, publicUrl } from "../lib/publicUrl";

export type LandingStudioProduct = {
  id: string;
  label: string;
  fileLabel: string;
  /** Path under Vite `public/` (unencoded). */
  relativePath: string;
  price: string;
  category: "Kurta Shalwar" | "Shalwar Kameez";
};

const ROOT = "landing page product";

/** Six landing-page GLBs — same catalog as the 3D marketplace landing. */
export const LANDING_STUDIO_PRODUCTS: LandingStudioProduct[] = [
  {
    id: "lp-kurta-black",
    label: "Embroidered Kurta Shalwar · Black",
    fileLabel: "black kurta .glb",
    relativePath: `${ROOT}/kurta/black kurta .glb`,
    price: "Rs 3,590",
    category: "Kurta Shalwar",
  },
  {
    id: "lp-kurta-brown",
    label: "Classic Kurta Shalwar · Brown",
    fileLabel: "brown kurta.glb",
    relativePath: `${ROOT}/kurta/brown kurta.glb`,
    price: "Rs 3,790",
    category: "Kurta Shalwar",
  },
  {
    id: "lp-kurta-sky",
    label: "Premium Kurta Shalwar · Sky Blue",
    fileLabel: "sky blue kurta.glb",
    relativePath: `${ROOT}/kurta/sky blue kurta.glb`,
    price: "Rs 3,990",
    category: "Kurta Shalwar",
  },
  {
    id: "lp-shalwar-black",
    label: "Embroidered Shalwar Kameez · Black",
    fileLabel: "black shalwar kameez.glb",
    relativePath: `${ROOT}/shalwar kameez/black shalwar kameez.glb`,
    price: "Rs 4,590",
    category: "Shalwar Kameez",
  },
  {
    id: "lp-shalwar-brown",
    label: "Classic Shalwar Kameez · Brown",
    fileLabel: "brown 1.glb",
    relativePath: `${ROOT}/shalwar kameez/brown 1.glb`,
    price: "Rs 4,290",
    category: "Shalwar Kameez",
  },
  {
    id: "lp-shalwar-white",
    label: "Premium Shalwar Kameez · White",
    fileLabel: "white shalwar kameez.glb",
    relativePath: `${ROOT}/shalwar kameez/white shalwar kameez.glb`,
    price: "Rs 4,490",
    category: "Shalwar Kameez",
  },
];

export function landingModelPublicPath(relativePath: string): string {
  return publicUrl(encodePublicPath(`/${relativePath.replace(/^\/+/, "")}`));
}

export const DEFAULT_LANDING_MODEL_PATH = landingModelPublicPath(
  LANDING_STUDIO_PRODUCTS[0].relativePath,
);

export const KURTA_STUDIO_PRODUCTS = LANDING_STUDIO_PRODUCTS.filter(
  (p) => p.category === "Kurta Shalwar",
);

export const SHALWAR_STUDIO_PRODUCTS = LANDING_STUDIO_PRODUCTS.filter(
  (p) => p.category === "Shalwar Kameez",
);
