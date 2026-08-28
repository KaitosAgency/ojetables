import catalogNavRaw from "../catalog-nav-data.json";
import { decodeHtmlEntities } from "@/lib/decode-html";
import { featuredCategoryPath } from "@/lib/routes";
import type { CatalogNavCategory, NavLink } from "@/lib/site/navigation";
import { routes } from "@/lib/site/routes";

/** Maquette : tous les liens produits pointent vers la fiche exemple unique. */
export const maquetteProductHref = routes.product;

export function maquetteCatalogHref(path: string): string {
  if (path.includes("assiette-biodegradable-et-compostable") || path.endsWith(".html")) {
    return routes.product;
  }
  if (path.includes("destockage")) {
    return routes.destockage;
  }
  if (path.includes("emballage-personnalise") || path.includes("personnalise")) {
    return routes.personalization;
  }
  if (path.startsWith("/")) {
    return featuredCategoryPath;
  }
  return "#";
}

type RawNavLink = {
  label: string;
  href: string;
  children?: RawNavLink[];
};

export function mapCatalogNavLink(item: RawNavLink): NavLink {
  return {
    label: decodeHtmlEntities(item.label),
    href: maquetteCatalogHref(item.href),
    children: item.children?.length ? item.children.map(mapCatalogNavLink) : undefined,
  };
}

export function mapCatalogNavCategory(
  category: (typeof catalogNavRaw)[number],
): CatalogNavCategory {
  const raw = category as (typeof catalogNavRaw)[number] & {
    items?: RawNavLink[];
    groups?: { title: string; items: RawNavLink[] }[];
  };

  return {
    id: raw.id,
    label: decodeHtmlEntities(raw.label),
    href: maquetteCatalogHref(raw.href),
    groups: raw.groups?.map((group) => ({
      title: decodeHtmlEntities(group.title),
      items: group.items.map(mapCatalogNavLink),
    })),
    items: raw.items?.map(mapCatalogNavLink),
  };
}
