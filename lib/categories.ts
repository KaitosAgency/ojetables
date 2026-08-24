import type { ProductCardProps } from "@/components/product/product-card";
import type { FaqItem, FooterLink } from "@/lib/site";
import { footerNav, featuredProductSlug, productPath } from "@/lib/site";

const maquetteProductCardHref = productPath(featuredProductSlug);

export type CategorySubfamily = {
  id: string;
  label: string;
  description: string;
  image: string;
  href: string;
};

export type CategorySeoSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
};

export type Category = {
  id: string;
  slug: string;
  label: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  bluf: string;
  intro: string;
  image: string;
  imageAlt: string;
  subfamilies: readonly CategorySubfamily[];
  products: readonly ProductCardProps[];
  sectorLinks: readonly FooterLink[];
  faq: readonly FaqItem[];
  seoHeading: string;
  seoSections: readonly CategorySeoSection[];
  /** Total catalogue (prod) pour libellé pagination maquette. */
  catalogProductCount: number;
};

export function categoryPath(slug: string): string {
  return `/${slug}`;
}

/** Maquette : une seule catégorie démo — tous les liens catalogue y convergent. */
export const featuredCategorySlug = "vaisselle-jetable";

const vaisselleJetableSectorLinks: FooterLink[] = footerNav.metiers
  .filter((link) => !link.label.toLowerCase().includes("personnalisation"))
  .slice(0, 5);

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
    bluf:
      "Ojetables est le fournisseur français de vaisselle jetable éco-responsable pour traiteurs, CHR et collectivités. +3 000 références en stock, livraison 24/72h, 9,5/10 sur 2 417 avis certifiés.",
    intro:
      "Assiettes compostables, couverts bois et kits traiteur, bols et plateaux repas : conditionnements de 50 à 500 unités, tarifs dégressifs dès 10 packs pour les comptes pro et commande en petite quantité pour les particuliers.",
    image: "/categories/vaisselle-jetable.jpg",
    imageAlt: "Vaisselle jetable professionnelle - assiettes, couverts et bols Ojetables",
    catalogProductCount: 3000,
    subfamilies: [
      {
        id: "assiettes",
        label: "Assiette jetable",
        description: "Compostable, carton biodégradable, plastique réutilisable et bols creux.",
        image: "/products/assiette-galaxie.jpg",
        href: `${categoryPath(featuredCategorySlug)}#assiettes`,
      },
      {
        id: "couverts",
        label: "Couvert de table",
        description: "Couverts bois et bambou, kits sachets, réutilisables couleur et mini couverts.",
        image: "/products/kit-couverts-6.jpg",
        href: `${categoryPath(featuredCategorySlug)}#couverts`,
      },
      {
        id: "bols",
        label: "Bol à salade",
        description: "Saladiers biodégradable, carton et plastique pour soupes, salades et buffets.",
        image: "/products/plateau-repas-5comp.jpg",
        href: `${categoryPath(featuredCategorySlug)}#bols`,
      },
      {
        id: "pots-dessert",
        label: "Pot et coupe dessert",
        description: "Pots à glace, coupes dessert et pots à sauce pour traiteur et CHR.",
        image: "/products/verrine-carre.jpg",
        href: `${categoryPath(featuredCategorySlug)}#pots-dessert`,
      },
      {
        id: "barquettes",
        label: "Barquette jetable",
        description: "Cocottes, marmipack, sushi, barquettes frites et scellables.",
        image: "/categories/snack.jpg",
        href: `${categoryPath(featuredCategorySlug)}#barquettes`,
      },
      {
        id: "plateaux",
        label: "Plateaux & wood box",
        description: "Plateaux repas, wood box traiteur et coffrets à emporter.",
        image: "/products/wood-box.jpg",
        href: `${categoryPath(featuredCategorySlug)}#plateaux`,
      },
      {
        id: "vente-emporter",
        label: "Vente à emporter",
        description: "Emballages et supports pour restauration rapide et food service.",
        image: "/categories/plateau-boite.png",
        href: `${categoryPath(featuredCategorySlug)}#vente-emporter`,
      },
    ],
    products: vaisselleJetableProducts,
    sectorLinks: vaisselleJetableSectorLinks,
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
        question: "Y a-t-il un minimum de commande sur la vaisselle jetable ?",
        answer:
          "Non pour les particuliers et petits volumes. Les tarifs dégressifs s'appliquent à partir de 10 packs pour les comptes professionnels sur la plupart des références.",
      },
      {
        question: "Quels tarifs dégressifs pour les professionnels ?",
        answer:
          "Les comptes pro bénéficient de remises automatiques dès 10 packs. Pour les très grands volumes (cantines, collectivités), demandez un devis personnalisé avec paiement sous 30 jours.",
      },
      {
        question: "Délai de livraison pour la vaisselle jetable en stock ?",
        answer:
          "Livraison 24/72h partout en France sur les références en stock. Commande possible en petite quantité pour les particuliers et associations.",
      },
      {
        question: "Peut-on personnaliser des gobelets ou emballages ?",
        answer:
          "Oui : gobelets carton, sacs kraft et certains emballages sont personnalisable avec votre logo. BAT sous 48h, délais de fabrication 2 à 3 semaines selon le produit.",
      },
      {
        question: "Compostage domestique ou industriel pour les assiettes biodégradables ?",
        answer:
          "Nos assiettes en pulpe de canne et bagasse sont compostables en compostage industriel. En compostage domestique, les délais de dégradation peuvent être plus longs selon les conditions.",
      },
      {
        question: "Vaisselle jetable réutilisable ou compostable : que choisir ?",
        answer:
          "Le compostable est idéal pour événements éco et collectivités AGEC. Le plastique réutilisable convient aux usages intensifs (festivals, CHR) où la durabilité prime sur le jetable à usage unique.",
      },
    ],
    seoHeading: "Vaisselle jetable pro : qualité, éco et petit prix",
    seoSections: [
      {
        id: "usages-pro",
        heading: "Vaisselle jetable pour traiteurs, CHR et collectivités",
        paragraphs: [
          "Notre catalogue vaisselle jetable couvre les besoins quotidiens des traiteurs, restaurants, hôtels, cantines et associations. Assiettes compostables pour réceptions, kits couverts bois pour buffets, plateaux repas biodégradables pour la restauration collective.",
          "Chaque gamme est disponible en lots adaptés à votre volume : de quelques packs pour un événement privé à des palettes pour les collectivités.",
        ],
      },
      {
        id: "matieres-eco",
        heading: "Matières éco : compostable, bois, carton et réutilisable",
        paragraphs: [
          "Choisissez entre pulpe de canne, bagasse, bois et bambou pour une vaisselle jetable compostable conforme AGEC, ou optez pour le plastique réutilisable pour un usage intensif en CHR et événementiel.",
          "Nos assiettes biodégradables et couverts en bois sont des alternatives crédibles au plastique à usage unique pour vos clients sensibles à l'image éco-responsable.",
        ],
      },
      {
        id: "tarifs-livraison",
        heading: "Tarifs dégressifs et livraison 24/72h",
        paragraphs: [
          "Comptes professionnels : remises dès 10 packs, devis volume en ligne et paiement sous 30 jours pour les encours validés. Particuliers et associations : commande sans minimum sur les références en stock.",
          "Livraison 24/72h partout en France sur plus de 3 000 références. Frais de port calculés au panier, possibilité de livraison en palette pour les grands volumes.",
        ],
      },
      {
        id: "conformite-avec",
        heading: "Conformité AGEC et contact alimentaire",
        paragraphs: [
          "Les gammes compostables et biodégradables répondent aux exigences de la loi AGEC pour la restauration et les événements. Certifications contact alimentaire sur les références adaptées à la vente à emporter et la restauration collective.",
          "Besoin d'un conseil produit ou d'un devis volume ? Notre équipe accompagne traiteurs, CHR et acheteurs publics au 09 74 06 00 74 ou via le formulaire de devis en ligne.",
        ],
      },
    ],
  },
};

export function getCategory(slug: string): Category | undefined {
  return categories[slug];
}

/** Chemin canonique de la catégorie maquette. */
export const featuredCategoryPath = categoryPath(featuredCategorySlug);
