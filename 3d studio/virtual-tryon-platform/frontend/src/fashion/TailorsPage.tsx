import { Link, useLocation } from "react-router-dom";
import type { CartLine } from "./store";

export type TailorsLocationState = {
  from?: "cart" | "buyNow";
  focusProduct?: { id: string; label: string; price: string; publicPath: string };
  cartLines?: CartLine[];
  userDisplayName?: string;
};

const PLACEHOLDER_TAILORS = [
  {
    id: "1",
    name: "Gulberg Stitch Studio",
    focus: "Festive & formal menswear",
    area: "Lahore · visits & pickup",
  },
  {
    id: "2",
    name: "Thread & Drape Atelier",
    focus: "Shalwar kameez, kurta refinements",
    area: "Online consult + ship",
  },
  {
    id: "3",
    name: "Heritage Tailors Co.",
    focus: "Waistcoat sets, alterations",
    area: "Karachi · appointment only",
  },
];

/**
 * Placeholder directory — wire to a real tailor marketplace API when ready.
 */
export function TailorsPage() {
  const location = useLocation();
  const st = (location.state ?? null) as TailorsLocationState | null;
  const fromCart = st?.from === "cart";
  const fromBuyNow = st?.from === "buyNow";
  const focusProduct = st?.focusProduct;
  const cartLines = st?.cartLines ?? [];
  const cartSummary =
    cartLines.length > 0 ? cartLines.map((l) => l.label).join(" · ") : null;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gradient-to-b from-[#f5f2ec] to-stone-200/90 text-stone-900">
      <header className="border-b border-stone-300/80 bg-white/90 px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800/90">SmartFitao</p>
            <h1 className="font-sans text-xl font-bold text-stone-900 sm:text-2xl">Explore tailors</h1>
            <p className="mt-1 max-w-xl text-[12px] leading-snug text-stone-600">
              {fromBuyNow ? (
                <>
                  You used <span className="font-semibold text-[#5c3d2e]">Buy now</span> — your selected outfit is
                  carried to this page for tailor matching.
                </>
              ) : (
                <>
                  Connect your cart outfit with specialists. Listings below are samples — replace with your partner
                  network.
                </>
              )}
            </p>
          </div>
          <Link
            to="/"
            className="shrink-0 self-start rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-center text-[12px] font-semibold text-stone-800 shadow-sm transition-colors hover:bg-stone-50"
          >
            ← 3D studio
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
        {fromBuyNow && focusProduct ? (
          <div className="mb-4 rounded-2xl border border-[#8b5a3c]/50 bg-gradient-to-br from-[#faf6f1] to-[#ebe4dc] px-4 py-4 shadow-md shadow-stone-400/15">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5c3d2e]">Buy now · Selected outfit</p>
            <p className="mt-1.5 text-[15px] font-semibold text-stone-900">{focusProduct.label}</p>
            <p className="mt-0.5 text-[13px] font-semibold tabular-nums text-[#6b4423]">{focusProduct.price}</p>
          </div>
        ) : null}

        {fromBuyNow && cartLines.length > 0 ? (
          <div className="mb-4 rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-[12px] text-stone-800 shadow-sm">
            <span className="font-semibold">Cart on this session:</span>{" "}
            {cartLines.map((l) => l.label).join(" · ")}
          </div>
        ) : null}

        {fromCart ? (
          <div className="mb-5 space-y-2">
            <div className="rounded-xl border border-emerald-200/90 bg-emerald-50/80 px-4 py-3 text-[12px] text-emerald-950 shadow-sm">
              <span className="font-semibold">From your cart:</span> share your chosen garment with a tailor when you
              book.
            </div>
            {cartSummary ? (
              <div className="rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-[12px] text-stone-800 shadow-sm">
                <span className="font-semibold">Outfit:</span> {cartSummary}
              </div>
            ) : null}
          </div>
        ) : null}

        <ul className="space-y-3">
          {PLACEHOLDER_TAILORS.map((t) => (
            <li
              key={t.id}
              className="rounded-2xl border border-stone-200/95 bg-white p-4 shadow-md shadow-stone-300/20 sm:flex sm:items-center sm:justify-between sm:gap-4"
            >
              <div>
                <h2 className="text-[15px] font-bold text-stone-900">{t.name}</h2>
                <p className="mt-0.5 text-[12px] text-stone-600">{t.focus}</p>
                <p className="mt-1 text-[11px] font-medium text-amber-900/90">{t.area}</p>
              </div>
              <button
                type="button"
                className="mt-3 shrink-0 rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-[12px] font-semibold text-stone-800 shadow-sm transition-colors hover:bg-white sm:mt-0"
              >
                Request quote
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
