/**
 * Fast 2D try-on only — http://127.0.0.1:5334/  (redirects to /fast/)
 * API proxy → :8765
 */
import path from "node:path";
import type { ServerResponse } from "node:http";
import { defineConfig } from "vite";

const publicRoot = path.resolve(__dirname, "public");
const garmentDir = path.join(publicRoot, "garments");

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export default defineConfig({
  root: publicRoot,
  publicDir: false,
  server: {
    host: true,
    port: 5334,
    strictPort: true,
    open: "/fast/",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8765",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    {
      name: "live-5334-root",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const u = (req.url ?? "/").split("?")[0];
          if (u === "/" || u === "/index.html") {
            res.statusCode = 302;
            res.setHeader("Location", "/fast/");
            res.end();
            return;
          }
          if (u === "/__health") {
            sendJson(res, 200, { status: "ok", port: 5334, page: "/fast/" });
            return;
          }
          next();
        });
      },
    },
  ],
  // garments live under public/garments — served as static files from root
});

export { garmentDir };
