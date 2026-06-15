import { useEffect, useId, useRef, useMemo } from "react";
import type { StoredFitPayload } from "./snapmeasureBridge";
import { SizeFinderSummaryContent } from "./SizeFinderSummaryContent";

type Props = {
  open: boolean;
  onClose: () => void;
  wizardUrl: string;
  aiFit: StoredFitPayload | null;
};

export function SizeChartModal({ open, onClose, wizardUrl, aiFit }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const savedHint = useMemo(() => {
    if (!aiFit?.updatedAt) return null;
    try {
      const d = new Date(aiFit.updatedAt);
      if (Number.isNaN(d.getTime())) return null;
      return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return null;
    }
  }, [aiFit?.updatedAt]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[min(92vh,760px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-stone-200 bg-[#faf9f7] shadow-2xl sm:max-w-2xl sm:rounded-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-stone-200/90 bg-white px-4 py-3 sm:px-5">
          <div>
            <h2 id={titleId} className="text-base font-bold text-stone-900 sm:text-lg">
              Your size finder summary
            </h2>
            <p className="mt-0.5 text-[11px] leading-snug text-stone-600">
              What you saved on step 3 of the wizard (measurements in inches). Edit values in the size finder app, then
              Save or Open 3D Studio again.
            </p>
            {savedHint ? (
              <p className="mt-1 text-[10px] text-stone-500">Last saved: {savedHint}</p>
            ) : null}
            {aiFit?.meanR2 != null &&
            typeof aiFit.meanR2 === "number" &&
            aiFit.meanR2 >= 0 &&
            aiFit.meanR2 <= 1 ? (
              <p className="mt-1 text-[10px] font-medium text-emerald-800">
                Mean R² when saved: ~{Math.round(aiFit.meanR2 * 100)}%
              </p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-stone-700 shadow-sm hover:bg-stone-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-amber-500/70"
          >
            Close
          </button>
        </div>

        <div className="sidebar-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <SizeFinderSummaryContent aiFit={aiFit} />
        </div>

        <div className="shrink-0 border-t border-stone-200 bg-white px-4 py-3 sm:px-5">
          <a
            href={wizardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border border-amber-400 bg-amber-500 px-4 py-3 text-center text-[13px] font-bold uppercase tracking-wide text-amber-950 shadow-sm transition-colors hover:bg-amber-400"
          >
            Open size finder wizard
          </a>
          <p className="mt-2 text-center text-[10px] text-stone-500 sm:text-left">
            New tab — update steps 1–3 and save again to refresh this summary.
          </p>
        </div>
      </div>
    </div>
  );
}
