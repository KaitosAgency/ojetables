import catalogNavRaw from "./catalog-nav-data.json";

export const featuredProductSlug = "assiette-biodegradable-15cm";

export function productPath(slug: string): string {
  return `/produit/${slug}`;
}

export const routes = {
  home: "/",
  product: productPath(featuredProductSlug),
  proAccount: "#compte-pro",
  quote: "#devis",
  events: "#evenements",
  personalization: "#personnalisation",
  destockage: "#destockage",
} as const;

export const site = {
  name: "Ojetables",
  legalName: "Ojetables",
  tagline: "Vaisselle jetable éco-responsable pour professionnels.",
  description:
    "Fournisseur français de vaisselle jetable et emballages éco pour traiteurs, CHR et collectivités. +3 000 références en stock, livraison 24/72h, tarifs dégressifs, compte pro et devis volume.",
  phone: "09 74 06 00 74",
  phoneHref: "tel:+33974060074",
  email: "contact@ojetables.fr",
  address: {
    street: "Zone industrielle",
    city: "France",
    postalCode: "",
    region: "France",
    country: "FR",
    full: "Livraison 24/72h partout en France",
  },
  foundedYear: 2011,
  aggregateRating: {
    score: 9.5,
    count: 2417,
    display: "9,5/10",
    label: "Avis Garantis",
    reviewsUrl: "https://www.societe-des-avis-garantis.fr/ojetables-fr/",
  },
  social: {},
} as const;

export const topBar = {
  delivery: "Livraison 24/72h partout en France",
  contactLabel: "Contact & devis",
  contactHref: "#contact",
} as const;

function normalizeSiteUrl(value: string): string {
  const trimmed = value.trim().replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
    return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()) {
    return normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }
  if (process.env.VERCEL_URL?.trim()) {
    return normalizeSiteUrl(process.env.VERCEL_URL);
  }
  return "https://www.ojetables.fr";
}

export const logos = {
  default: "/logo.svg",
  light: "/logo.svg",
  dark: "/logo.svg",
  /** Dimensions source ojetables.fr */
  width: 280,
  height: 83,
  alt: "Logo Ojetables — vaisselle jetable biodégradable",
} as const;

export const favicon = {
  path: "/favicon.png",
  width: 32,
  height: 32,
} as const;

export const partnerLogos = {
  garciaDePou: {
    src: "/garcia-de-pou-prosaveurs-fourniture-pour-l-hotellerie-et-la-restauration-01.svg",
    alt: "Garcia de Pou",
    width: 1080,
    height: 169,
  },
} as const;

export type NavHighlight = {
  label: string;
  href: string;
  accent: "brand" | "destock";
};

