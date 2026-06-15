import { useShoppingCart } from "../../store/ShoppingCartContext";

export function TryOnCartHeaderButton() {
  const { cartCount, openDrawer, lines } = useShoppingCart();

  return (
    <button
      type="button"
      className="tk-header-cart-icon"
      onClick={openDrawer}
      title="Shopping cart"
      aria-label={`Shopping cart${cartCount ? `, ${cartCount} item` : ", empty"}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="1.85">
        <path
          d="M6 7h15l-1.5 9h-11L6 7zm0 0L5 3H2M9 20.5h.01M18 20.5h.01M8 20.5a1 1 0 102 0 1 1 0 00-2 0zm9 0a1 1 0 102 0 1 1 0 00-2 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {lines.length > 0 ? (
        <span className="tk-header-cart-badge">{lines.length > 9 ? "9+" : lines.length}</span>
      ) : null}
    </button>
  );
}
