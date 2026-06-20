import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { useCustomizerStore } from "./store";

function formatSeconds(ms: number): string {
  return (ms / 1000).toFixed(1);
}

function isGarmentAsset(item: string | undefined): boolean {
  if (!item) return false;
  return /\.(glb|gltf|obj)(\?|#|$)/i.test(item);
}

/** Compact load indicator in the canvas header — never blocks the 3D viewport. */
export function StudioHeaderLoadingBar() {
  const activeModelPath = useCustomizerStore((s) => s.activeModelPath);
  const { active, progress, item } = useProgress();
  const [elapsedMs, setElapsedMs] = useState(0);
  const prevPath = useRef(activeModelPath);

  const garmentLoading = active && isGarmentAsset(item);

  useEffect(() => {
    if (prevPath.current !== activeModelPath) {
      prevPath.current = activeModelPath;
      setElapsedMs(0);
    }
  }, [activeModelPath]);

  useEffect(() => {
    if (!garmentLoading) {
      setElapsedMs(0);
      return;
    }
    const start = Date.now();
    const id = window.setInterval(() => {
      setElapsedMs(Date.now() - start);
    }, 100);
    return () => window.clearInterval(id);
  }, [garmentLoading, activeModelPath]);

  if (!garmentLoading) return null;

  const pct = Math.min(100, Math.round(progress));

  return (
    <div
      className="flex shrink-0 items-center gap-2 rounded-lg border border-amber-200/90 bg-amber-50/95 px-2 py-1 shadow-sm sm:px-2.5"
      aria-live="polite"
      aria-busy="true"
      title="Loading 3D garment"
    >
      <span className="hidden text-[9px] font-bold uppercase tracking-wide text-amber-900 sm:inline">
        Loading
      </span>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-amber-200/80 sm:w-20">
        <div
          className="h-full rounded-full bg-amber-600 transition-[width] duration-150"
          style={{ width: `${Math.max(pct, 6)}%` }}
        />
      </div>
      <span className="whitespace-nowrap text-[9px] font-semibold tabular-nums text-amber-950 sm:text-[10px]">
        {pct}% · {formatSeconds(elapsedMs)}s
      </span>
    </div>
  );
}
