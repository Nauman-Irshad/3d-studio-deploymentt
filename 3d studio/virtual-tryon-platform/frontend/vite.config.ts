import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const basePath = process.env.VITE_BASE ?? (process.env.VERCEL ? "/" : "/garment-3d/");

export default defineConfig({
  base: basePath,
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    strictPort: false,
    open: "/studio/",
    // Do not proxy background_textures to :8000 — when the API is down Vite would error (ECONNREFUSED).
    // Put EXRs in `public/background_textures/` (run `npm run sync-models`) so they load from the dev server.
    proxy: {
      "/api": { target: "http://127.0.0.1:8000", changeOrigin: true },
      "/health": { target: "http://127.0.0.1:8000", changeOrigin: true },
    },
  },
});
