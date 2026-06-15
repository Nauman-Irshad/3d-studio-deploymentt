/**
 * Syncs ladies all work/* folders into public/ladies-catalog for dev + production.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveLadiesDisplayName } from "./resolve-ladies-display-name.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const imageRe = /\.(jpe?g|png|webp)$/i;

const sourceRoot = (
  process.env.LADIES_CATALOG_DIR || path.join(root, "ladies all work")
).trim();
const destRoot = path.join(root, "public", "ladies-catalog");
const EXCLUDED_LADIES = new Set(["kids", "kid", "children", "child"]);

function isExcludedLadiesFolder(name) {
  const norm = name.trim().toLowerCase().replace(/[-_]/g, " ");
  if (EXCLUDED_LADIES.has(norm)) return true;
  return norm.includes("kid");
}

function formatLabel(folderName) {
  return folderName
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function syncCatalog() {
  if (!fs.existsSync(sourceRoot)) {
    console.warn(`[sync-ladies-catalog] Source not found: ${sourceRoot}`);
    fs.mkdirSync(destRoot, { recursive: true });
    fs.writeFileSync(
      path.join(destRoot, "manifest.json"),
      JSON.stringify({ categories: [] }, null, 2),
    );
    return;
  }

  fs.mkdirSync(destRoot, { recursive: true });
  const categories = [];

  for (const entry of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (isExcludedLadiesFolder(entry.name)) continue;
    const srcDir = path.join(sourceRoot, entry.name);
    const destDir = path.join(destRoot, entry.name);
    fs.mkdirSync(destDir, { recursive: true });

    const names = fs
      .readdirSync(srcDir, { withFileTypes: true })
      .filter((d) => d.isFile() && imageRe.test(d.name))
      .map((d) => d.name)
      .sort();

    for (const name of names) {
      fs.copyFileSync(path.join(srcDir, name), path.join(destDir, name));
    }

    if (names.length) {
      const label = formatLabel(entry.name);
      const displayNames = Object.fromEntries(
        names.map((n) => [n, resolveLadiesDisplayName(n, label)]),
      );
      categories.push({
        id: entry.name,
        label,
        names,
        displayNames,
      });
    }
  }

  categories.sort((a, b) => a.label.localeCompare(b.label));
  fs.writeFileSync(
    path.join(destRoot, "manifest.json"),
    JSON.stringify({ categories }, null, 2),
  );

  const total = categories.reduce((n, c) => n + c.names.length, 0);
  console.log(
    `[sync-ladies-catalog] Synced ${total} images in ${categories.length} folders to ${path.relative(root, destRoot)}`,
  );
}

syncCatalog();
