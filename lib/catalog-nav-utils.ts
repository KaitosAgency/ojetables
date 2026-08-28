import type { CatalogNavCategory, ProductNavGroup } from "@/lib/site";

export function categoryHasPanel(category: CatalogNavCategory): boolean {
  return Boolean(category.groups?.length || category.items?.length);
}

export function getCategoryGroups(category: CatalogNavCategory): ProductNavGroup[] {
  return category.groups ?? [{ title: category.label, items: category.items ?? [] }];
}
