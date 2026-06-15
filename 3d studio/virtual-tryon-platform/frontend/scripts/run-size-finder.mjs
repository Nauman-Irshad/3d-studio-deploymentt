/**
 * Starts Ai Cloth Size Prediction (`npm run dev`) from the repo next to `3d studio`.
 * Resolves `…/Ai Cloth Size Prediction/frontend` or `…/Ai Cloth Size Prediction` if that has a dev script.
 */
import { execFile } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
/** `virtual-tryon-platform/frontend` */
const frontendDir = join(__dirname, "..");
/** Workspace root: parent of `3d studio` (folder that contains both `3d studio` and `Ai Cloth Size Prediction`) */
const workspaceRoot = join(frontendDir, "..", "..", "..");

const candidates = [
  join(workspaceRoot, "Ai Cloth Size Prediction", "frontend"),
  join(workspaceRoot, "Ai Cloth Size Prediction"),
];

function hasDevScript(dir) {
  const p = join(dir, "package.json");
  if (!existsSync(p)) return false;
  try {
    const pkg = JSON.parse(readFileSync(p, "utf8"));
    return typeof pkg.scripts?.dev === "string";
  } catch {
    return false;
  }
}

let target = null;
for (const c of candidates) {
  if (hasDevScript(c)) {
    target = c;
    break;
  }
}

if (!target) {
  console.error("dev:size-finder — could not find Ai Cloth Size Prediction.\n");
  console.error("Expected a folder next to `3d studio` with a package.json that defines `scripts.dev`:\n");
  for (const c of candidates) {
    console.error("  ", c, existsSync(c) ? "(exists)" : "(missing)");
  }
  console.error(
    "\nPlace or clone the app at:\n  " +
      join(workspaceRoot, "Ai Cloth Size Prediction") +
      "\n(with optional `frontend` subfolder containing package.json).\n",
  );
  process.exit(1);
}

console.log("Ai Cloth Size Prediction — starting dev server in:\n  " + target + "\n");

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
execFile(npmCmd, ["run", "dev"], { cwd: target, stdio: "inherit", env: process.env }, (err, _stdout, _stderr) => {
  if (err) {
    console.error(err);
    process.exit(err.code ?? 1);
  }
});
