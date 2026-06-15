import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo3D } from "../ui/BrandLogo3D";
import {
  buildPhoneCaptureUrl,
  fetchNetworkInfo,
  generateQrDataUrl,
  getPersistentPhoneSessionId,
  markDesktopReceived,
  pollPhoneSession,
  type PhoneSyncUiStatus,
} from "../../services/phoneTryonSync";
import "../../assets/styles/PhoneScanModal.css";

type PhoneScanModalProps = {
  open: boolean;
  onClose: () => void;
  onPhoto: (dataUrl: string) => void;
  onSyncStatus?: (status: PhoneSyncUiStatus) => void;
};

type ScanStatus = "loading" | "waiting" | "scanned" | "received" | "error";

export function PhoneScanModal({ open, onClose, onPhoto, onSyncStatus }: PhoneScanModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [captureUrl, setCaptureUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<ScanStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [waitHint, setWaitHint] = useState<string | null>(null);

  const sessionIdRef = useRef<string | null>(null);
  const qrReadyRef = useRef(false);
  const pollStartedRef = useRef(false);
  const onPhotoRef = useRef(onPhoto);
  const onSyncStatusRef = useRef(onSyncStatus);

  onPhotoRef.current = onPhoto;
  onSyncStatusRef.current = onSyncStatus;

  const initPersistentQr = useCallback(async () => {
    if (qrReadyRef.current) return;

    const id = getPersistentPhoneSessionId();
    sessionIdRef.current = id;
    setSessionId(id);
    setStatus("loading");
    setError(null);
    onSyncStatusRef.current?.("waiting_scan");

    const network = await fetchNetworkInfo();
    let url: string;
    try {
      url = buildPhoneCaptureUrl(id, network?.phone_base ?? null);
    } catch (e) {
      setStatus("error");
      onSyncStatusRef.current?.("photo_failed");
      setError(e instanceof Error ? e.message : "Phone QR needs an HTTPS capture URL.");
      return;
    }
    setCaptureUrl(url);

    try {
      const qr = await generateQrDataUrl(url);
      setQrDataUrl(qr);
      setStatus("waiting");
      qrReadyRef.current = true;
    } catch (e) {
      setStatus("error");
      onSyncStatusRef.current?.("photo_failed");
      setError(e instanceof Error ? e.message : "Could not create QR code.");
      return;
    }

    if (pollStartedRef.current) return;
    pollStartedRef.current = true;

    pollPhoneSession(
      id,
      {
        onScanned: () => {
          setStatus((prev) => (prev === "received" ? prev : "scanned"));
          setWaitHint(null);
          onSyncStatusRef.current?.("phone_connected");
        },
        onPhoto: (dataUrl) => {
          const sid = sessionIdRef.current;
          setStatus("received");
          setWaitHint(null);
          onSyncStatusRef.current?.("photo_received");
          if (sid) void markDesktopReceived(sid);
          onPhotoRef.current(dataUrl);
          window.setTimeout(() => {
            setStatus("scanned");
          }, 1200);
        },
        onError: (msg) => {
          setStatus("error");
          onSyncStatusRef.current?.("photo_failed");
          setError(msg);
        },
        onWaiting: (ticks) => {
          if (ticks >= 12) {
            setWaitHint("Still waiting… On phone tap Send and wait for ✓.");
          } else if (ticks >= 4) {
            setWaitHint("Same QR works every time — take photo on phone when ready.");
          }
        },
      },
      undefined,
    );
  }, []);

  useEffect(() => {
    void initPersistentQr();
  }, [initPersistentQr]);

  if (!open) return null;

  const showQr = !!qrDataUrl && status !== "loading";

  return (
    <div className="phone-scan-backdrop" role="presentation" onClick={onClose}>
      <div
        className="phone-scan-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-scan-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="phone-scan-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <div className="phone-scan-brand">
          <BrandLogo3D size={56} />
        </div>

        <h2 id="phone-scan-title">
          {status === "scanned"
            ? "Phone connected"
            : status === "received"
              ? "Picture received"
              : "Scan QR code"}
        </h2>
        <p className="phone-scan-sub">
          {status === "scanned"
            ? "Take a photo on your phone — it loads into Select Model automatically. Same QR every time."
            : status === "received"
              ? "Loading into Select Model…"
              : "One QR for this session — scan once, then send photos from your phone anytime."}
        </p>

        {status === "loading" ? (
          <div className="phone-scan-loading">
            <span className="spinner spinner-dark" />
            <p>Preparing QR code…</p>
          </div>
        ) : null}

        {showQr ? (
          <div
            className={`phone-scan-qr-wrap phone-scan-qr-wrap--visible${status === "scanned" || status === "received" ? " phone-scan-qr-wrap--dimmed" : ""}`}
          >
            <img src={qrDataUrl} alt="Scan QR code with your phone" className="phone-scan-qr" />
          </div>
        ) : null}

        {status === "scanned" ? (
          <div className="phone-scan-scanned" role="status" aria-live="polite">
            <div className="phone-scan-scanned-icon" aria-hidden="true">
              📱
            </div>
            <p className="phone-scan-scanned-title">Phone linked — send photo anytime</p>
            <p className="phone-scan-scanned-sub">QR stays the same. Retake on phone if needed.</p>
          </div>
        ) : null}

        {sessionId && status !== "loading" ? (
          <p className="phone-scan-session" title="Fixed for this browser tab">
            Session: <code>{sessionId}</code>
          </p>
        ) : null}

        {status === "waiting" ? (
          <p className="phone-scan-status waiting">Scan this QR with your phone camera</p>
        ) : null}

        {waitHint ? <p className="phone-scan-hint">{waitHint}</p> : null}

        {status === "received" ? (
          <div className="phone-scan-success" role="status" aria-live="polite">
            <div className="phone-scan-success-tick" aria-hidden="true">
              <svg viewBox="0 0 52 52" width="72" height="72">
                <circle className="phone-scan-success-circle" cx="26" cy="26" r="24" fill="none" />
                <path className="phone-scan-success-check" fill="none" d="M14 27l8 8 16-18" />
              </svg>
            </div>
            <p className="phone-scan-success-title">Picture received successfully</p>
            <p className="phone-scan-success-sub">Loading into Select Model…</p>
          </div>
        ) : null}

        {error ? <p className="phone-scan-error">{error}</p> : null}

        {captureUrl && status === "waiting" ? (
          <p className="phone-scan-link">
            Or open on phone:{" "}
            <a href={captureUrl} target="_blank" rel="noopener noreferrer">
              capture link
            </a>
          </p>
        ) : null}

        <div className="phone-scan-actions">
          <button type="button" className="phone-scan-btn primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