export const nav = {
  main: [
    { label: "Pro / Devis", href: "#devis" },
    { label: "Éco & Engagements", href: "#eco" },
    { label: "Contact", href: "#contact" },
  ],
  /** Boutons dédiés niveau 1 (après Produits) */
  highlights: [
    { label: "Personnalisation", href: routes.personalization, accent: "brand" },
    { label: "Destockage", href: routes.destockage, accent: "destock" },
  ] satisfies NavHighlight[],
  productsLabel: "Produits",
  productsHref: "#produits",
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

/** Catégorie catalogue — ligne 2 du header (structure Magento ojetables.fr) */
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
 * Navigation catalogue niveau 1 — structure Magento ojetables.fr (9 familles).
 * Exclus du menu : Destockage (bouton L1), Garcia de Pou (filtre marque).
 * Généré via `node scripts/parse-nav.mjs` → lib/catalog-nav-data.json
 */

function maquetteCatalogHref(path: string): string {
  if (path.includes("assiette-biodegradable-et-compostable")) {
    return routes.product;
  }
  return "#";
}

type RawNavLink = {
  label: string;
  href: string;
  children?: RawNavLink[];
};

function mapCatalogNavLink(item: RawNavLink): NavLink {
  return {
    label: item.label,
    href: maquetteCatalogHref(item.href),
    children: item.children?.length ? item.children.map(mapCatalogNavLink) : undefined,
  };
}

function mapCatalogNavCategory(
  category: (typeof catalogNavRaw)[number],
): CatalogNavCategory {
  const raw = category as (typeof catalogNavRaw)[number] & {
    items?: RawNavLink[];
    groups?: { title: string; items: RawNavLink[] }[];
  };

  return {
    id: raw.id,
    label: raw.label,
    href: maquetteCatalogHref(raw.href),
    groups: raw.groups?.map((group) => ({
      title: group.title,
      items: group.items.map(mapCatalogNavLink),
    })),
    items: raw.items?.map(mapCatalogNavLink),
  };
}

export const catalogNavCategories: CatalogNavCategory[] =
  catalogNavRaw.map(mapCatalogNavCategory);

/** Alias mobile / megamenu legacy — agrégé depuis le catalogue */
export const productNavGroups: ProductNavGroup[] = [
  ...catalogNavCategories.flatMap((category) =>
    category.groups
      ? category.groups
      : [{ title: category.label, items: category.items ?? [] }],
  ),
  {
    title: "Par métier",
    items: [
      { label: "Traiteurs & événementiel", href: "#" },
      { label: "CHR & restauration", href: "#" },
      { label: "Collectivités & cantines", href: "#" },
      { label: "Mariage & anniversaire", href: routes.events },
    ],
  },
  {
    title: "Marques",
    items: [
      { label: "Garcia de Pou", href: "#" },
      { label: "Vaisselle pro", href: "#" },
      { label: "Petit prix", href: "#" },
      { label: "Personnalisable", href: routes.personalization },
    ],
  },
];

export const headerActions = {
  cartCount: 0,
  searchPlaceholder: "Rechercher une référence, un produit…",
} as const;

export const personalizationSteps = [
  {
    step: 1,
    title: "Choisissez le produit",
    description: "Gobelet carton, réutilisable, sac kraft ou couvert — chaque gamme a ses règles (minimum, délai, technique).",
  },
  {
    step: 2,
    title: "Indiquez la quantité",
    description: "Le prix unitaire et le minimum de commande s'affichent en direct selon le produit sélectionné.",
  },
  {
    step: 3,
    title: "Envoyez votre visuel",
    description: "Logo, texte ou visuel complet — formats vectoriels conseillés (PDF, AI, SVG).",
  },
  {
    step: 4,
    title: "Validez le BAT",
    description: "Bon à tirer sous 48h, puis fabrication et livraison (standard 2–3 sem., express possible).",
  },
] as const;

export type PersonalizationProductType = {
  id: string;
  label: string;
  minQty: string;
  unitFrom: string;
  delay: string;
  technique: string;
  href: string;
};

export const personalizationProductTypes: PersonalizationProductType[] = [
  {
    id: "carton",
    label: "Gobelet carton",
    minQty: "250 pcs",
    unitFrom: "0,82 € HT",
    delay: "2–3 sem.",
    technique: "Logo 1 à 4 couleurs · BAT obligatoire",
    href: "#",
  },
  {
    id: "reusable-digital",
    label: "Gobelet réutilisable (digital)",
    minQty: "Dès 1 pcs",
    unitFrom: "0,60 € HT",
    delay: "2–6 sem.",
    technique: "Quadrichromie photo sur toute la hauteur",
    href: "#",
  },
  {
    id: "reusable-seri",
    label: "Gobelet réutilisable (1 couleur)",
    minQty: "500 pcs",
    unitFrom: "0,62 € HT",
    delay: "3–4 sem.",
    technique: "Sérigraphie 1 couleur · Pantone",
    href: "#",
  },
  {
    id: "other",
    label: "Sacs, couverts, autres",
    minQty: "Sur devis",
    unitFrom: "Devis 24h",
    delay: "Variable",
    technique: "Marquage logo · volumes pro",
    href: "#devis",
  },
];

export const personalizationWizardOptions = {
  events: [
    { id: "mariage", label: "Mariage / réception" },
    { id: "pro", label: "Événement d'entreprise" },
    { id: "festival", label: "Festival / concert" },
    { id: "chr", label: "CHR / restauration" },
  ],
  quantities: [
    { id: "small", label: "Moins de 100" },
    { id: "medium", label: "100 à 500" },
    { id: "large", label: "500 à 2 000" },
    { id: "volume", label: "Plus de 2 000" },
  ],
  delays: [
    { id: "standard", label: "Standard (2–3 sem.)" },
    { id: "express", label: "Express (5–8 j)" },
    { id: "flexible", label: "Pas de date fixe" },
  ],
} as const;

export const personalizationFaq = [
  {
    question: "Peut-on commander dès 1 gobelet personnalisé ?",
    answer:
      "Oui, uniquement sur les gobelets réutilisables en impression digitale multicouleur. Les gobelets carton démarrent à 250 pièces, la sérigraphie 1 couleur à 500 pièces.",
  },
  {
    question: "Comment envoyer mon logo ?",
    answer:
      "Après commande ou demande de devis, vous déposez votre fichier (PDF vectoriel, AI ou SVG recommandé). Notre équipe prépare un bon à tirer (BAT) à valider avant fabrication.",
  },
  {
    question: "L'option express, comment ça marche ?",
    answer:
      "Sur la maquette, l'express est une option à cocher sur la fiche produit — plus un produit séparé à découvrir par hasard sur le site actuel. Délai 5–8 jours selon quantité, après validation du BAT.",
  },
  {
    question: "Quel délai pour un devis personnalisation ?",
    answer: "Devis sous 24h ouvrées pour sacs, couverts et commandes volume. BAT sous 48h après réception du visuel.",
  },
] as const;

export const destockageItems = [
  {
    name: "Pot plastique transparent 25/30 cl",
    priceWas: "3,15 €",
    priceNow: "2,50 €",
    badge: "-21 %",
  },
  {
    name: "Gobelet carton 24 cl kraft (individuel)",
    priceWas: "3,90 €",
    priceNow: "3,20 €",
    badge: "Promo",
  },
  {
    name: "Wood Box XXL 6 L avec couvercle",
    priceWas: "46,20 €",
    priceNow: "38,20 €",
    badge: "-17 %",
  },
  {
    name: "Kit couverts 6 en 1 bois kraft",
    priceWas: "9,99 €",
    priceNow: "8,99 €",
    badge: "Stock limité",
  },
] as const;

export const legalLinks = [
  { label: "Maquette preview Kaitos", href: "https://kaitos.agency" },
] as const;

export const proofStats = [
  { label: "Références", value: "+3 000" },
  { label: "Note clients", value: "9,5/10" },
  { label: "Livraison", value: "24/72h" },
  { label: "Depuis", value: "2011" },
] as const;

export const statsBandBadges = [
  { label: "Livraison 24/72h" },
  { label: "Paiement 30j pro" },
  { label: "Tarifs dégressifs" },
  { label: "Stock permanent" },
] as const;

export const clientLogos = [
  "Air France",
  "Sodexo",
  "CNES",
  "Louis Vuitton",
  "Newrest",
] as const;

export const sectors = [
  {
    title: "Traiteurs & événementiel",
    description: "Kits couverts, verrines, plateaux repas pour vos événements pro.",
    cta: "Voir la gamme traiteur",
    href: "#",
  },
  {
    title: "CHR & restauration",
    description: "Gobelets carton, barquettes, sacs kraft pour restos et food trucks.",
    cta: "Voir la gamme resto",
    href: "#",
  },
  {
    title: "Collectivités & cantines",
    description: "Plateaux compartiments, volumes, conformité loi AGEC.",
    cta: "Demander un devis",
    href: "#devis",
  },
  {
    title: "Personnalisation",
    description: "Gobelets, sacs et couverts avec votre logo — devis sous 24h.",
    cta: "Voir le parcours",
    href: routes.personalization,
  },
] as const;

export const trustPillars = [
  {
    title: "9,5/10 sur 2 417 avis",
    description: "Réputation certifiée Avis Garantis — un argument de confiance pour vos acheteurs pro.",
  },
  {
    title: "Livraison 24/72h",
    description: "Stock permanent sur +3 000 références, expédition rapide partout en France.",
  },
  {
    title: "Tarifs dégressifs pro",
    description: "Compte professionnel, paiement à 30 jours et devis volume en ligne.",
  },
  {
    title: "Conformité AGEC",
    description: "Produits biodégradables, compostables et certifiés contact alimentaire.",
  },
] as const;

export const ecoCommitments = [
  "Conformité loi AGEC",
  "Produits compostables & biodégradables",
  "Fournisseurs responsables",
  "Alternatives au plastique à usage unique",
] as const;

export const reviewsFallback = [
  {
    id: "1",
    author: "Traiteur événementiel",
    rating: 5,
    text: "Livraison rapide, gamme complète et tarifs pro compétitifs. Notre fournisseur principal depuis 3 ans.",
    relativeTime: "il y a 1 mois",
  },
  {
    id: "2",
    author: "Responsable cantine",
    rating: 5,
    text: "Plateaux repas conformes AGEC, stock fiable et devis volume traité sous 24h.",
    relativeTime: "il y a 2 mois",
  },
  {
    id: "3",
    author: "Gérant CHR",
    rating: 5,
    text: "Gobelets carton et barquettes kraft de qualité. Service client réactif.",
    relativeTime: "il y a 3 mois",
  },
] as const;

export const homeFaq = [
  {
    question: "Quel est le délai de livraison chez Ojetables ?",
    answer:
      "Livraison 24/72h partout en France sur les références en stock. Pour les commandes volume ou personnalisées, un délai précis vous est communiqué dans le devis.",
  },
  {
    question: "Proposez-vous des tarifs dégressifs pour les professionnels ?",
    answer:
      "Oui. Créez votre compte pro pour accéder aux tarifs dégressifs, au paiement à 30 jours et aux devis volume. Plus la quantité est importante, plus le prix unitaire baisse.",
  },
  {
    question: "Vos produits sont-ils conformes à la loi AGEC ?",
    answer:
      "Oui. Nous proposons une gamme éco-responsable : biodégradable, compostable et recyclable, avec des produits certifiés contact alimentaire adaptés aux exigences des collectivités et CHR.",
  },
  {
    question: "Puis-je personnaliser des gobelets ou des sacs avec mon logo ?",
    answer:
      "Oui. Parcours guidé en 4 étapes : choix du produit, quantité, envoi du visuel, validation du BAT. Minimum dès 1 pièce (réutilisable digital) ou 250 pièces (carton). Devis sous 24h pour les autres gammes.",
  },
] as const;

export type FaqItem = { question: string; answer: string };

export const previewDisclaimer =
  "Maquette preview — non contractuelle · Réalisée par Kaitos Agency";
