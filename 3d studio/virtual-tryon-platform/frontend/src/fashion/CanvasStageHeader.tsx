import { BACKGROUND_SCENES } from "./backgroundScenes";
import { preloadBackdrop } from "./backdropPreload";
import { ShoppingCartDrawer } from "./ShoppingCartDrawer";
import { useCustomizerStore } from "./store";

/**
 * Canvas-only header: backdrops, cart/ordering, profile.
 */
export function CanvasStageHeader() {
  const activeBackgroundPath = useCustomizerStore((s) => s.activeBackgroundPath);
  const setActiveBackgroundPath = useCustomizerStore((s) => s.setActiveBackgroundPath);
  const cartLines = useCustomizerStore((s) => s.cartLines);
  const removeCartLine = useCustomizerStore((s) => s.removeCartLine);
  const shoppingCartOpen = useCustomizerStore((s) => s.shoppingCartOpen);
  const setShoppingCartOpen = useCustomizerStore((s) => s.setShoppingCartOpen);

  return (
    <header className="relative flex w-full shrink-0 items-stretch gap-1.5 border-b border-stone-200/80 bg-white px-2 py-1 shadow-sm sm:gap-2 sm:px-2.5 sm:py-1.5">
      <ShoppingCartDrawer
        open={shoppingCartOpen}
        onClose={() => setShoppingCartOpen(false)}
        lines={cartLines}
        onRemoveLine={removeCartLine}
      />
      {/* Back to 2D AI try-on (breaks out of iframe shell) */}
      <div className="flex shrink-0 items-center border-r border-stone-200/90 pr-2 sm:pr-3">
        <a
          href="/ladies_try_on/"
          target="_top"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-[#9d174d]/35 bg-gradient-to-b from-[#fdf2f8] to-[#fce7f3] px-2.5 py-2 text-[10px] font-bold uppercase tracking-wide text-[#6b2140] shadow-sm transition-colors hover:border-[#9d174d]/60 hover:from-[#fce7f3] hover:to-[#fbcfe8] sm:px-3 sm:text-[11px]"
          title="Open 2D AI virtual try-on"
        >
          <svg className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="whitespace-nowrap">2D Try-On</span>
        </a>
      </div>

      {/* Start: all backdrop EXRs */}
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden sm:gap-2.5">
        <p className="hidden shrink-0 text-[9px] font-bold uppercase tracking-wider text-stone-400 sm:block">
          Backdrop
        </p>
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto pb-0.5 pt-0.5 [scrollbar-width:none] sm:gap-1.5 [&::-webkit-scrollbar]:hidden">
          {BACKGROUND_SCENES.map((b) => {
            const on = activeBackgroundPath === b.publicPath;
            return (
              <button
                key={b.id}
                type="button"
                title={b.label}
                onMouseEnter={() => preloadBackdrop(b.publicPath)}
                onFocus={() => preloadBackdrop(b.publicPath)}
                onClick={() => setActiveBackgroundPath(b.publicPath)}
                className={[
                  "flex shrink-0 items-center gap-1 rounded-md px-1 py-0.5 transition-all duration-150",
                  on
                    ? "bg-amber-50 ring-1 ring-amber-500 ring-offset-1 ring-offset-white"
                    : "hover:bg-stone-100",
                ].join(" ")}
              >
                <div
                  className="h-7 w-7 shrink-0 rounded-md shadow-inner ring-1 ring-black/[0.06] sm:h-8 sm:w-8"
                  style={{ background: b.swatch }}
                  aria-hidden
                />
                <span
                  className={[
                    "hidden max-w-[3.5rem] truncate text-left text-[9px] font-semibold leading-tight text-stone-600 sm:inline-block sm:max-w-[4.25rem] sm:text-[10px]",
                    on ? "!text-amber-950" : "",
                  ].join(" ")}
                >
                  {b.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Order confirmation */}
      <div className="flex shrink-0 items-center gap-1.5 border-l border-stone-200/90 pl-2 sm:gap-2 sm:pl-3">
        <button
          type="button"
          onClick={() => setShoppingCartOpen(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-stone-300/90 bg-stone-50 px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wide text-stone-800 shadow-sm transition-colors hover:border-amber-500/50 hover:bg-amber-50/80 sm:px-2.5 sm:py-2 sm:text-[11px]"
        >
          <svg className="h-3.5 w-3.5 shrink-0 text-amber-800 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={1.75}>
            <path d="M5 12.5l4.2 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="max-w-[7rem] truncate sm:max-w-[9rem]">Confirm order</span>
        </button>
      </div>

      {/* Cart — left of account */}
      <div className="flex shrink-0 items-center border-l border-stone-200/90 pl-2 sm:pl-3">
        <button
          type="button"
          onClick={() => setShoppingCartOpen(true)}
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-stone-300/90 bg-stone-50 text-stone-800 shadow-sm transition-colors hover:border-amber-500/50 hover:bg-amber-50 sm:h-10 sm:w-10"
          title="Shopping cart"
          aria-label={`Shopping cart, ${cartLines.length} item${cartLines.length === 1 ? "" : "s"}`}
        >
          <svg className="h-[46%] w-[46%]" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={1.85}>
            <path
              d="M6 7h15l-1.5 9h-11L6 7zm0 0L5 3H2M9 20.5h.01M18 20.5h.01M8 20.5a1 1 0 102 0 1 1 0 00-2 0zm9 0a1 1 0 102 0 1 1 0 00-2 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {cartLines.length > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-amber-600 px-1 text-[9px] font-bold text-white ring-2 ring-white">
              {cartLines.length > 99 ? "99+" : cartLines.length}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
