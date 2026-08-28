export const ojetablesLive = {
  /** Compte client unique - pas de distinction « pro » / particulier côté inscription Magento. */
  account: "https://www.ojetables.fr/customer/account/",
  accountLogin: "https://www.ojetables.fr/customer/account/login/",
  accountRegister: "https://www.ojetables.fr/customer/account/create/",
  quote: "https://www.ojetables.fr/qquoteadv/index/",
  contact: "https://www.ojetables.fr/contacts/",
  mariage: "https://www.ojetables.fr/vaisselle-jetable-mariage/",
} as const;

export const site = {
  name: "Ojetables",
  legalName: "Ojetables",
  tagline: "Vaisselle jetable éco-responsable pour professionnels.",
  description:
    "Fournisseur français de vaisselle jetable et emballages éco pour traiteurs, CHR et collectivités. +3 000 références en stock, livraison 24/72h, tarifs dégressifs et devis volume.",
  phone: "09 74 06 00 74",
  phoneHref: "tel:+33974060074",
  /** Maquette : horaires à confirmer avec le client avant mise en production. */
  openingHours: "Du lundi au vendredi, 9h–12h30 et 14h–17h30",
  email: "contact@ojetables.fr",
  address: {
    street: "ZA de Saune, 1 rue Roland Garros",
    city: "Sainte-Foy-d'Aigrefeuille",
    postalCode: "31570",
    region: "Occitanie",
    country: "FR",
    full: "ZA de Saune, 1 rue Roland Garros, 31570 Sainte-Foy-d'Aigrefeuille",
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
  alt: "Logo Ojetables - vaisselle jetable biodégradable",
} as const;

export const favicon = {
  path: "/favicon.png",
  width: 32,
  height: 32,
} as const;

export const tabTitleAnimation = {
  intervalMs: 2200,
  messages: [
    "Revenez sur Ojetables !",
    "+3 000 références en stock",
    "Livraison 24/72h",
    "9,5/10 sur 2 417 avis",
    "Vaisselle jetable éco",
  ],
} as const;

export const partnerLogos = {
  garciaDePou: {
    src: "/garcia-de-pou-prosaveurs-fourniture-pour-l-hotellerie-et-la-restauration-01.svg",
    alt: "Garcia de Pou",
    width: 1080,
    height: 169,
  },
} as const;

/** Politique retour produits standard (schema MerchantReturnPolicy / Google Merchant). */
export const merchantReturnPolicy = {
  url: "https://www.ojetables.fr/cgu/",
  returnDays: 14,
  applicableCountry: "FR",
} as const;
