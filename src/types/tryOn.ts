import type { GarmentGallery } from "../services/garments";

export type TryOnConfig = {
  id: "men" | "ladies";
  pageTitle: string;
  pageTagline: string;
  garmentStepTitle: string;
  personPhotoHint: string;
  personUploadLabel: string;
  personStepTitle?: string;
  personStepIntro?: string;
  personStepFoundation?: string;
  personUploadEmoji?: string;
  garmentUploadLabel: string;
  garmentUploadHint: string;
  customGarmentBadge: string;
  galleryHint: string;
  galleryScrollHint: string;
  previewPlaceholder: string;
  progressFittingText: string;
  outputEmptyText: string;
  downloadPrefix: string;
  garmentPrompt: string;
  gallery: GarmentGallery;
  showFindTailor: boolean;
  emptyGalleryMessage: string;
  selectErrorMessage: string;
  uploadOnlyGallery: boolean;
};
