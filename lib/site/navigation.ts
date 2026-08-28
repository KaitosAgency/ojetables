import catalogNavRaw from "../catalog-nav-data.json";
import {
  mapCatalogNavCategory,
} from "@/lib/maquette/overrides";
import { routes } from "./routes";

export type NavHighlight = {
  label: string;
  href: string;
  accent: "brand" | "destock";
};

export const nav = {
  main: [
    { label: "Catalogue", href: routes.catalog },
    { label: "Mon devis", href: routes.quote },
    { label: "Éco & Engagements", href: "/#eco" },
    { label: "Contact", href: "/#contact" },
  ],
  /** Boutons dédiés niveau 1 (après Produits) */
  highlights: [
    { label: "Personnalisation", href: routes.personalization, accent: "brand" },
    { label: "Destockage", href: routes.destockage, accent: "destock" },
  ] satisfies NavHighlight[],
  productsLabel: "Produits",
  productsHref: "/#produits",
} as const;

/** Catégories catalogue avec badge promo (ligne 2 header) */
export const catalogNavHotCategoryIds = ["gobelet-verre"] as const;

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export type ProductNavGroup = {
  title: string;
  items: NavLink[];
};

/** Catégorie catalogue - ligne 2 du header (structure Magento ojetables.fr) */
export type CatalogNavCategory = {
  id: string;
  label: string;
  href: string;
  /** Sous-liens simples (dropdown compact) */
  items?: NavLink[];
  /** Sous-familles en colonnes (megamenu) */
  groups?: ProductNavGroup[];
};

/**
 * Navigation catalogue niveau 1 - structure Magento ojetables.fr (9 familles).
 * Exclus du menu : Destockage (bouton L1), Garcia de Pou (filtre marque).
 * Généré via `node scripts/parse-nav.mjs` → lib/catalog-nav-data.json
 */
export const catalogNavCategories: CatalogNavCategory[] =
  catalogNavRaw.map(mapCatalogNavCategory);

export const headerActions = {
  cartCount: 0,
  searchPlaceholder: "Rechercher une référence, un produit…",
} as const;
