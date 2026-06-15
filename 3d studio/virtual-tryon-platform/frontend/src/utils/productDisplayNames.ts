const J_BRAND = "J.";

export function format3dStudioProductName(label: string): string {
  const t = label.trim();
  if (!t) return `${J_BRAND} Kurta`;
  if (t.startsWith(`${J_BRAND} `) || t.startsWith("J. ")) return t;
  return `${J_BRAND} ${t}`;
}
