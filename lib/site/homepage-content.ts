import { routes } from "./routes";

export const trustPillars = [
  {
    title: "9,5/10 sur 2 417 avis",
    description: "Réputation certifiée Avis Garantis - un argument de confiance pour vos acheteurs pro.",
  },
  {
    title: "Livraison 24/72h",
    description: "Stock permanent sur +3 000 références, expédition rapide partout en France.",
  },
  {
    title: "Paiement sous 30 jours",
    description: "Comptes professionnels, tarifs dégressifs et devis volume en ligne.",
  },
  {
    title: "Vu à la télé",
    description: "Passages sur M6 et Capital - une visibilité que vos concurrents n'ont pas.",
  },
] as const;

export const ecoCommitments = [
  { label: "Conformité loi AGEC", icon: "scale" },
  { label: "Produits compostables & biodégradables", icon: "sprout" },
  { label: "Fournisseurs responsables", icon: "handshake" },
  { label: "Alternatives au plastique à usage unique", icon: "ban" },
] as const;

export const ecoSeo = {
  label: "Éco-responsabilité",
  title: "Nos engagements éco-responsables",
  bioCategoryHref: routes.category,
  bioCategoryLabel: "Découvrir la gamme biodégradable",
} as const;

export type { ReviewItemWithRelativeTime as ReviewItem } from "@/lib/types/review";

/** Avis réels issus de societe-des-avis-garantis.fr/ojetables-fr (juillet 2026). */
export const reviewsFallback: import("@/lib/types/review").ReviewItemWithRelativeTime[] = [
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
      "Livraison 24/72h en France métropolitaine pour les produits en stock. Frais de port : 6,90 € HT (0–29,99 €), 9,90 € HT (30–139,99 €), 16,90 € HT (140–249,99 €), offerts dès 250 € HT. Option express 26,90 € HT, retrait dépôt offert. Délais sur devis pour personnalisation et hors France.",
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

export const leadMagnet = {
  storageKey: "ojetables-lead-magnet-dismissed",
  scrollThreshold: 0.45,
  titleDiscount: "−10 %",
  titleRest: "sur votre prochaine commande",
  description: "Entrez votre e-mail pour recevoir votre code promo exclusif.",
  revealedDescription: "Voici votre code - valable sur votre prochaine commande.",
  emailCta: "Recevoir mon code",
  promoLabel: "Code promo",
  promoCode: "PRO10",
  promoNote: "Valable sur votre prochaine commande · 1 utilisation",
  copyCta: "Copier le code",
  copySuccessLabel: "Code copié !",
  dismissLabel: "Non merci",
  continueLabel: "Continuer mes achats",
} as const;

export const pressTvFeature = {
  label: "Capital · M6",
  title: "Vu à la télévision",
  description: "Reportage Capital : nos alternatives éco au plastique jetable pour la restauration.",
  videoId: "x88t581",
  videoUrl: "https://www.dailymotion.com/video/x88t581",
  uploadDate: "2019-11-10",
  duration: "PT2M30S",
  src: "/m6.jpg",
  alt: "Capital sur M6 - J'achète, je jette du grand gaspillage au grand recyclage",
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
    title: "Packaging - vaisselle bio et écologique sur le site Ojetables",
    href: "https://france-emballage.org/packaging-de-la-vaisselle-bio-et-ecologique-sur-le-site-ojetables/",
    src: "/logos/media/fe-01.svg",
    className: "h-8 w-auto max-w-[9rem] sm:h-9 sm:max-w-[10rem]",
  },
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
