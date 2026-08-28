import type { BreadcrumbItem } from "@/lib/types/breadcrumb";

import { gobeletCarton24clKraftIndividuel } from "./gobelet-carton-24cl-kraft-individuel";
import type { Product } from "./types";

export * from "./types";
export { EURO_NBSP, formatPriceWithEuro } from "@/lib/product-format";

export const products: Record<string, Product> = {
  "gobelet-carton-24cl-kraft-individuel": gobeletCarton24clKraftIndividuel,
};

export function getProduct(slug: string): Product | undefined {
  return products[slug];
}

export function getProductPageBreadcrumbs(product: Product): BreadcrumbItem[] {
  return [
    { name: "Accueil", path: "/" },
    ...product.breadcrumbs.map((item) => ({ name: item.name, path: item.path })),
    { name: product.shortName },
  ];
}
