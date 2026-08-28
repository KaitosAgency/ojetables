import type { FaqItem } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/types/breadcrumb";
import type { ReviewItemWithPublishedAt } from "@/lib/types/review";

export type ProductSpec = {
  label: string;
  value: string;
};

/** Groupe de specs en accordéon (fiche produit — style Green Store). */
export type ProductSpecGroup = {
  id: string;
  title: string;
  subtitle?: string;
  items: readonly ProductSpec[];
  note?: string;
};

export type ProductDescriptionPart =
  | { type: "text"; value: string }
  | { type: "link"; label: string; breadcrumbIndex: number };

/** Section éditoriale de la description longue — un H2 visible par section (SEO + extraction IA). */
export type ProductDescriptionSection = {
  id: string;
  heading: string;
  paragraphs: readonly (readonly ProductDescriptionPart[])[];
};

export type ProductReassuranceIcon = "shield" | "leaf" | "truck" | "star";

export type ProductReassurance = {
  icon: ProductReassuranceIcon;
  label: string;
};

/** Vidéo FAQ fiche produit — source Vidjet (cbdpaschere.com, campagne product page). */
export type ProductFaqVideo = {
  label: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  /** Durée ISO 8601 (ex. PT12S) pour le JSON-LD VideoObject. */
  duration: string;
  uploadDate: string;
};

export type VolumeTier = {
  quantity: string;
  discount: string;
};

/** Bonus visuel débloqué à partir d'un palier de quantité (packs). */
export type VolumeBundleReward = {
  minPacks: number;
  /** Montant HT indicatif affiché sur le badge (ex. 10 packs × prix unitaire). */
  thresholdHt: number;
  name: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductBadge = {
  label: string;
  title: string;
};

/** Pictos produit — reprend la sémantique du site Magento (biodeg.svg, chaud.svg) en version charte maquette. */
export type ProductFeaturePictoId =
  | "biodegradable"
  | "hot"
  | "food-safe"
  | "individual-wrap";

export type ProductFeaturePicto = {
  id: ProductFeaturePictoId;
  label: string;
  description: string;
  /** Affiché dans le bloc « coup d'œil » au-dessus du panier. */
  highlight?: boolean;
};

/** @deprecated Préférer BreadcrumbItem depuis @/lib/types/breadcrumb */
export type ProductBreadcrumbItem = BreadcrumbItem & { path: string };

/** @deprecated Préférer BreadcrumbItem depuis @/lib/types/breadcrumb */
export type PageBreadcrumbItem = BreadcrumbItem;

export type ProductReviewDistribution = {
  stars: 5 | 4 | 3 | 2 | 1;
  percent: number;
};

/** @deprecated Préférer ReviewItemWithPublishedAt depuis @/lib/types/review */
export type ProductReviewItem = ReviewItemWithPublishedAt;

export type ProductReviewInsights = {
  summary: string;
  pros: readonly string[];
};

export type Product = {
  slug: string;
  /** Référence catalogue affichée sous le H1 (hors H1 pour ne pas diluer le mot-clé). */
  sku: string;
  /** Numéro de pièce fabricant (schema.org mpn) — fallback SKU si absent. */
  mpn?: string;
  /** GTIN/EAN si disponible en catalogue. */
  gtin?: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  /** Libellé catégorie feuille (sous le H1). */
  category: string;
  /** Hub principal pour le maillage éditorial (ex. vaisselle jetable). */
  categoryPath: string;
  /** Fil d'Ariane catégories — aligné sur l'arborescence Magento. */
  breadcrumbs: readonly (BreadcrumbItem & { path: string })[];
  description: string;
  /** BLUF : promesse en une phrase (mise en gras) + preuve technique. */
  pitchLead: string;
  pitchSupport: string;
  descriptionSections: readonly ProductDescriptionSection[];
  /** Fraîcheur affichée et exploitée par les LLM (format ISO). */
  updatedAt: string;
  faqVideos?: readonly ProductFaqVideo[];
  priceHt: number;
  priceWasHt?: number;
  priceTtc: number;
  unit: string;
  unitPriceHt?: number;
  packLabel: string;
  stockLabel: string;
  rating: number;
  reviewCount: number;
  /** Répartition des notes (bandeau avis fiche produit). */
  reviewDistribution: readonly ProductReviewDistribution[];
  /** Synthèse éditoriale affichée sous les notes. */
  reviewInsights: ProductReviewInsights;
  /** Avis clients certifiés affichés sur la fiche. */
  productReviews: readonly ReviewItemWithPublishedAt[];
  volumeTiers: VolumeTier[];
  /** Bonus offerts à partir de certains paliers — affichés dans le panneau d'achat. */
  volumeBundles?: readonly VolumeBundleReward[];
  reassurance: ProductReassurance[];
  /** @deprecated Préférer featurePictos — conservé pour compatibilité données. */
  badges: ProductBadge[];
  featurePictos: readonly ProductFeaturePicto[];
  specs: ProductSpec[];
  /** Groupes affichés en accordéon dans « Spécifications techniques ». */
  specGroups?: readonly ProductSpecGroup[];
  shipping: string;
  personalization: string;
  /** Gabarit d'impression téléchargeable depuis le panneau d'achat. */
  personalizationTemplateHref?: string;
  /** Affiche le picto personnalisation (carte + galerie). */
  personalizable?: boolean;
  faq: FaqItem[];
  crossSell: {
    slug: string;
    name: string;
    priceHt: number;
    image: string;
    category: string;
    priceFrom: string;
    priceWas?: string;
    rating: number;
    reviewCount: number;
    packLabel?: string;
  }[];
  images: ProductImage[];
  /** Démo retouche photo IA (avant / après) dans la description. */
};
