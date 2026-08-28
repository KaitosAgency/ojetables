import { getDiscountPercentFromLabels } from "@/lib/product-format";
import type { VaisselleJetableProduct } from "@/lib/vaisselle-jetable-data";

/** Produit en promotion : prix barré strictement supérieur au prix actuel. */
export function isPromoProduct(product: VaisselleJetableProduct): boolean {
  if (!product.priceWas) return false;
  return getDiscountPercentFromLabels(product.priceWas, product.priceFrom) !== null;
}

export function countPromoProducts(products: readonly VaisselleJetableProduct[]): number {
  return products.filter(isPromoProduct).length;
}
