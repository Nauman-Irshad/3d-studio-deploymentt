import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ServerResponse } from "node:http";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const DEFAULT_USER_IMAGES = "E:/fyp whole backend/Computer Vision (Camera Work)/images";
const DEFAULT_GARMENT_IMAGES = "E:/fyp whole backend/2D kurta's";
const DEFAULT_LADIES_CATALOG = path.join(process.cwd(), "ladies all work");
const imageRe = /\.(jpe?g|png|webp)$/i;

function formatCategoryLabel(folderName: string): string {
  return folderName
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function isExcludedLadiesFolder(name: string): boolean {
  const norm = name.trim().toLowerCase().replace(/[-_]/g, " ");
  if (norm === "kids" || norm === "kid" || norm === "children" || norm === "child") return true;
  return norm.includes("kid");
}

function scanLadiesCatalog(rootDir: string) {
  if (!fs.existsSync(rootDir)) return [];
  const categories: { id: string; label: string; names: string[] }[] = [];
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (isExcludedLadiesFolder(entry.name)) continue;
    const names = fs
      .readdirSync(path.join(rootDir, entry.name), { withFileTypes: true })
      .filter((d) => d.isFile() && imageRe.test(d.name))
      .map((d) => d.name)
      .sort();
    if (names.length) {
      categories.push({
        id: entry.name,
        label: formatCategoryLabel(entry.name),
        names,
      });
    }
  }
  return categories.sort((a, b) => a.label.localeCompare(b.label));
}

function safeResolveCatalogFile(rootDir: string, category: string, name: string): string | null {
  const root = path.resolve(rootDir);
  const catBase = path.resolve(root, category);
  const candidate = path.resolve(catBase, path.basename(name));
  if (!candidate.startsWith(catBase) || !catBase.startsWith(root)) return null;
  return candidate;
}

function safeResolveFile(rootDir: string, name: string): string | null {
  const base = path.resolve(rootDir);
  const candidate = path.resolve(base, path.basename(name));
  if (!candidate.startsWith(base)) return null;
  return candidate;
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function getLanIp(): string | null {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return null;
}

/** SPA fallback for embedded 3D build under public/garment-3d — never intercept Vite dev paths. */
function isGarment3dSpaRoute(url: string): boolean {
  if (!url.startsWith("/garment-3d")) return false;
  if (url.startsWith("/garment-3d/assets/")) return false;
  if (url.includes("/@")) return false;
  if (url.startsWith("/garment-3d/src/")) return false;
  if (/\.[a-z0-9]+($|\?)/i.test(url)) return false;
  return true;
}

function applyAppRouteRewrites(url: string): string | null {
  // Studio shell = header (2D/3D nav) + 3D iframe
  if (url === "/studio" || url === "/studio/") return "/studio_shell.html";
  if (url === "/ladies_try_on" || url === "/ladies_try_on/") return "/ladies_try_on/index.html";
  if (isGarment3dSpaRoute(url)) return "/garment-3d/index.html";
  return null;
}

/** Background-removal WASM needs isolation on 2D pages only — not studio / 3D WebGL. */
const WASM_ISOLATION_HEADERS: Record<string, string> = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "credentialless",
};

function pathNeedsWasmIsolation(pathname: string): boolean {
  if (pathname.startsWith("/studio")) return false;
  if (pathname === "/studio_shell.html") return false;
  if (pathname.startsWith("/garment-3d")) return false;
  if (pathname.startsWith("/phone-capture")) return false;
  if (pathname === "/" || pathname === "/index.html") return true;
  if (
    pathname === "/ladies_try_on" ||
    pathname === "/ladies_try_on/" ||
    pathname === "/ladies_try_on/index.html"
  ) {
    return true;
  }
  return false;
}

