/** Frais de port — aligné sur ojetables.fr / visuel options livraison. */
import { EURO_NBSP, formatPriceWithEuro } from "@/lib/product-format";

export const SHIPPING_FREE_FROM_HT = 250;

export type ShippingRateTier = {
  label: string;
  minHt: number;
  maxHt: number | null;
  priceHt: number;
};

export type ShippingExtraOption = {
  label: string;
  priceHt: number;
  priceLabel: string;
  detail?: string;
};

/** Livraison à domicile ou en point relais — tranches selon montant HT panier. */
export const shippingRateTiers: readonly ShippingRateTier[] = [
  {
    label: "De 0 à 29,99 € HT de commande",
    minHt: 0,
    maxHt: 29.99,
    priceHt: 6.9,
  },
  {
    label: "De 30 à 139,99 € HT de commande",
    minHt: 30,
    maxHt: 139.99,
    priceHt: 9.9,
  },
  {
    label: "De 140 à 249,99 € HT de commande",
    minHt: 140,
    maxHt: 249.99,
    priceHt: 16.9,
  },
];

export const shippingExtraOptions: readonly ShippingExtraOption[] = [
  {
    label: "Option express",
    priceHt: 26.9,
    priceLabel: "26,90 € HT",
    detail: "Livraison accélérée sur les départements desservis (24/72h selon zone).",
  },
  {
    label: "Retrait dépôt",
    priceHt: 0,
    priceLabel: "Offert",
    detail: "Retrait à Sainte-Foy-d'Aigrefeuille (31) sur rendez-vous.",
  },
];

export const shippingDeliverySubtitle =
  "Livraison à domicile ou en point relais" as const;

export const shippingFreeFromLabel = `Livraison offerte à partir de ${SHIPPING_FREE_FROM_HT}${EURO_NBSP}€ HT`;

/** Frais de port standard calculés au panier (hors express / retrait dépôt). */
export function getStandardShippingCostHt(orderTotalHt: number): number {
  if (orderTotalHt >= SHIPPING_FREE_FROM_HT) return 0;
  if (orderTotalHt >= 140) return 16.9;
  if (orderTotalHt >= 30) return 9.9;
  return 6.9;
}

export function formatShippingCostLabel(costHt: number): string {
  return costHt === 0 ? "Offerte" : formatPriceWithEuro(costHt);
}

export function getAmountUntilFreeShippingHt(orderTotalHt: number): number | null {
  if (orderTotalHt >= SHIPPING_FREE_FROM_HT) return null;
  return SHIPPING_FREE_FROM_HT - orderTotalHt;
}

/** Liste plate pour modales et sections (grille + options + franco). */
export const shippingOptions = [
  ...shippingRateTiers.map((tier) => ({
    label: tier.label,
    price: formatPriceWithEuro(tier.priceHt),
    detail: shippingDeliverySubtitle,
  })),
  ...shippingExtraOptions.map((option) => ({
    label: option.label,
    price: option.priceLabel,
    detail: option.detail ?? "",
  })),
  {
    label: "Franco de port",
    price: `dès ${SHIPPING_FREE_FROM_HT}${EURO_NBSP}€ HT`,
    detail: shippingFreeFromLabel,
  },
] as const;

export const shippingSummaryText =
  "Livraison 24/72h en France métropolitaine. Frais selon montant HT : 6,90 € (0–29,99 €), 9,90 € (30–139,99 €), 16,90 € (140–249,99 €), offerts dès 250 € HT. Express 26,90 € HT, retrait dépôt offert.";
