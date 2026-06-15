import { useCallback, useEffect, useRef, useState } from "react";
import { apiUrl, formatApiError } from "../../services/api";
import "../../assets/styles/CapturePage.css";

type Props = { sessionId: string };

export function CapturePage({ sessionId }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraReady(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraReady(true);
        }
      } catch {
        if (!cancelled) setError("Camera access denied. Allow camera permission and retry.");
      }
    })();

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [stopCamera]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const w = video.videoWidth || 720;
    const h = video.videoHeight || 960;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    setPreview(canvas.toDataURL("image/jpeg", 0.92));
    stopCamera();
  }, [stopCamera]);

  const retake = useCallback(async () => {
    setPreview(null);
    setDone(false);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraReady(true);
      }
    } catch {
      setError("Could not reopen camera.");
    }
  }, []);

  const sendPhoto = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setUploading(true);
    setError(null);
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.92),
      );
      if (!blob) throw new Error("Could not encode photo.");

      const fd = new FormData();
      fd.append("photo", blob, "phone-photo.jpg");

      const res = await fetch(apiUrl(`/api/sessions/${sessionId}/photo`), {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(formatApiError(res.status, (err as { detail?: unknown }).detail));
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setUploading(false);
    }
  }, [sessionId]);

  return (
    <div className="capture-app">
      <div className="capture-card">
        <div className="capture-badge">Smart Fiatio</div>
        <h1>Take your photo</h1>
        <p className="capture-sub">
          This photo will appear on the desktop try-on screen automatically.
        </p>

        {error ? <div className="capture-err">{error}</div> : null}

        {done ? (
          <div className="capture-success">
            <div className="success-icon">✓</div>
            <h2>Photo sent!</h2>
            <p>Go back to the desktop — your image is ready. Pick a kurta and run try-on.</p>
          </div>
        ) : (
          <>
            <div className="camera-frame">
              {preview ? (
                <img src={preview} alt="Captured preview" className="capture-preview" />
              ) : (
                <video ref={videoRef} playsInline muted className="capture-video" />
              )}
              {!cameraReady && !preview && !error ? (
                <div className="camera-loading">Starting camera…</div>
              ) : null}
            </div>
            <canvas ref={canvasRef} hidden />

            <div className="capture-actions">
              {!preview ? (
                <button type="button" className="capture-btn primary" disabled={!cameraReady} onClick={capture}>
                  Capture
                </button>
              ) : (
                <>
                  <button type="button" className="capture-btn ghost" disabled={uploading} onClick={retake}>
                    Retake
                  </button>
                  <button type="button" className="capture-btn primary" disabled={uploading} onClick={sendPhoto}>
                    {uploading ? "Sending…" : "Send to desktop"}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
