import type { ReactNode } from "react";
import { IconChevron } from "./icons";

type Props = {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export function ExpandableSection({ title, open, onToggle, children }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-900/35 shadow-inner-soft">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-zinc-800/25"
      >
        <span className="text-sm font-semibold tracking-tight text-zinc-100">{title}</span>
        <IconChevron className="shrink-0 text-zinc-500" open={open} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 border-t border-zinc-800/50 bg-black/15 px-4 py-3.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
