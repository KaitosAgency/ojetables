import type { VaisselleJetableProduct } from "@/lib/vaisselle-jetable-data";

export function normalizeCategorySearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCategorySearchActive(query: string): boolean {
  return query.trim().length > 0;
}

export function matchesCategorySearch(
  product: VaisselleJetableProduct,
  query: string,
): boolean {
  const normalizedQuery = normalizeCategorySearchText(query);
  if (!normalizedQuery) return true;

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const searchable = normalizeCategorySearchText(
    [product.name, product.category, product.packLabel ?? ""].join(" "),
  );

  return tokens.every((token) => searchable.includes(token));
}

export function filterProductsByCategorySearch(
  products: readonly VaisselleJetableProduct[],
  query: string,
): VaisselleJetableProduct[] {
  if (!isCategorySearchActive(query)) return [...products];
  return products.filter((product) => matchesCategorySearch(product, query));
}
