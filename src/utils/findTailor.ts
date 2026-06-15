import { garmentImageUrl } from "../services/garments";
import { websitePath } from "../constants/websiteUrls";

export type FindTailorPayload = {
  garmentName?: string;
  garmentImageUrl?: string;
};

export function openFindTailor(payload: FindTailorPayload): void {
  if (typeof window !== 'undefined' && window.parent !== window) {
    window.parent.postMessage(
      { type: 'smartfitao-find-tailor', payload },
      '*'
    );
    return;
  }

  const params = new URLSearchParams();
  if (payload.garmentName) params.set('garment', payload.garmentName);
  if (payload.garmentImageUrl) params.set('garmentImg', payload.garmentImageUrl);
  const q = params.toString();
  window.location.href = websitePath(`/try-on/tailors${q ? `?${q}` : ''}`);
}

export function findTailorFromSelection(garmentName: string | null): void {
  openFindTailor({
    garmentName: garmentName ?? undefined,
    garmentImageUrl: garmentName ? garmentImageUrl(garmentName) : undefined,
  });
}
