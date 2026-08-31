import { featuredCategoryPath } from "@/lib/routes";
import { routes } from "./routes";

export type FooterLink = {
  label: string;
  href: string;
};

/** Liens footer - alignés sur ojetables.fr (maillage interne SEO). */
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
    { label: "Personnalisation logo", href: "https://www.ojetables.fr/vaisselle-jetable-personnalisable/" },
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

export const footerSeoLinks = [
  { label: "Vaisselle jetable", href: featuredCategoryPath },
  { label: "Destockage", href: routes.destockage },
  { label: "Fiche produit", href: routes.product },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "llms.txt", href: "/llms.txt" },
] as const;
