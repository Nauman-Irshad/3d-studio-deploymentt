import { apiUrl } from "./api";
import type { TailorProfile } from "../data/tailors";
import { parseDisplayPriceToPkr } from "../utils/price";

export type CheckoutLineItem = {
  label: string;
  amountPkr: number;
};

export type CreateCheckoutPayload = {
  productLabel: string;
  productPrice: string;
  tailor: TailorProfile;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutSessionResult =
  | { mode: "stripe"; url: string }
  | { mode: "demo"; items: CheckoutLineItem[]; totalPkr: number };

export async function createCheckoutSession(
  payload: CreateCheckoutPayload,
): Promise<CheckoutSessionResult> {
  const productPkr = parseDisplayPriceToPkr(payload.productPrice);
  const stitchPkr = payload.tailor.stitchRatePkr;
  const items: CheckoutLineItem[] = [
    { label: payload.productLabel, amountPkr: productPkr },
    { label: `Stitching — ${payload.tailor.name}`, amountPkr: stitchPkr },
  ];
  const totalPkr = productPkr + stitchPkr;

  try {
    const res = await fetch(apiUrl("/api/checkout/create-session"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_label: payload.productLabel,
        product_amount_pkr: productPkr,
        tailor_id: payload.tailor.id,
        tailor_name: payload.tailor.name,
        stitch_amount_pkr: stitchPkr,
        success_url: payload.successUrl,
        cancel_url: payload.cancelUrl,
      }),
    });
    const data = (await res.json()) as { url?: string; mode?: string; detail?: string };
    if (res.ok && data.url) {
      return { mode: "stripe", url: data.url };
    }
  } catch {
    /* fall through to demo */
  }

  return { mode: "demo", items, totalPkr };
}
