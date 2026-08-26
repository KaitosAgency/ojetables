import type { ProductCardProps } from "@/components/product/product-card";
import scraped from "@/lib/data/vaisselle-jetable.json";
import type { CategoryFilterGroup } from "@/lib/category-filters";
import {
  isPriceRangeActive,
  matchesPriceRange,
  type CategoryPriceRange,
} from "@/lib/category-price-filter";
import { isPromoProduct } from "@/lib/category-promo";
import { decodeHtmlEntities } from "@/lib/decode-html";
import { formatProductDisplayName } from "@/lib/format-product-name";

export type VaisselleJetableProduct = ProductCardProps & {
  id: string;
  filterKeys: string[];
};

type ScrapedProduct = {
  id: string;
  name: string;
  href: string;
  image: string;
  category: string;
  priceFrom: string;
  priceWas?: string;
  packLabel?: string;
  personalizable: boolean;
  rating?: number;
  reviewCount?: number;
  filterKeys: string[];
};

type ScrapedData = {
  catalogProductCount: number;
  products: ScrapedProduct[];
  filterGroups: Array<{
    id: string;
    label: string;
    options: Array<{
      id: string;
      label: string;
      count?: number;
      filterKey?: string | null;
    }>;
  }>;
};

const data = scraped as ScrapedData;

function formatPackLabel(pack?: string): string | undefined {
  if (!pack) return undefined;
  const normalized = pack.replace(/^PACK DE /i, "Lot de ");
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function mapScrapedToProductCard(product: ScrapedProduct): VaisselleJetableProduct {
  return {
    id: product.id,
    name: formatProductDisplayName(decodeHtmlEntities(product.name)),
    href: product.href,
    image: product.image,
    category: decodeHtmlEntities(product.category),
    priceFrom: product.priceFrom,
    priceWas: product.priceWas,
    packLabel: formatPackLabel(product.packLabel),
    personalizable: product.personalizable,
    rating: product.rating ?? 0,
    reviewCount: product.reviewCount ?? 0,
    filterKeys: product.filterKeys,
  };
}

export const vaisselleJetableCatalogCount = data.catalogProductCount;

export const vaisselleJetableProducts: VaisselleJetableProduct[] = data.products.map(
  mapScrapedToProductCard,
);

export const vaisselleJetableFilterGroups: readonly CategoryFilterGroup[] = data.filterGroups.map(
  (group) => ({
    id: group.id,
    label: decodeHtmlEntities(group.label),
    options: group.options.map((option) => ({
      id: option.id,
      label: decodeHtmlEntities(option.label),
      count: option.count,
      filterKey: option.filterKey ?? undefined,
    })),
  }),
);

export function filterVaisselleProducts(
  products: readonly VaisselleJetableProduct[],
  activeFilterKeysByGroup: Record<string, string[]>,
  priceRange?: CategoryPriceRange | null,
  priceBounds?: CategoryPriceRange,
  destockageOnly = false,
): VaisselleJetableProduct[] {
  const activeGroups = Object.values(activeFilterKeysByGroup).filter((keys) => keys.length > 0);
  const priceActive =
    priceBounds !== undefined && isPriceRangeActive(priceRange ?? null, priceBounds);

  if (activeGroups.length === 0 && !priceActive && !destockageOnly) return [...products];

  return products.filter((product) => {
    const matchesCheckboxes =
      activeGroups.length === 0 ||
      activeGroups.every((groupKeys) =>
        groupKeys.some((key) => product.filterKeys.includes(key)),
      );

    const matchesPrice =
      !priceActive ||
      (priceBounds !== undefined &&
        matchesPriceRange(product, priceRange ?? null, priceBounds));

    const matchesDestockage = !destockageOnly || isPromoProduct(product);

    return matchesCheckboxes && matchesPrice && matchesDestockage;
  });
}
