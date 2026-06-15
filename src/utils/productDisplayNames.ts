import { resolveJBrandProductName } from "../data/jBrandCatalog";

/** Men's 2D kurta filename → J. product title. */
export function formatMenKurtaProductName(filename: string): string {
  return resolveJBrandProductName({ filename, channel: "men" });
}

/** Ladies catalog filename → J. product title. */
export function formatLadiesCatalogProductName(_categoryLabel: string, filename: string): string {
  return resolveJBrandProductName({
    filename,
    channel: "ladies",
    categoryLabel: _categoryLabel,
  });
}

export function formatCustomUploadName(channel: "men" | "ladies", rawName: string): string {
  const cleaned = rawName.replace(/\.[^.]+$/, "").trim();
  const kind = channel === "ladies" ? "Custom Kurti" : "Custom Kurta";
  return resolveJBrandProductName({
    filename: rawName,
    channel: channel === "ladies" ? "ladies" : "men",
    fallbackLabel: cleaned ? `${kind} · ${cleaned}` : kind,
  });
}

/** 3D studio / cart label — ensure J. prefix on known product names. */
export function format3dStudioProductName(label: string): string {
  return resolveJBrandProductName({ filename: "", channel: "3d", fallbackLabel: label });
}
