import { useEffect, useId, useRef, useState } from "react";
import { formatPkr, getTailorById, TAILOR_DIRECTORY } from "../../data/tailors";
import type { CartLine } from "../../store/shoppingCart";
import type { CartDrawerStep } from "../../store/ShoppingCartContext";
import { parseDisplayPriceToPkr } from "../../utils/price";
import { createCheckoutSession } from "../../services/stripeCheckout";

type Props = {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  onRemoveLine: (lineId: string) => void;
  drawerStep: CartDrawerStep;
  selectedTailorId: string | null;
  onStepChange: (step: CartDrawerStep) => void;
  onSelectTailor: (tailorId: string) => void;
};

export function TryOnCartDrawer({
  open,
  onClose,
  lines,
  onRemoveLine,
  drawerStep,
  selectedTailorId,
  onStepChange,
  onSelectTailor,
}: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const line = lines[0] ?? null;
  const tailor = selectedTailorId ? getTailorById(selectedTailorId) : null;
  const productPkr = line ? parseDisplayPriceToPkr(line.price) : 0;
  const stitchPkr = tailor?.stitchRatePkr ?? 0;
  const totalPkr = productPkr + stitchPkr;

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
    if (!open) {
      setPaying(false);
      setPayError(null);
    }
  }, [open]);

  if (!open) return null;

  const title =
    drawerStep === "product"
      ? "Your outfit"
      : drawerStep === "tailors"
        ? "Choose a tailor"
        : drawerStep === "checkout"
          ? "Checkout"
          : "Payment";

  const handlePayWithStripe = async () => {
    if (!line || !tailor) return;
    setPaying(true);
    setPayError(null);
    try {
      const origin = window.location.origin;
      const path = window.location.pathname;
      const result = await createCheckoutSession({
        productLabel: line.label,
        productPrice: line.price,
        tailor,
        successUrl: `${origin}${path}?checkout=success`,
        cancelUrl: `${origin}${path}?checkout=cancel`,
      });
      if (result.mode === "stripe") {
        window.location.href = result.url;
        return;
      }
      onStepChange("success");
    } catch (e) {
      setPayError(e instanceof Error ? e.message : "Payment could not start.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div
      className="tk-cart-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`tk-cart-drawer tk-cart-drawer--wide${drawerStep === "tailors" ? " tk-cart-drawer--tailors" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="tk-cart-drawer-head">
          <div>
            <h2 id={titleId}>{title}</h2>
            {drawerStep === "product" && line ? (
              <p>Review your pick, then choose a tailor for stitching.</p>
            ) : drawerStep === "tailors" ? (
              <p>Location, reviews, and stitch rates — no sign-up needed here.</p>
            ) : drawerStep === "checkout" ? (
              <p>Product + tailor stitching — Stripe handles card payment on their page.</p>
            ) : drawerStep === "success" ? (
              <p>Payment received — your tailor will confirm shortly.</p>
            ) : null}
          </div>
          <button ref={closeRef} type="button" className="tk-cart-close" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="tk-cart-drawer-body">
          {drawerStep === "product" ? (
            !line ? (
              <p className="tk-cart-empty">
                No outfit yet. Select a kurta in the sidebar or garment step, then tap{" "}
                <strong>Add to cart</strong>.
              </p>
            ) : (
              <div className="tk-cart-product-panel">
                <ul className="tk-cart-lines">
                  <li className="tk-cart-line tk-cart-line--hero">
                    <div className="tk-cart-line-thumb tk-cart-line-thumb--hero">
                      {line.publicPath.startsWith("blob:") ||
                      line.publicPath.startsWith("http") ||
                      line.publicPath.startsWith("/") ? (
                        <img src={line.publicPath} alt="" loading="lazy" />
                      ) : (
                        <span aria-hidden>Outfit</span>
                      )}
                    </div>
                    <div className="tk-cart-line-info">
                      <p className="tk-cart-line-label">{line.label}</p>
                      <p className="tk-cart-line-price">{line.price}</p>
                    </div>
                    <button
                      type="button"
                      className="tk-cart-line-remove"
                      aria-label={`Remove ${line.label}`}
                      onClick={() => onRemoveLine(line.lineId)}
                    >
                      ×
                    </button>
                  </li>
                </ul>
                <button type="button" className="tk-cart-find-tailor-btn" onClick={() => onStepChange("tailors")}>
                  Find tailor for stitch
                </button>
                <p className="tk-cart-find-tailor-hint">Compare stitch rates from verified tailors.</p>
              </div>
            )
          ) : null}

          {drawerStep === "tailors" ? (
            <>
              {line ? (
                <div className="tk-cart-inline-product">
                  <span className="tk-cart-inline-product-label">{line.label}</span>
                  <span className="tk-cart-inline-product-price">{line.price}</span>
                </div>
              ) : null}
              <ul className="tk-tailor-list">
                {TAILOR_DIRECTORY.map((t) => (
                  <li key={t.id} className="tk-tailor-card">
                    <div className="tk-tailor-card-head">
                      <div>
                        <h3>{t.name}</h3>
                        <p className="tk-tailor-card-area">{t.area}</p>
                        <p className="tk-tailor-card-rating">
                          ★ {t.rating.toFixed(1)} · {t.reviewCount} reviews
                        </p>
                      </div>
                      <div className="tk-tailor-card-rate">
                        <span className="tk-tailor-card-rate-label">Stitch from</span>
                        <strong>{formatPkr(t.stitchRatePkr)}</strong>
                        <span className="tk-tailor-card-turnaround">{t.turnaround}</span>
                      </div>
                    </div>
                    <ul className="tk-tailor-stitch-for">
                      {t.stitchFor.map((product) => (
                        <li key={product}>{product}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="tk-tailor-select-btn"
                      onClick={() => {
                        onSelectTailor(t.id);
                        onStepChange("checkout");
                      }}
                    >
                      Select tailor — {formatPkr(t.stitchRatePkr)} stitch
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {drawerStep === "checkout" && line && tailor ? (
            <div className="tk-checkout-panel">
              <div className="tk-checkout-line">
                <div>
                  <p className="tk-checkout-row-label">{line.label}</p>
                  <p className="tk-checkout-row-meta">Product</p>
                </div>
                <p className="tk-checkout-row-price">{line.price}</p>
              </div>
              <div className="tk-checkout-line">
                <div>
                  <p className="tk-checkout-row-label">{tailor.name}</p>
                  <p className="tk-checkout-row-meta">
                    {tailor.area} · ★ {tailor.rating.toFixed(1)} · {tailor.turnaround}
                  </p>
                </div>
                <p className="tk-checkout-row-price">{formatPkr(stitchPkr)}</p>
              </div>
              <div className="tk-checkout-total-row">
                <span>Total</span>
                <strong>{formatPkr(totalPkr)}</strong>
              </div>

              <p className="tk-stripe-hint">
                Tap below — Stripe opens in a new secure page for card, Apple Pay, or Google Pay. We only
                show your product and stitch prices here.
              </p>

              {payError ? (
                <p className="tk-checkout-error" role="alert">
                  {payError}
                </p>
              ) : null}

              <button
                type="button"
                className="tk-stripe-pay-btn"
                disabled={paying}
                onClick={() => void handlePayWithStripe()}
              >
                {paying ? "Opening Stripe…" : `Pay ${formatPkr(totalPkr)} with Stripe`}
              </button>
            </div>
          ) : null}

          {drawerStep === "success" ? (
            <div className="tk-checkout-success">
              <p className="tk-checkout-success-title">Order placed</p>
              <p>
                <strong>{line?.label}</strong> with <strong>{tailor?.name}</strong> — total{" "}
                <strong>{formatPkr(totalPkr)}</strong>.
              </p>
            </div>
          ) : null}
        </div>

        <div className="tk-cart-drawer-foot">
          {drawerStep === "tailors" ? (
            <button type="button" className="tk-cart-back-btn" onClick={() => onStepChange("product")}>
              ← Back to outfit
            </button>
          ) : drawerStep === "checkout" ? (
            <button type="button" className="tk-cart-back-btn" onClick={() => onStepChange("tailors")}>
              ← Choose another tailor
            </button>
          ) : drawerStep === "success" ? (
            <button type="button" className="tk-cart-checkout-btn" onClick={onClose}>
              Done
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
