/** Shared J. Ladies display names — used at build (manifest) and kept in sync with src/data/jBrandCatalog.ts */
const J_LADIES_BRAND = "J. Ladies";

const J_SKU_PRODUCT_NAMES = {
  "jss-25-573": "ORANGE DOBBY EMBROIDERED KURTA",
  "jss-26-601": "WHITE LAWN EMBROIDERED KURTA",
  "jss-26-606": "BLUE DOBBY EMBROIDERED KURTA",
  "jss-26-623": "BEIGE LAWN KURTI",
  "jss-26-631": "MULTICOLOR LAWN EMBROIDERED KURTA",
  "jss-26-651": "BLUE LAWN PRINTED KURTA",
  "jss-26-708": "PINK LAWN PRINTED KURTA",
  "jst-26-2330": "MULTICOLOR LAWN PRINTED UNSTITCHED 2PC",
  "jls-26-587": "OFF WHITE LAWN KURTI",
  "jls-26-636": "GREEN LAWN EMBROIDERED KURTI",
  "jds-26-1228": "DIGITAL PRINTED LAWN KURTI",
  "jps-26-3996": "MUSTARD MAPLE SILK EMBROIDERED CO-ORD SET",
  "25-3276": "LAWN EMBROIDERED KURTI",
};

const J_LADIES_FILENAME_NAMES = {
  "25-3276_3_374c3635-24f4-468a-80cc-1516d859b6a4.jpg": "LAWN EMBROIDERED KURTI",
  "25-3276_1_4bdcc77c-55b5-40c3-a073-2e973001e96e.jpg": "LAWN EMBROIDERED KURTI",
  "25-331_3_1c07df45-a6e0-4f8a-8c9b-9d33024bd67f.jpg": "LAWN PRINTED KURTI",
  "26-623s_3.jpg": "BEIGE LAWN KURTI",
  "26-624s_1.jpg": "BEIGE LAWN KURTI",
  "26-624s_5.jpg": "BEIGE LAWN KURTI",
  "26-631_5.jpg": "MULTICOLOR LAWN EMBROIDERED KURTA",
  "26-651_3_-Copy.jpg": "BLUE LAWN PRINTED KURTA",
  "26-651_1.jpg": "BLUE LAWN PRINTED KURTA",
  "26-708s_2.jpg": "PINK LAWN PRINTED KURTA",
  "26-708s_1.jpg": "PINK LAWN PRINTED KURTA",
  "jds-26-1228_3_e9b08bb9-cfda-4734-911c-14a3b21b5559.jpg": "DIGITAL PRINTED LAWN KURTI",
  "jds-26-1228_1_eefef8e1-8f7e-4239-ac99-aed3b9f88974.jpg": "DIGITAL PRINTED LAWN KURTI",
  "jls-26-587_5_43b96afe-fe28-4b0e-86de-2327d289cf65.jpg": "OFF WHITE LAWN KURTI",
  "jls-26-636_5_dfdee04e-d17b-4231-b418-7decbf6ff776.jpg": "GREEN LAWN EMBROIDERED KURTI",
  "jps-26-3996_7_bb5eb7e7-99a8-4a3b-bdda-975e4f303b09.jpg": "MUSTARD MAPLE SILK EMBROIDERED CO-ORD SET",
  "jss-26-606_5_c3545494-f819-480e-b395-a8866b7e27b0.jpg": "BLUE DOBBY EMBROIDERED KURTA",
  "jss-25-573_1_f7ac9d4b-9d08-47c2-a06a-650d6bb6c3a5.jpg": "ORANGE DOBBY EMBROIDERED KURTA",
  "jss-26-601_1_432eb06b-5bb7-40c4-b8ab-4e26171d1bf9.jpg": "WHITE LAWN EMBROIDERED KURTA",
  "jss-26-601_4_3d09dbe5-0f4c-4e87-b7ec-7714edd3f383.jpg": "WHITE LAWN EMBROIDERED KURTA",
  "jss-26-606_6_6294a2ac-edf5-44da-93ba-c8f1c696b08d.jpg": "BLUE DOBBY EMBROIDERED KURTA",
  "jst-26-2330_1__1_5c25f626-941b-4c6d-9796-4dc860e7b892.jpg": "MULTICOLOR LAWN PRINTED UNSTITCHED 2PC",
  "jst-26-2330_3__1_0a88a62d-985f-40e3-8c9a-8587a0f720fb.jpg": "MULTICOLOR LAWN PRINTED UNSTITCHED 2PC",
  "3PCS1.jpg": "LAWN EMBROIDERED STITCHED 3PC",
  essentials: "ESSENTIALS LAWN KURTI",
  "essentials.jpg": "ESSENTIALS LAWN KURTI",
  luxe: "LUXE LAWN KURTI",
  "luxe.jpg": "LUXE LAWN KURTI",
  "LUXE_4fa7f609-135b-417e-bafd-c876166e67fe.jpg": "LUXE LAWN KURTI",
  signature: "SIGNATURE LAWN KURTI",
  "SIGNATURE_2c0b3824-c8ac-4540-a28f-98065ceb93d0.jpg": "SIGNATURE LAWN KURTI",
  coord: "LAWN CO-ORD SET",
  "coord_d63990e7-bfba-41d5-aee4-fbc48961cca9.jpg": "LAWN CO-ORD SET",
  "ChatGPT Image Jun 6, 2026, 11_18_38 PM.png": "DESIGNER LAWN KURTI",
  "ChatGPT Image Jun 6, 2026, 11_20_09 PM.png": "DESIGNER LAWN KURTI",
  "Screenshot 2026-06-06 225818.png": "DESIGNER LAWN KURTI",
  "Screenshot 2026-06-06 230440.png": "DESIGNER LAWN KURTI",
  "images (1).jpg": "PRINTED LAWN KURTI",
  "images (2).jpg": "PRINTED LAWN KURTI",
};

