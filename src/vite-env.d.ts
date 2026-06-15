/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRYON_BACKEND: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
