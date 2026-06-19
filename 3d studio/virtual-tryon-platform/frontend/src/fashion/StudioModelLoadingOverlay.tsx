import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { useCustomizerStore } from "./store";

function formatSeconds(ms: number): string {
  return (ms / 1000).toFixed(1);
}

/** Shows elapsed time + progress while a 3D garment is loading. */
export function StudioModelLoadingOverlay() {
  const activeModelPath = useCustomizerStore((s) => s.activeModelPath);
  const { active, progress, item } = useProgress();
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const prevPath = useRef(activeModelPath);

  useEffect(() => {
    if (prevPath.current !== activeModelPath) {
      prevPath.current = activeModelPath;
      setStartedAt(Date.now());
      setElapsedMs(0);
    }
  }, [activeModelPath]);

  useEffect(() => {
    if (!active) {
      setStartedAt(null);
      setElapsedMs(0);
      return;
    }
    if (startedAt == null) setStartedAt(Date.now());
    const id = window.setInterval(() => {
      if (startedAt != null) setElapsedMs(Date.now() - startedAt);
    }, 100);
    return () => window.clearInterval(id);
  }, [active, startedAt]);

  if (!active) return null;

  const pct = Math.min(100, Math.round(progress));
  const label = item ? item.split("/").pop() ?? "3D model" : "3D model";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#282828]/55 backdrop-blur-[2px]"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-white/10 bg-stone-900/90 px-5 py-4 text-center shadow-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/90">
          Loading 3D product
        </p>
        <p className="mt-2 truncate text-sm font-semibold text-white">{label}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-[width] duration-150"
            style={{ width: `${Math.max(pct, 8)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-stone-300">
          {pct}% · {formatSeconds(elapsedMs)}s
        </p>
      </div>
    </div>
  );
}
