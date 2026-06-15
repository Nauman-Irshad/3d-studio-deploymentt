/** Inline SVG only — no network, no emoji */

export function IconDress({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3c1.2 0 2.2.8 2.5 2l1.2 3.5h5l-1 2-4 8v5H8.3v-5l-4-8-1-2h5L9.5 5c.3-1.2 1.3-2 2.5-2Z"
        fill="currentColor"
        fillOpacity={0.92}
      />
    </svg>
  );
}

export function IconTop({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4h8l2 3v3H6V7l2-3Zm-2 7h12v2l-1.5 9h-3l-1-6h-3l-1 6H7.5L6 13v-2Z"
        fill="currentColor"
        fillOpacity={0.92}
      />
    </svg>
  );
}

export function IconBottom({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3h10l1 4v3H6V7l1-4Zm-1 8h12l-1 10H7L6 11Z"
        fill="currentColor"
        fillOpacity={0.92}
      />
    </svg>
  );
}

export function IconSleeved({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 8 8 5h8l3 3v4l-2 10H6L4 12V8Zm3-1 1 2v9h6V9l1-2H8Z"
        fill="currentColor"
        fillOpacity={0.92}
      />
    </svg>
  );
}

export function IconSleeveless({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 5h6l2 2v11H7V7l2-2Zm-2 3h10v2H7V8Zm0 4h10v8H7v-8Z"
        fill="currentColor"
        fillOpacity={0.92}
      />
    </svg>
  );
}

export function IconCheck({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={3}>
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevron({ className = "h-4 w-4", open }: { className?: string; open?: boolean }) {
  return (
    <svg
      className={`${className} transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
