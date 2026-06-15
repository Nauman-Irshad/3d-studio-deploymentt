/**
 * Build (if needed) and copy 3D studio dist → public/garment-3d
 * (Separate from /studio/ shell so Vite asset paths stay correct.)
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const frontendDir = join(process.cwd(), "3d studio", "virtual-tryon-platform", "frontend");
const studioDist = join(frontendDir, "dist");
const dest = join(process.cwd(), "public", "garment-3d");
const legacyPublicStudio = join(process.cwd(), "public", "studio");

function buildStudio() {
  console.log("[sync-3d-studio] Building 3D studio (base /garment-3d/)…");
  execSync("npm run build", {
    cwd: frontendDir,
    stdio: "inherit",
    env: { ...process.env, VITE_BASE: "/garment-3d/" },
  });
}

if (!existsSync(studioDist)) {
  if (!existsSync(join(frontendDir, "package.json"))) {
    console.warn("[sync-3d-studio] 3D frontend not found — skip");
    process.exit(0);
  }
  buildStudio();
} else {
  try {
    const html = readFileSync(join(studioDist, "index.html"), "utf8");
    if (!html.includes("/garment-3d/")) buildStudio();
  } catch {
    buildStudio();
  }
}

if (!existsSync(studioDist)) {
  console.warn("[sync-3d-studio] dist still missing after build — skip");
  process.exit(0);
}

if (existsSync(legacyPublicStudio)) {
  rmSync(legacyPublicStudio, { recursive: true, force: true });
  console.log("[sync-3d-studio] Removed legacy public/studio");
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(studioDist, dest, { recursive: true });
console.log("[sync-3d-studio] Synced 3D studio → public/garment-3d");
