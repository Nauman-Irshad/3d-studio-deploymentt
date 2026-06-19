import { useEffect, useRef, useState, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useGLTF } from "@react-three/drei";
import { BASE_MODELS } from "./baseModels";
import { LANDING_MODELS, LEGACY_MODELS, type LocalModelEntry } from "./localModels";
import { MiniProductPreview } from "./MiniProductPreview";
import { absoluteModelUrl } from "../lib/absoluteModelUrl";
import { useMobileEmbedMode } from "./useMobileEmbedMode";
import { useCustomizerStore } from "./store";

/** Placeholder before 3D mounts (lazy) or if observer says off-screen. */
function CatalogThumb({
  title,
  active,
  fillParent,
}: {
  title: string;
  active: boolean;
  fillParent?: boolean;
}) {
  return (
    <div
      className={[
        fillParent
          ? "flex h-full w-full min-h-0 shrink-0 flex-col items-center justify-center rounded-t-xl bg-gradient-to-br from-stone-100 via-neutral-100 to-stone-200 px-2 text-center ring-1 ring-inset ring-stone-200/80"
          : "flex h-[200px] min-h-[200px] w-full shrink-0 flex-col items-center justify-center rounded-t-xl bg-gradient-to-br from-stone-100 via-neutral-100 to-stone-200 px-2 text-center ring-1 ring-inset ring-stone-200/80",
        active ? "ring-2 ring-amber-500/70 ring-offset-1 ring-offset-[#f3f1ed]" : "",
      ].join(" ")}
    >
      <span className="line-clamp-3 text-[9px] font-semibold leading-tight text-stone-700 sm:text-[10px]">
        {title}
      </span>
      <span className="mt-1.5 text-[7px] font-medium uppercase tracking-wider text-amber-800/80">
        Preview loads here
      </span>
    </div>
  );
}

const PREVIEW_SHELL =
  "h-[200px] min-h-[200px] w-full shrink-0 overflow-hidden rounded-t-xl";

/**
 * Mount WebGL when the tile is in view (lazy) so we stay under the browser WebGL context limit.
 * Drag on the preview to orbit; clicks here do not bubble (select via title/price below).
 */
