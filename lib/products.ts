import type { FaqItem } from "@/lib/site";

export type ProductSpec = {
  label: string;
  value: string;
};

export type VolumeTier = {
  quantity: string;
  discount: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductBadge = {
  label: string;
  title: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  categoryPath: string;
  description: string;
  longDescription: string;
  priceHt: number;
  priceWasHt?: number;
  priceTtc: number;
  unit: string;
  unitPriceHt?: number;
  packLabel: string;
  stockLabel: string;
  rating: number;
  reviewCount: number;
  volumeTiers: VolumeTier[];
  reassurance: string[];
  badges: ProductBadge[];
  specs: ProductSpec[];
  shipping: string;
  personalization: string;
  faq: FaqItem[];
  crossSell: {
    slug: string;
    name: string;
    priceHt: number;
    image: string;
    category: string;
    priceFrom: string;
    rating: number;
    reviewCount: number;
    packLabel?: string;
  }[];
  images: ProductImage[];
};

const gobeletImage = "/products/gobelet-carton-24cl.jpg";

export const products: Record<string, Product> = {
  "gobelet-carton-24cl-kraft-individuel": {
    slug: "gobelet-carton-24cl-kraft-individuel",
    name: "Gobelet carton 24 cl Kraft (individuel)",
    shortName: "Gobelet carton 24 cl Kraft",
    metaTitle: "Gobelet carton 24 cl Kraft emballé individuellement",
    metaDescription:
      "Gobelet carton kraft 24 cl emballé individuellement, lot de 50 dès 3,20 € HT. Boissons chaudes et froides, biodégradable. Livraison 24/72h, tarifs dégressifs pro.",
    category: "Gobelets carton",
    categoryPath: "/vaisselle-jetable",
    description:
      "Gobelet carton kraft 24 cl emballé individuellement. Idéal pour cafés, thés et boissons chaudes ou froides en CHR et événementiel.",
    longDescription: `Ces gobelets emballés individuellement sont conçus pour la consommation de boissons chaudes et froides en toute hygiène. Pratiques et confortables à l'usage, ils conviennent parfaitement aux environnements professionnels et aux usages nomades.

Adaptés à une large variété de boissons telles que le café, le thé, le lait ou le chocolat chaud, ces gobelets offrent une prise en main agréable et une bonne résistance à la chaleur comme au froid. L'emballage individuel garantit une hygiène optimale, particulièrement appréciée dans les lieux à forte fréquentation.

Ils sont couramment utilisés dans les hôtels, cafétérias, restaurants, food trucks et bureaux, répondant aux besoins du service à emporter comme de la consommation sur place.

À noter : couvercle non inclus.`,
    priceHt: 3.2,
    priceWasHt: 3.9,
    priceTtc: 3.84,
    unit: "pack de 50",
    unitPriceHt: 0.064,
    packLabel: "Lot de 50",
    stockLabel: "En stock · Livraison 24/72h",
    rating: 4.9,
    reviewCount: 8,
    volumeTiers: [
      { quantity: "1–9 packs", discount: "3,20 € HT / pack" },
      { quantity: "10–49 packs", discount: "-8 %" },
      { quantity: "50+ packs", discount: "-15 % dès 500 unités" },
    ],
    reassurance: [
      "Contact alimentaire",
      "Emballage individuel",
      "Biodégradable",
      "Boissons chaudes & froides",
    ],
    badges: [
      { label: "Bio", title: "Biodégradable" },
      { label: "Chaud", title: "Compatible boissons chaudes" },
    ],
    specs: [
      { label: "Contenance", value: "24 cl (8 OZ)" },
      { label: "Matière", value: "Carton et PE" },
      { label: "Dimensions", value: "Ø 80 mm · Hauteur 92 mm" },
      { label: "Conditionnement", value: "50 unités / pack" },
      { label: "Couleur", value: "Kraft clair / marron" },
      { label: "Emballage", value: "Individuel (hygiène optimale)" },
      { label: "Bio", value: "Oui" },
      { label: "Micro-ondable", value: "Non" },
    ],
    shipping:
      "Livraison 24/72h partout en France sur stock. Frais de port dès 6,90 € HT, offerts dès 250 € HT. Possibilité de livraison en palette pour les volumes importants.",
    personalization:
      "Cette référence n'est pas personnalisable. Pour l'impression logo sur gobelet carton, consultez notre gamme gobelets personnalisables (minimum 250 pièces, sérigraphie 1 à 4 couleurs, BAT sous 48h).",
    faq: [
      {
        question: "Le couvercle est-il inclus ?",
        answer:
          "Non, le couvercle n'est pas inclus avec ce gobelet. Des couvercles compatibles sont disponibles séparément dans notre catalogue gobelets carton.",
      },
      {
        question: "Ces gobelets sont-ils adaptés aux boissons chaudes ?",
        answer:
          "Oui. Ils sont conçus pour les boissons chaudes et froides : café, thé, lait, chocolat chaud. Ils ne sont pas micro-ondables.",
      },
      {
        question: "Pourquoi l'emballage individuel ?",
        answer:
          "Chaque gobelet est emballé individuellement pour garantir une hygiène optimale, idéal en hôtellerie, cafétérias et lieux à forte fréquentation.",
      },
      {
        question: "Y a-t-il un minimum de commande ?",
        answer:
          "Non pour les particuliers et petits volumes. Les tarifs dégressifs s'appliquent à partir de 10 packs pour les comptes professionnels.",
      },
      {
        question: "Peut-on personnaliser ces gobelets avec notre logo ?",
        answer:
          "Cette référence n'est pas personnalisable. Pour un gobelet carton avec logo, consultez notre gamme personnalisation (minimum 250 pièces, BAT sous 48h).",
      },
    ],
    crossSell: [
      {
        slug: "gobelet-carton-24cl-kraft-individuel",
        name: "Gobelet carton 18 cl Kraft (individuel)",
        priceHt: 2.9,
        image: gobeletImage,
        category: "Gobelets",
        priceFrom: "2,90 €",
        rating: 4.8,
        reviewCount: 5,
        packLabel: "Lot de 50",
      },
      {
        slug: "gobelet-carton-24cl-kraft-individuel",
        name: "Kit couverts 6 en 1 bois kraft",
        priceHt: 8.99,
        image: "/products/kit-couverts-6.jpg",
        category: "Couverts",
        priceFrom: "8,99 €",
        rating: 5,
        reviewCount: 4,
        packLabel: "Lot de 100",
      },
      {
        slug: "gobelet-carton-24cl-kraft-individuel",
        name: "Gobelet smoothie 35 à 65 cl",
        priceHt: 4.5,
        image: "/products/gobelet-smoothie.jpg",
        category: "Gobelets",
        priceFrom: "4,50 €",
        rating: 4.9,
        reviewCount: 8,
        packLabel: "Lot de 50",
      },
    ],
    images: [
      {
        src: gobeletImage,
        alt: "Gobelet carton 24 cl Kraft emballé individuellement",
      },
    ],
  },
};

export function getProduct(slug: string): Product | undefined {
  return products[slug];
}

export function formatPrice(value: number): string {
  return value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
