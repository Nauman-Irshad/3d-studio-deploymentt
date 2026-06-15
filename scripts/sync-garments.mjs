/**
 * Syncs kurta/kameez images into public/garments for dev and production.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const imageRe = /\.(jpe?g|png|webp)$/i;

const kurtaPrimary = (process.env.GARMENT_IMAGES_DIR || "E:/fyp whole backend/2D kurta's").trim();
const kurtaDest = path.join(root, "public", "garments");
const kurtaSources = [kurtaPrimary, path.join(root, "dist", "garments"), kurtaDest];
const EXCLUDED_MEN = new Set(["17.png"]);

function collectNames(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && imageRe.test(d.name))
    .map((d) => d.name);
}

function syncFolder(sources, destDir, label) {
  fs.mkdirSync(destDir, { recursive: true });
  const names = new Set();
  for (const dir of sources) {
    for (const name of collectNames(dir)) names.add(name);
  }
  const sorted = [...names].filter((n) => !EXCLUDED_MEN.has(n)).sort();
  for (const name of sorted) {
    for (const dir of sources) {
      const src = path.join(dir, name);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(destDir, name));
        break;
      }
    }
  }
  fs.writeFileSync(path.join(destDir, "manifest.json"), JSON.stringify({ names: sorted }, null, 2));
  console.log(`[sync-garments] Synced ${sorted.length} ${label} to ${path.relative(root, destDir)}`);
}

syncFolder(kurtaSources, kurtaDest, "kurtas");
