import { apiUrl } from "./api";

export type TryOnHealthResponse = {
  status?: string;
  provider?: string;
  vton_mode?: string;
  engine?: string;
  hf_token_set?: boolean;
  tryon_fast?: boolean;
  eta_minutes?: string;
  eta_seconds?: number;
};

export type TryOnServerState = {
  loading: boolean;
  online: boolean;
  vtonMode: "real" | "preview";
  engine: string;
  provider: string;
  hfTokenSet: boolean;
  etaLabel: string;
};

export const DEFAULT_SERVER_STATE: TryOnServerState = {
  loading: true,
  online: false,
  vtonMode: "real",
  engine: "",
  provider: "",
  hfTokenSet: false,
  etaLabel: "",
};

export function parseTryOnHealth(data: TryOnHealthResponse): Omit<TryOnServerState, "loading"> {
  const preview = data.vton_mode === "preview" || data.provider === "mock";
  return {
    online: true,
    vtonMode: preview ? "preview" : "real",
    engine: data.engine ?? (preview ? "Preview overlay" : "IDM-VTON (Hugging Face)"),
    provider: data.provider ?? "unknown",
    hfTokenSet: !!data.hf_token_set,
    etaLabel: data.eta_minutes ?? (preview ? "instant" : "~1–5 min"),
  };
}

export async function fetchTryOnHealth(): Promise<Omit<TryOnServerState, "loading">> {
  const res = await fetch(apiUrl("/api/tryon/health"));
  if (!res.ok) throw new Error("offline");
  const data = (await res.json()) as TryOnHealthResponse;
  return parseTryOnHealth(data);
}
