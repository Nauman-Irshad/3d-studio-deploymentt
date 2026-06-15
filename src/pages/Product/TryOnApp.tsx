import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiUrl, formatApiError } from "../../services/api";
import { fetchGarmentList, garmentImageUrl } from "../../services/garments";
import type { TryOnConfig } from "../../types/tryOn";
import {
  validatePersonPhotoForTryOn,
  validateImageBlob,
  normalizeToJpegBlob,
  validateImageUrl,
  jpegBase64ToBlob,
  clientSideMockTryOn,
  TRYON_UPLOAD_MAX_SIDE,
  tryOnUploadFilename,
} from "../../utils/imageUtils";
import {
  clearCvCaptureSession,
  fetchCapturePhotoBlob,
  isCvCaptureMessage,
  readHandoffFromLocation,
  type CvCaptureHandoff,
} from "../../utils/cvHandoff";
import { SiteHeader } from "../../layouts/SiteChrome";
import { TryOnServerStatus } from "../../components/common/TryOnServerStatus";
import { ShoppingCartProvider, useShoppingCart } from "../../store/ShoppingCartContext";
import { cartProductFromTryOnSelection } from "../../store/cartProducts";
import { ProductCartActions } from "../../components/common/ProductCartActions";
import { TryOnCartHeaderButton } from "../../components/common/TryOnCartHeaderButton";
import { archiveTryonSession } from "../../services/archiveTryon";
import { useTryOnServerHealth } from "../../hooks/useTryOnServerHealth";
import { PipelineProductStrip, type PipelineStripItem } from "../../components/common/PipelineProductStrip";
import { LadiesCatalogPanel, LADIES_FILTER_ALL } from "../../components/common/LadiesCatalogPanel";
import { KurtaProductSidebar } from "../../components/common/KurtaProductSidebar";
import { StudioExampleGarments } from "../../components/common/StudioExampleGarments";
import { PhoneScanModal } from "../../components/common/PhoneScanModal";
import type { PhoneSyncUiStatus } from "../../services/phoneTryonSync";
import {
  catalogImageUrl,
  catalogItemKey,
  fetchLadiesCatalog,
  type LadiesCatalog,
  type LadiesCatalogSelection,
} from "../../services/ladiesCatalog";
import { GARMENT_TRYON_PICKS_MAX, ladiesCatalogNames } from "../../constants/catalogDisplay";
import { BackgroundProcessPanels } from "../../components/common/BackgroundProcessPanels";
import { preloadBackgroundRemovalModel, removeBackgroundToJpeg } from "../../utils/backgroundRemoval";
import { formatLadiesCatalogProductName, formatMenKurtaProductName, formatCustomUploadName } from "../../utils/productDisplayNames";

type UserPhoto = {
  blob: Blob;
  previewUrl: string;
  originalPreviewUrl: string;
  name: string;
};

type CustomGarment = {
  blob: Blob;
  previewUrl: string;
  name: string;
};

function revokePhotoUrls(photo: { previewUrl: string; originalPreviewUrl?: string } | null) {
  if (!photo) return;
  URL.revokeObjectURL(photo.previewUrl);
  if (photo.originalPreviewUrl && photo.originalPreviewUrl !== photo.previewUrl) {
    URL.revokeObjectURL(photo.originalPreviewUrl);
  }
}

const BASE_PROGRESS_LABELS: { max: number; text: string }[] = [
  { max: 15, text: "Preparing your images…" },
  { max: 30, text: "Uploading to AI server…" },
  { max: 72, text: "Generating try-on result…" },
  { max: 88, text: "Refining details…" },
  { max: 95, text: "Almost done…" },
  { max: 100, text: "Try-on complete!" },
];

function progressLabels(config: TryOnConfig): { max: number; text: string }[] {
  return [
    BASE_PROGRESS_LABELS[0],
    BASE_PROGRESS_LABELS[1],
    { max: 50, text: config.progressFittingText },
    ...BASE_PROGRESS_LABELS.slice(2),
  ];
}

function labelForProgress(p: number, labels: { max: number; text: string }[]): string {
  for (const step of labels) {
    if (p <= step.max) return step.text;
  }
  return labels[labels.length - 1].text;
}

export function TryOnApp({ config }: { config: TryOnConfig }) {
  return (
    <ShoppingCartProvider>
      <TryOnAppInner config={config} />
    </ShoppingCartProvider>
  );
}

