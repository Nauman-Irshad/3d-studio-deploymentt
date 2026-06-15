/**
 * Main viewer backdrops: optional EXR files under `public/background_textures/` after `npm run sync-models`.
 * Until those files exist, each scene uses a distinct @react-three/drei `preset` so header clicks change the canvas.
 */
import { publicUrl } from "../lib/publicUrl";

export type EnvironmentPreset =
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset"
  | "warehouse";

export type BackgroundScene = {
  id: string;
  label: string;
  shortLabel: string;
  /** Resolved with Vite `base` (e.g. `/studio/background_textures/…`). */
  publicPath: string;
  swatch: string;
  /** Used when no EXR is available at `publicPath` (default in this repo). */
  environmentPreset: EnvironmentPreset;
};

const BACKGROUND_SCENES_ROOT: BackgroundScene[] = [
  {
    id: "citrus",
    label: "Citrus orchard · outdoor",
    shortLabel: "Citrus",
    publicPath: "/background_textures/citrus_orchard_road_puresky_4k.exr",
    swatch:
      "linear-gradient(145deg, #6eb8e8 0%, #b8d9a8 38%, #e6d49a 72%, #87a878 100%)",
    environmentPreset: "park",
  },
  {
    id: "photo_studio",
    label: "Photo studio",
    shortLabel: "Photo",
    publicPath: "/background_textures/photo_studio_01_4k.exr",
    swatch: "linear-gradient(160deg, #4a4a52 0%, #8a8a92 40%, #c8c8d0 100%)",
    environmentPreset: "studio",
  },
  {
    id: "poly_haven",
    label: "Poly Haven studio",
    shortLabel: "Poly",
    publicPath: "/background_textures/poly_haven_studio_4k.exr",
    swatch: "linear-gradient(135deg, #5c6b7a 0%, #9aa5b0 50%, #d0d8de 100%)",
    environmentPreset: "lobby",
  },
  {
    id: "white_studio",
    label: "White cyclorama",
    shortLabel: "White",
    publicPath: "/background_textures/white_studio_02_4k.exr",
    swatch: "linear-gradient(180deg, #f8f9fb 0%, #e4e6ea 55%, #d0d3d8 100%)",
    environmentPreset: "apartment",
  },
  {
    id: "christmas_studio",
    label: "Christmas photo studio",
    shortLabel: "Holiday",
    publicPath: "/background_textures/christmas_photo_studio_01_4k.exr",
    swatch:
      "linear-gradient(135deg, #1a4d2e 0%, #8b2942 45%, #c9a227 85%, #f0e6d8 100%)",
    environmentPreset: "night",
  },
  {
    id: "pergola",
    label: "Pergola walkway",
    shortLabel: "Pergola",
    publicPath: "/background_textures/pergola_walkway_4k.exr",
    swatch:
      "linear-gradient(165deg, #87a878 0%, #c4d4b0 35%, #d9c9a8 70%, #6b8c9e 100%)",
    environmentPreset: "forest",
  },
  {
    id: "tree_drive",
    label: "Tree-lined driveway",
    shortLabel: "Avenue",
    publicPath: "/background_textures/tree_lined_driveway_4k.exr",
    swatch:
      "linear-gradient(180deg, #5a7a5a 0%, #8faa7a 40%, #b8c898 75%, #4a6048 100%)",
    environmentPreset: "dawn",
  },
];

export const BACKGROUND_SCENES: BackgroundScene[] = BACKGROUND_SCENES_ROOT.map((s) => ({
  ...s,
  publicPath: publicUrl(s.publicPath),
}));

export const DEFAULT_BACKGROUND_PATH = "";

/** Smallest EXR — use when user first picks a backdrop (optional). */
export const PHOTO_STUDIO_BACKGROUND_PATH = BACKGROUND_SCENES.find(
  (s) => s.id === "photo_studio",
)!.publicPath;

export const ALL_BACKGROUND_PATHS = BACKGROUND_SCENES.map((b) => b.publicPath);

/** @deprecated Prefer `environmentPreset` in previews; kept for scripts referencing EXR name. */
export const SIDEBAR_PREVIEW_IBL = publicUrl("/background_textures/photo_studio_01_4k.exr");

export function sceneForBackgroundPath(publicPath: string): BackgroundScene | undefined {
  return BACKGROUND_SCENES.find((b) => b.publicPath === publicPath);
}
