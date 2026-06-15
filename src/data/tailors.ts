export type TailorProfile = {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  stitchRatePkr: number;
  turnaround: string;
  /** Product lines this tailor stitches (2D men's, ladies, 3D). */
  stitchFor: string[];
};

/** Sample tailor network — replace with API / Firestore when ready. */
export const TAILOR_DIRECTORY: TailorProfile[] = [
  {
    id: "gulberg-stitch",
    name: "Gulberg Stitch Studio",
    area: "Lahore · Gulberg III",
    rating: 4.9,
    reviewCount: 128,
    stitchRatePkr: 4500,
    turnaround: "5–7 days",
    stitchFor: [
      "Men's 2D Kurta",
      "Classic Kurta Shalwar · Brown (3D)",
      "Embroidered Kurta Shalwar · Black (3D)",
    ],
  },
  {
    id: "thread-drape",
    name: "Thread & Drape Atelier",
    area: "Islamabad · F-7",
    rating: 4.8,
    reviewCount: 94,
    stitchRatePkr: 5200,
    turnaround: "4–6 days",
    stitchFor: [
      "Ladies 2D Kurti",
      "Texture Try On collection",
      "Premium Shalwar Kameez · White (3D)",
    ],
  },
  {
    id: "heritage-tailors",
    name: "Heritage Tailors Co.",
    area: "Karachi · Clifton",
    rating: 4.7,
    reviewCount: 210,
    stitchRatePkr: 4800,
    turnaround: "6–8 days",
    stitchFor: [
      "Men's 2D Kurta",
      "Waistcoat sets (3D)",
      "Classic Shalwar Kameez · Brown (3D)",
    ],
  },
  {
    id: "naqsh-e-kar",
    name: "Naqsh-e-Kar Boutique",
    area: "Lahore · DHA Phase 5",
    rating: 4.9,
    reviewCount: 76,
    stitchRatePkr: 6500,
    turnaround: "7–10 days",
    stitchFor: [
      "Ladies 2D Kurti",
      "User Image Ladies collection",
      "Embroidered Shalwar Kameez · Black (3D)",
    ],
  },
  {
    id: "stitch-line",
    name: "Stitch Line Express",
    area: "Online · ship nationwide",
    rating: 4.6,
    reviewCount: 312,
    stitchRatePkr: 3900,
    turnaround: "3–5 days",
    stitchFor: [
      "Men's 2D Kurta",
      "Ladies 2D Kurti",
      "Sky Blue Kurta Shalwar (3D)",
      "Fast standard kurta stitch",
    ],
  },
];

export function getTailorById(id: string): TailorProfile | undefined {
  return TAILOR_DIRECTORY.find((t) => t.id === id);
}

export function formatPkr(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}
