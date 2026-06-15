/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  /** Ai Cloth Size Prediction dev server (Vite). Default in code: http://127.0.0.1:5173/ */
  readonly VITE_SIZE_FINDER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
