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
  catalog: "#catalogue",
  destockage: "/destockage",
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
    { label: "Catalogue", href: routes.catalog },
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

export type CatalogFamilyAccent = "default" | "teal" | "kraft" | "partner";

export type CatalogFamily = {
  id: string;
  label: string;
  /** Libellé Magento ojetables.fr si différent du titre maquette. */
  originalLabel?: string;
  href: string;
  description: string;
  highlights: readonly string[];
  accent?: CatalogFamilyAccent;
};

export type CatalogUniverse = {
  id: string;
  label: string;
  title: string;
  description: string;
  families: readonly CatalogFamily[];
};

/**
 * Les 12 familles homepage Magento (« Nos catégories »), regroupées en 3 univers
 * plutôt qu'en grille plate — destockage et personnalisation restent des tuiles
 * catalogue qui pointent vers les blocs / pages dédiés.
 */
export const catalogUniverses: readonly CatalogUniverse[] = [
  {
    id: "table",
    label: "Art de la table",
    title: "Servir, dresser, recevoir",
    description:
      "Assiettes, couverts, verrines, gobelets et nappage : tout le service à table jetable, du cocktail au repas complet.",
    families: [
      {
        id: "vaisselle-jetable",
        label: "Vaisselle jetable",
        href: "https://www.ojetables.fr/vaisselle-jetable-petit-prix",
        description:
          "Assiettes jetables, couverts en bois, bols et vaisselle à usage unique pour traiteurs, CHR et événements. Carton, pulpe de canne, palmier ou plastique réutilisable : la base du catalogue, livrable 24/72h.",
        highlights: ["Assiettes", "Couverts bois", "Bols"],
      },
      {
        id: "verrine",
        label: "Verrine",
        href: "https://www.ojetables.fr/verrine-a-usage-unique-economique",
        description:
          "Verrines cocktail, mises en bouche et coupes dessert jetables pour la restauration événementielle. Transparente, blanche, noire ou biodégradable, avec piques cocktail pour buffets et réceptions.",
        highlights: ["Cocktail", "Mise en bouche", "Piques"],
      },
      {
        id: "gobelet-verre",
        label: "Gobelet / Verre",
        href: "https://www.ojetables.fr/gobelet-verre-flute",
        description:
          "Gobelets carton, gobelets plastique, flûtes et verres réutilisables pour boissons chaudes ou froides. Gobelet personnalisé dès 1 pièce (digital) ou 250 pièces (carton) — la gamme la plus demandée des événements et du CHR.",
        highlights: ["Carton", "Réutilisable", "Flûte"],
      },
      {
        id: "nappe-serviette",
        label: "Nappe - serviette",
        href: "https://www.ojetables.fr/nappe-et-serviette",
        description:
          "Nappes intissé, chemins de table, serviettes papier cocktail ou ouaté, y compris serviettes personnalisées. Le nappage jetable pour mariages, réceptions et restauration : présentation soignée et volumes pro.",
        highlights: ["Intissé", "Serviettes", "Mariage"],
      },
    ],
  },
  {
    id: "emporter",
    label: "Emballage & emporter",
    title: "Emballer, transporter, emporter",
    description:
      "Solutions éco, snack, sacs et plateaux pour la vente à emporter, le food truck et le service traiteur.",
    families: [
      {
        id: "bio-ecolo",
        label: "Bio/Ecolo",
        href: "https://www.ojetables.fr/emballage-biodegradable",
        description:
          "Vaisselle biodégradable et compostable conforme à la loi AGEC : pulpe de canne, bagasse, bambou, palmier et piques en bois. L'alternative aux plastiques à usage unique pour collectivités et restauration responsable.",
        highlights: ["Compostable", "AGEC", "Pulpe"],
      },
      {
        id: "snack",
        label: "SNACK",
        originalLabel: "SNACK",
        href: "https://www.ojetables.fr/snack",
        description:
          "Emballages snack pour food trucks, restauration rapide et vente à emporter : boîtes burger, barquettes bagasse, supports sucré-salé et papier ingraissable. Carton, personnalisable, pensé pour le service nomade.",
        highlights: ["Burger", "Barquettes", "Food truck"],
      },
      {
        id: "sac",
        label: "Sac",
        href: "https://www.ojetables.fr/sac-papier-kraft",
        description:
          "Sacs kraft, sacs à pain, sandwich, fruits et légumes ou viennoiserie. Sacs papier et sacs personnalisables pour boulangeries, commerces alimentaires et vente à emporter — marquage logo sur devis.",
        highlights: ["Kraft", "Pain", "Logo"],
      },
      {
        id: "plateau-boite",
        label: "Plateau / boite",
        href: "https://www.ojetables.fr/plateau-jetable",
        description:
          "Plateaux repas, wood box, plateaux traiteur, boîtes pizza et coffrets à emporter. Contenants jetables pour le collectif, le traiteur et la vente à emporter, y compris plateaux biodégradables à compartiments.",
        highlights: ["Repas", "Wood box", "Pizza"],
      },
    ],
  },
  {
    id: "pro",
    label: "Pro, marque & offres",
    title: "Équiper, marquer, déstocker",
    description:
      "Hygiène CHR, personnalisation logo, destockage et marque Garcia de Pou — les familles transverses du catalogue.",
    families: [
      {
        id: "hygiene-resto",
        label: "Hygiène/Resto",
        href: "https://www.ojetables.fr/hygiene-et-resto",
        description:
          "Consommables CHR : barquettes aluminium, film étirable, essuie-mains, sacs poubelle et accessoires de cuisine. L'hygiène restaurant et le matériel jetable pour les standards d'un établissement professionnel.",
        highlights: ["Aluminium", "Film", "CHR"],
      },
      {
        id: "garcia-de-pou",
        label: "Garcia de Pou",
        href: "https://www.ojetables.fr/garcia-de-pou",
        description:
          "Gamme Garcia de Pou : nappes, serviettes, sacs et emballages hôtellerie-restauration. Ojetables, revendeur de la marque pour les professionnels de l'art de la table jetable et de l'emballage alimentaire.",
        highlights: ["Marque", "Hôtellerie", "Nappage"],
        accent: "partner",
      },
      {
        id: "personnalisation",
        label: "Personnalisation",
        originalLabel: "Emballages / vaisselle jetables personnalisés",
        href: routes.personalization,
        description:
          "Gobelets, sacs kraft, couverts et emballages personnalisés au logo. Parcours en 4 étapes, BAT sous 48h, minimum dès 1 pièce selon le support : la vaisselle jetable personnalisée pour événements, festivals et CHR.",
        highlights: ["Logo", "BAT 48h", "Dès 1 pc"],
        accent: "teal",
      },
      {
        id: "destockage",
        label: "Destockage",
        originalLabel: "DESTOCKAGE",
        href: routes.destockage,
        description:
          "Promotions et fins de série sur vaisselle jetable, gobelets, nappes et emballages. Stocks limités à prix destockage pour optimiser vos achats professionnels sans compromettre la qualité.",
        highlights: ["Promos", "Fins de série", "Stock limité"],
        accent: "kraft",
      },
    ],
  },
];

