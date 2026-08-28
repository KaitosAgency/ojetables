import { resolveProductTeasers } from "@/lib/site/product-teasers";
import type { ProductTeaser } from "@/lib/types/product-teaser";

export const destockageProductRefs = [
  { id: "pot-plastique-25-30cl", badge: "-21 %" },
  { id: "gobelet-carton-24cl-kraft", badge: "Promo" },
  { id: "wood-box-xxl-6l", badge: "-17 %" },
  { id: "kit-couverts-6-bois-kraft", badge: "Stock limité" },
  { id: "gobelet-smoothie-35-65cl", badge: "-13 %" },
  { id: "assiette-galaxie-13cm", badge: "Fin de série" },
  { id: "verrine-plastique-carree", badge: "-20 %" },
  { id: "wood-box-1l", badge: "-16 %" },
  { id: "sachet-couverts-6-bois", badge: "Promo" },
  { id: "cuillere-bois-160mm", badge: "-18 %" },
  { id: "plateau-repas-5-compartiments", badge: "Stock limité" },
  { id: "kit-couverts-4-bois-kraft", badge: "-14 %" },
  { id: "gobelet-reutilisable-personnalise-25-33cl", badge: "Fin de série" },
] as const;

export const destockageItems: ProductTeaser[] = resolveProductTeasers(destockageProductRefs);

export type DestockageProduct = ProductTeaser;

export const destockagePage = {
  title: "Promotions & fins de série",
  description:
    "Stocks limités, prix cassés sur une sélection de vaisselle jetable et emballages professionnels.",
  externalCatalogUrl: "https://www.ojetables.fr/destockage-vaisselle-jetable",
} as const;
