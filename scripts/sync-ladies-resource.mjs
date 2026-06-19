/**
 * Syncs ladies all work/RESOURCE into public/ladies-resource for download links.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourceRoot = path.join(root, "ladies all work", "RESOURCE");
const destRoot = path.join(root, "public", "ladies-resource");

function formatLabel(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function syncResource() {
  if (!fs.existsSync(sourceRoot)) {
    console.warn(`[sync-ladies-resource] Source not found: ${sourceRoot}`);
    return;
  }

  fs.mkdirSync(destRoot, { recursive: true });

  const names = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .sort();

  for (const name of names) {
    fs.copyFileSync(path.join(sourceRoot, name), path.join(destRoot, name));
  }

  const files = names.map((name) => ({
    name,
    label: formatLabel(name),
    size: fs.statSync(path.join(destRoot, name)).size,
  }));

  fs.writeFileSync(
    path.join(destRoot, "manifest.json"),
    JSON.stringify({ files }, null, 2),
  );

  console.log(
    `[sync-ladies-resource] Synced ${files.length} files to ${path.relative(root, destRoot)}`,
  );
}

syncResource();