export const catalogFamilies: CatalogFamily[] = catalogUniverses.flatMap((universe) => [...universe.families]);

export const catalogSeo = {
  label: "Catalogue",
  title: "12 familles de vaisselle jetable et d'emballages pro",
  intro:
    "Le catalogue Ojetables reprend les 12 catégories d'origine du site — plus de 3 000 références de vaisselle jetable, gobelets, couverts, verrines, sacs kraft et emballages éco, livrables 24/72h partout en France.",
  editorial: {
    heading: "Ojetables, fournisseur français de vaisselle jetable éco-responsable depuis 2011",
    columns: [
      {
        title: "Vaisselle biodégradable, compostable et contact alimentaire",
        paragraphs: [
          "En activité depuis 2011, Ojetables met à disposition des professionnels et des particuliers une vaisselle jetable élégante, pratique et bio. Assiettes en pulpe de canne, couverts en bois, vaisselle en palmier ou gobelets carton : les matières naturelles remplacent le plastique à usage unique, dans le respect de la loi AGEC et des exigences contact alimentaire des collectivités et du CHR.",
          "Formes classiques ou design, palette de couleurs pour l'événementiel : la gamme s'adapte au cocktail, au repas traiteur comme à la cantine. Plus de 3 000 références en stock, avec un rapport qualité-prix pensé pour l'achat en volume.",
        ],
      },
      {
        title: "Personnalisation logo, destockage et livraison 24/72h",
        paragraphs: [
          "Marquez gobelets, sacs kraft et emballages au logo de votre enseigne : devis sous 24h, bon à tirer sous 48h. Les professionnels de la restauration, les collectivités et les associations y trouvent aussi nappes, serviettes et consommables d'hygiène (gants, essuie-mains, film étirable) pour équiper l'établissement de A à Z.",
          "Les fins de série et promotions destockage permettent d'acheter vaisselle jetable et emballages à prix cassés, stocks limités. Livraison 24/72h partout en France, tarifs dégressifs compte pro et devis volume en ligne.",
        ],
      },
    ],
  },
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
] as const;