function withJLadiesBrandPrefix(title) {
  const t = String(title || "").trim();
  if (!t) return `${J_LADIES_BRAND} Kurti`;
  if (t.startsWith(`${J_LADIES_BRAND} `) || t.startsWith("J. Ladies ")) return t;
  return `${J_LADIES_BRAND} · ${t}`;
}

function extractJSkuKey(filename) {
  const base = filename.replace(/\.[^.]+$/, "").toLowerCase();
  const series = base.match(/\b(jss|jst|jls|jds|jps|jgst)[-_]?(\d{2})[-_]?(\d{2,4})/i);
  if (series) return `${series[1]}-${series[2]}-${series[3]}`.replace(/s(?=-|$)/, "");
  const compact = base.match(/(\d{2})[-_]?(\d{3,4})s?/);
  if (compact) return `jss-${compact[1]}-${compact[2].replace(/s$/, "")}`;
  const named = base.match(/^(essentials|luxe|signature|coord|3pcs)/i);
  if (named) return named[1].toLowerCase();
  return null;
}

export function resolveLadiesDisplayName(filename, categoryLabel = "") {
  const fileKey = filename.replace(/\.[^.]+$/, "");
  const lowerFile = filename.toLowerCase();

  const byFile =
    J_LADIES_FILENAME_NAMES[filename] ??
    J_LADIES_FILENAME_NAMES[fileKey] ??
    J_LADIES_FILENAME_NAMES[lowerFile.replace(/\.[^.]+$/, "")];
  if (byFile) return withJLadiesBrandPrefix(byFile);

  const sku = extractJSkuKey(filename);
  if (sku && J_SKU_PRODUCT_NAMES[sku]) return withJLadiesBrandPrefix(J_SKU_PRODUCT_NAMES[sku]);

  return withJLadiesBrandPrefix(categoryLabel ? `${categoryLabel} Kurti` : "Lawn Kurti");
}
