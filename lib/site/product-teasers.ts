import { productPath } from "@/lib/routes";
import type { ProductTeaser, ProductTeaserRef } from "@/lib/types/product-teaser";

const maquetteProductHref = productPath("gobelet-carton-24cl-kraft-individuel");

export const productTeasers = {
  "pot-plastique-25-30cl": {
    id: "pot-plastique-25-30cl",
    name: "Pot plastique transparent 25/30 cl",
    category: "Barquettes",
    image: "/products/gobelet-rpet.jpg",
    priceWas: "3,15 € HT",
    priceFrom: "2,50 € HT",
    href: "https://www.ojetables.fr/destockage-vaisselle-jetable",
    packLabel: "Lot de 50",
    rating: 4.6,
    reviewCount: 11,
  },
  "gobelet-carton-24cl-kraft": {
    id: "gobelet-carton-24cl-kraft",
    name: "Gobelet carton 24 cl kraft (individuel)",
    category: "Gobelets",
    image: "/products/gobelet-carton-24cl.jpg",
    priceWas: "3,90 € HT",
    priceFrom: "3,20 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 50",
    rating: 4.9,
    reviewCount: 8,
  },
  "wood-box-xxl-6l": {
    id: "wood-box-xxl-6l",
    name: "Wood Box XXL 6 L avec couvercle",
    category: "Plateaux",
    image: "/products/wood-box-xxl.jpg",
    priceWas: "46,20 € HT",
    priceFrom: "38,20 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 10",
    rating: 4.9,
    reviewCount: 9,
  },
  "kit-couverts-6-bois-kraft": {
    id: "kit-couverts-6-bois-kraft",
    name: "Kit couverts 6 en 1 bois kraft",
    category: "Couverts",
    image: "/products/kit-couverts-6.jpg",
    priceWas: "9,99 € HT",
    priceFrom: "8,99 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 100",
    rating: 5,
    reviewCount: 4,
  },
  "gobelet-smoothie-35-65cl": {
    id: "gobelet-smoothie-35-65cl",
    name: "Gobelet smoothie 35 à 65 cl",
    category: "Gobelets",
    image: "/products/gobelet-smoothie.jpg",
    priceWas: "5,20 € HT",
    priceFrom: "4,50 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 50",
    rating: 4.9,
    reviewCount: 8,
  },
  "assiette-galaxie-13cm": {
    id: "assiette-galaxie-13cm",
    name: "Assiette Galaxie biodégradable Ø 13 cm",
    category: "Assiettes",
    image: "/products/assiette-galaxie.jpg",
    priceWas: "42,00 € HT",
    priceFrom: "36,20 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 200",
    rating: 4,
    reviewCount: 2,
  },
  "verrine-plastique-carree": {
    id: "verrine-plastique-carree",
    name: "Verrine plastique carrée",
    category: "Verrines",
    image: "/products/verrine-carre.jpg",
    priceWas: "2,95 € HT",
    priceFrom: "2,35 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 20",
    rating: 5,
    reviewCount: 3,
  },
  "wood-box-1l": {
    id: "wood-box-1l",
    name: "Wood Box 1 L avec couvercle",
    category: "Plateaux",
    image: "/products/wood-box.jpg",
    priceWas: "44,99 € HT",
    priceFrom: "37,99 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 25",
    rating: 4.9,
    reviewCount: 9,
  },
  "sachet-couverts-6-bois": {
    id: "sachet-couverts-6-bois",
    name: "Sachet couverts 6 en 1 bois",
    category: "Couverts",
    image: "/products/sachet-couverts-bois.jpg",
    priceWas: "52,99 € HT",
    priceFrom: "45,99 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 500",
    rating: 4.8,
    reviewCount: 10,
  },
  "cuillere-bois-160mm": {
    id: "cuillere-bois-160mm",
    name: "Cuillère en bois 160 mm eco",
    category: "Couverts",
    image: "/products/cuillere-bois.jpg",
    priceWas: "2,20 € HT",
    priceFrom: "1,80 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 100",
    rating: 4.8,
    reviewCount: 12,
  },
  "plateau-repas-5-compartiments": {
    id: "plateau-repas-5-compartiments",
    name: "Plateau repas biodégradable 5 compartiments",
    category: "Plateaux repas",
    image: "/products/plateau-repas-5comp.jpg",
    priceWas: "74,00 € HT",
    priceFrom: "65,00 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 150",
    rating: 4,
    reviewCount: 2,
  },
  "kit-couverts-4-bois-kraft": {
    id: "kit-couverts-4-bois-kraft",
    name: "Kit couverts 4 en 1 bois kraft",
    category: "Couverts",
    image: "/products/kit-couverts-4.jpg",
    priceWas: "10,49 € HT",
    priceFrom: "8,99 € HT",
    href: maquetteProductHref,
    packLabel: "Lot de 100",
    rating: 4.9,
    reviewCount: 9,
  },
  "gobelet-reutilisable-personnalise-25-33cl": {
    id: "gobelet-reutilisable-personnalise-25-33cl",
    name: "Gobelet plastique réutilisable personnalisé 25–33 cl",
    category: "Gobelets logo",
    image: "/products/gobelet-personnalise.jpg",
    priceWas: "28,90 € HT",
    priceFrom: "24,55 € HT",
    href: maquetteProductHref,
    packLabel: "Dès 1 pc",
    rating: 5,
    reviewCount: 1,
  },
} as const satisfies Record<string, ProductTeaser>;

export type ProductTeaserId = keyof typeof productTeasers;

export function resolveProductTeaser(ref: ProductTeaserRef): ProductTeaser {
  const base = productTeasers[ref.id as ProductTeaserId];
  if (!base) {
    throw new Error(`Unknown product teaser id: ${ref.id}`);
  }
  const { id, ...override } = ref;
  return { ...base, ...override, id: base.id };
}

export function resolveProductTeasers(refs: readonly ProductTeaserRef[]): ProductTeaser[] {
  return refs.map(resolveProductTeaser);
}

/** Carte produit sans le champ badge (ProductCard). */
export function toProductCardProps(teaser: ProductTeaser) {
  const { badge: _badge, ...props } = teaser;
  return props;
}
