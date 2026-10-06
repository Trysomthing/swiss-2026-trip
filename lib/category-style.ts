import {
  Landmark,
  UtensilsCrossed,
  TrainFront,
  BedDouble,
  Compass,
  Tag,
  Plane,
  Link2,
  type LucideIcon,
} from "lucide-react";

export type StyleCategory =
  | "sightseeing"
  | "food"
  | "transport"
  | "lodging"
  | "activity"
  | "other"
  | "flight"
  | "hotel"
  | "link";

interface CategoryStyle {
  icon: LucideIcon;
  label: string;
  tintVar: "sight" | "food" | "transport" | "lodging" | "activity" | "other";
}

const CATEGORY_STYLES: Record<StyleCategory, CategoryStyle> = {
  sightseeing: { icon: Landmark, label: "Sightseeing", tintVar: "sight" },
  food: { icon: UtensilsCrossed, label: "Food", tintVar: "food" },
  transport: { icon: TrainFront, label: "Transport", tintVar: "transport" },
  lodging: { icon: BedDouble, label: "Lodging", tintVar: "lodging" },
  activity: { icon: Compass, label: "Activity", tintVar: "activity" },
  other: { icon: Tag, label: "Other", tintVar: "other" },
  flight: { icon: Plane, label: "Flight", tintVar: "transport" },
  hotel: { icon: BedDouble, label: "Hotel", tintVar: "lodging" },
  link: { icon: Link2, label: "Link", tintVar: "other" },
};

export function getCategoryStyle(category: string | null | undefined): CategoryStyle {
  return CATEGORY_STYLES[(category as StyleCategory) ?? "other"] ?? CATEGORY_STYLES.other;
}

export function tintBg(tintVar: CategoryStyle["tintVar"]) {
  return `var(--tint-${tintVar})`;
}

export function tintInk(tintVar: CategoryStyle["tintVar"]) {
  return `var(--tint-${tintVar}-ink)`;
}
