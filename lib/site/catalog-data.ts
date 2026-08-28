import { featuredCategoryPath } from "@/lib/routes";
import { maquetteProductHref } from "@/lib/maquette/overrides";
import { routes } from "./routes";

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
 * Les 12 familles homepage Magento (« Nos catégories ») - visuels d'origine ojetables.fr.
 */
export const catalogFamilies: readonly CatalogFamily[] = [
  {
    id: "vaisselle-jetable",
    label: "Vaisselle jetable",
    href: featuredCategoryPath,
    image: "/categories/vaisselle-jetable.jpg",
    description:
      "Assiettes, couverts en bois, bols jetables : carton, pulpe de canne ou plastique réutilisable.",
    highlights: ["Assiettes", "Couverts bois", "Bols"],
  },
  {
    id: "verrine",
    label: "Verrine",
    href: featuredCategoryPath,
    image: "/categories/verrine.jpg",
    description:
      "Verrines cocktail, mises en bouche et coupes dessert pour buffets, traiteurs et réceptions.",
    highlights: ["Cocktail", "Mise en bouche", "Piques"],
  },
  {
    id: "bio-ecolo",
    label: "Bio/Ecolo",
    href: featuredCategoryPath,
    image: "/categories/bio-ecolo.jpg",
    description:
      "Vaisselle biodégradable et compostable conforme AGEC. Pulpe de canne, bagasse, bambou et palmier.",
    highlights: ["Compostable", "AGEC", "Pulpe"],
  },
  {
    id: "personnalisation",
    label: "Personnalisation",
    originalLabel: "Emballages / vaisselle jetables personnalisés",
    href: routes.personalization,
    image: "/categories/personnalisation.png",
    description:
      "Gobelets, sacs kraft et emballages personnalisés avec votre logo. BAT sous 48h, dès 1 pièce selon le produit.",
    highlights: ["Logo", "BAT 48h", "Dès 1 pc"],
    accent: "teal",
  },
  {
    id: "snack",
    label: "SNACK",
    originalLabel: "SNACK",
    href: featuredCategoryPath,
    image: "/categories/snack.jpg",
    description:
      "Emballages snack : boîtes burger, barquettes bagasse et supports sucré-salé pour food trucks.",
    highlights: ["Burger", "Barquettes", "Food truck"],
  },
  {
    id: "sac",
    label: "Sac",
    href: featuredCategoryPath,
    image: "/categories/sac.png",
    description:
      "Sacs kraft, sacs à pain, sandwich et viennoiserie. Papier de qualité, personnalisation sur devis.",
    highlights: ["Kraft", "Pain", "Logo"],
  },
  {
    id: "destockage",
    label: "Destockage",
    originalLabel: "DESTOCKAGE",
    href: routes.destockage,
    image: "/categories/destockage.png",
    description:
      "Promotions et fins de série : vaisselle jetable et emballages à prix cassés. Stocks limités.",
    highlights: ["Promos", "Fins de série", "Stock limité"],
    accent: "kraft",
  },
  {
    id: "gobelet-verre",
    label: "Gobelet / Verre",
    href: featuredCategoryPath,
    image: "/categories/gobelet-verre.jpg",
    description:
      "Gobelets carton, plastique réutilisable et flûtes pour boissons chaudes ou froides. Personnalisables dès 1 pièce.",
    highlights: ["Carton", "Réutilisable", "Flûte"],
  },
  {
    id: "plateau-boite",
    label: "Plateau / boite",
    href: featuredCategoryPath,
    image: "/categories/plateau-boite.png",
    description:
      "Plateaux repas, wood box, boîtes pizza et coffrets à emporter pour traiteur et collectif.",
    highlights: ["Repas", "Wood box", "Pizza"],
  },
  {
    id: "nappe-serviette",
    label: "Nappe - serviette",
    href: featuredCategoryPath,
    image: "/categories/nappe-serviette.png",
    description:
      "Nappes intissé, chemins de table et serviettes papier pour mariages, réceptions et CHR.",
    highlights: ["Intissé", "Serviettes", "Mariage"],
  },
  {
    id: "hygiene-resto",
    label: "Hygiène/Resto",
    href: featuredCategoryPath,
    image: "/categories/hygiene-resto.png",
    description:
      "Consommables CHR : barquettes alu, film étirable, essuie-mains et accessoires de cuisine.",
    highlights: ["Aluminium", "Film", "CHR"],
  },
  {
    id: "garcia-de-pou",
    label: "Garcia de Pou",
    href: featuredCategoryPath,
    image: "/categories/garcia-de-pou.png",
    description:
      "Gamme Garcia de Pou : nappes, serviettes, sacs et emballages hôtellerie-restauration.",
    highlights: ["Marque", "Hôtellerie", "Nappage"],
    accent: "partner",
  },
];

export const catalogSeo = {
  label: "Toutes nos gammes",
  title: "Nos catégories",
  /** Ligne courte sous le titre - mots-clés SEO sans alourdir la page. */
  metaLine:
    "Vaisselle jetable, emballages bio, snacking, destockage : explorez nos 12 familles de produits pour professionnels et particuliers.",
} as const;

export const personalizationSteps = [
  {
    step: 1,
    title: "Téléchargez le gabarit",
    description:
      "Récupérez le modèle adapté à votre produit, intégrez votre logo aux emplacements indiqués et préparez un fichier prêt à l'impression.",
  },
  {
    step: 2,
    title: "Déposez votre visuel",
    description:
      "Glissez votre fichier ou parcourez votre ordinateur. PDF, AI, SVG, PNG, JPG ou EPS — jusqu'à 5 Mo, 300 dpi recommandés.",
  },
  {
    step: 3,
    title: "Passez commande",
    description:
      "Ajoutez au panier ou demandez un devis. Un BAT vous est envoyé sous 48 h avant le lancement de fabrication.",
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
    href: maquetteProductHref,
  },
  {
    id: "reusable-digital",
    label: "Gobelet réutilisable (digital)",
    minQty: "Dès 1 pcs",
    unitFrom: "0,60 € HT",
    delay: "2–6 sem.",
    technique: "Quadrichromie photo sur toute la hauteur",
    href: maquetteProductHref,
  },
  {
    id: "reusable-seri",
    label: "Gobelet réutilisable (1 couleur)",
    minQty: "500 pcs",
    unitFrom: "0,62 € HT",
    delay: "3–4 sem.",
    technique: "Sérigraphie 1 couleur · Pantone",
    href: maquetteProductHref,
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
