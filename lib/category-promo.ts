import { parseFrenchPrice } from "@/lib/category-price";
import type { VaisselleJetableProduct } from "@/lib/vaisselle-jetable-data";

/** Produit en promotion : prix barré strictement supérieur au prix actuel. */
export function isPromoProduct(product: VaisselleJetableProduct): boolean {
  if (!product.priceWas) return false;

  const was = parseFrenchPrice(product.priceWas);
  const from = parseFrenchPrice(product.priceFrom);

  return was !== null && from !== null && from < was;
}

export function countPromoProducts(products: readonly VaisselleJetableProduct[]): number {
  return products.filter(isPromoProduct).length;
}
