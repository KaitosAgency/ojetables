import catalogNavRaw from "./catalog-nav-data.json";

export const featuredProductSlug = "assiette-biodegradable-15cm";

export function productPath(slug: string): string {
  return `/produit/${slug}`;
}

export const ojetablesLive = {
  /** Compte client unique — pas de distinction « pro » / particulier côté inscription Magento. */
  account: "https://www.ojetables.fr/customer/account/",
  accountLogin: "https://www.ojetables.fr/customer/account/login/",
  accountRegister: "https://www.ojetables.fr/customer/account/create/",
  quote: "https://www.ojetables.fr/qquoteadv/index/",
  contact: "https://www.ojetables.fr/contacts/",
  mariage: "https://www.ojetables.fr/vaisselle-jetable-mariage/",
} as const;

export const routes = {
  home: "/",
  product: productPath(featuredProductSlug),
  account: ojetablesLive.account,
  quote: ojetablesLive.quote,
  mariage: ojetablesLive.mariage,
  personalization: "#personnalisation",
  catalog: "#catalogue",
  destockage: "/destockage",
} as const;

export const site = {
  name: "Ojetables",
  legalName: "Ojetables",
  tagline: "Vaisselle jetable éco-responsable pour professionnels.",
  description:
    "Fournisseur français de vaisselle jetable et emballages éco pour traiteurs, CHR et collectivités. +3 000 références en stock, livraison 24/72h, tarifs dégressifs et devis volume.",
  phone: "09 74 06 00 74",
  phoneHref: "tel:+33974060074",
  email: "contact@ojetables.fr",
  address: {
    street: "ZA de Saune — 1 rue Roland Garros",
    city: "Sainte-Foy-d'Aigrefeuille",
    postalCode: "31570",
    region: "Occitanie",
    country: "FR",
    full: "ZA de Saune — 1 rue Roland Garros, 31570 Sainte-Foy-d'Aigrefeuille",
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

export const avisGarantis = {
  siteId: "11672",
  reviewsUrl: site.aggregateRating.reviewsUrl,
  certificateLabel: "Voir l'attestation",
  assets: {
    logo: "/trust/avis-garantis-logo.png",
    cocarde: "/trust/avis-garantis-cocarde.svg",
    icon: "/trust/avis-garantis-icon.png",
  },
  widgetFooterUrl:
    "https://www.societe-des-avis-garantis.fr/wp-content/plugins/ag-core/widgetFooter.php?id=11672",
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
  light: "/logo-kraft.svg",
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
    { label: "Catalogue", href: routes.catalog },
    { label: "Mon devis", href: routes.quote },
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
      { label: "Mariage & anniversaire", href: routes.mariage },
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

export type CatalogFamilyAccent = "default" | "teal" | "kraft" | "partner";

export type CatalogFamily = {
  id: string;
  label: string;
  /** Libellé Magento ojetables.fr si différent du titre maquette. */
  originalLabel?: string;
  href: string;
  image: string;
  description: string;
  highlights: readonly string[];
  accent?: CatalogFamilyAccent;
};

/**
 * Les 12 familles homepage Magento (« Nos catégories ») — visuels d'origine ojetables.fr.
 */
export const catalogFamilies: readonly CatalogFamily[] = [
  {
    id: "vaisselle-jetable",
    label: "Vaisselle jetable",
    href: "https://www.ojetables.fr/vaisselle-jetable-petit-prix",
    image: "/categories/vaisselle-jetable.jpg",
    description:
      "Assiettes, couverts en bois, bols et vaisselle à usage unique — carton, pulpe de canne ou plastique réutilisable.",
    highlights: ["Assiettes", "Couverts bois", "Bols"],
  },
  {
    id: "verrine",
    label: "Verrine",
    href: "https://www.ojetables.fr/verrine-a-usage-unique-economique",
    image: "/categories/verrine.jpg",
    description:
      "Verrines cocktail, mises en bouche et coupes dessert pour buffets, traiteurs et réceptions.",
    highlights: ["Cocktail", "Mise en bouche", "Piques"],
  },
  {
    id: "bio-ecolo",
    label: "Bio/Ecolo",
    href: "https://www.ojetables.fr/emballage-biodegradable",
    image: "/categories/bio-ecolo.jpg",
    description:
      "Vaisselle biodégradable et compostable conforme AGEC — pulpe de canne, bagasse, bambou et palmier.",
    highlights: ["Compostable", "AGEC", "Pulpe"],
  },
  {
    id: "personnalisation",
    label: "Personnalisation",
    originalLabel: "Emballages / vaisselle jetables personnalisés",
    href: routes.personalization,
    image: "/categories/personnalisation.png",
    description:
      "Gobelets, sacs kraft et emballages au logo — BAT sous 48h, minimum dès 1 pièce selon le support.",
    highlights: ["Logo", "BAT 48h", "Dès 1 pc"],
    accent: "teal",
  },
  {
    id: "snack",
    label: "SNACK",
    originalLabel: "SNACK",
    href: "https://www.ojetables.fr/snack",
    image: "/categories/snack.jpg",
    description:
      "Emballages snack : boîtes burger, barquettes bagasse et supports sucré-salé pour food trucks.",
    highlights: ["Burger", "Barquettes", "Food truck"],
  },
  {
    id: "sac",
    label: "Sac",
    href: "https://www.ojetables.fr/sac-papier-kraft",
    image: "/categories/sac.png",
    description:
      "Sacs kraft, sacs à pain, sandwich et viennoiserie — papier et personnalisation logo sur devis.",
    highlights: ["Kraft", "Pain", "Logo"],
  },
  {
    id: "destockage",
    label: "Destockage",
    originalLabel: "DESTOCKAGE",
    href: routes.destockage,
    image: "/categories/destockage.png",
    description:
      "Promotions et fins de série — vaisselle jetable et emballages à prix cassés, stocks limités.",
    highlights: ["Promos", "Fins de série", "Stock limité"],
    accent: "kraft",
  },
  {
    id: "gobelet-verre",
    label: "Gobelet / Verre",
    href: "https://www.ojetables.fr/gobelet-verre-flute",
    image: "/categories/gobelet-verre.jpg",
    description:
      "Gobelets carton, plastique réutilisable et flûtes — chaud ou froid, personnalisable dès 1 pièce.",
    highlights: ["Carton", "Réutilisable", "Flûte"],
  },
  {
    id: "plateau-boite",
    label: "Plateau / boite",
    href: "https://www.ojetables.fr/plateau-jetable",
    image: "/categories/plateau-boite.png",
    description:
      "Plateaux repas, wood box, boîtes pizza et coffrets à emporter pour traiteur et collectif.",
    highlights: ["Repas", "Wood box", "Pizza"],
  },
  {
    id: "nappe-serviette",
    label: "Nappe - serviette",
    href: "https://www.ojetables.fr/nappe-et-serviette",
    image: "/categories/nappe-serviette.png",
    description:
      "Nappes intissé, chemins de table et serviettes papier pour mariages, réceptions et CHR.",
    highlights: ["Intissé", "Serviettes", "Mariage"],
  },
  {
    id: "hygiene-resto",
    label: "Hygiène/Resto",
    href: "https://www.ojetables.fr/hygiene-et-resto",
    image: "/categories/hygiene-resto.png",
    description:
      "Consommables CHR : barquettes alu, film étirable, essuie-mains et accessoires de cuisine.",
    highlights: ["Aluminium", "Film", "CHR"],
  },
  {
    id: "garcia-de-pou",
    label: "Garcia de Pou",
    href: "https://www.ojetables.fr/garcia-de-pou",
    image: "/categories/garcia-de-pou.png",
    description:
      "Gamme Garcia de Pou : nappes, serviettes, sacs et emballages hôtellerie-restauration.",
    highlights: ["Marque", "Hôtellerie", "Nappage"],
    accent: "partner",
  },
];

export const catalogSeo = {
  label: "Catalogue",
  title: "Nos catégories",
  /** Ligne courte sous le titre — mots-clés SEO sans alourdir la page. */
  metaLine: "+3 000 références · livraison 24/72h",
} as const;

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
    href: routes.quote,
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
    category: "Barquettes",
    image: "/products/gobelet-rpet.jpg",
    priceWas: "3,15 €",
    priceFrom: "2,50 €",
    badge: "-21 %",
    href: "https://www.ojetables.fr/destockage-vaisselle-jetable",
    packLabel: "Lot de 50",
    rating: 4.6,
    reviewCount: 11,
  },
  {
    name: "Gobelet carton 24 cl kraft (individuel)",
    category: "Gobelets",
    image: "/products/gobelet-carton-24cl.jpg",
    priceWas: "3,90 €",
    priceFrom: "3,20 €",
    badge: "Promo",
    href: "https://www.ojetables.fr/gobelet-carton-24cl-emballe-individuellement-kraft-clair.html",
    packLabel: "Lot de 50",
    rating: 4.9,
    reviewCount: 8,
  },
  {
    name: "Wood Box XXL 6 L avec couvercle",
    category: "Plateaux",
    image: "/products/wood-box-xxl.jpg",
    priceWas: "46,20 €",
    priceFrom: "38,20 €",
    badge: "-17 %",
    href: "https://www.ojetables.fr/wood-box-xxl-6-litres.html",
    packLabel: "Lot de 10",
    rating: 4.9,
    reviewCount: 9,
  },
  {
    name: "Kit couverts 6 en 1 bois kraft",
    category: "Couverts",
    image: "/products/kit-couverts-6.jpg",
    priceWas: "9,99 €",
    priceFrom: "8,99 €",
    badge: "Stock limité",
    href: "https://www.ojetables.fr/kit-couverts-6-1-bois-kraft.html",
    packLabel: "Lot de 100",
    rating: 5,
    reviewCount: 4,
  },
  {
    name: "Gobelet smoothie 35 à 65 cl",
    category: "Gobelets",
    image: "/products/gobelet-smoothie.jpg",
    priceWas: "5,20 €",
    priceFrom: "4,50 €",
    badge: "-13 %",
    href: "https://www.ojetables.fr/gobelet-smoothie-8755.html",
    packLabel: "Lot de 50",
    rating: 4.9,
    reviewCount: 8,
  },
  {
    name: "Assiette Galaxie biodégradable Ø 13 cm",
    category: "Assiettes",
    image: "/products/assiette-galaxie.jpg",
    priceWas: "42,00 €",
    priceFrom: "36,20 €",
    badge: "Fin de série",
    href: "https://www.ojetables.fr/assiette-biodegradable-2088.html",
    packLabel: "Lot de 200",
    rating: 4,
    reviewCount: 2,
  },
  {
    name: "Verrine plastique carrée",
    category: "Verrines",
    image: "/products/verrine-carre.jpg",
    priceWas: "2,95 €",
    priceFrom: "2,35 €",
    badge: "-20 %",
    href: "https://www.ojetables.fr/verrine-plastique-8556.html",
    packLabel: "Lot de 20",
    rating: 5,
    reviewCount: 3,
  },
  {
    name: "Wood Box 1 L avec couvercle",
    category: "Plateaux",
    image: "/products/wood-box.jpg",
    priceWas: "44,99 €",
    priceFrom: "37,99 €",
    badge: "-16 %",
    href: "https://www.ojetables.fr/wood-box-1-litre-avec-caissette-couvercle.html",
    packLabel: "Lot de 25",
    rating: 4.9,
    reviewCount: 9,
  },
  {
    name: "Sachet couverts 6 en 1 bois",
    category: "Couverts",
    image: "/products/sachet-couverts-bois.jpg",
    priceWas: "52,99 €",
    priceFrom: "45,99 €",
    badge: "Promo",
    href: "https://www.ojetables.fr/kit-couverts-6-1-bois-imbattable.html",
    packLabel: "Lot de 500",
    rating: 4.8,
    reviewCount: 10,
  },
  {
    name: "Cuillère en bois 160 mm eco",
    category: "Couverts",
    image: "/products/cuillere-bois.jpg",
    priceWas: "2,20 €",
    priceFrom: "1,80 €",
    badge: "-18 %",
    href: "https://www.ojetables.fr/cuillere-en-bois-160mm-eco.html",
    packLabel: "Lot de 100",
    rating: 4.8,
    reviewCount: 12,
  },
  {
    name: "Plateau repas biodégradable 5 compartiments",
    category: "Plateaux repas",
    image: "/products/plateau-repas-5comp.jpg",
    priceWas: "74,00 €",
    priceFrom: "65,00 €",
    badge: "Stock limité",
    href: "https://www.ojetables.fr/plateau-repas-biodegradable-5compartiments.html",
    packLabel: "Lot de 150",
    rating: 4,
    reviewCount: 2,
  },
  {
    name: "Kit couverts 4 en 1 bois kraft",
    category: "Couverts",
    image: "/products/kit-couverts-4.jpg",
    priceWas: "10,49 €",
    priceFrom: "8,99 €",
    badge: "-14 %",
    href: "https://www.ojetables.fr/kit-couverts-4-1-bois-kraft.html",
    packLabel: "Lot de 100",
    rating: 4.9,
    reviewCount: 9,
  },
  {
    name: "Gobelet plastique réutilisable personnalisé 25–33 cl",
    category: "Gobelets logo",
    image: "/products/gobelet-personnalise.jpg",
    priceWas: "28,90 €",
    priceFrom: "24,55 €",
    badge: "Fin de série",
    href: "https://www.ojetables.fr/gobelet-reutilisable-personnalise-12440.html",
    packLabel: "Dès 1 pc",
    rating: 5,
    reviewCount: 1,
  },
] as const;

export type DestockageProduct = (typeof destockageItems)[number];

export const destockagePage = {
  title: "Promotions & fins de série",
  description:
    "Stocks limités, prix cassés sur références sélectionnées — vaisselle jetable et emballages pro à prix destockage.",
  externalCatalogUrl: "https://www.ojetables.fr/destockage-vaisselle-jetable",
} as const;

export type FooterLink = {
  label: string;
  href: string;
};

/** Liens footer — alignés sur ojetables.fr (maillage interne SEO). */
export const footerNav = {
  informations: [
    { label: "Conditions générales de vente", href: "https://www.ojetables.fr/cgu/" },
    { label: "Mode de paiement", href: "https://www.ojetables.fr/paiement-en-ligne/" },
    { label: "Qui sommes-nous ?", href: "https://www.ojetables.fr/qui-sommes-nous/" },
  ],
  service: [
    { label: "Livraison & frais de port", href: "https://www.ojetables.fr/livraison-vaisselle-jetable/" },
    { label: "Code promo bienvenue -5%", href: "https://www.ojetables.fr/utiliser-le-code-promo/" },
    { label: "Partenaires", href: "https://www.ojetables.fr/partenaire-vaisselle-jetable/" },
    { label: "Nous contacter", href: "https://www.ojetables.fr/contacts/" },
  ],
  metiers: [
    { label: "Traiteurs & événementiel", href: "https://www.ojetables.fr/vaisselle-jetable-traiteur/" },
    { label: "Restaurants & hôtels", href: "https://www.ojetables.fr/vaisselle-jetable-restauration/" },
    { label: "Collectivités & cantines", href: "https://www.ojetables.fr/vaisselle-jetable-collectivite/" },
    { label: "Associations & clubs", href: "https://www.ojetables.fr/vaisselle-jetable-association/" },
    { label: "Boulangeries", href: "https://www.ojetables.fr/vaisselle-jetable-boulangerie/" },
    { label: "Personnalisation logo", href: "https://www.ojetables.fr/emballage-personnalise/" },
  ],
} as const satisfies Record<string, readonly FooterLink[]>;

export const footerCatalog = {
  title: "Catalogue vaisselle jetable",
} as const;

export const legalLinks = [
  { label: "CGV", href: "https://www.ojetables.fr/cgu/" },
  { label: "Livraison", href: "https://www.ojetables.fr/livraison-vaisselle-jetable/" },
  { label: "Contact", href: "https://www.ojetables.fr/contacts/" },
] as const;

export const clientLogos = [
  {
    name: "Air France",
    src: "/logos/clients/Airfrance_logo-01.svg",
    className: "h-11 w-auto max-w-[9.5rem] sm:h-12 sm:max-w-[10.5rem]",
  },
  {
    name: "Sodexo",
    src: "/logos/clients/Sodexo_logo.svg",
    className: "h-9 w-auto max-w-[9.5rem] sm:h-10 sm:max-w-[10.5rem]",
  },
  {
    name: "CNES",
    src: "/logos/clients/CNES_logo-01.svg",
    className: "h-[3.25rem] w-auto max-w-[8.5rem] sm:h-[3.75rem] sm:max-w-[9.5rem]",
  },
  {
    name: "Louis Vuitton",
    src: "/logos/clients/LV_logo-01.svg",
    className: "h-[3.75rem] w-auto max-w-[5.5rem] sm:h-16 sm:max-w-[6rem]",
  },
  {
    name: "Newrest",
    src: "/logos/clients/Newrest_logo-01.svg",
    className: "h-9 w-auto max-w-[10.5rem] sm:h-10 sm:max-w-[11.5rem]",
  },
] as const;

export const pressTvFeature = {
  label: "Capital · M6",
  title: "Vu à la télévision",
  description: "Reportage « J'achète, je jette du grand gaspillage au grand recyclage »",
  videoId: "x88t581",
  videoUrl: "https://www.dailymotion.com/video/x88t581",
  src: "/m6.jpg",
  alt: "Capital sur M6 — J'achète, je jette du grand gaspillage au grand recyclage",
} as const;

export const pressMedia = [
  {
    name: "Actu.fr",
    outlet: "Actu.fr",
    type: "press" as const,
    title: "Ojetables fait rimer art de la table avec biodégradable",
    href: "https://actu.fr/occitanie/sainte-foy-d-aigrefeuille_31480/lauragais-sainte-foy-daigrefeuille-ojetables-fait-rimer-art-la-table-biodegradable_31441574.html",
    src: "/logos/media/actu-fr-01.svg",
    className: "h-7 w-auto max-w-[7.5rem] sm:h-8 sm:max-w-[8.5rem]",
  },
  {
    name: "La Tribune",
    outlet: "La Tribune",
    type: "press" as const,
    title: "Ojetables met fin au plastique dans la restauration rapide",
    href: "https://www.latribune.fr/entreprises/2020-01-07/ojetables-met-fin-au-plastique-dans-la-restauration-rapide-835460.html",
    src: "/logos/media/la-tribune-01.svg",
    className: "h-5 w-auto max-w-[9.5rem] sm:h-6 sm:max-w-[11rem]",
  },
  {
    name: "L'Emballage en France",
    outlet: "L'Emballage en France",
    type: "press" as const,
    title: "Packaging — vaisselle bio et écologique sur le site Ojetables",
    href: "https://france-emballage.org/packaging-de-la-vaisselle-bio-et-ecologique-sur-le-site-ojetables/",
    src: "/logos/media/fe-01.svg",
    className: "h-8 w-auto max-w-[9rem] sm:h-9 sm:max-w-[10rem]",
  },
] as const;

export const sectors = [
  {
    title: "Traiteurs & événementiel",
    description: "Kits couverts, verrines et plateaux — solutions élégantes pour vos événements pros.",
    cta: "Voir la gamme traiteur",
    href: "https://www.ojetables.fr/vaisselle-jetable-traiteur/",
    products: [
      {
        name: "Kit couverts 6 en 1 bois kraft",
        category: "Couverts",
        image: "/products/kit-couverts-6.jpg",
        priceFrom: "9,99 €",
        href: "https://www.ojetables.fr/kit-couverts-6-1-bois-kraft.html",
        packLabel: "Lot de 100",
        rating: 5,
        reviewCount: 4,
      },
      {
        name: "Verrine plastique carrée",
        category: "Verrines",
        image: "/products/verrine-carre.jpg",
        priceFrom: "2,35 €",
        href: "https://www.ojetables.fr/verrine-plastique-8556.html",
        packLabel: "Lot de 20",
        rating: 5,
        reviewCount: 3,
      },
      {
        name: "Wood Box 1 L avec couvercle",
        category: "Plateaux",
        image: "/products/wood-box.jpg",
        priceFrom: "37,99 €",
        href: "https://www.ojetables.fr/wood-box-1-litre-avec-caissette-couvercle.html",
        packLabel: "Lot de 25",
        personalizable: true,
        rating: 4.9,
        reviewCount: 9,
      },
    ],
  },
  {
    title: "Associations & clubs",
    description: "Kermesses, buvettes et repas partagés — tarifs accessibles, volumes adaptés.",
    cta: "Voir la gamme association",
    href: "https://www.ojetables.fr/vaisselle-jetable-association/",
    highlight: true,
    products: [
      {
        name: "Assiette Galaxie biodégradable Ø 13 cm",
        category: "Assiettes",
        image: "/products/assiette-galaxie.jpg",
        priceFrom: "36,20 €",
        href: "https://www.ojetables.fr/assiette-biodegradable-2088.html",
        packLabel: "Lot de 200",
        rating: 4,
        reviewCount: 2,
      },
      {
        name: "Gobelet plastique réutilisable personnalisé 25–33 cl",
        category: "Gobelets logo",
        image: "/products/gobelet-personnalise.jpg",
        priceFrom: "24,55 €",
        href: "https://www.ojetables.fr/gobelet-reutilisable-personnalise-12440.html",
        packLabel: "Dès 1 pc",
        personalizable: true,
        rating: 5,
        reviewCount: 1,
      },
      {
        name: "Sachet couverts 6 en 1 bois",
        category: "Couverts",
        image: "/products/sachet-couverts-bois.jpg",
        priceFrom: "45,99 €",
        href: "https://www.ojetables.fr/kit-couverts-6-1-bois-imbattable.html",
        packLabel: "Lot de 500",
        rating: 4.8,
        reviewCount: 10,
      },
    ],
  },
  {
    title: "CHR & restauration",
    description: "Gobelets, barquettes et consommables — solutions pros pour restos et food trucks.",
    cta: "Voir la gamme resto",
    href: "https://www.ojetables.fr/vaisselle-jetable-restaurant/",
    products: [
      {
        name: "Gobelet carton 24 cl kraft",
        category: "Gobelets",
        image: "/products/gobelet-carton-24cl.jpg",
        priceFrom: "3,20 €",
        priceWas: "3,90 €",
        href: "https://www.ojetables.fr/gobelet-carton-24cl-emballe-individuellement-kraft-clair.html",
        packLabel: "Lot de 50",
        personalizable: true,
        rating: 4.9,
        reviewCount: 8,
      },
      {
        name: "Gobelet smoothie 35 à 65 cl",
        category: "Gobelets",
        image: "/products/gobelet-smoothie.jpg",
        priceFrom: "4,50 €",
        href: "https://www.ojetables.fr/gobelet-smoothie-8755.html",
        packLabel: "Lot de 50",
        personalizable: true,
        rating: 4.9,
        reviewCount: 8,
      },
      {
        name: "Cuillère en bois 160 mm eco",
        category: "Couverts",
        image: "/products/cuillere-bois.jpg",
        priceFrom: "1,80 €",
        href: "https://www.ojetables.fr/cuillere-en-bois-160mm-eco.html",
        packLabel: "Lot de 100",
        rating: 4.8,
        reviewCount: 12,
      },
    ],
  },
  {
    title: "Collectivités & cantines",
    description: "Plateaux repas et grands volumes — conformité AGEC garantie pour le collectif.",
    cta: "Voir la gamme collectivité",
    href: "https://www.ojetables.fr/vaisselle-jetable-collectivite/",
    products: [
      {
        name: "Plateau repas biodégradable 5 compartiments",
        category: "Plateaux repas",
        image: "/products/plateau-repas-5comp.jpg",
        priceFrom: "65,00 €",
        href: "https://www.ojetables.fr/plateau-repas-biodegradable-5compartiments.html",
        packLabel: "Lot de 150",
        rating: 4,
        reviewCount: 2,
      },
      {
        name: "Wood Box XXL 6 L avec couvercle",
        category: "Plateaux",
        image: "/products/wood-box-xxl.jpg",
        priceFrom: "39,40 €",
        priceWas: "46,20 €",
        href: "https://www.ojetables.fr/wood-box-xxl-6-litres.html",
        packLabel: "Lot de 10",
        rating: 4.9,
        reviewCount: 9,
      },
      {
        name: "Kit couverts 4 en 1 bois kraft",
        category: "Couverts",
        image: "/products/kit-couverts-4.jpg",
        priceFrom: "8,99 €",
        href: "https://www.ojetables.fr/kit-couverts-4-1-bois-kraft.html",
        packLabel: "Lot de 100",
        rating: 4.9,
        reviewCount: 9,
      },
    ],
  },
] as const;

type SectorProduct = (typeof sectors)[number]["products"][number];

/** Maquette : liste unique simulant le flux « produits mis en avant » Magento. */
export const bestSellers: SectorProduct[] = sectors.flatMap((sector) => [...sector.products]).slice(0, 10);

export const trustPillars = [
  {
    title: "9,5/10 sur 2 417 avis",
    description: "Réputation certifiée Avis Garantis — un argument de confiance pour vos acheteurs pro.",
  },
  {
    title: "Livraison 24/48h",
    description: "Stock permanent sur +3 000 références, expédition rapide partout en France.",
  },
  {
    title: "Paiement sous 30 jours",
    description: "Comptes professionnels, tarifs dégressifs et devis volume en ligne.",
  },
  {
    title: "Vu à la télé",
    description: "Passages sur M6 et Capital — une visibilité que vos concurrents n'ont pas.",
  },
] as const;

export const ecoCommitments = [
  { label: "Conformité loi AGEC", icon: "scale" },
  { label: "Produits compostables & biodégradables", icon: "sprout" },
  { label: "Fournisseurs responsables", icon: "handshake" },
  { label: "Alternatives au plastique à usage unique", icon: "ban" },
] as const;

export const ecoSeo = {
  label: "Engagements",
  title: "Nos engagements éco",
  bioCategoryHref: "https://www.ojetables.fr/emballage-biodegradable",
  bioCategoryLabel: "Voir la gamme bio",
} as const;

export type ReviewItem = {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

/** Avis réels issus de societe-des-avis-garantis.fr/ojetables-fr (juillet 2026). */
export const reviewsFallback: ReviewItem[] = [
  {
    id: "ibtissam-a",
    author: "Ibtissam A.",
    rating: 5,
    text: "Parfait, comme d'habitude. Meilleur SAV jamais expérimenté jusqu'à présent.",
    relativeTime: "il y a 1 mois",
  },
  {
    id: "chantal-r",
    author: "Chantal R.",
    rating: 5,
    text: "Vaisselle jetable de qualité, très appréciée pour notre réunion familiale.",
    relativeTime: "il y a 1 mois",
  },
  {
    id: "renaud-l",
    author: "Renaud L.",
    rating: 5,
    text: "Livraison rapide et service client au top ! Je recommande.",
    relativeTime: "il y a 2 mois",
  },
  {
    id: "olivia-g",
    author: "Olivia G.",
    rating: 5,
    text: "Verrines commandées en urgence, délai respecté et bonne qualité.",
    relativeTime: "il y a 2 mois",
  },
  {
    id: "olivier-g",
    author: "Olivier G.",
    rating: 5,
    text: "Problème logistique bien géré par l'équipe. Très satisfait des produits et du SAV.",
    relativeTime: "il y a 2 mois",
  },
  {
    id: "sylvie-b",
    author: "Sylvie B.",
    rating: 5,
    text: "Très bon accueil et livraison rapide.",
    relativeTime: "il y a 1 mois",
  },
];

export const homeFaq = [
  {
    question: "Quels sont vos délais et frais de livraison ?",
    answer:
      "Livraison 24/72h partout en France métropolitaine pour les produits en stock. Frais de port dès 6,90€ HT, gratuits dès 250€ HT. Pour les commandes personnalisées ou hors France, les délais sont précisés au devis.",
  },
  {
    question: "Comment fonctionnent les tarifs dégressifs ?",
    answer:
      "Plus vous commandez, moins vous payez à l'unité. Les remises volume sont automatiques dès la 2e tranche de quantité. Créez un compte pour voir vos tarifs personnalisés ou demandez un devis en ligne pour bénéficier du paiement à 30 jours sur les commandes importantes.",
  },
  {
    question: "Vos produits sont-ils conformes pour les collectivités et restaurants ?",
    answer:
      "Oui. Notre gamme respecte la loi AGEC (interdiction du plastique à usage unique en collectivité depuis 2022). Tous nos produits sont certifiés contact alimentaire et adaptés aux exigences sanitaires de la restauration collective et commerciale.",
  },
  {
    question: "Puis-je commander des échantillons avant d'acheter en gros ?",
    answer:
      "Oui. Commandez à l'unité ou en petite quantité pour tester la qualité avant vos achats volume. Pour les produits personnalisés, nous fournissons un BAT (Bon À Tirer) numérique avant impression. Certains produits sont disponibles en échantillons gratuits sur demande.",
  },
  {
    question: "Comment personnaliser mes gobelets, sacs ou emballages avec mon logo ?",
    answer:
      "Parcours simple en 4 étapes : choix du produit, quantité souhaitée, envoi de votre logo, validation du BAT sous 48h. Minimums : dès 1 pièce pour les gobelets réutilisables en impression digitale, 250 pièces pour le carton, sur devis pour les sacs kraft. Impression 1 à 4 couleurs selon support.",
  },
  {
    question: "Puis-je retourner ou échanger une commande ?",
    answer:
      "Les produits standard non personnalisés peuvent être retournés sous 14 jours dans leur emballage d'origine (hors frais de retour). Les produits personnalisés ne sont ni repris ni échangés, sauf défaut de fabrication. En cas de problème qualité, contactez notre SAV sous 48h après réception.",
  },
] as const;

export type FaqItem = { question: string; answer: string };

export const previewDisclaimer =
  "Maquette preview — non contractuelle · Réalisée par Kaitos Agency";

export const leadMagnet = {
  storageKey: "ojetables-lead-magnet-dismissed",
  scrollThreshold: 0.45,
  titleDiscount: "−10 %",
  titleRest: "sur votre prochaine commande",
  description: "Entrez votre e-mail pour recevoir votre code promo exclusif.",
  revealedDescription: "Voici votre code — valable sur votre prochaine commande.",
  emailCta: "Recevoir mon code",
  promoLabel: "Code promo",
  promoCode: "PRO10",
  promoNote: "Valable sur votre prochaine commande · 1 utilisation",
  copyCta: "Copier le code",
  copySuccessLabel: "Code copié !",
  dismissLabel: "Non merci",
  continueLabel: "Continuer mes achats",
} as const;
