import { resolveProductTeaser } from "@/lib/site/product-teasers";
import type { ProductTeaser } from "@/lib/types/product-teaser";

const sectorProductRefs = {
  traiteur: [
    { id: "kit-couverts-6-bois-kraft", priceFrom: "9,99 € HT" },
    { id: "verrine-plastique-carree" },
    { id: "wood-box-1l", personalizable: true },
  ],
  association: [
    { id: "assiette-galaxie-13cm" },
    { id: "gobelet-reutilisable-personnalise-25-33cl", personalizable: true },
    { id: "sachet-couverts-6-bois" },
  ],
  chr: [
    {
      id: "gobelet-carton-24cl-kraft",
      name: "Gobelet carton 24 cl kraft",
      priceWas: "3,90 € HT",
      personalizable: true,
    },
    { id: "gobelet-smoothie-35-65cl", personalizable: true },
    { id: "cuillere-bois-160mm" },
  ],
  collectivite: [
    { id: "plateau-repas-5-compartiments" },
    {
      id: "wood-box-xxl-6l",
      priceFrom: "39,40 € HT",
      priceWas: "46,20 € HT",
    },
    { id: "kit-couverts-4-bois-kraft" },
  ],
} as const;

function resolveSectorProducts(
  refs: readonly ({ id: string } & Partial<Omit<ProductTeaser, "id">> )[],
): ProductTeaser[] {
  return refs.map((ref) => resolveProductTeaser(ref));
}

export const sectors = [
  {
    title: "Traiteurs & événementiel",
    description: "Solutions élégantes pour vos événements professionnels : kits couverts, verrines et plateaux.",
    cta: "Voir la gamme traiteur",
    href: "https://www.ojetables.fr/vaisselle-jetable-traiteur/",
    products: resolveSectorProducts(sectorProductRefs.traiteur),
  },
  {
    title: "Associations & clubs",
    description: "Pour vos kermesses, buvettes et repas partagés : tarifs accessibles, volumes adaptés à vos besoins.",
    cta: "Voir la gamme association",
    href: "https://www.ojetables.fr/vaisselle-jetable-association/",
    highlight: true,
    products: resolveSectorProducts(sectorProductRefs.association),
  },
  {
    title: "CHR & restauration",
    description: "Solutions pros pour restaurants et food trucks : gobelets, barquettes et consommables du quotidien.",
    cta: "Voir la gamme resto",
    href: "https://www.ojetables.fr/vaisselle-jetable-restaurant/",
    products: resolveSectorProducts(sectorProductRefs.chr),
  },
  {
    title: "Collectivités & cantines",
    description: "Plateaux repas et grands volumes conformes AGEC pour la restauration collective.",
    cta: "Voir la gamme collectivité",
    href: "https://www.ojetables.fr/vaisselle-jetable-collectivite/",
    products: resolveSectorProducts(sectorProductRefs.collectivite),
  },
] as const;

export type SectorProduct = (typeof sectors)[number]["products"][number];

/** Produits mis en avant homepage. */
export const bestSellers: ProductTeaser[] = sectors.flatMap((sector) => [...sector.products]).slice(0, 10);
