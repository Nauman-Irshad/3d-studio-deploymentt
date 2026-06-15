import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const logoSrc = join(process.cwd(), "public", "smartfitao-logo.png");
const glbSrc = join(process.cwd(), "assets", "green kurta 3d model.glb");
const glbDestName = "brand-kurta-logo.glb";

const phoneHtmlSrc = join(process.cwd(), "qr-code-scan-computer-visionj", "index.html");
const destRoots = [
  join(process.cwd(), "public", "phone-capture"),
  join(process.cwd(), "qr-code-web-deploy", "public", "phone-capture"),
  join(process.cwd(), "qr-code-scan-computer-visionj"),
  join(process.cwd(), "3d studio", "virtual-tryon-platform", "frontend", "public", "phone-capture"),
];

if (existsSync(glbSrc)) {
  for (const root of [
    join(process.cwd(), "public"),
    join(process.cwd(), "3d studio", "virtual-tryon-platform", "frontend", "public"),
  ]) {
    mkdirSync(root, { recursive: true });
    copyFileSync(glbSrc, join(root, glbDestName));
    console.log("[sync-phone-capture] GLB →", join(root, glbDestName));
  }
}

if (existsSync(phoneHtmlSrc)) {
  for (const destDir of destRoots) {
    mkdirSync(destDir, { recursive: true });
    copyFileSync(phoneHtmlSrc, join(destDir, "index.html"));
    console.log("[sync-phone-capture] HTML →", join(destDir, "index.html"));
  }
}

if (existsSync(logoSrc)) {
  for (const destDir of destRoots) {
    mkdirSync(destDir, { recursive: true });
    copyFileSync(logoSrc, join(destDir, "smartfitao-logo.png"));
    console.log("[sync-phone-capture] logo →", join(destDir, "smartfitao-logo.png"));
  }
} else {
  console.warn("[sync-phone-capture] logo not found:", logoSrc);
}

if (!existsSync(phoneHtmlSrc)) {
  console.warn("[sync-phone-capture] source HTML not found:", phoneHtmlSrc);
}
