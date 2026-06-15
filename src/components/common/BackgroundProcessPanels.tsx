type Props = {
  originalUrl: string | null;
  processedUrl: string | null;
  processing: boolean;
  originalLabel?: string;
  processedLabel?: string;
};

export function BackgroundProcessPanels({
  originalUrl,
  processedUrl,
  processing,
  originalLabel = "Your upload",
  processedLabel = "Transparent cutout",
}: Props) {
  if (!originalUrl && !processedUrl && !processing) return null;

  return (
    <div className="bg-process-row" aria-live="polite">
      <div className="bg-process-panel">
        <span className="bg-process-label">{originalLabel}</span>
        <div className="bg-process-frame">
          {originalUrl ? (
            <img src={originalUrl} alt={originalLabel} />
          ) : (
            <span className="bg-process-placeholder">—</span>
          )}
        </div>
      </div>
      <div className="bg-process-arrow" aria-hidden="true">
        →
      </div>
      <div className="bg-process-panel">
        <span className="bg-process-label">{processedLabel}</span>
        <div className={`bg-process-frame bg-process-frame--cutout${processing ? " is-processing" : ""}`}>
          {processing ? (
            <div className="bg-process-loading">
              <span className="spinner spinner-dark" />
              <p>Fast background removal…</p>
            </div>
          ) : processedUrl ? (
            <img src={processedUrl} alt={processedLabel} />
          ) : (
            <span className="bg-process-placeholder">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