export type DestockageProduct = (typeof destockageItems)[number];

export const destockagePage = {
  title: "Promotions & fins de série",
  description:
    "Stocks limités, prix cassés sur références sélectionnées — vaisselle jetable et emballages pro à prix destockage.",
  externalCatalogUrl: "https://www.ojetables.fr/destockage-vaisselle-jetable",
} as const;

export const legalLinks = [
  { label: "Maquette preview Kaitos", href: "https://kaitos.agency" },
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
  "Conformité loi AGEC",
  "Produits compostables & biodégradables",
  "Fournisseurs responsables",
  "Alternatives au plastique à usage unique",
] as const;

export const reviewsFallback = [
  {
    id: "1",
    author: "Cabinet Comptable B.",
    rating: 5,
    text: "Commande passée en fin de journée, livrée en 48h. Emballages conformes et facturation pro impeccable.",
    relativeTime: "il y a 5 mois",
  },
  {
    id: "2",
    author: "Traiteur événementiel",
    rating: 5,
    text: "Livraison rapide, gamme complète et tarifs pro compétitifs. Notre fournisseur principal depuis 3 ans.",
    relativeTime: "il y a 1 mois",
  },
  {
    id: "3",
    author: "Responsable cantine",
    rating: 5,
    text: "Plateaux repas conformes AGEC, stock fiable et devis volume traité sous 24h.",
    relativeTime: "il y a 2 mois",
  },
  {
    id: "4",
    author: "Gérant CHR",
    rating: 5,
    text: "Gobelets carton et barquettes kraft de qualité. Service client réactif.",
    relativeTime: "il y a 3 mois",
  },
  {
    id: "5",
    author: "Association sportive",
    rating: 5,
    text: "Parfait pour nos buvettes : petites quantités, bons prix et produits solides.",
    relativeTime: "il y a 4 mois",
  },
  {
    id: "6",
    author: "Directrice restauration collective",
    rating: 5,
    text: "Réactivité au top sur les fins de série. Nous avons économisé 18 % sur notre dernière commande.",
    relativeTime: "il y a 6 mois",
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
  {
    question: "Quelles catégories de vaisselle jetable propose Ojetables ?",
    answer:
      "Le catalogue est organisé en 12 familles : vaisselle jetable (assiettes, couverts), verrines, bio/écolo, snack et vente à emporter, sacs kraft, gobelets et verres, plateaux et boîtes, nappes et serviettes, hygiène restaurant, personnalisation logo, destockage, et la marque Garcia de Pou. Plus de 3 000 références en stock, livraison 24/72h.",
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
