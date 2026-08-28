import { parseFrenchPrice } from "@/lib/category-price";

export function formatPrice(value: number): string {
  return value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Espace insécable typographique avant le symbole €. */
export const EURO_NBSP = "\u00A0";

export function formatPriceWithEuro(value: number): string {
  return `${formatPrice(value)}${EURO_NBSP}€ HT`;
}

export function getDiscountPercentFromPrices(was: number, current: number): number | null {
  if (was <= current || was <= 0) return null;
  return Math.round((1 - current / was) * 100);
}

export function getDiscountPercentFromLabels(priceWas: string, priceFrom: string): number | null {
  const was = parseFrenchPrice(priceWas);
  const from = parseFrenchPrice(priceFrom);
  if (was === null || from === null) return null;
  return getDiscountPercentFromPrices(was, from);
}
