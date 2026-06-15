import { Suspense, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MiniProductPreview } from "./MiniProductPreview";
import { useCustomizerStore, type CartLine } from "./store";

type Props = {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  onRemoveLine: (lineId: string) => void;
};

export function ShoppingCartDrawer({ open, onClose, lines, onRemoveLine }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const userDisplayName = useCustomizerStore((s) => s.userDisplayName);
  const [expandedLineId, setExpandedLineId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setExpandedLineId(null);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        aria-label="Close cart"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92dvh,720px)] w-full max-w-lg flex-col rounded-t-2xl border border-stone-200 bg-[#faf9f7] shadow-2xl sm:max-w-xl sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-stone-200/90 px-4 py-3 sm:px-5">
          <div>
            <h2 id={titleId} className="font-sans text-base font-bold text-stone-900 sm:text-lg">
              Your cart
            </h2>
            <p className="mt-0.5 text-[10px] leading-snug text-stone-600 sm:text-[11px]">
              {lines.length > 0
                ? "One outfit at a time — expand for a 3D preview."
                : "Add an outfit from the sidebar to see it here."}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-stone-700 shadow-sm hover:bg-stone-50"
          >
            Close
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
          {lines.length === 0 ? (
            <p className="rounded-xl border border-dashed border-stone-300 bg-white/70 px-4 py-8 text-center text-[12px] text-stone-600">
              No items yet. Pick an outfit and tap <span className="font-semibold">Add to cart</span> or{" "}
              <span className="font-semibold">Buy now</span>.
            </p>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => {
                const expanded = expandedLineId === line.lineId;
                return (
                  <li
                    key={line.lineId}
                    className="overflow-hidden rounded-xl border border-stone-200/95 bg-white shadow-sm sm:px-0"
                  >
                    <div className="flex items-start justify-between gap-2 px-3 py-3 sm:px-4">
                      <button
                        type="button"
                        onClick={() => setExpandedLineId(expanded ? null : line.lineId)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <p className="text-[13px] font-semibold leading-snug text-stone-900">{line.label}</p>
                        <p className="mt-0.5 text-[12px] font-semibold tabular-nums text-amber-900">{line.price}</p>
                        <p className="mt-1 text-[10px] font-medium text-violet-700">
                          {expanded ? "▼ Hide outfit preview" : "▶ Preview outfit"}
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveLine(line.lineId);
                          if (expandedLineId === line.lineId) setExpandedLineId(null);
                        }}
                        className="shrink-0 rounded-lg border border-stone-300 px-2 py-1 text-[10px] font-semibold text-stone-600 hover:border-red-300 hover:bg-red-50 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>

                    {expanded ? (
                      <div className="border-t border-stone-100 bg-stone-50/80 px-3 pb-3 pt-2 sm:px-4">
                        <div className="h-44 w-full overflow-hidden rounded-xl border border-stone-200/90 bg-[#282828] ring-1 ring-black/5">
                          <Suspense
                            fallback={
                              <div className="flex h-full items-center justify-center text-[10px] text-stone-400">
                                Loading 3D…
                              </div>
                            }
                          >
                            <MiniProductPreview
                              url={line.publicPath}
                              enableOrbit={false}
                              className="h-full w-full min-h-0 overflow-hidden rounded-xl bg-neutral-800 ring-0"
                            />
                          </Suspense>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="shrink-0 border-t border-stone-200 bg-white/95 px-4 py-4 sm:px-5">
            <p className="text-center text-[11px] font-medium text-stone-600">
              Ready to stitch? Find a tailor who can work with your chosen outfit.
            </p>
            <Link
              to="/tailors"
              state={{
                from: "cart",
                cartLines: lines,
                userDisplayName,
              }}
              onClick={() => onClose()}
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-emerald-600 bg-gradient-to-b from-emerald-600 to-emerald-800 px-4 py-3 text-center text-[13px] font-bold uppercase tracking-wide text-white shadow-md transition-colors hover:from-emerald-500 hover:to-emerald-700"
            >
              Explore available tailors
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
