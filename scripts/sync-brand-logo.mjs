import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const src = join(process.cwd(), "assets", "green kurta 3d model.glb");
const destName = "brand-kurta-logo.glb";
const dests = [
  join(process.cwd(), "public", destName),
  join(process.cwd(), "3d studio", "virtual-tryon-platform", "frontend", "public", destName),
];

if (!existsSync(src)) {
  console.warn("[sync-brand-logo] source not found:", src);
  process.exit(0);
}

for (const dest of dests) {
  mkdirSync(join(dest, ".."), { recursive: true });
  copyFileSync(src, dest);
  console.log("[sync-brand-logo] copied →", dest);
}