function LazySidebarModelPreview({
  url,
  title,
  active,
}: {
  url: string;
  title: string;
  active?: boolean;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShow3d(true);
        else setShow3d(false);
      },
      { root: null, rootMargin: "160px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [url]);

  const stopBubble = (e: MouseEvent | ReactPointerEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={shellRef}
      className={PREVIEW_SHELL}
      onClick={stopBubble}
      onPointerDown={stopBubble}
      title="Drag to rotate"
    >
      {show3d ? (
        <MiniProductPreview
          url={url}
          enableOrbit
          className="h-full w-full min-h-0 cursor-grab overflow-hidden rounded-t-xl bg-neutral-100 ring-0 active:cursor-grabbing"
        />
      ) : (
        <CatalogThumb title={title} active={!!active} fillParent />
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-2 flex items-center gap-1.5">
      <span className="h-px w-4 rounded-full bg-amber-700/45" aria-hidden />
      <h2 className="text-[9px] font-bold uppercase tracking-[0.18em] text-stone-500">
        {children}
      </h2>
    </div>
  );
}

function ProductGrid({
  models,
  activeModelPath,
  setActiveModelPath,
  addToCart,
  navigate,
  showCartActions = true,
}: {
  models: LocalModelEntry[];
  activeModelPath: string;
  setActiveModelPath: (path: string) => void;
  addToCart: (product: { id: string; label: string; price: string; publicPath: string }) => void;
  navigate: ReturnType<typeof useNavigate>;
  showCartActions?: boolean;
}) {
  return (
    <ul className="flex flex-row gap-2 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
      {models.map((m) => {
        const on = activeModelPath === m.publicPath;
        const select = () => setActiveModelPath(m.publicPath);
        const preloadModel = () => {
          try {
            useGLTF.preload(absoluteModelUrl(m.publicPath));
          } catch {
            /* ignore preload errors */
          }
        };
        const handleAddToCart = (e: MouseEvent) => {
          e.stopPropagation();
          addToCart({
            id: m.id,
            label: m.label,
            price: m.price,
            publicPath: m.publicPath,
          });
        };
        const handleBuyNow = (e: MouseEvent) => {
          e.stopPropagation();
          setActiveModelPath(m.publicPath);
          addToCart({
            id: m.id,
            label: m.label,
            price: m.price,
            publicPath: m.publicPath,
          });
          const { cartLines, userDisplayName } = useCustomizerStore.getState();
          navigate("/tailors", {
            state: {
              from: "buyNow",
              focusProduct: {
                id: m.id,
                label: m.label,
                price: m.price,
                publicPath: m.publicPath,
              },
              cartLines,
              userDisplayName,
            },
          });
        };
        return (
          <li key={m.id} className="w-[min(152px,46vw)] shrink-0 min-w-0 md:w-auto md:shrink">
            <div
              className={[
                "flex h-full flex-col overflow-hidden rounded-xl border text-left transition-all duration-200",
                on
                  ? "border-amber-600/80 bg-white shadow-sm shadow-amber-900/10 ring-1 ring-amber-500/20"
                  : "border-stone-200/95 bg-white/90 shadow-sm shadow-stone-300/10 hover:border-stone-300",
              ].join(" ")}
            >
              <div
                role="button"
                tabIndex={0}
                aria-pressed={on}
                onClick={select}
                onMouseEnter={preloadModel}
                onFocus={preloadModel}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select();
                  }
                }}
                className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f1ed]"
              >
                <LazySidebarModelPreview url={m.publicPath} title={m.label} active={on} />
                <div className="flex flex-col gap-0.5 px-1.5 pt-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <span className="line-clamp-2 text-[9px] font-semibold leading-snug text-stone-900 sm:text-[10px]">
                      {m.label}
                    </span>
                    {on ? (
                      <span className="shrink-0 rounded-full bg-amber-600 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-white sm:text-[8px]">
                        Live
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[10px] font-semibold tabular-nums text-amber-900 sm:text-[11px]">
                    {m.price}
                  </p>
                </div>
              </div>
              {showCartActions ? (
                <div className="grid grid-cols-2 gap-1 px-1.5 pb-1.5 pt-1">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="rounded-lg border border-stone-300 bg-white px-1 py-1.5 text-center text-[8px] font-bold uppercase tracking-wide text-stone-800 shadow-sm hover:bg-stone-50 sm:text-[9px]"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="ui-slide-buy-btn ui-slide-buy-btn--compact"
                  >
                    Buy now
                  </button>
                </div>
              ) : (
                <p className="px-1.5 pb-2 text-center text-[7px] font-medium uppercase tracking-wider text-stone-400 sm:text-[8px]">
                  Tap to view in main canvas
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ControlPanel() {
  const navigate = useNavigate();
  const mobileEmbed = useMobileEmbedMode();
  const activeModelPath = useCustomizerStore((s) => s.activeModelPath);
  const setActiveModelPath = useCustomizerStore((s) => s.setActiveModelPath);
  const addToCart = useCustomizerStore((s) => s.addToCart);
  const baseModelEntries: LocalModelEntry[] = BASE_MODELS.map((m) => ({
    id: m.id,
    label: m.label,
    fileLabel: m.label,
    publicPath: m.publicPath,
    price: "Base mesh",
  }));
  return (
    <aside
      className={
        mobileEmbed
          ? "relative flex h-full w-[min(280px,42vw)] shrink-0 flex-col overflow-hidden border-r border-stone-300/90 bg-sidebar-light shadow-[1px_0_18px_rgba(0,0,0,0.06)]"
          : "relative flex max-h-[min(46vh,380px)] w-full shrink-0 flex-col overflow-hidden border-b border-stone-300/90 bg-sidebar-light shadow-[0_4px_18px_rgba(0,0,0,0.06)] md:max-h-none md:h-full md:w-[min(300px,36vw)] md:border-b-0 md:border-r md:shadow-[1px_0_18px_rgba(0,0,0,0.06)] lg:w-[min(380px,32vw)]"
      }
    >
      <div className="sticky top-0 z-20 shrink-0 border-b border-stone-300/80 bg-[#f3f1ed] px-3 py-3 sm:px-3.5 sm:py-3.5">
        <div className="flex items-center gap-2.5">
          <MiniProductPreview
            url="/brand-kurta-logo.glb"
            className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-stone-300/70"
            enableOrbit={false}
            autoRotate
            autoRotateSpeed={2.4}
          />
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-400/45 bg-white/60 px-2 py-0.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/35 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </span>
              <span className="text-[8px] font-semibold uppercase tracking-wider text-stone-600">
                SmartFitao
              </span>
            </div>
            <h1 className="mt-1 font-sans text-lg font-bold leading-tight tracking-tight text-stone-900 sm:text-xl">
              SmartFitao AI
            </h1>
            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-amber-800/90">
              3D studio
            </p>
          </div>
        </div>
      </div>

      <div className="sidebar-scroll min-h-[8rem] flex-1 space-y-4 overflow-y-auto px-3 py-3 sm:space-y-6 sm:px-5 sm:py-5 md:min-h-0">
        <section className="min-w-0">
          <SectionLabel>Landing products (GLB)</SectionLabel>
          <ProductGrid
            models={LANDING_MODELS}
            activeModelPath={activeModelPath}
            setActiveModelPath={setActiveModelPath}
            addToCart={addToCart}
            navigate={navigate}
          />
        </section>

        <section className="min-w-0">
          <SectionLabel>Studio classics (GLTF)</SectionLabel>
          <ProductGrid
            models={LEGACY_MODELS}
            activeModelPath={activeModelPath}
            setActiveModelPath={setActiveModelPath}
            addToCart={addToCart}
            navigate={navigate}
          />
        </section>

        <section className="min-w-0">
          <SectionLabel>Base models (body / mannequin)</SectionLabel>
          {baseModelEntries.length === 0 ? (
            <p className="rounded-lg border border-dashed border-stone-300/90 bg-white/50 px-3 py-2 text-[10px] leading-snug text-stone-600">
              No base models. Run <code className="rounded bg-stone-100 px-1">npm run sync-models</code> to copy from{" "}
              <code className="rounded bg-stone-100 px-1">base models/</code>.
            </p>
          ) : (
            <ProductGrid
              models={baseModelEntries}
              activeModelPath={activeModelPath}
              setActiveModelPath={setActiveModelPath}
              addToCart={addToCart}
              navigate={navigate}
              showCartActions={false}
            />
          )}
        </section>

      </div>
    </aside>
  );
}
