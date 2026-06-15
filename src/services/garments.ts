import { filterMenGarmentNames } from "../constants/catalogFilters";
import { formatMenKurtaProductName } from "../utils/productDisplayNames";

type GarmentManifest = { names: string[] };



export type GarmentGallery = "men" | "ladies";



const embedBase = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");



export const KURTA_PROMPT =
  "Pakistani full length shalwar kameez, complete kurta dress, traditional festive outfit, full dress";



export function kurtaTryOnDescription(): string {

  return KURTA_PROMPT;

}



function galleryProdFolder(gallery: GarmentGallery): string {

  return gallery === "ladies" ? "ladies-garments" : "garments";

}



export function garmentListUrl(gallery: GarmentGallery = "men"): string {

  if (import.meta.env.PROD) {

    return `${embedBase}${galleryProdFolder(gallery)}/manifest.json`;

  }

  return gallery === "ladies" ? "/__media/ladies-garment/list" : "/__media/garment/list";

}



export function garmentImageUrl(name: string, gallery: GarmentGallery = "men"): string {

  if (import.meta.env.PROD) {

    return `${embedBase}${galleryProdFolder(gallery)}/${encodeURIComponent(name)}`;

  }

  const base = gallery === "ladies" ? "/__media/ladies-garment" : "/__media/garment";

  return `${base}?name=${encodeURIComponent(name)}`;

}

export function displayGarmentName(name: string): string {
  return formatMenKurtaProductName(name);
}



export async function fetchGarmentList(gallery: GarmentGallery = "men"): Promise<GarmentManifest> {

  const res = await fetch(garmentListUrl(gallery));

  if (!res.ok) throw new Error("Could not load outfit gallery.");

  const data = (await res.json()) as GarmentManifest | { names: string[] };

  return { names: filterMenGarmentNames(data.names ?? []) };

}

