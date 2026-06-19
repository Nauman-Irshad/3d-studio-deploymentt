import { useEffect, useRef, useState } from "react";
import {
  fetchLadiesResourceManifest,
  formatFileSize,
  triggerResourceDownload,
  type LadiesResourceFile,
} from "../../services/ladiesResource";

export function ResourceHeaderButton() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<LadiesResourceFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || files.length) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchLadiesResourceManifest()
      .then((manifest) => {
        if (!cancelled) setFiles(manifest.files ?? []);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load resources.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, files.length]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className="resource-header-wrap" ref={panelRef}>
      <button
        type="button"
        className="tk-resource-btn"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        title="Download resource files"
      >
        Resource
      </button>

      {open ? (
        <div className="tk-resource-panel" role="menu" aria-label="Resource downloads">
          <p className="tk-resource-panel-title">Download files</p>
          {loading ? <p className="tk-resource-panel-msg">Loading…</p> : null}
          {error ? <p className="tk-resource-panel-msg tk-resource-panel-msg--error">{error}</p> : null}
          {!loading && !error && files.length === 0 ? (
            <p className="tk-resource-panel-msg">No resource files yet.</p>
          ) : null}
          <ul className="tk-resource-list">
            {files.map((file) => (
              <li key={file.name}>
                <button
                  type="button"
                  role="menuitem"
                  className="tk-resource-item"
                  onClick={() => triggerResourceDownload(file.name)}
                >
                  <span className="tk-resource-item-name">{file.label}</span>
                  <span className="tk-resource-item-meta">{formatFileSize(file.size)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
