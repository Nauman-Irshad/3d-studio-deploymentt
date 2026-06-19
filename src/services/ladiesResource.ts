const embedBase = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

export type LadiesResourceFile = {
  name: string;
  label: string;
  size: number;
};

export type LadiesResourceManifest = {
  files: LadiesResourceFile[];
};

export function resourceManifestUrl(): string {
  if (import.meta.env.PROD) {
    return `${embedBase}ladies-resource/manifest.json`;
  }
  return "/ladies-resource/manifest.json";
}

export function resourceDownloadUrl(name: string): string {
  if (import.meta.env.PROD) {
    return `${embedBase}ladies-resource/${encodeURIComponent(name)}`;
  }
  return `/ladies-resource/${encodeURIComponent(name)}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function fetchLadiesResourceManifest(): Promise<LadiesResourceManifest> {
  const res = await fetch(resourceManifestUrl());
  if (!res.ok) throw new Error("Could not load resource files.");
  return (await res.json()) as LadiesResourceManifest;
}

export function triggerResourceDownload(name: string): void {
  const url = resourceDownloadUrl(name);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
