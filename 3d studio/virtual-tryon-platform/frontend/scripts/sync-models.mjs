/**
 * Copies `…/models` → `public/models` and `…/background_textures` → `public/background_textures`.
 * Sources live under `pifuhd-main/3d studio/` (models, background_textures, base models).
 */
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = join(__dirname, "..");
const studioRoot = join(frontendDir, "..", "..");
const fypRoot = join(studioRoot, "..", "..");
const srcRoot = join(studioRoot, "models");
const destRoot = join(frontendDir, "public", "models");

if (!existsSync(srcRoot)) {
  console.error(`sync-models: source folder not found:\n  ${srcRoot}`);
  process.exit(1);
}

cpSync(srcRoot, destRoot, { recursive: true });
console.log(`sync-models: copied\n  ${srcRoot}\n  → ${destRoot}`);

const exrName = "citrus_orchard_road_puresky_4k.exr";
const exrSrc = join(studioRoot, exrName);
const envDir = join(frontendDir, "public", "env");
const exrDest = join(envDir, exrName);
if (existsSync(exrSrc)) {
  mkdirSync(envDir, { recursive: true });
  copyFileSync(exrSrc, exrDest);
  console.log(`sync-models: copied EXR → ${exrDest}`);
} else {
  console.warn(`sync-models: optional EXR not found (viewer env may 404):\n  ${exrSrc}`);
}

const bgSrc = join(studioRoot, "background_textures");
const bgDest = join(frontendDir, "public", "background_textures");
if (existsSync(bgSrc)) {
  mkdirSync(bgDest, { recursive: true });
  cpSync(bgSrc, bgDest, { recursive: true });
  console.log(`sync-models: backgrounds\n  ${bgSrc}\n  → ${bgDest}`);
} else {
  console.warn(`sync-models: optional background_textures missing:\n  ${bgSrc}`);
}

const baseSrc = join(studioRoot, "base models");
const baseDest = join(frontendDir, "public", "base-models");
if (existsSync(baseSrc)) {
  mkdirSync(baseDest, { recursive: true });
  cpSync(baseSrc, baseDest, { recursive: true });
  console.log(`sync-models: base models\n  ${baseSrc}\n  → ${baseDest}`);
} else {
  console.warn(`sync-models: optional base models missing:\n  ${baseSrc}`);
}

/** Discover .obj / .gltf / .glb under public/base-models (recursive) and write `baseModels.manifest.json`. */
const MODEL_EXT = new Set([".obj", ".gltf", ".glb"]);
mkdirSync(baseDest, { recursive: true });

function listModelFilesRecursive(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else if (st.isFile()) {
        const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
        if (MODEL_EXT.has(ext)) out.push(p);
      }
    }
  };
  walk(dir);
  return out.sort();
}

const baseAbsFiles = listModelFilesRecursive(baseDest);

const baseManifestModels = baseAbsFiles.map((absPath) => {
  const rel = relative(baseDest, absPath).replace(/\\/g, "/");
  const filename = rel.split("/").pop();
  const stem = filename.replace(/\.[^/.]+$/, "");
  const id =
    rel
      .toLowerCase()
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "base-model";
  const spaced = stem
    .replace(/[-_]+/g, " ")
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim();
  const publicPath = `/base-models/${rel
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/")}`;
  return {
    id,
    label: spaced || stem,
    publicPath,
  };
});

const manifestPath = join(frontendDir, "src", "fashion", "baseModels.manifest.json");
writeFileSync(
  manifestPath,
  `${JSON.stringify({ models: baseManifestModels }, null, 2)}\n`,
  "utf8"
);
console.log(
  `sync-models: baseModels.manifest.json (${baseManifestModels.length} base model${baseManifestModels.length === 1 ? "" : "s"})`
);

