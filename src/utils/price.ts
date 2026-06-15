/** Parse display prices like "Rs 3,790" to integer PKR. */
export function parseDisplayPriceToPkr(price: string): number {
  const digits = price.replace(/[^\d]/g, "");
  const n = Number.parseInt(digits, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}
