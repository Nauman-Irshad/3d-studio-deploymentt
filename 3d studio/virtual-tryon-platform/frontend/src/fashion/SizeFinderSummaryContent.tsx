import { useMemo } from "react";
import type { StoredFitPayload } from "./snapmeasureBridge";

/** Same order/labels as size finder step 3 (`TWELVE_SUMMARY_ROWS`). */
const MEASUREMENT_ROWS: readonly { apiField: string; label: string }[] = [
  { apiField: "neck", label: "Neck" },
  { apiField: "shoulder", label: "Shoulder" },
  { apiField: "chest", label: "Chest" },
  { apiField: "waist", label: "Waist" },
  { apiField: "hip", label: "Hip" },
  { apiField: "arm", label: "Arm Length" },
  { apiField: "bicep", label: "Bicep" },
  { apiField: "forearm", label: "Forearm" },
  { apiField: "wrist", label: "Wrist" },
  { apiField: "thigh", label: "Thigh" },
  { apiField: "calf", label: "Calf" },
  { apiField: "insideLeg", label: "Inside Leg" },
];

const DERIVED_LOWER_BODY = new Set(["thigh", "calf", "insideLeg"]);

function rowAccuracyText(
  apiField: string,
  isDerived: boolean,
  r2ByField: Record<string, number> | undefined | null,
): string {
  if (isDerived) {
    if (apiField === "insideLeg") return "~55% typical (AI geometry: hip + height)";
    return "~55% typical (AI geometry: hip)";
  }
  const r2 = r2ByField?.[apiField];
  if (typeof r2 === "number" && !Number.isNaN(r2) && r2 >= 0 && r2 <= 1) {
    return `~${Math.round(r2 * 100)}% R² (hold-out test)`;
  }
  return "No R² data";
}

function sourceBadgeTitle(isDerived: boolean): string {
  return isDerived
    ? "AI geometry — proportional estimate from hip / height"
    : "AI model — neural net prediction";
}

function cmToInchesLabel(cm: number | undefined): string {
  if (typeof cm !== "number" || Number.isNaN(cm)) return "—";
  return (Math.round((cm / 2.54) * 10) / 10).toFixed(1);
}

type Props = {
  aiFit: StoredFitPayload | null;
};

/**
 * Wizard overview + full measurements table (same copy as “Check cloth size chart” modal body).
 */
export function SizeFinderSummaryContent({ aiFit }: Props) {
  const measurementsCm = aiFit?.measurementsCm;
  const hasFullTable = useMemo(
    () =>
      measurementsCm != null &&
      typeof measurementsCm === "object" &&
      MEASUREMENT_ROWS.some(({ apiField }) => {
        const v = measurementsCm[apiField];
        return typeof v === "number" && !Number.isNaN(v);
      }),
    [measurementsCm],
  );

  const fitLine = aiFit?.fitPreference?.trim() || "—";

  if (!aiFit) {
    return (
      <p className="rounded-lg border border-dashed border-stone-300 bg-white/60 px-3 py-3 text-[12px] leading-relaxed text-stone-600">
        No saved run yet. Open the size finder, complete all 3 steps, then use <strong>Save</strong> or{" "}
        <strong>Open 3D Studio</strong> — your measurements will show here.
      </p>
    );
  }

  return (
    <>
      <div className="mb-4 rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Wizard overview</p>
        <ol className="mt-2 space-y-2 text-[12px] text-stone-800">
          <li className="flex gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white">
              1
            </span>
            <span>
              <span className="font-semibold text-stone-900">Profile</span>
              <span className="block text-[11px] text-stone-600">
                Age, height &amp; weight (entered in the wizard — change there if needed).
              </span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white">
              2
            </span>
            <span>
              <span className="font-semibold text-stone-900">Style &amp; fit</span>
              <span className="mt-0.5 block rounded-md bg-stone-50 px-2 py-1 text-[11px] text-stone-700 ring-1 ring-stone-100">
                {fitLine}
              </span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-amber-950">
              3
            </span>
            <span>
              <span className="font-semibold text-stone-900">Measurements</span>
              <span className="block text-[11px] text-stone-600">
                Table below matches step 3 — AI vs geometry estimates for lower leg.
              </span>
            </span>
          </li>
        </ol>
      </div>

      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600">Measurements (inches)</h3>
      <p className="mt-1 text-[10px] text-stone-500">
        Every row is <span className="font-medium text-stone-700">AI</span> (neural or geometry). Accuracy shows hold-out
        R² when the wizard saved metrics, or a typical band for geometry.
      </p>

      {hasFullTable && measurementsCm ? (
        <div className="mt-3 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="grid min-w-[520px] grid-cols-[minmax(5rem,1fr)_2.25rem_4rem_minmax(6.5rem,1fr)] gap-x-2 gap-y-1 border-b border-stone-200 bg-stone-50 px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-stone-600 sm:min-w-[560px] sm:px-3">
            <span>Measurement</span>
            <span className="text-center">AI</span>
            <span className="text-center">in</span>
            <span>Accuracy</span>
          </div>
          <ul className="min-w-[520px] divide-y divide-stone-100 sm:min-w-[560px]">
            {MEASUREMENT_ROWS.map(({ apiField, label }) => {
              const isDerived = DERIVED_LOWER_BODY.has(apiField);
              const inches = cmToInchesLabel(measurementsCm[apiField]);
              const acc = rowAccuracyText(apiField, isDerived, aiFit?.accuracyR2ByField);
              return (
                <li
                  key={apiField}
                  className="grid grid-cols-[minmax(5rem,1fr)_2.25rem_4rem_minmax(6.5rem,1fr)] items-center gap-x-2 gap-y-1 px-2 py-2 text-[12px] sm:px-3"
                >
                  <span className="font-medium text-stone-900">{label}</span>
                  <span className="flex justify-center">
                    <span
                      title={sourceBadgeTitle(isDerived)}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white"
                    >
                      AI
                    </span>
                  </span>
                  <span className="text-center tabular-nums text-stone-800">
                    {inches === "—" ? "—" : inches}
                  </span>
                  <span className="min-w-0 text-[10px] leading-snug text-stone-700" title={acc}>
                    {acc}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="mt-3 space-y-2 rounded-xl border border-amber-200/80 bg-amber-50/60 px-3 py-3 text-[12px] text-stone-800">
          <p>
            Full measurement list was not stored in this browser yet. Open the wizard, finish step 3, then tap{" "}
            <strong>Save</strong> or <strong>Open 3D Studio</strong> so all rows are saved.
          </p>
          <p className="tabular-nums text-[11px] text-stone-700">
            Chest (from handoff):{" "}
            <strong>{typeof aiFit.chestIn === "number" ? `${aiFit.chestIn.toFixed(1)} in` : "—"}</strong>
            <br />
            Waist (from handoff):{" "}
            <strong>{typeof aiFit.pantWaist === "number" ? `${aiFit.pantWaist.toFixed(1)} in` : "—"}</strong>
          </p>
        </div>
      )}
    </>
  );
}
