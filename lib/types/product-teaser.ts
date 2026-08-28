/** Forme commune des cartes produit (destockage, secteurs, best-sellers). */
export type ProductTeaser = {
  id: string;
  name: string;
  category: string;
  image: string;
  priceFrom: string;
  priceWas?: string;
  href: string;
  packLabel?: string;
  rating?: number;
  reviewCount?: number;
  personalizable?: boolean;
  /** Libellé promo destockage (ex. « -21 % », « Fin de série »). */
  badge?: string;
};

export type ProductTeaserRef = {
  id: string;
} & Partial<Omit<ProductTeaser, "id">>;