function folderTitle(folderName) {
  const m = folderName.match(/^product(\d+)$/i);
  if (m) return `Outfit ${m[1]}`;
  return folderName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function discoverProductCatalog(modelsDir) {
  if (!existsSync(modelsDir)) return [];
  const products = [];
  const allFiles = listModelFilesRecursive(modelsDir).filter((f) => /\.(gltf|glb)$/i.test(f));
  for (const abs of allFiles.sort()) {
    const rel = relative(modelsDir, abs).replace(/\\/g, "/");
    const publicPath = `/models/${rel}`;
    const fileLabel = rel.split("/").pop() || "model.gltf";
    const folderName = rel.split("/")[0] || "model";
    const id =
      rel
        .toLowerCase()
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "product";
    products.push({
      id,
      label: folderTitle(folderName),
      fileLabel,
      publicPath,
      price: "",
    });
  }
  return products;
}

const localManifestPath = join(frontendDir, "src", "fashion", "localModels.manifest.json");

/** Landing-page GLBs → `public/landing page product/` */
const landingDest = join(frontendDir, "public", "landing page product");
const landingSources = [
  join(fypRoot, "App", "web", "landing page product"),
  join(fypRoot, "App", "landing page product"),
  join(fypRoot, "FYP_APP_DEPLOYMENT", "App", "landing page product"),
  join(
    fypRoot,
    "website +dashboard front deployed",
    "3d landing page",
    "public",
    "glb 3d cloth",
    "landing page product"
  ),
];

function copyLandingProducts(src) {
  if (!existsSync(src)) return false;
  cpSync(src, landingDest, { recursive: true });
  console.log(`sync-models: landing products\n  ${src}\n  → ${landingDest}`);
  return true;
}

for (const src of landingSources) {
  if (copyLandingProducts(src)) break;
}

function discoverLandingCatalog(landingDir) {
  if (!existsSync(landingDir)) return [];
  const products = [];
  const allFiles = listModelFilesRecursive(landingDir).filter((f) => /\.(gltf|glb)$/i.test(f));
  for (const abs of allFiles.sort()) {
    const rel = relative(landingDir, abs).replace(/\\/g, "/");
    const publicPath = `/landing page product/${rel}`;
    const fileLabel = rel.split("/").pop() || "model.glb";
    const id =
      rel
        .toLowerCase()
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "landing-product";
    products.push({
      id,
      label: fileLabel.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " "),
      fileLabel,
      publicPath,
      price: "",
    });
  }
  return products;
}

const landingProducts = discoverLandingCatalog(landingDest);
const legacyProducts = discoverProductCatalog(destRoot).map((p) => {
  const curated = {
    "/models/product1/sample1.gltf": { label: "Classic Kurta", price: "Rs 8,990" },
    "/models/product2/sample1.gltf": { label: "Shalwar Kameez · Ivory", price: "Rs 11,500" },
    "/models/product3/sample5.gltf": { label: "Embroidered Festive Suit", price: "Rs 18,900" },
    "/models/product4/sample8.gltf": { label: "Lawn Pret · J. Studio", price: "Rs 9,450" },
    "/models/product5/sample4.gltf": { label: "Formal Waistcoat Set", price: "Rs 14,200" },
  };
  const c = curated[p.publicPath];
  return c ? { ...p, label: c.label, price: c.price } : p;
});

const mergedProducts = [...landingProducts, ...legacyProducts];
if (mergedProducts.length > 0) {
  writeFileSync(
    localManifestPath,
    `${JSON.stringify({ products: mergedProducts }, null, 2)}\n`,
    "utf8"
  );
  console.log(
    `sync-models: localModels.manifest.json (${mergedProducts.length} total: ${landingProducts.length} landing + ${legacyProducts.length} legacy)`
  );
}

const brandSrc = join(fypRoot, "assets", "green kurta 3d model.glb");
const brandDest = join(frontendDir, "public", "brand-kurta-logo.glb");
if (existsSync(brandSrc)) {
  copyFileSync(brandSrc, brandDest);
  console.log(`sync-models: brand logo → ${brandDest}`);
}
