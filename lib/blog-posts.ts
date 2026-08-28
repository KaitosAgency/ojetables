export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  readTime: string;
};

/** Articles de blog maquette — visuels locaux, liens à brancher sur le blog Magento en prod. */
export const blogPosts: readonly BlogPost[] = [
  {
    slug: "loi-agem-vaisselle-jetable",
    title: "Loi AGEC : quelle vaisselle jetable choisir pour vos événements ?",
    excerpt:
      "Compostable, biosourcée ou recyclable : les critères pour rester conforme tout en tenant vos délais de livraison.",
    category: "Réglementation",
    imageSrc: "/categories/vaisselle-jetable.jpg",
    imageAlt: "Buffet traiteur avec vaisselle jetable sur table dressée",
    href: "https://www.ojetables.fr/",
    readTime: "5 min",
  },
  {
    slug: "quantites-mariage-vaisselle",
    title: "Mariage & événement : comment calculer vos quantités de gobelets et assiettes",
    excerpt:
      "Formules simples par invité, marges de sécurité et check-list pour ne pas manquer de stock le jour J.",
    category: "Guides pratiques",
    imageSrc: "/blog/quantites-mariage.jpg",
    imageAlt: "Tables de réception décorées pour un mariage en plein air",
    href: "https://www.ojetables.fr/vaisselle-jetable-mariage/",
    readTime: "4 min",
  },
  {
    slug: "gobelet-carton-vs-plastique",
    title: "Gobelet carton kraft ou plastique : tenue à la chaleur, tri et image de marque",
    excerpt:
      "Comparatif pour le CHR et la restauration rapide : contact alimentaire, empilable et coût au service.",
    category: "Conseils produits",
    imageSrc: "/products/gobelet-carton-24cl.jpg",
    imageAlt: "Gobelets carton kraft empilés sur un comptoir de service",
    href: "https://www.ojetables.fr/",
    readTime: "6 min",
  },
  {
    slug: "personnalisation-gobelet-logo",
    title: "Personnaliser vos gobelets carton : MOQ, BAT et délais pour les pros",
    excerpt:
      "Logo sérigraphié ou quadri : quantités minimales, épreuve sous 48 h et fabrication en 2 à 3 semaines pour vos événements.",
    category: "Personnalisation",
    imageSrc: "/products/gobelet-personnalise.jpg",
    imageAlt: "Gobelet carton personnalisé avec logo imprimé",
    href: "https://www.ojetables.fr/emballage-personnalise/",
    readTime: "5 min",
  },
  {
    slug: "assiettes-compostables-agec",
    title: "Assiettes compostables et bagasse : ce que change la loi AGEC en 2026",
    excerpt:
      "Pulpe de canne, biodégradable ou réutilisable : comment choisir la bonne assiette jetable pour cantines et traiteurs.",
    category: "Éco-responsable",
    imageSrc: "/products/assiette-galaxie.jpg",
    imageAlt: "Assiettes compostables colorées pour buffet traiteur",
    href: "https://www.ojetables.fr/",
    readTime: "7 min",
  },
] as const;
