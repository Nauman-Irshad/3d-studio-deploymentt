import { GARMENT_TRYON_PICKS_MAX } from "../../constants/catalogDisplay";
import type { LadiesCategory, LadiesCatalog } from "../../services/ladiesCatalog";
import { LADIES_FILTER_ALL } from "./LadiesCatalogPanel";
import {
  PipelineProductStrip,
  type PipelineStripItem,
} from "./PipelineProductStrip";
import type { GarmentGallery } from "../../services/garments";
import type { LadiesCatalogSelection } from "../../services/ladiesCatalog";

type Props = {
  categories: LadiesCategory[];
  activeCategoryId: string | null;
  onCategoryChange: (id: string) => void;
  items: PipelineStripItem[];
  label?: string;
  gallery: GarmentGallery;
  catalog: LadiesCatalog | null;
  catalogSelection: LadiesCatalogSelection | null;
  garmentName: string | null;
  customGarment: boolean;
  brokenMen: Set<string>;
  brokenCatalog: Set<string>;
  onSelectLadies: (item: LadiesCatalogSelection) => void;
  onSelectMen: (name: string) => void;
  onMenImageError: (name: string) => void;
  onCatalogImageError: (item: LadiesCatalogSelection) => void;
};

export function StudioExampleGarments({
  categories,
  activeCategoryId,
  onCategoryChange,
  items,
  label = "Try-on picks",
  ...stripProps
}: Props) {
  const filterId = activeCategoryId ?? LADIES_FILTER_ALL;
  const showCategories = categories.length > 1;

  return (
    <div className="studio-examples">
      <p className="studio-examples-title">{label}</p>
      <p className="studio-examples-hint">Tap an image to try on — shop with Add to cart in the left Spotlight menu</p>
      {showCategories ? (
        <div className="studio-spotlight-tabs" role="tablist" aria-label="Spotlight categories">
          <button
            type="button"
            role="tab"
            aria-selected={filterId === LADIES_FILTER_ALL}
            className={`studio-spotlight-btn${filterId === LADIES_FILTER_ALL ? " active" : ""}`}
            onClick={() => onCategoryChange(LADIES_FILTER_ALL)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={filterId === cat.id}
              className={`studio-spotlight-btn${filterId === cat.id ? " active" : ""}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      ) : null}
      <PipelineProductStrip
        {...stripProps}
        items={items}
        label=""
        gridCols={4}
        maxItems={GARMENT_TRYON_PICKS_MAX}
        variant="studio"
        showCartActions={false}
      />
    </div>
  );
}
