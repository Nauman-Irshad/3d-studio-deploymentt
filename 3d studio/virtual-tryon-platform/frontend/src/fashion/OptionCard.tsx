import type { ReactNode } from "react";
import { IconCheck } from "./icons";

type Props = {
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
  gradientClass: string;
  icon?: ReactNode;
};

export function OptionCard({
  title,
  subtitle,
  selected,
  onClick,
  gradientClass,
  icon,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative h-[4.25rem] w-full overflow-hidden rounded-xl text-left transition-all duration-200 ease-out sm:h-[4.5rem]",
        "border shadow-inner-soft",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[#ebe8e3]",
        selected
          ? "border-amber-600/85 shadow-md shadow-amber-900/10"
          : "border-zinc-800/90 hover:border-zinc-600/80",
      ].join(" ")}
    >
      <div
        className={`absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04] ${gradientClass}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-white/5" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0" />
      </div>
      {icon ? (
        <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/40 text-white/95 shadow backdrop-blur-[2px]">
          {icon}
        </div>
      ) : null}
      <div className="absolute bottom-0 left-0 right-0 p-2 pr-10">
        <p className="text-[11px] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] sm:text-xs">
          {title}
        </p>
        {subtitle ? (
          <p className="mt-0.5 line-clamp-1 text-[9px] font-medium leading-snug text-zinc-200/90 sm:text-[10px]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {selected ? (
        <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[#1a1510] shadow">
          <IconCheck className="h-2.5 w-2.5" />
        </div>
      ) : null}
    </button>
  );
}
