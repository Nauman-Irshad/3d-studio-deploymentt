/**
 * Copy 3D studio dist → public/garment-3d (base /garment-3d/).
 * On Vercel: uses committed public/garment-3d — does not rebuild nested frontend.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const frontendDir = join(process.cwd(), "3d studio", "virtual-tryon-platform", "frontend");
const studioDist = join(frontendDir, "dist");
const dest = join(process.cwd(), "public", "garment-3d");
const destIndex = join(dest, "index.html");
const legacyPublicStudio = join(process.cwd(), "public", "studio");

function destLooksValid() {
  if (!existsSync(destIndex)) return false;
  try {
    const html = readFileSync(destIndex, "utf8");
    return html.includes("/garment-3d/") || html.includes('id="root"');
  } catch {
    return false;
  }
}

function studioDistLooksValid() {
  if (!existsSync(join(studioDist, "index.html"))) return false;
  try {
    const html = readFileSync(join(studioDist, "index.html"), "utf8");
    return html.includes("/garment-3d/");
  } catch {
    return false;
  }
}

function buildStudio() {
  const nodeModules = join(frontendDir, "node_modules");
  if (!existsSync(nodeModules)) {
    console.log("[sync-3d-studio] Installing 3D studio frontend dependencies…");
    execSync("npm install", { cwd: frontendDir, stdio: "inherit" });
  }
  console.log("[sync-3d-studio] Building 3D studio (base /garment-3d/)…");
  execSync("npm run build", {
    cwd: frontendDir,
    stdio: "inherit",
    env: { ...process.env, VITE_BASE: "/garment-3d/" },
  });
}

const onVercel = process.env.VERCEL === "1";
const skipBuild =
  process.env.SKIP_3D_STUDIO_BUILD === "1" ||
  (onVercel && destLooksValid());
const forceBuild = process.env.FORCE_3D_STUDIO_BUILD === "1";

if (skipBuild && !forceBuild) {
  if (destLooksValid()) {
    console.log(
      onVercel
        ? "[sync-3d-studio] Vercel: using committed public/garment-3d (skip nested build)"
        : "[sync-3d-studio] Using existing public/garment-3d (SKIP_3D_STUDIO_BUILD)",
    );
    process.exit(0);
  }
  if (onVercel) {
    console.error(
      "[sync-3d-studio] public/garment-3d is missing on Vercel. Commit the built folder from local: npm run sync:3d-studio",
    );
    process.exit(1);
  }
}

if (!existsSync(join(frontendDir, "package.json"))) {
  if (destLooksValid()) {
    console.warn("[sync-3d-studio] 3D frontend not found — keeping public/garment-3d");
    process.exit(0);
  }
  console.warn("[sync-3d-studio] 3D frontend not found — skip");
  process.exit(0);
}

if (forceBuild || !studioDistLooksValid()) {
  buildStudio();
}

if (!existsSync(studioDist)) {
  if (destLooksValid()) {
    console.warn("[sync-3d-studio] dist missing — keeping existing public/garment-3d");
    process.exit(0);
  }
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
