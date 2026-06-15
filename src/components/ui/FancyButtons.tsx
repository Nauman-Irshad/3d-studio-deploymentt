import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import "../../assets/styles/fancy-buttons.css";

type NavVariant = "2d" | "3d";

type SpaceNavProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  prominent?: boolean;
  variant?: NavVariant;
  children: ReactNode;
};

function SpaceNavButton({
  active,
  prominent,
  variant = "3d",
  children,
  className = "",
  ...rest
}: SpaceNavProps) {
  const wrapClass = [
    "ui-space-btn-wrap",
    variant === "2d" ? "ui-space-btn-wrap--2d" : "ui-space-btn-wrap--3d",
    prominent ? "ui-space-btn-wrap--prominent" : "",
    active ? "is-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a {...rest} className={wrapClass} aria-current={active ? "page" : undefined}>
      <span className={`ui-space-btn ui-space-btn--${variant}`}>
        <strong>{children}</strong>
        <span className="ui-space-btn__stars-wrap" aria-hidden="true">
          <span className="ui-space-btn__stars" />
        </span>
        <span className="ui-space-btn__glow" aria-hidden="true">
          <span className="ui-space-btn__circle" />
          <span className="ui-space-btn__circle" />
        </span>
      </span>
    </a>
  );
}

export function TryOn2DNavButton(props: Omit<SpaceNavProps, "variant">) {
  return <SpaceNavButton {...props} variant="2d" />;
}

export function Studio3DNavButton(props: Omit<SpaceNavProps, "variant">) {
  return <SpaceNavButton {...props} variant="3d" />;
}

type BuyProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  compact?: boolean;
};

export function SlideBuyButton({ children = "Buy now", compact, className = "", ...rest }: BuyProps) {
  return (
    <button
      type="button"
      {...rest}
      className={`ui-slide-buy-btn${compact ? " ui-slide-buy-btn--compact" : ""} ${className}`.trim()}
    >
      <span className="ui-slide-buy-btn__text">{children}</span>
    </button>
  );
}
