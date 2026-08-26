import { parseFrenchPrice } from "@/lib/category-price";
import type { ProductCardProps } from "@/components/product/product-card";
import type { VaisselleJetableProduct } from "@/lib/vaisselle-jetable-data";

export type CategoryPriceRange = {
  min: number;
  max: number;
};

export type CategoryAggregateOffer = {
  lowPrice: string;
  highPrice: string;
  offerCount: number;
};

export function formatCategoryPrice(value: number): string {
  return `${value.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`;
}

export function getProductPriceBounds(
  products: readonly VaisselleJetableProduct[],
): CategoryPriceRange {
  let min = Number.POSITIVE_INFINITY;
  let max = 0;

  for (const product of products) {
    const price = parseFrenchPrice(product.priceFrom);
    if (price === null) continue;
    min = Math.min(min, price);
    max = Math.max(max, price);
  }

  if (!Number.isFinite(min) || max <= 0) {
    return { min: 0, max: 100 };
  }

  return {
    min: Math.floor(min),
    max: Math.ceil(max),
  };
}

/** Fourchette de prix catalogue pour JSON-LD AggregateOffer (prix réels, pas price: 0). */
export function getCategoryAggregateOffer(
  products: readonly ProductCardProps[],
): CategoryAggregateOffer | null {
  let min = Number.POSITIVE_INFINITY;
  let max = 0;
  let offerCount = 0;

  for (const product of products) {
    const price = parseFrenchPrice(product.priceFrom);
    if (price === null) continue;
    offerCount += 1;
    min = Math.min(min, price);
    max = Math.max(max, price);
  }

  if (offerCount === 0 || !Number.isFinite(min)) return null;

  return {
    lowPrice: min.toFixed(2),
    highPrice: max.toFixed(2),
    offerCount,
  };
}

export function isPriceRangeActive(
  range: CategoryPriceRange | null,
  bounds: CategoryPriceRange,
): boolean {
  if (!range) return false;
  return range.min > bounds.min || range.max < bounds.max;
}

export function matchesPriceRange(
  product: VaisselleJetableProduct,
  range: CategoryPriceRange | null,
  bounds: CategoryPriceRange,
): boolean {
  if (!isPriceRangeActive(range, bounds)) return true;

  const price = parseFrenchPrice(product.priceFrom);
  if (price === null) return false;

  return price >= range!.min && price <= range!.max;
}
