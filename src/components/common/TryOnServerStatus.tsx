import type { TryOnServerState } from "../../services/tryOnHealth";

type Props = {
  health: TryOnServerState;
  onRefresh?: () => void;
  variant?: "banner" | "header" | "embedded";
};

function statusKind(health: TryOnServerState): "loading" | "off" | "live" | "preview" {
  if (health.loading) return "loading";
  if (!health.online) return "off";
  if (health.vtonMode === "preview") return "preview";
  return "live";
}

export function TryOnServerStatus({ health, onRefresh, variant = "header" }: Props) {
  const kind = statusKind(health);
  const isEmbedded = variant === "embedded";

  if (isEmbedded) {
    const label =
      kind === "loading"
        ? "Checking AI…"
        : kind === "off"
          ? "Server off"
          : kind === "preview"
            ? "Preview mode"
            : "AI ready";

    return (
      <button
        type="button"
        className={`tryon-server-embedded tryon-server-embedded--${kind}`}
        onClick={onRefresh}
        disabled={health.loading}
        aria-live="polite"
        title={
          kind === "live"
            ? `${health.engine || "IDM-VTON"} · ${health.etaLabel}${health.hfTokenSet ? " · HF token set" : ""}`
            : kind === "off"
              ? "Run npm run api — click to refresh"
              : "Click to refresh server status"
        }
      >
        <span className="tryon-server-embedded-dot" aria-hidden="true" />
        <span className="tryon-server-embedded-label">{label}</span>
        {kind === "live" ? (
          <span className="tryon-server-embedded-meta">HF · IDM-VTON</span>
        ) : null}
      </button>
    );
  }

  const isLive = kind === "live";
  const isHeader = variant === "header";

  const title =
    kind === "loading"
      ? "Checking server…"
      : kind === "off"
        ? "2D Try-On Server: OFF"
        : kind === "preview"
          ? "2D Try-On Server: ON (Preview)"
          : "2D Try-On Server: ON";

  const meta = (() => {
    if (kind === "loading") return "Connecting to port 8765…";
    if (kind === "off") return "Run npm run api — click to refresh";
    if (kind === "preview") return "Mock mode — not real Hugging Face AI";
    const tokenLabel = health.hfTokenSet ? "HF token ✓" : "HF token optional";
    return `Works with Hugging Face · ${health.engine || "IDM-VTON (Hugging Face)"} · ${health.etaLabel} · ${tokenLabel}`;
  })();

  return (
    <button
      type="button"
      className={`tryon-server-status tryon-server-status--${kind}${isHeader ? " tryon-server-status--header" : ""}`}
      onClick={onRefresh}
      disabled={health.loading}
      aria-live="polite"
      title={kind === "off" ? "Click to check again" : "Server status — click to refresh"}
    >
      <span className="tryon-server-status-dot" aria-hidden="true" />
      <span className="tryon-server-status-body">
        <span className="tryon-server-status-title">{title}</span>
        <span className="tryon-server-status-sub">{meta}</span>
      </span>
      {isLive ? (
        <span className="tryon-server-status-badges">
          <span className="tryon-server-badge tryon-server-badge--ok">Hugging Face</span>
          <span className="tryon-server-badge tryon-server-badge--ok">IDM-VTON</span>
          <span className="tryon-server-badge tryon-server-badge--ok">Ready</span>
        </span>
      ) : null}
      {onRefresh && !health.loading ? (
        <span className="tryon-server-status-refresh" aria-hidden="true">
          ↻
        </span>
      ) : null}
    </button>
  );
}
