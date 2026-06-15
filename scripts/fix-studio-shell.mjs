/** Copy root shell build → dist/studio/index.html and fix asset paths for /studio/ URL. */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const shell = join(dist, "studio_shell.html");
const outDir = join(dist, "studio");
const out = join(outDir, "index.html");

if (!existsSync(shell)) {
  console.warn("[fix-studio-shell] dist/studio_shell.html missing — skip");
  process.exit(0);
}

let html = readFileSync(shell, "utf8");
html = html.replace(/\/studio\/app\/assets\//g, "/assets/");
html = html.replace(/\/garment-3d\/assets\//g, "/assets/");

mkdirSync(outDir, { recursive: true });
writeFileSync(out, html);
copyFileSync(shell, join(dist, "studio_shell.html"));
writeFileSync(shell, html);
console.log("[fix-studio-shell] Fixed shell asset paths → /assets/");
