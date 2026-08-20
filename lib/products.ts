import type { FaqItem } from "@/lib/site";

export type ProductSpec = {
  label: string;
  value: string;
};

export type VolumeTier = {
  quantity: string;
  discount: string;
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
  priceTtc: number;
  unit: string;
  stockLabel: string;
  volumeTiers: VolumeTier[];
  reassurance: string[];
  specs: ProductSpec[];
  shipping: string;
  personalization: string;
  faq: FaqItem[];
  crossSell: {
    slug: string;
    name: string;
    priceHt: number;
  }[];
  imageColors: string[];
};

export const products: Record<string, Product> = {
  "assiette-biodegradable-15cm": {
    slug: "assiette-biodegradable-15cm",
    name: "Assiette biodégradable ronde 15 cm",
    shortName: "Assiette biodégradable 15 cm",
    metaTitle: "Assiette biodégradable ronde 15 cm — Restauration éco",
    metaDescription:
      "Assiette en pulpe de canne 15 cm, 100 % compostable. Pack de 100 dès 4,90 € HT. Livraison 24/72h, tarifs dégressifs pro. Demandez un devis volume.",
    category: "Assiettes compostables",
    categoryPath: "/assiettes-compostables",
    description:
      "Assiette en pulpe de canne à sucre, 100 % compostable et certifiée contact alimentaire.",
    longDescription: `Cette assiette biodégradable ronde 15 cm est idéale pour les **traiteurs**, **cantines** et **événements** recherchant une alternative éco-responsable au plastique à usage unique. Fabriquée en pulpe de canne à sucre, elle est **100 % compostable** en compostage industriel après usage.

**Conditionnement** : pack de 100 unités. Livraison **24/72h** partout en France. Tarifs dégressifs sur volumes pour les comptes professionnels.

**Usages** : restauration collective, événementiel, food trucks, mariages et réceptions.`,
    priceHt: 4.9,
    priceTtc: 5.88,
    unit: "pack de 100",
    stockLabel: "En stock · Livraison 24/72h",
    volumeTiers: [
      { quantity: "1–9 packs", discount: "Prix catalogue" },
      { quantity: "10–49 packs", discount: "-8 %" },
      { quantity: "50+ packs", discount: "-15 % dès 500 unités" },
    ],
    reassurance: [
      "Contact alimentaire",
      "Tarifs pro dégressifs",
      "Compostable industriel",
      "9,5/10 · 2 417 avis",
    ],
    specs: [
      { label: "Diamètre", value: "15 cm" },
      { label: "Matière", value: "Pulpe de canne à sucre" },
      { label: "Conditionnement", value: "100 unités / pack" },
      { label: "Compostable", value: "Oui — compostage industriel" },
      { label: "Certification", value: "Contact alimentaire" },
      { label: "Couleur", value: "Naturel / beige" },
    ],
    shipping:
      "Livraison 24/72h partout en France sur stock. Frais de port calculés au panier. Possibilité de livraison en palette pour les volumes importants.",
    personalization:
      "Personnalisation non disponible sur cette référence. Consultez notre gamme gobelets et sacs personnalisables pour l'impression logo.",
    faq: [
      {
        question: "Cette assiette est-elle compostable en compostage domestique ?",
        answer:
          "Elle est compostable en compostage industriel. Pour le compostage domestique, les délais de dégradation peuvent être plus longs selon les conditions.",
      },
      {
        question: "Y a-t-il un minimum de commande ?",
        answer: "Non pour les particuliers et petits volumes. Les tarifs dégressifs s'appliquent à partir de 10 packs pour les comptes pro.",
      },
      {
        question: "Livraison possible en urgence (J+1) ?",
        answer:
          "Oui sur les références en stock, selon votre zone et l'heure de commande. Contactez-nous pour les urgences événementielles.",
      },
      {
        question: "Compatible micro-ondes ou four ?",
        answer:
          "Usage recommandé pour aliments froids ou tièdes. Éviter le micro-ondes prolongé et le four au-delà de 100 °C.",
      },
    ],
    crossSell: [
      { slug: "couverts-bois", name: "Couverts bois compostables", priceHt: 3.2 },
      { slug: "serviettes-kraft", name: "Serviettes kraft 33 cm", priceHt: 2.8 },
      { slug: "sac-kraft", name: "Sac kraft poignées", priceHt: 6.5 },
    ],
    imageColors: ["#d17d3c", "#9e461d", "#f0e4d6"],
  },
};

export function getProduct(slug: string): Product | undefined {
  return products[slug];
}

export function formatPrice(value: number): string {
  return value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