function applyWasmIsolationHeaders(reqUrl: string, res: ServerResponse): void {
  const pathname = reqUrl.split("?")[0] ?? "/";
  if (!pathNeedsWasmIsolation(pathname)) return;
  for (const [key, value] of Object.entries(WASM_ISOLATION_HEADERS)) {
    res.setHeader(key, value);
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const userImagesDir = env.USER_IMAGES_DIR?.trim() || DEFAULT_USER_IMAGES;
  const garmentImagesDir = env.GARMENT_IMAGES_DIR?.trim() || DEFAULT_GARMENT_IMAGES;
  const ladiesGarmentImagesDir =
    env.LADIES_GARMENT_IMAGES_DIR?.trim() || path.join(process.cwd(), "public", "ladies-garments");
  const garmentDirs = [
    garmentImagesDir,
    path.join(process.cwd(), "public", "garments"),
    path.join(process.cwd(), "dist", "garments"),
  ];
  const ladiesGarmentDirs = [
    ladiesGarmentImagesDir,
    path.join(process.cwd(), "dist", "ladies-garments"),
    path.join(process.cwd(), "public", "ladies-garments"),
  ];
  const ladiesCatalogDir =
    env.LADIES_CATALOG_DIR?.trim() || DEFAULT_LADIES_CATALOG;
  const ladiesCatalogPublicDir = path.join(process.cwd(), "public", "ladies-catalog");
  const qrCaptureDir = path.join(process.cwd(), "qr-code-scan-computer-visionj");

  function serveQrCapture(reqUrl: string, res: ServerResponse): boolean {
    const pathname = reqUrl.split("?")[0] ?? "";
    if (!pathname.startsWith("/phone-capture")) return false;
    const rel =
      pathname === "/phone-capture" || pathname === "/phone-capture/"
        ? "index.html"
        : pathname.slice("/phone-capture/".length);
    const root = path.resolve(qrCaptureDir);
    const file = path.resolve(root, rel || "index.html");
    if (!file.startsWith(root) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.statusCode = 404;
      res.end("not found");
      return true;
    }
    const ext = path.extname(file).toLowerCase();
    const type =
      ext === ".html"
        ? "text/html; charset=utf-8"
        : ext === ".js"
          ? "application/javascript"
          : ext === ".css"
            ? "text/css"
            : "application/octet-stream";
    res.statusCode = 200;
    res.setHeader("Content-Type", type);
    fs.createReadStream(file).pipe(res);
    return true;
  }

  return {
    // Main app always at site root — /garment-3d/ is only for the embedded 3D build in public/.
    base: "/",
    optimizeDeps: {
      exclude: ["@imgly/background-removal"],
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(process.cwd(), "index.html"),
          ladies: path.resolve(process.cwd(), "ladies_try_on/index.html"),
          studio_shell: path.resolve(process.cwd(), "studio_shell.html"),
        },
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8765",
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      {
        name: "studio-shell-routes",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const rawUrl = req.url ?? "/";
            applyWasmIsolationHeaders(rawUrl, res);
            const url = rawUrl.split("?")[0] ?? "";
            const rewrite = applyAppRouteRewrites(url);
            if (rewrite) req.url = rewrite;
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            const rawUrl = req.url ?? "/";
            applyWasmIsolationHeaders(rawUrl, res);
            if (serveQrCapture(rawUrl, res)) return;
            const url = rawUrl.split("?")[0] ?? "";
            const rewrite = applyAppRouteRewrites(url);
            if (rewrite) req.url = rewrite;
            next();
          });
        },
      },
      {
        name: "local-tryon-media",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const rawUrl = req.url ?? "/";

            if (rawUrl === "/__network/info" && req.method === "GET") {
              const hostHeader = req.headers.host ?? "localhost:5173";
              const port = hostHeader.includes(":")
                ? hostHeader.split(":").pop()!
                : "5173";
              const lanIp = getLanIp();
              sendJson(res, 200, {
                lanIp,
                port,
                captureBase: lanIp ? `http://${lanIp}:${port}` : null,
              });
              return;
            }

            if (serveQrCapture(rawUrl, res)) return;

            if (!rawUrl.startsWith("/__media/")) {
              next();
              return;
            }

            const u = new URL(rawUrl, "http://local");
            const { pathname } = u;

            if (pathname === "/__media/user/list" && req.method === "GET") {
              try {
                const names = fs
                  .readdirSync(userImagesDir, { withFileTypes: true })
                  .filter((d) => d.isFile())
                  .map((d) => d.name)
                  .filter((n) => /\.(jpe?g|png|webp)$/i.test(n))
                  .sort();
                sendJson(res, 200, { dir: userImagesDir, names });
              } catch (e) {
                sendJson(res, 500, {
                  error: "list_failed",
                  detail: e instanceof Error ? e.message : String(e),
                });
              }
              return;
            }

            if (pathname === "/__media/garment/list" && req.method === "GET") {
              try {
                const names = new Set<string>();
                for (const dir of garmentDirs) {
                  if (!fs.existsSync(dir)) continue;
                  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
                    if (d.isFile() && /\.(jpe?g|png|webp)$/i.test(d.name)) names.add(d.name);
                  }
                }
                const sorted = [...names].filter((n) => n !== "17.png").sort();
                sendJson(res, 200, { dir: garmentImagesDir, names: sorted });
              } catch (e) {
                sendJson(res, 500, {
                  error: "list_failed",
                  detail: e instanceof Error ? e.message : String(e),
                });
              }
              return;
            }

            if (pathname === "/__media/ladies-garment/list" && req.method === "GET") {
              try {
                const names = new Set<string>();
                for (const dir of ladiesGarmentDirs) {
                  if (!fs.existsSync(dir)) continue;
                  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
                    if (d.isFile() && /\.(jpe?g|png|webp)$/i.test(d.name)) names.add(d.name);
                  }
                }
                const sorted = [...names].sort();
                sendJson(res, 200, { dir: ladiesGarmentImagesDir, names: sorted });
              } catch (e) {
                sendJson(res, 500, {
                  error: "list_failed",
                  detail: e instanceof Error ? e.message : String(e),
                });
              }
              return;
            }

            if (pathname === "/__media/user" && req.method === "GET") {
              const name = u.searchParams.get("name");
              if (!name) {
                sendJson(res, 400, { error: "missing_name" });
                return;
              }
              const file = safeResolveFile(userImagesDir, name);
              if (!file || !fs.existsSync(file)) {
                res.statusCode = 404;
                res.end("not found");
                return;
              }
              streamImage(res, file);
              return;
            }

            if (pathname === "/__media/garment" && req.method === "GET") {
              const name = u.searchParams.get("name");
              if (!name) {
                sendJson(res, 400, { error: "missing_name" });
                return;
              }
              let served: string | null = null;
              for (const dir of garmentDirs) {
                const file = safeResolveFile(dir, name);
                if (file && fs.existsSync(file)) {
                  served = file;
                  break;
                }
              }
              if (!served) {
                res.statusCode = 404;
                res.end("not found");
                return;
              }
              streamImage(res, served);
              return;
            }

            if (pathname === "/__media/ladies-garment" && req.method === "GET") {
              const name = u.searchParams.get("name");
              if (!name) {
                sendJson(res, 400, { error: "missing_name" });
                return;
              }
              let served: string | null = null;
              for (const dir of ladiesGarmentDirs) {
                const file = safeResolveFile(dir, name);
                if (file && fs.existsSync(file)) {
                  served = file;
                  break;
                }
              }
              if (!served) {
                res.statusCode = 404;
                res.end("not found");
                return;
              }
              streamImage(res, served);
              return;
            }

            if (pathname === "/__media/ladies-catalog/manifest" && req.method === "GET") {
              try {
                const manifestPath = path.join(ladiesCatalogPublicDir, "manifest.json");
                if (fs.existsSync(manifestPath)) {
                  const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as {
                    categories?: { id: string; label: string; names: string[] }[];
                  };
                  const categories = (parsed.categories ?? []).filter(
                    (c) => !isExcludedLadiesFolder(c.id),
                  );
                  sendJson(res, 200, {
                    categories,
                    dir: ladiesCatalogPublicDir,
                  });
                  return;
                }
                let categories = scanLadiesCatalog(ladiesCatalogDir);
                if (!categories.length && fs.existsSync(ladiesCatalogPublicDir)) {
                  categories = scanLadiesCatalog(ladiesCatalogPublicDir);
                }
                sendJson(res, 200, { categories, dir: ladiesCatalogDir });
              } catch (e) {
                sendJson(res, 500, {
                  error: "list_failed",
                  detail: e instanceof Error ? e.message : String(e),
                });
              }
              return;
            }

            if (pathname === "/__media/ladies-catalog/image" && req.method === "GET") {
              const category = u.searchParams.get("category");
              const name = u.searchParams.get("name");
              if (!category || !name) {
                sendJson(res, 400, { error: "missing_category_or_name" });
                return;
              }
              const roots = [ladiesCatalogDir, ladiesCatalogPublicDir];
              let served: string | null = null;
              for (const root of roots) {
                const file = safeResolveCatalogFile(root, category, name);
                if (file && fs.existsSync(file)) {
                  served = file;
                  break;
                }
              }
              if (!served) {
                res.statusCode = 404;
                res.end("not found");
                return;
              }
              streamImage(res, served);
              return;
            }

            next();
          });
        },
      },
    ],
  };
});

function streamImage(res: ServerResponse, file: string) {
  const ext = path.extname(file).toLowerCase();
  const type =
    ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
  res.statusCode = 200;
  res.setHeader("Content-Type", type);
  fs.createReadStream(file).pipe(res);
}
