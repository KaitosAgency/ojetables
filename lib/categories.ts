import type { ProductCardProps } from "@/components/product/product-card";
import type { FaqItem } from "@/lib/site";
import { featuredProductSlug, productPath } from "@/lib/site";

const maquetteProductCardHref = productPath(featuredProductSlug);

export type CategorySubfamily = {
  id: string;
  label: string;
  description: string;
};

export type Category = {
  id: string;
  slug: string;
  label: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  subfamilies: readonly CategorySubfamily[];
  products: readonly ProductCardProps[];
  faq: readonly FaqItem[];
  seoContent: {
    heading: string;
    paragraphs: readonly string[];
  };
};

export function categoryPath(slug: string): string {
  return `/${slug}`;
}

/** Maquette : une seule catégorie démo — tous les liens catalogue y convergent. */
export const featuredCategorySlug = "vaisselle-jetable";

const vaisselleJetableProducts: ProductCardProps[] = [
  {
    name: "Gobelet carton 24 cl Kraft (individuel)",
    category: "Gobelets",
    image: "/products/gobelet-carton-24cl.jpg",
    priceWas: "3,90 €",
    priceFrom: "3,20 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 50",
    rating: 4.9,
    reviewCount: 8,
  },
  {
    name: "Assiette biodégradable ronde 15 cm",
    category: "Assiettes compostables",
    image: "/products/assiette-galaxie.jpg",
    priceFrom: "4,90 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 100",
    rating: 4.8,
    reviewCount: 24,
  },
  {
    name: "Assiette Galaxie biodégradable Ø 13 cm",
    category: "Assiettes",
    image: "/products/assiette-galaxie.jpg",
    priceWas: "42,00 €",
    priceFrom: "36,20 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 200",
    rating: 4,
    reviewCount: 2,
  },
  {
    name: "Kit couverts 6 en 1 bois kraft",
    category: "Couverts",
    image: "/products/kit-couverts-6.jpg",
    priceWas: "9,99 €",
    priceFrom: "8,99 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 100",
    rating: 5,
    reviewCount: 4,
  },
  {
    name: "Kit couverts 4 en 1 bois kraft",
    category: "Couverts",
    image: "/products/kit-couverts-4.jpg",
    priceWas: "10,49 €",
    priceFrom: "8,99 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 100",
    rating: 4.9,
    reviewCount: 9,
  },
  {
    name: "Cuillère en bois 160 mm eco",
    category: "Couverts",
    image: "/products/cuillere-bois.jpg",
    priceWas: "2,20 €",
    priceFrom: "1,80 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 100",
    rating: 4.8,
    reviewCount: 12,
  },
  {
    name: "Sachet couverts 6 en 1 bois",
    category: "Couverts",
    image: "/products/sachet-couverts-bois.jpg",
    priceWas: "52,99 €",
    priceFrom: "45,99 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 500",
    rating: 4.8,
    reviewCount: 10,
  },
  {
    name: "Wood Box 1 L avec couvercle",
    category: "Plateaux",
    image: "/products/wood-box.jpg",
    priceWas: "44,99 €",
    priceFrom: "37,99 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 25",
    personalizable: true,
    rating: 4.9,
    reviewCount: 9,
  },
  {
    name: "Wood Box XXL 6 L avec couvercle",
    category: "Plateaux",
    image: "/products/wood-box-xxl.jpg",
    priceWas: "46,20 €",
    priceFrom: "38,20 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 10",
    rating: 4.9,
    reviewCount: 9,
  },
  {
    name: "Plateau repas biodégradable 5 compartiments",
    category: "Plateaux repas",
    image: "/products/plateau-repas-5comp.jpg",
    priceWas: "74,00 €",
    priceFrom: "65,00 €",
    href: maquetteProductCardHref,
    packLabel: "Lot de 150",
    rating: 4,
    reviewCount: 2,
  },
];

export const categories: Record<string, Category> = {
  [featuredCategorySlug]: {
    id: "vaisselle-jetable",
    slug: featuredCategorySlug,
    label: "Vaisselle jetable",
    title: "Vaisselle jetable",
    metaTitle: "Vaisselle jetable professionnelle | Petit prix & éco | Livraison 24/72h",
    metaDescription:
      "Assiettes, couverts et bols jetables pour traiteurs, CHR et collectivités. Compostable, carton ou réutilisable. +3 000 références, livraison 24/72h, tarifs dégressifs pro.",
    description:
      "Assiettes, couverts en bois, bols jetables : carton, pulpe de canne ou plastique réutilisable. Petit prix et gammes éco pour professionnels et particuliers.",
    intro:
      "Découvrez notre gamme complète de vaisselle jetable : assiettes compostables, couverts bois et kits traiteur, bols et plateaux repas. Stock permanent, livraison 24/72h et tarifs dégressifs dès 10 packs pour les comptes pro.",
    image: "/categories/vaisselle-jetable.jpg",
    imageAlt: "Vaisselle jetable professionnelle - assiettes, couverts et bols Ojetables",
    subfamilies: [
      {
        id: "assiettes",
        label: "Assiettes jetables",
        description: "Compostable, carton biodégradable, plastique réutilisable et bols.",
      },
      {
        id: "couverts",
        label: "Couverts jetables",
        description: "Bois, bambou, kits sachets et couverts réutilisables couleur.",
      },
      {
        id: "bols",
        label: "Bols & saladiers",
        description: "Biodégradable, carton et plastique pour soupes et salades.",
      },
      {
        id: "plateaux",
        label: "Plateaux & wood box",
        description: "Plateaux repas, coffrets à emporter et wood box traiteur.",
      },
    ],
    products: vaisselleJetableProducts,
    faq: [
      {
        question: "Quelle vaisselle jetable choisir pour un traiteur ?",
        answer:
          "Pour l'événementiel, privilégiez les assiettes compostables et les kits couverts bois pour une présentation soignée. Les wood box et plateaux repas complètent vos buffets et plateaux traiteur.",
      },
      {
        question: "La vaisselle jetable compostable est-elle conforme AGEC ?",
        answer:
          "Oui, nos gammes biodégradable et compostable (pulpe de canne, bagasse, bois) répondent aux exigences de la loi AGEC pour la restauration collective et les événements.",
      },
      {
        question: "Y a-t-il des tarifs dégressifs sur la vaisselle jetable ?",
        answer:
          "Les comptes professionnels bénéficient de remises automatiques dès 10 packs sur la plupart des références. Pour les très grands volumes, demandez un devis personnalisé.",
      },
      {
        question: "Délai de livraison pour la vaisselle jetable en stock ?",
        answer:
          "Livraison 24/72h partout en France sur les références en stock. Commande possible en petite quantité pour les particuliers et associations.",
      },
    ],
    seoContent: {
      heading: "Vaisselle jetable pro : qualité, éco et petit prix",
      paragraphs: [
        "Ojetables est fournisseur français de vaisselle jetable pour traiteurs, restaurants, collectivités et organisateurs d'événements. Notre catalogue couvre assiettes jetables compostables, couverts en bois, bols et plateaux repas biodégradables, ainsi que des solutions plastique réutilisable pour un usage intensif.",
        "Que vous préparez un mariage, une réception d'entreprise ou la cantine d'une collectivité, vous trouvez des conditionnements adaptés : lots de 50 à 500 unités, tarifs dégressifs pro et livraison express 24/72h sur plus de 3 000 références en stock.",
      ],
    },
  },
};

export function getCategory(slug: string): Category | undefined {
  return categories[slug];
}

/** Chemin canonique de la catégorie maquette. */
export const featuredCategoryPath = categoryPath(featuredCategorySlug);
