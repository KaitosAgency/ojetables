import { parseFrenchPrice } from "@/lib/category-price";
import type { VaisselleJetableProduct } from "@/lib/vaisselle-jetable-data";

export const CATEGORY_SORT_OPTIONS = [
  { value: "default", label: "Pertinence" },
  { value: "price-asc", label: "Prix : croissant" },
  { value: "price-desc", label: "Prix : décroissant" },
  { value: "rating", label: "Meilleures notes" },
  { value: "name", label: "Nom A-Z" },
] as const;

export type CategorySortKey = (typeof CATEGORY_SORT_OPTIONS)[number]["value"];

export function isCategorySortKey(value: string): value is CategorySortKey {
  return CATEGORY_SORT_OPTIONS.some((option) => option.value === value);
}

export function sortCategoryProducts(
  products: readonly VaisselleJetableProduct[],
  sortKey: CategorySortKey,
): VaisselleJetableProduct[] {
  if (sortKey === "default") {
    return [...products];
  }

  const sorted = [...products];

  switch (sortKey) {
    case "price-asc":
      return sorted.sort(
        (a, b) =>
          (parseFrenchPrice(a.priceFrom) ?? Number.POSITIVE_INFINITY) -
          (parseFrenchPrice(b.priceFrom) ?? Number.POSITIVE_INFINITY),
      );
    case "price-desc":
      return sorted.sort(
        (a, b) =>
          (parseFrenchPrice(b.priceFrom) ?? 0) - (parseFrenchPrice(a.priceFrom) ?? 0),
      );
    case "rating":
      return sorted.sort((a, b) => {
        const scoreA = (a.rating ?? 0) * Math.log10((a.reviewCount ?? 0) + 1);
        const scoreB = (b.rating ?? 0) * Math.log10((b.reviewCount ?? 0) + 1);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      });
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
    default:
      return sorted;
  }
}

export function getCategorySortLabel(sortKey: CategorySortKey): string {
  return CATEGORY_SORT_OPTIONS.find((option) => option.value === sortKey)?.label ?? "Pertinence";
}
