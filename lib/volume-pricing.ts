import type { Product, VolumeBundleReward } from "@/lib/products";

/** Paliers dégressifs pro — remise sur le prix pack HT selon la quantité commandée. */
export const VOLUME_DISCOUNT_TIERS = [
  { minPacks: 50, discountPercent: 15 },
  { minPacks: 25, discountPercent: 12 },
  { minPacks: 10, discountPercent: 8 },
] as const;

/** Packs offerts du même produit, alignés sur les paliers de remise. */
export const VOLUME_BUNDLE_REWARDS = [
  { minPacks: 10, freePacks: 1 },
  { minPacks: 25, freePacks: 2 },
  { minPacks: 50, freePacks: 5 },
] as const;

export function getVolumeDiscountPercent(quantity: number): number {
  for (const tier of VOLUME_DISCOUNT_TIERS) {
    if (quantity >= tier.minPacks) {
      return tier.discountPercent;
    }
  }
  return 0;
}

export function getPackPriceHt(basePriceHt: number, quantity: number): number {
  const discountPercent = getVolumeDiscountPercent(quantity);
  return basePriceHt * (1 - discountPercent / 100);
}

export function getLineTotalHt(basePriceHt: number, quantity: number): number {
  return getPackPriceHt(basePriceHt, quantity) * quantity;
}

export function buildSameProductVolumeBundles(
  product: Pick<Product, "shortName" | "images" | "priceHt">,
): VolumeBundleReward[] {
  if (product.images.length === 0) {
    return [];
  }

  return VOLUME_BUNDLE_REWARDS.map((tier, index) => {
    const image = product.images[index] ?? product.images[0];

    return {
      minPacks: tier.minPacks,
      thresholdHt: tier.minPacks * product.priceHt,
      name: tier.freePacks === 1 ? "1 Pack Offert" : `${tier.freePacks} Packs Offerts`,
      subtitle: product.shortName,
      image: image.src,
      imageAlt: image.alt,
    };
  });
}