function TryOnAppInner({ config }: { config: TryOnConfig }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const garmentFileInputRef = useRef<HTMLInputElement>(null);
  const personStepRef = useRef<HTMLElement>(null);
  const outputRef = useRef<HTMLElement>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultObjectUrlRef = useRef<string | null>(null);
  const garmentBlobCacheRef = useRef<Map<string, Blob>>(new Map());
  const [garmentList, setGarmentList] = useState<string[]>([]);
  const [garmentName, setGarmentName] = useState<string | null>(null);
  const [customGarment, setCustomGarment] = useState<CustomGarment | null>(null);
  const [userPhoto, setUserPhoto] = useState<UserPhoto | null>(null);
  const [personBgProcessing, setPersonBgProcessing] = useState(false);
  const [personBgNote, setPersonBgNote] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [garmentDragOver, setGarmentDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tryOnProgress, setTryOnProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userImageError, setUserImageError] = useState<string | null>(null);
  const [garmentPreviewError, setGarmentPreviewError] = useState<string | null>(null);
  const [brokenKurtas, setBrokenKurtas] = useState<Set<string>>(() => new Set());
  const [ladiesCatalog, setLadiesCatalog] = useState<LadiesCatalog>({ categories: [] });
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [catalogSelection, setCatalogSelection] = useState<LadiesCatalogSelection | null>(null);
  const [brokenCatalogKeys, setBrokenCatalogKeys] = useState<Set<string>>(() => new Set());
  const [resultImageError, setResultImageError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultB64, setResultB64] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [phoneScanOpen, setPhoneScanOpen] = useState(false);
  const [phoneSyncStatus, setPhoneSyncStatus] = useState<PhoneSyncUiStatus>("idle");
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const { serverHealth, refreshServerHealth } = useTryOnServerHealth();
  const vtonMode = serverHealth.vtonMode;
  const { addToCart, buyNow } = useShoppingCart();

  const progressSteps = useMemo(() => progressLabels(config), [config]);

  useEffect(() => {
    preloadBackgroundRemovalModel();
  }, []);

  const applyPersonJpeg = useCallback(async (jpeg: Blob, name: string) => {
    setError(null);
    setUserImageError(null);
    setPersonBgNote(null);
    const originalPreviewUrl = URL.createObjectURL(jpeg);
    setUserPhoto((prev) => {
      revokePhotoUrls(prev);
      return { blob: jpeg, previewUrl: originalPreviewUrl, originalPreviewUrl, name };
    });
    setPersonBgProcessing(true);
    try {
      const { blob: cutout, backgroundRemoved } = await removeBackgroundToJpeg(
        jpeg,
        TRYON_UPLOAD_MAX_SIDE,
      );
      const previewUrl = URL.createObjectURL(cutout);
      setUserPhoto((prev) => {
        if (!prev) return prev;
        if (prev.previewUrl !== prev.originalPreviewUrl) URL.revokeObjectURL(prev.previewUrl);
        return { ...prev, blob: cutout, previewUrl };
      });
      if (!backgroundRemoved) {
        setPersonBgNote(
          "Background removal could not run — using your original photo. Restart npm run dev and wait for the model to download (~40MB first time).",
        );
      }
    } finally {
      setPersonBgProcessing(false);
    }
  }, []);

  const applyCapturePhoto = useCallback(async (imageUrl: string, garment?: string | null, relaxed = false) => {
    const blob = await fetchCapturePhotoBlob(imageUrl);
    const check = await validatePersonPhotoForTryOn(blob, { relaxed });
    if (!check.ok) {
      setUserImageError(check.message);
      setError(check.message);
      return false;
    }
    await applyPersonJpeg(check.jpeg, "body-scan.jpg");
    if (garment) setGarmentName(garment);
    return true;
  }, [applyPersonJpeg]);

  useEffect(() => {
    if (config.id === "ladies") return;
    let cancelled = false;
    (async () => {
      try {
        const { names } = await fetchGarmentList(config.gallery);
        if (cancelled) return;
        setGarmentList(names);
        if (names.length) setGarmentName(names[0]);
        else setGarmentName(null);
        if (!names.length && !config.uploadOnlyGallery && config.emptyGalleryMessage) {
          setError(config.emptyGalleryMessage);
        }
      } catch {
        if (!cancelled) {
          setError(
            import.meta.env.PROD
              ? "Could not load outfit gallery. Refresh the page or try again in a minute."
              : "Could not load outfit gallery. Is npm run dev running?",
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [config.id, config.gallery, config.emptyGalleryMessage, config.uploadOnlyGallery]);

  useEffect(() => {
    if (config.id !== "ladies") return;
    let cancelled = false;
    void (async () => {
      try {
        const catalog = await fetchLadiesCatalog();
        if (cancelled) return;
        setLadiesCatalog(catalog);
        if (catalog.categories.length) {
          setError(null);
          setActiveCategoryId(LADIES_FILTER_ALL);
          const first = catalog.categories[0];
          const firstVisible = first ? ladiesCatalogNames(first.names)[0] : undefined;
          if (first && firstVisible) {
            setCatalogSelection({ categoryId: first.id, name: firstVisible });
          }
        } else if (config.emptyGalleryMessage) {
          setError(config.emptyGalleryMessage);
        }
      } catch {
        if (!cancelled) {
          setError(
            import.meta.env.PROD
              ? "Could not load ladies collections. Refresh the page — if this persists, redeploy may still be in progress."
              : "Could not load ladies collections. Is npm run dev running?",
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [config.id, config.emptyGalleryMessage]);

  const isLadies = config.id === "ladies";
  const showMenGallery = garmentList.length > 0 && !isLadies;
  const showLadiesCatalog = isLadies && ladiesCatalog.categories.length > 0;
  const showProductRail = showLadiesCatalog || showMenGallery;
  const categoryFilterId = activeCategoryId ?? LADIES_FILTER_ALL;

  useEffect(() => {
    let cancelled = false;
    const handoff = readHandoffFromLocation();
    const imageUrl = handoff?.capture?.image_url;
    if (!imageUrl) return;

    void (async () => {
      try {
        const ok = await applyCapturePhoto(imageUrl, handoff?.garment, !!handoff?.capture?.simple_mode);
        if (!cancelled && ok) clearCvCaptureSession();
      } catch (e) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Could not load body-scan photo.";
          setError(msg);
          setUserImageError(msg);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [applyCapturePhoto]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!isCvCaptureMessage(event.data)) return;
      const payload = event.data.payload as CvCaptureHandoff;
      const imageUrl = payload.image_url;
      if (!imageUrl) return;
      void (async () => {
        try {
          const ok = await applyCapturePhoto(imageUrl, null, !!payload.simple_mode);
          if (ok) clearCvCaptureSession();
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Could not load phone photo.";
          setError(msg);
          setUserImageError(msg);
        }
      })();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [applyCapturePhoto]);

  const setPhotoFromFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUserImageError("Only image files are allowed (JPG, PNG, WebP).");
      setError("Please upload an image file only.");
      return;
    }
    const check = await validatePersonPhotoForTryOn(file, { relaxed: true });
    if (!check.ok) {
      setUserImageError(check.message);
      setError(check.message);
      return;
    }
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    await applyPersonJpeg(check.jpeg, name);
  }, [applyPersonJpeg]);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setPhotoFromFile(file);
      e.target.value = "";
    },
    [setPhotoFromFile],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) setPhotoFromFile(file);
    },
    [setPhotoFromFile],
  );

  useEffect(() => {
    return () => {
      revokePhotoUrls(userPhoto);
    };
  }, [userPhoto]);

  const hasGarmentSelected = !!customGarment || !!garmentName || !!catalogSelection;

  const garmentPreview = useMemo(() => {
    if (customGarment) return customGarment.previewUrl;
    if (catalogSelection) {
      return catalogImageUrl(catalogSelection.categoryId, catalogSelection.name);
    }
    if (!garmentName) return null;
    return garmentImageUrl(garmentName, config.gallery);
  }, [customGarment, catalogSelection, garmentName, config.gallery]);

  const garmentDisplayName = useMemo(() => {
    if (customGarment) return formatCustomUploadName(isLadies ? "ladies" : "men", customGarment.name);
    if (catalogSelection) {
      const cat = ladiesCatalog.categories.find((c) => c.id === catalogSelection.categoryId);
      const baked = cat?.displayNames?.[catalogSelection.name];
      if (baked) return baked;
      return formatLadiesCatalogProductName(cat?.label ?? catalogSelection.categoryId, catalogSelection.name);
    }
    if (garmentName) return formatMenKurtaProductName(garmentName);
    return null;
  }, [customGarment, catalogSelection, garmentName, ladiesCatalog.categories, isLadies]);

  const selectedGarmentProduct = useMemo(
    () =>
      cartProductFromTryOnSelection({
        customGarment: customGarment
          ? { name: customGarment.name, previewUrl: customGarment.previewUrl }
          : null,
        catalogSelection,
        ladiesCatalog,
        garmentName,
        garmentGallery: config.gallery,
        channel: isLadies ? "ladies" : "men",
      }),
    [
      customGarment,
      catalogSelection,
      ladiesCatalog,
      garmentName,
      config.gallery,
      isLadies,
    ],
  );

  useEffect(() => {
    setGarmentPreviewError(null);
    if (!garmentPreview || customGarment) return;
    let cancelled = false;
    void validateImageUrl(garmentPreview).then((check) => {
      if (cancelled) return;
      if (!check.ok) {
        setGarmentPreviewError(check.message);
        setError(`Kurta image "${garmentName}" failed to load. ${check.message}`);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [garmentPreview, garmentName, customGarment]);

  const setGarmentFromFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setGarmentPreviewError("Only image files are allowed (JPG, PNG, WebP).");
      setError("Please upload a kurta image file only.");
      return;
    }
    const check = await validateImageBlob(file);
    if (!check.ok) {
      setGarmentPreviewError(check.message);
      setError(check.message);
      return;
    }
    setError(null);
    setGarmentPreviewError(null);
    setGarmentName(null);
    setCatalogSelection(null);
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    const previewUrl = URL.createObjectURL(check.jpeg);
    setCustomGarment((prev) => {
      revokePhotoUrls(prev);
      return { blob: check.jpeg, previewUrl, name };
    });
  }, []);

  const onGarmentFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) void setGarmentFromFile(file);
      e.target.value = "";
    },
    [setGarmentFromFile],
  );

  const onGarmentDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setGarmentDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) void setGarmentFromFile(file);
    },
    [setGarmentFromFile],
  );

  useEffect(() => {
    return () => {
      revokePhotoUrls(customGarment);
    };
  }, [customGarment]);

  const onCatalogImgError = useCallback((item: LadiesCatalogSelection) => {
    const key = catalogItemKey(item.categoryId, item.name);
    setBrokenCatalogKeys((prev) => new Set(prev).add(key));
    if (
      catalogSelection?.categoryId === item.categoryId &&
      catalogSelection?.name === item.name
    ) {
      setGarmentPreviewError("This outfit image could not be displayed.");
      setError(`Outfit "${item.name}" is missing or broken. Pick another.`);
    }
  }, [catalogSelection]);

  const onSelectCatalogItem = useCallback((item: LadiesCatalogSelection) => {
    setCustomGarment((prev) => {
      revokePhotoUrls(prev);
      return null;
    });
    setGarmentName(null);
    setCatalogSelection(item);
    setActiveCategoryId(item.categoryId);
    setGarmentPreviewError(null);
    setError(null);
  }, []);

  const onSelectMenGarment = useCallback((n: string) => {
    setCustomGarment((prev) => {
      revokePhotoUrls(prev);
      return null;
    });
    setCatalogSelection(null);
    setGarmentName(n);
    setGarmentPreviewError(null);
    setError(null);
  }, []);

  const onKurtaImgError = useCallback((name: string) => {
    setBrokenKurtas((prev) => new Set(prev).add(name));
    if (name === garmentName) {
      setGarmentPreviewError("This kurta image could not be displayed.");
      setError(`Kurta "${name}" is missing or broken. Pick another kurta.`);
    }
  }, [garmentName]);

  const onPhoneScanPhoto = useCallback(
    async (dataUrl: string) => {
      setError(null);
      setUserImageError(null);
      setPhoneSyncStatus("photo_received");
      setPersonBgProcessing(true);
      personStepRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      try {
        const blob = await fetchCapturePhotoBlob(dataUrl);
        const previewUrl = URL.createObjectURL(blob);
        setUserPhoto((prev) => {
          revokePhotoUrls(prev);
          return { blob, previewUrl, originalPreviewUrl: previewUrl, name: "phone-scan.jpg" };
        });

        const check = await validatePersonPhotoForTryOn(blob, { relaxed: true });
        if (!check.ok) {
          setPersonBgProcessing(false);
          setUserImageError(check.message);
          setError(check.message);
          return;
        }
        await applyPersonJpeg(check.jpeg, "phone-scan.jpg");
      } catch (e) {
        setPersonBgProcessing(false);
        const msg = e instanceof Error ? e.message : "Could not load phone photo.";
        setError(msg);
        setUserImageError(msg);
      }
    },
    [applyPersonJpeg],
  );

  const clearUserPhoto = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setUserPhoto((prev) => {
      revokePhotoUrls(prev);
      return null;
    });
    setPersonBgProcessing(false);
    setUserImageError(null);
  }, []);

  const clearGarmentSelection = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomGarment((prev) => {
      revokePhotoUrls(prev);
      return null;
    });
    setCatalogSelection(null);
    setGarmentName(null);
    setGarmentPreviewError(null);
  }, []);

  const onResultImgError = useCallback(() => {
    setResultImageError("Try-on result image could not be loaded. The link may have expired — run try-on again.");
    setError("Try-on result image could not be loaded. Please run try-on again.");
  }, []);

  const stopProgressTimer = useCallback(() => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  const startProgressTimer = useCallback(() => {
    stopProgressTimer();
    let p = 0;
    setTryOnProgress(0);
    setProgressLabel(labelForProgress(0, progressSteps));
    progressTimerRef.current = setInterval(() => {
      const step = p < 40 ? 4.5 : p < 75 ? 2.2 : p < 90 ? 1.0 : 0.2;
      p = Math.min(92, p + step);
      const rounded = Math.round(p);
      setTryOnProgress(rounded);
      setProgressLabel(labelForProgress(rounded, progressSteps));
    }, 180);
  }, [stopProgressTimer, progressSteps]);

  useEffect(() => () => stopProgressTimer(), [stopProgressTimer]);

  const clearResult = useCallback(() => {
    if (resultObjectUrlRef.current) {
      URL.revokeObjectURL(resultObjectUrlRef.current);
      resultObjectUrlRef.current = null;
    }
    setResultUrl(null);
    setResultB64(null);
    setResultBlob(null);
  }, []);

  const applyResultBlob = useCallback((blob: Blob) => {
    if (resultObjectUrlRef.current) URL.revokeObjectURL(resultObjectUrlRef.current);
    const localUrl = URL.createObjectURL(blob);
    resultObjectUrlRef.current = localUrl;
    setResultBlob(blob);
    setResultUrl(localUrl);
    setResultB64(null);
    setResultImageError(null);
  }, []);

  const finishTryOnWithLocalPreview = useCallback(
    async (humanJpeg: Blob, garmJpeg: Blob, note?: string) => {
      const blob = await clientSideMockTryOn(humanJpeg, garmJpeg);
      applyResultBlob(blob);
      void archiveTryonSession({
        human: humanJpeg,
        garment: garmJpeg,
        result: blob,
        garmentLabel: garmentDisplayName || "custom",
        page: config.id,
      });
      if (note) setError(note);
    },
    [applyResultBlob, config.id, garmentDisplayName],
  );

  useEffect(() => () => {
    if (resultObjectUrlRef.current) URL.revokeObjectURL(resultObjectUrlRef.current);
  }, []);

  const downloadResult = useCallback(() => {
    const base =
      customGarment?.name.replace(/\.[^.]+$/, "").replace(/\s+/g, "-") ||
      catalogSelection?.name.replace(/\.[^.]+$/, "").replace(/\s+/g, "-") ||
      garmentName?.replace(/\.[^.]+$/, "").replace(/\s+/g, "-") ||
      "tryon";
    const filename = `${config.downloadPrefix}-${base}.jpg`;

    const trigger = (href: string) => {
      const a = document.createElement("a");
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    };

    if (resultBlob) {
      const url = URL.createObjectURL(resultBlob);
      trigger(url);
      URL.revokeObjectURL(url);
      return;
    }
    if (resultB64) {
      trigger(resultB64);
      return;
    }
    if (resultUrl) {
      window.open(resultUrl, "_blank", "noopener,noreferrer");
    }
  }, [config.downloadPrefix, customGarment, catalogSelection, garmentName, resultBlob, resultB64, resultUrl]);

  const runTryOn = useCallback(async () => {
    setError(null);
    clearResult();
    setResultImageError(null);
    if (!userPhoto || !hasGarmentSelected) {
      setError(config.selectErrorMessage);
      return;
    }
    setLoading(true);
    startProgressTimer();
    let humanJpeg = userPhoto.blob;
    let garmJpeg: Blob | undefined;
    const abort = new AbortController();
    const apiTimer = window.setTimeout(() => abort.abort(), 600_000);
    try {
      if (customGarment) {
        garmJpeg = customGarment.blob;
      } else if (catalogSelection) {
        const cacheKey = catalogItemKey(catalogSelection.categoryId, catalogSelection.name);
        garmJpeg = garmentBlobCacheRef.current.get(cacheKey);
        if (!garmJpeg) {
          const garmRes = await fetch(garmentPreview!);
          if (!garmRes.ok) {
            setError(`Could not load outfit image (HTTP ${garmRes.status}).`);
            setGarmentPreviewError("Outfit file not found on server.");
            return;
          }
          try {
            garmJpeg = await normalizeToJpegBlob(await garmRes.blob(), TRYON_UPLOAD_MAX_SIDE);
            garmentBlobCacheRef.current.set(cacheKey, garmJpeg);
          } catch (e) {
            setGarmentPreviewError(e instanceof Error ? e.message : "Invalid outfit image.");
            setError(`Outfit image could not be converted: ${e instanceof Error ? e.message : String(e)}`);
            return;
          }
        }
      } else if (garmentName) {
        garmJpeg = garmentBlobCacheRef.current.get(garmentName);
        if (!garmJpeg) {
          const garmRes = await fetch(garmentPreview!);
          if (!garmRes.ok) {
            setError(`Could not load kurta image (HTTP ${garmRes.status}).`);
            setGarmentPreviewError("Kurta file not found on server.");
            return;
          }
          try {
            garmJpeg = await normalizeToJpegBlob(await garmRes.blob(), TRYON_UPLOAD_MAX_SIDE);
            garmentBlobCacheRef.current.set(garmentName, garmJpeg);
          } catch (e) {
            setGarmentPreviewError(e instanceof Error ? e.message : "Invalid kurta image.");
            setError(`Kurta image could not be converted: ${e instanceof Error ? e.message : String(e)}`);
            return;
          }
        }
      }
      if (!garmJpeg) {
        setError("No kurta image selected. Pick one from the gallery or upload your own.");
        return;
      }

      if (vtonMode === "preview") {
        await finishTryOnWithLocalPreview(humanJpeg, garmJpeg);
        return;
      }

      setTryOnProgress((prev) => Math.max(prev, 18));
      setProgressLabel("Uploading to IDM-VTON (Hugging Face)…");

      const fd = new FormData();
      fd.append("human_img", humanJpeg, tryOnUploadFilename(humanJpeg, "person"));
      fd.append("garm_img", garmJpeg, tryOnUploadFilename(garmJpeg, "garment"));
      fd.append("garment_des", config.garmentPrompt);
      fd.append("tryon_mode", "upper");

      setTryOnProgress((prev) => Math.max(prev, 28));
      setProgressLabel("AI fitting kurta on your body — wait 1-5 min…");

      const res = await fetch(apiUrl("/api/tryon"), {
        method: "POST",
        body: fd,
        signal: abort.signal,
      });

      let data: { url?: string; image_base64?: string; detail?: unknown; mode?: string; fallback?: string };
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setError("Invalid API response. Restart: npm run api");
        return;
      }

      if (!res.ok) {
        setError(formatApiError(res.status, data.detail));
        return;
      }

      if (data.fallback === "mock") {
        setError("Real AI failed — got preview overlay. Hugging Face may be busy; try again.");
      }

      if (data.url) {
        const imgRes = await fetch(data.url);
        if (imgRes.ok) {
          const resultBlobOut = await imgRes.blob();
          applyResultBlob(resultBlobOut);
          void archiveTryonSession({
            human: humanJpeg,
            garment: garmJpeg,
            result: resultBlobOut,
            garmentLabel: garmentDisplayName || "custom",
            page: config.id,
          });
          return;
        }
        setError("Could not download AI result image.");
        return;
      }

      if (data.image_base64) {
        const resultBlobOut = jpegBase64ToBlob(data.image_base64);
        applyResultBlob(resultBlobOut);
        void archiveTryonSession({
          human: humanJpeg,
          garment: garmJpeg,
          result: resultBlobOut,
          garmentLabel: garmentDisplayName || "custom",
          page: config.id,
        });
        return;
      }

      setError("Unexpected response from try-on server.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (e instanceof DOMException && e.name === "AbortError") {
        setError("AI try-on timed out (10 min). Hugging Face busy — try again.");
      } else if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
        setError(
          import.meta.env.PROD
            ? "Cannot reach try-on API on Render. Wait ~30s (free tier cold start) and try again."
            : "Cannot reach try-on API. Run: npm run api (port 8765)",
        );
      } else {
        setError(msg);
      }
    } finally {
      window.clearTimeout(apiTimer);
      stopProgressTimer();
      setTryOnProgress(100);
      setProgressLabel(labelForProgress(100, progressSteps));
      setLoading(false);
    }
  }, [
    userPhoto,
    hasGarmentSelected,
    customGarment,
    catalogSelection,
    garmentName,
    garmentPreview,
    vtonMode,
    config,
    progressSteps,
    garmentDisplayName,
    clearResult,
    startProgressTimer,
    stopProgressTimer,
    applyResultBlob,
    finishTryOnWithLocalPreview,
  ]);

  const embeddedInWebsite = useMemo(
    () => typeof window !== "undefined" && window.parent !== window,
    [],
  );

  const exampleGarments = useMemo((): PipelineStripItem[] => {
    if (isLadies && ladiesCatalog.categories.length) {
      const all = ladiesCatalog.categories.flatMap((cat) =>
        ladiesCatalogNames(cat.names).map((name) => ({
          kind: "ladies" as const,
          categoryId: cat.id,
          name,
        })),
      );
      const filtered =
        categoryFilterId === LADIES_FILTER_ALL
          ? all
          : all.filter((item) => item.categoryId === categoryFilterId);
      return filtered.slice(0, GARMENT_TRYON_PICKS_MAX);
    }
    if (garmentList.length) {
      return garmentList
        .slice(0, GARMENT_TRYON_PICKS_MAX)
        .map((name) => ({ kind: "men" as const, name }));
    }
    return [];
  }, [isLadies, ladiesCatalog.categories, garmentList, categoryFilterId]);

  const pipelineProductStripProps = {
    items: exampleGarments,
    gallery: config.gallery,
    catalog: isLadies ? ladiesCatalog : null,
    catalogSelection,
    garmentName,
    customGarment: !!customGarment,
    brokenMen: brokenKurtas,
    brokenCatalog: brokenCatalogKeys,
    onSelectLadies: onSelectCatalogItem,
    onSelectMen: onSelectMenGarment,
    onMenImageError: onKurtaImgError,
    onCatalogImageError: onCatalogImgError,
  };

  const runDisabled =
    loading ||
    personBgProcessing ||
    !serverHealth.online ||
    !userPhoto ||
    !hasGarmentSelected ||
    !!userImageError ||
    !!garmentPreviewError;

  const uploadIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20h16" strokeLinecap="round" />
    </svg>
  );

  const scanIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
    </svg>
  );

  return (
    <div
      className={`${isLadies ? "app ladies-app studio-layout" : "app studio-layout"}${showProductRail ? " has-product-rail" : ""}${sidebarHidden ? " sidebar-hidden" : ""}`}
    >
      {!embeddedInWebsite ? (
        <SiteHeader
          brandHref={isLadies ? "/ladies_try_on/" : "/"}
          extraActions={<TryOnCartHeaderButton />}
        />
      ) : null}

      {showLadiesCatalog ? (
        <LadiesCatalogPanel
          catalog={ladiesCatalog}
          activeCategoryId={activeCategoryId}
          selection={catalogSelection}
          brokenKeys={brokenCatalogKeys}
          onCategoryChange={setActiveCategoryId}
          onSelect={onSelectCatalogItem}
          onImageError={onCatalogImgError}
        />
      ) : showMenGallery ? (
        <KurtaProductSidebar
          garmentList={garmentList}
          garmentName={garmentName}
          brokenKurtas={brokenKurtas}
          gallery={config.gallery}
          onSelect={onSelectMenGarment}
          onImageError={onKurtaImgError}
        />
      ) : null}

      <div className="main-with-rail tryon-viewport-stage">
      {showProductRail ? (
        <button
          type="button"
          className="spotlight-sidebar-toggle"
          onClick={() => setSidebarHidden((hidden) => !hidden)}
          aria-expanded={!sidebarHidden}
          aria-controls="tryon-spotlight-sidebar"
          title={sidebarHidden ? "Show Spotlight menu" : "Hide Spotlight menu"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {sidebarHidden ? (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            ) : (
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
          <span>{sidebarHidden ? "Show menu" : "Hide menu"}</span>
        </button>
      ) : null}
      <div className="content pipeline-layout tryon-center-wrap">
        {!isLadies ? (
          <div className="page-header compact premium-page-header">
            <p className="premium-eyebrow">Men&apos;s Collection · AI Fitting</p>
            <h1>{config.pageTitle}</h1>
            <p className="page-subtitle">
              <a href="/ladies_try_on/">Women&apos;s Try-On</a>
            </p>
          </div>
        ) : null}

        {(error || userImageError || garmentPreviewError || resultImageError) ? (
          <div className="err" role="alert">
            {error || userImageError || garmentPreviewError || resultImageError}
          </div>
        ) : null}

        <div className="tryon-main tryon-main-centered tryon-workbench tryon-workbench-left-fit studio-layout">
        <div className="pipeline-row pipeline-row-unified">
          <section
            ref={personStepRef}
            className={`studio-card pipeline-step-unified person-step${personBgProcessing ? " is-bg-processing" : ""}${userPhoto ? " has-phone-photo" : ""}`}
          >
            <div className="studio-card-head">
              <h2>{config.personStepTitle ?? "Select Model"}</h2>
              <div className="studio-card-actions">
                <button
                  type="button"
                  className="studio-icon-btn studio-scan-btn"
                  aria-label="Scan QR code"
                  title="Scan QR code — take photo on phone"
                  onClick={() => {
                    setPhoneSyncStatus("waiting_scan");
                    setPhoneScanOpen(true);
                  }}
                >
                  {scanIcon}
                </button>
                <button
                  type="button"
                  className="studio-icon-btn"
                  aria-label="Upload photo"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadIcon}
                </button>
              </div>
            </div>

            {personBgNote ? (
              <p className="phone-sync-banner phone-sync-banner--waiting_scan" role="status">
                {personBgNote}
              </p>
            ) : null}

            {phoneSyncStatus !== "idle" ? (
              <div
                className={`phone-sync-banner phone-sync-banner--${phoneSyncStatus}`}
                role="status"
                aria-live="polite"
              >
                {phoneSyncStatus === "waiting_scan"
                  ? "Scan the QR code with your phone — waiting for scan…"
                  : phoneSyncStatus === "phone_connected"
                    ? "QR scanned on phone — take your photo there"
                    : phoneSyncStatus === "photo_received"
                      ? "Picture received on 2D Try-On ✓"
                      : "Picture not received — keep QR open and send again from phone"}
              </div>
            ) : null}

            <div
              className={`studio-preview${userPhoto && !userImageError ? " has-image" : ""}${dragOver ? " drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => !userPhoto && fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/*"
                hidden
                onChange={onFileChange}
              />
              {userPhoto && !userImageError ? (
                <>
                  <BackgroundProcessPanels
                    originalUrl={userPhoto.originalPreviewUrl}
                    processedUrl={userPhoto.previewUrl}
                    processing={personBgProcessing}
                    originalLabel="Your photo"
                    processedLabel="Transparent cutout"
                  />
                  <button type="button" className="studio-clear-btn" aria-label="Remove photo" onClick={clearUserPhoto}>
                    ×
                  </button>
                </>
              ) : userImageError ? (
                <div className="img-error-box compact-err">
                  <p>{userImageError}</p>
                </div>
              ) : (
                <div className="studio-preview-empty">
                  {uploadIcon}
                  <p>{config.personUploadLabel}</p>
                  <p className="studio-upload-hint">Background removed automatically on upload</p>
                  <button
                    type="button"
                    className="studio-scan-inline-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhoneSyncStatus("waiting_scan");
                      setPhoneScanOpen(true);
                    }}
                  >
                    Scan QR code
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="studio-card pipeline-step-unified garment-step">
            <div className="studio-card-head">
              <h2>{config.garmentStepTitle}</h2>
              <div className="studio-card-actions">
                <button
                  type="button"
                  className="studio-icon-btn"
                  aria-label="Upload garment"
                  onClick={() => garmentFileInputRef.current?.click()}
                >
                  {uploadIcon}
                </button>
              </div>
            </div>

            <div
              className={`studio-preview${garmentPreview && !garmentPreviewError ? " has-image" : ""}${garmentDragOver ? " drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setGarmentDragOver(true);
              }}
              onDragLeave={() => setGarmentDragOver(false)}
              onDrop={onGarmentDrop}
              onClick={() => !garmentPreview && garmentFileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && garmentFileInputRef.current?.click()}
            >
              <input
                ref={garmentFileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/*"
                hidden
                onChange={onGarmentFileChange}
              />
              {garmentPreview && !garmentPreviewError ? (
                <>
                  <img
                    src={garmentPreview}
                    alt={garmentDisplayName ?? "Selected garment"}
                    className="custom-kurta-preview"
                    onError={() => {
                      if (customGarment) setGarmentPreviewError("Your outfit image could not be displayed.");
                      else if (catalogSelection) onCatalogImgError(catalogSelection);
                      else if (garmentName) onKurtaImgError(garmentName);
                    }}
                  />
                  <button type="button" className="studio-clear-btn" aria-label="Remove garment" onClick={clearGarmentSelection}>
                    ×
                  </button>
                </>
              ) : garmentPreviewError ? (
                <div className="img-error-box compact-err">
                  <p>{garmentPreviewError}</p>
                </div>
              ) : (
                <div className="studio-preview-empty">
                  {uploadIcon}
                  <p>{config.garmentUploadLabel}</p>
                </div>
              )}
            </div>

            {isLadies && ladiesCatalog.categories.length ? (
              <StudioExampleGarments
                categories={ladiesCatalog.categories}
                activeCategoryId={categoryFilterId}
                onCategoryChange={setActiveCategoryId}
                {...pipelineProductStripProps}
              />
            ) : exampleGarments.length ? (
              <PipelineProductStrip
                {...pipelineProductStripProps}
                label="Try-on picks"
                gridCols={4}
                maxItems={GARMENT_TRYON_PICKS_MAX}
                variant="studio"
                showCartActions={false}
              />
            ) : null}

            {hasGarmentSelected && selectedGarmentProduct ? (
              <div className="studio-garment-cart-row">
                <p className="studio-garment-cart-label">
                  <strong>{garmentDisplayName}</strong>
                  <span>{selectedGarmentProduct.price}</span>
                </p>
                <ProductCartActions
                  layout="inline"
                  onAddToCart={() => addToCart(selectedGarmentProduct)}
                  onBuyNow={() => buyNow(selectedGarmentProduct)}
                />
              </div>
            ) : null}
          </section>

          <section className="studio-card pipeline-step-unified output-step" ref={outputRef} aria-live="polite">
            <div className="studio-card-head">
              <h2>Result</h2>
              <div className="studio-card-head-actions">
                <TryOnServerStatus
                  health={serverHealth}
                  onRefresh={() => void refreshServerHealth()}
                  variant="embedded"
                />
              {loading ? (
                <span className="output-status is-loading">Running</span>
              ) : resultUrl || resultB64 ? (
                <span className="output-status is-done">Done</span>
              ) : null}
              </div>
            </div>

            {loading ? (
              <div className="progress-block compact">
                <div className="progress-top">
                  <span className="progress-label">{progressLabel || "Starting…"}</span>
                  <span className="progress-percent">{tryOnProgress}%</span>
                </div>
                <div className="progress-track" role="progressbar" aria-valuenow={tryOnProgress} aria-valuemin={0} aria-valuemax={100}>
                  <div className={`progress-fill${loading ? " animating" : ""}`} style={{ width: `${tryOnProgress}%` }} />
                </div>
              </div>
            ) : null}

            <div className={`output-frame studio-preview${resultUrl || resultB64 ? " has-image" : ""}`}>
              {!loading && (resultUrl || resultB64) && !resultImageError ? (
                <img
                  src={resultUrl || resultB64 || ""}
                  alt="Try-on result"
                  className="output-result-img"
                  onError={onResultImgError}
                />
              ) : loading ? (
                <div className="output-empty loading-state">
                  <span className="spinner spinner-dark" />
                  <p>AI try-on in progress…</p>
                </div>
              ) : resultImageError ? (
                <div className="img-error-box compact-err"><p>{resultImageError}</p></div>
              ) : (
                <div className="studio-preview-empty">
                  {uploadIcon}
                  <p>{config.outputEmptyText}</p>
                </div>
              )}
            </div>

            <div className="studio-result-actions">
              <button
                className={`studio-run-btn${loading ? " loading" : ""}`}
                type="button"
                disabled={runDisabled}
                onClick={runTryOn}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Processing…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Run (~1–5 min)
                  </>
                )}
              </button>
              {!loading && (resultUrl || resultB64) && !resultImageError ? (
                <button type="button" className="download-btn download-btn-compact" onClick={downloadResult}>
                  Download
                </button>
              ) : null}
            </div>
            <p className="studio-run-note">Each run uses AI fitting — typically 1–5 minutes.</p>
          </section>
        </div>
        </div>
      </div>
      </div>

      <PhoneScanModal
        open={phoneScanOpen}
        onClose={() => {
          setPhoneScanOpen(false);
          if (phoneSyncStatus !== "photo_received") {
            setPhoneSyncStatus("idle");
          }
        }}
        onSyncStatus={setPhoneSyncStatus}
        onPhoto={(dataUrl) => {
          void onPhoneScanPhoto(dataUrl);
        }}
      />
    </div>
  );
}
