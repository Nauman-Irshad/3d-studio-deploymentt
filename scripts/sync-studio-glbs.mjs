/**
 * Copies landing-page GLBs into studio public + committed garment-3d output.
 * Without this, /garment-3d/ shows a wireframe forever (models 404 on Vercel).
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const fypRoot = join(root, "..");

const sources = [
  join(fypRoot, "App", "web", "landing page product"),
  join(fypRoot, "App", "landing page product"),
  join(root, "assets"),
];

const dests = [
  join(root, "3d studio", "virtual-tryon-platform", "frontend", "public", "landing page product"),
  join(root, "public", "garment-3d", "landing page product"),
];

let src = sources.find((p) => existsSync(p));
if (!src) {
  console.warn("[sync-studio-glbs] No landing product source found — skip");
  process.exit(0);
}

for (const dest of dests) {
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(`[sync-studio-glbs] ${src} → ${dest}`);
}
