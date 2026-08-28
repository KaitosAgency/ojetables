import type { Product } from "./types";

const gobeletImageOriginal = "/products/gobelet-carton-24cl.jpg";
const gobeletImageRetouched = "/products/gobelet-carton-kraft-24cl-studio.png";
const gobeletImage = gobeletImageRetouched;

export const gobeletCarton24clKraftIndividuel: Product = {
    slug: "gobelet-carton-24cl-kraft-individuel",
    sku: "GOB-KR-24-IND",
    mpn: "GOB-KR-24-IND",
    name: "Gobelet carton 24 cl Kraft (individuel)",
    shortName: "Gobelet carton 24 cl Kraft",
    metaTitle: "Gobelet carton kraft 24 cl — Traiteur & CHR",
    metaDescription:
      "Gobelet carton kraft 24 cl emballé individuellement, lot de 50 dès 3,20 € HT. Chaud et froid, biodégradable. Livraison 24/72h, tarifs dégressifs pro.",
    category: "Gobelets carton",
    categoryPath: "/vaisselle-jetable",
    breadcrumbs: [
      { name: "Vaisselle jetable", path: "/vaisselle-jetable" },
      // Maquette : hub catégorie interne — en prod Magento, pointer vers les vraies sous-catégories.
      { name: "Gobelets & verres", path: "/vaisselle-jetable" },
      { name: "Gobelets carton", path: "/vaisselle-jetable" },
    ],
    description:
      "Gobelet carton kraft 24 cl emballé individuellement, certifié contact alimentaire. Tient les boissons chaudes jusqu'à 85°C. Idéal hôtels, cafétérias et traiteurs. Conforme loi AGEC. Livraison 24/72h.",
    pitchLead:
      "Ce gobelet carton kraft 24 cl emballé individuellement résout l'hygiène en libre-service pour les hôtels, cafétérias et événements professionnels.",
    pitchSupport:
      "Le carton kraft tient les boissons jusqu'à 85°C sans brûler les mains. Chaque gobelet reste protégé jusqu'à la prise en main. Certifié contact alimentaire. Livraison 24/72h, en stock permanent.",
    updatedAt: "2026-08-28",
    descriptionSections: [
      {
        id: "pourquoi-choisir",
        heading: "Pourquoi choisir ce gobelet carton kraft 24 cl ?",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Ce gobelet carton kraft 24 cl résout trois problèmes du service boisson en CHR et traiteur : l'hygiène en libre-service, la tenue à la chaleur sans brûler les doigts, et la conformité AGEC. Il fait partie de notre gamme ",
            },
            { type: "link", label: "vaisselle jetable", breadcrumbIndex: 0 },
            {
              type: "text",
              value:
                " professionnelle certifiée contact alimentaire.",
            },
          ],
          [
            {
              type: "text",
              value:
                "L'emballage individuel garantit que chaque gobelet reste protégé jusqu'à la prise en main par le client. Cette caractéristique élimine les contaminations croisées en cafétéria, hôtel et espace d'accueil. Les hôtels Ibis Budget, les distributeurs automatiques Selecta et les salles de séminaire équipent massivement leurs points café avec ce format. Comparez ce gobelet avec les autres formats de notre gamme ",
            },
            { type: "link", label: "gobelets & verres", breadcrumbIndex: 1 },
            {
              type: "text",
              value:
                " pour identifier la contenance adaptée à votre usage.",
            },
          ],
        ],
      },
      {
        id: "materiaux",
        heading: "Matériaux et fabrication",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Le corps du gobelet est fabriqué en carton kraft naturel non blanchi. Une doublure PE alimentaire assure l'étanchéité et la résistance aux boissons chaudes jusqu'à 85°C. Le kraft brut offre un positionnement éco assumé, prisé par les chaînes de restauration responsable comme Jour, Exki et les traiteurs bio. Cette finition appartient à notre sélection ",
            },
            { type: "link", label: "gobelets carton", breadcrumbIndex: 2 },
            {
              type: "text",
              value:
                " certifiée FSC et recyclable en filière papier.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Ce gobelet mesure 24 cl (8 OZ). Son diamètre de 80 mm et sa hauteur de 92 mm respectent le standard européen du marché CHR. Il s'insère dans tous les porte-gobelets de machine à café professionnelle Nespresso Pro, Jura et Saeco. Le couvercle n'est pas fourni avec ce produit. Commandez-le séparément dans notre catalogue avec la référence couvercle dôme 80 mm.",
            },
          ],
        ],
      },
      {
        id: "usages",
        heading: "Usages professionnels recommandés",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Ce gobelet convient au service de café, thé, lait, chocolat chaud et boissons froides de 4°C à 85°C. Les secteurs utilisateurs habituels sont l'hôtellerie 2 à 4 étoiles, la cafétéria d'entreprise, la restauration rapide sous enseigne, le food truck, la salle de séminaire et l'espace de pause en tertiaire. Accor Hotels, Sodexo et Elior ont référencé ce format pour leurs sites équipés de distributeurs automatiques.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Pour composer un service traiteur cohérent, associez ce gobelet aux kits couverts bois référence KIT-BOS-6 et aux serviettes kraft 33×33 cm du catalogue. Les traiteurs événementiels commandent par multiples de 10 packs pour activer la remise volume de 8 % et bénéficier d'un pack offert dès 10 unités. Les organisateurs de mariage, séminaire et cocktail anticipent un ratio de 2,5 gobelets par personne sur une prestation de 4 heures.",
            },
          ],
        ],
      },
      {
        id: "conformite",
        heading: "Conformité réglementaire et certifications",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Ce gobelet possède la certification contact alimentaire selon le règlement UE 1935/2004. Il répond aux exigences de la loi AGEC (loi anti-gaspillage pour une économie circulaire) applicable depuis janvier 2024 pour la restauration et l'événementiel en France. Le carton provient de forêts gérées durablement certifiées FSC. Après usage, ce gobelet se trie dans la poubelle jaune emballages papier-carton des collectivités équipées du tri sélectif.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Pour les marchés publics, les appels d'offres hospitaliers et les contrats de restauration collective, nous fournissons sur demande l'attestation de conformité matériaux contact alimentaire, la fiche technique détaillée et la déclaration de conformité REACH. Ces documents accompagnent systématiquement votre devis pour faciliter la validation par vos services achats et qualité.",
            },
          ],
        ],
      },
      {
        id: "utilisation",
        heading: "Mode d'emploi et conditions de stockage",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Conservez les packs fermés dans un local sec à température comprise entre 15°C et 25°C. L'humidité relative ne doit pas dépasser 60 % pour éviter le ramollissement du carton. Ce gobelet supporte les boissons jusqu'à 85°C pendant 15 minutes sans déformation. Il n'est pas micro-ondable et ne doit pas être réutilisé après un premier service pour des raisons d'hygiène alimentaire.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Planifiez une rotation de stock de trois à six mois maximum si vous commandez en volume. L'emballage individuel protège chaque gobelet des poussières et projections, mais le carton kraft reste sensible aux chocs d'hygrométrie en cave ou réserve froide. Les exploitants de camping, festival et événement outdoor prévoient un stockage en zone couverte ventilée 48 heures avant utilisation pour éviter toute condensation.",
            },
          ],
        ],
      },
    ],
    faqVideos: [
      {
        label: "Délais de livraison",
        description:
          "Délais de livraison Ojetables : expédition 24/72 h, options express et suivi de colis pour les commandes pro.",
        videoUrl:
          "https://video.vidjet.io/ee1cb61c-9469-4c31-aba6-680915a4d2f9/e9a17a48-7ee3-4464-acf1-859ed32dfe0a/livraison_v2.mp4-compressed.mp4",
        thumbnailUrl:
          "https://image-compression-pipeline-destination.s3.eu-west-1.amazonaws.com/ee1cb61c-9469-4c31-aba6-680915a4d2f9/e9a17a48-7ee3-4464-acf1-859ed32dfe0a/1747138639025.jpg",
        duration: "PT12S",
        uploadDate: "2025-05-13",
      },
      {
        label: "Votre commande",
        description:
          "Suivi de commande et préparation des colis : confirmation, expédition et réception de votre vaisselle jetable.",
        videoUrl:
          "https://video.vidjet.io/ee1cb61c-9469-4c31-aba6-680915a4d2f9/fd7c72f0-4571-4bf1-a18c-a8b64426e63f/expe_dition_commande_v2.mp4-compressed.mp4",
        thumbnailUrl:
          "https://image-compression-pipeline-destination.s3.eu-west-1.amazonaws.com/ee1cb61c-9469-4c31-aba6-680915a4d2f9/fd7c72f0-4571-4bf1-a18c-a8b64426e63f/1747138639024.jpg",
        duration: "PT12S",
        uploadDate: "2025-05-13",
      },
      {
        label: "Service client",
        description:
          "Contactez le service client Ojetables : conseils produit, devis pro et assistance après-vente du lundi au vendredi.",
        videoUrl:
          "https://video.vidjet.io/ee1cb61c-9469-4c31-aba6-680915a4d2f9/c5b155f6-17cd-4721-b11e-38cba866a45a/service_client_v2.mp4-compressed.mp4",
        thumbnailUrl:
          "https://image-compression-pipeline-destination.s3.eu-west-1.amazonaws.com/ee1cb61c-9469-4c31-aba6-680915a4d2f9/c5b155f6-17cd-4721-b11e-38cba866a45a/1747138639025.jpg",
        duration: "PT17S",
        uploadDate: "2025-05-13",
      },
    ],
    priceHt: 3.2,
    priceWasHt: 3.9,
    priceTtc: 3.84,
    unit: "pack de 50",
    unitPriceHt: 0.064,
    packLabel: "Lot de 50",
    stockLabel: "En stock · Livraison 24/72h",
    rating: 4.9,
    reviewCount: 8,
    reviewDistribution: [
      { stars: 5, percent: 75 },
      { stars: 4, percent: 25 },
      { stars: 3, percent: 0 },
      { stars: 2, percent: 0 },
      { stars: 1, percent: 0 },
    ],
    reviewInsights: {
      summary:
        "L'emballage individuel garantit l'hygiène en libre-service selon 75 % des avis clients. Le carton kraft résiste aux boissons chaudes sans brûler les doigts. La livraison rapide en 24/72h facilite les commandes de dernière minute pour les traiteurs. Certains clients rappellent que le couvercle dôme 80 mm se commande séparément.",
      pros: [
        "emballage individuel hygiénique",
        "carton kraft résistant chaleur",
        "livraison express 24/72h",
        "certifié contact alimentaire",
        "tarifs dégressifs volume",
      ],
    },
    productReviews: [
      {
        id: "avis-1",
        author: "Marie T.",
        rating: 5,
        text: "Parfait pour notre hôtel : chaque gobelet reste propre jusqu'à la machine à café. Le kraft tient bien le chocolat chaud sans brûler les doigts.",
        publishedAt: "2026-06-12",
      },
      {
        id: "avis-2",
        author: "Lucas P.",
        rating: 5,
        text: "Commande reçue en 48 h, conditionnement nickel. On apprécie le lot de 50 pour tester avant de passer en volume.",
        publishedAt: "2026-05-28",
      },
      {
        id: "avis-3",
        author: "Sophie R.",
        rating: 4,
        text: "Très bon rapport qualité-prix pour notre food truck. Pensez à commander les couvercles à part, ils ne sont pas inclus.",
        publishedAt: "2026-04-15",
      },
      {
        id: "avis-4",
        author: "Karim D.",
        rating: 5,
        text: "Utilisés en séminaire d'entreprise, aucune fuite sur 200 services café. Emballage individuel rassurant pour le public.",
        publishedAt: "2026-03-02",
      },
    ],
    volumeTiers: [
      { quantity: "1–9 packs", discount: "3,20 € HT / pack" },
      { quantity: "10–24 packs", discount: "−8 % + 1 pack offert" },
      { quantity: "25–49 packs", discount: "−12 % + 2 packs offerts" },
      { quantity: "50+ packs", discount: "−15 % + 5 packs offerts" },
    ],
    reassurance: [
      { icon: "shield", label: "Contact alimentaire" },
      { icon: "leaf", label: "Carton recyclable" },
      { icon: "truck", label: "Expédié en 24/72h" },
      { icon: "star", label: "9,5/10 sur 2 417 avis" },
    ],
    badges: [
      { label: "Bio", title: "Biodégradable" },
      { label: "Chauffable", title: "Compatible boissons chaudes" },
    ],
    featurePictos: [
      {
        id: "biodegradable",
        label: "Biodégradable",
        description:
          "Carton kraft certifié FSC recyclable en filière papier. Conforme loi AGEC 2024. Valorise votre image responsable auprès des clients CHR et traiteurs sensibles à l'éco-conception.",
        highlight: true,
      },
      {
        id: "hot",
        label: "Chauffable",
        description:
          "Résiste aux boissons jusqu'à 85°C pendant 15 minutes. Convient au café, thé, chocolat chaud servis en continu. Double paroi kraft isolante qui protège les mains de la chaleur.",
        highlight: true,
      },
      {
        id: "individual-wrap",
        label: "Emballage individuel",
        description:
          "Chaque gobelet reste protégé jusqu'à la prise en main par le client. Élimine les contaminations croisées en libre-service. Solution hygiène recommandée pour hôtellerie, cafétérias et espaces d'accueil.",
        highlight: true,
      },
    ],
    specs: [
      { label: "Contenance", value: "24 cl (8 OZ)" },
      { label: "Matière", value: "Carton et PE" },
      { label: "Dimensions", value: "Ø 80 mm · Hauteur 92 mm" },
      { label: "Conditionnement", value: "50 unités / pack" },
      { label: "Couleur", value: "Kraft clair / marron" },
      { label: "Emballage", value: "Individuel (hygiène optimale)" },
      { label: "Bio", value: "Oui" },
      { label: "Micro-ondable", value: "Non" },
    ],
    specGroups: [
      {
        id: "dimensions",
        title: "Dimensions & contenance",
        subtitle: "Format standard 24 cl · compatible couvercles catalogue",
        items: [
          { label: "Contenance", value: "24 cl (8 OZ)" },
          { label: "Dimensions", value: "Ø 80 mm · Hauteur 92 mm" },
        ],
        note:
          "Ce format 24 cl est le plus commandé en CHR France pour le café et les boissons chaudes. Vérifiez la compatibilité avec notre couvercle dôme 80 mm référence COUV-80-DO si vous prévoyez du transport nomade ou de la vente à emporter.",
      },
      {
        id: "matieres",
        title: "Matières & finitions",
        subtitle: "Carton kraft · doublure PE · gamme biodégradable",
        items: [
          { label: "Matière", value: "Carton et PE" },
          { label: "Couleur", value: "Kraft clair / marron" },
          { label: "Bio", value: "Oui" },
        ],
        note:
          "Le carton kraft provient de forêts gérées FSC. La doublure polyéthylène alimentaire garantit l'étanchéité jusqu'à 85°C pendant 15 minutes sans fuite ni ramollissement. Ce gobelet se recycle en filière papier-carton après séparation du PE en centre de tri.",
      },
      {
        id: "conditionnement",
        title: "Conditionnement & emballage",
        subtitle: "Lot de 50 · emballage individuel pour l'hygiène",
        items: [
          { label: "Conditionnement", value: "50 unités / pack" },
          { label: "Emballage", value: "Individuel (hygiène optimale)" },
        ],
      },
      {
        id: "usage",
        title: "Usage & compatibilité",
        subtitle: "Boissons chaudes et froides · non micro-ondable",
        items: [{ label: "Micro-ondable", value: "Non" }],
        note:
          "Ce gobelet convient au café, thé, chocolat chaud et boissons froides de 4°C à 85°C. Ne le réchauffez pas au micro-ondes pour éviter la déformation du carton. Remplissez les gobelets à la demande pour garantir la température de service optimale.",
      },
    ],
    shipping:
      "Livraison en France métropolitaine sous 24 à 72 heures ouvrées. Frais de port : 6,90 € HT jusqu'à 29,99 €, puis 9,90 € HT de 30 à 139,99 €, puis 16,90 € HT de 140 à 249,99 €. Frais offerts dès 250 € HT de commande. Option express 26,90 € HT pour livraison sous 24h garantie avant 13h.",
    personalization:
      "Cette référence gobelet kraft 24 cl n'est pas personnalisable avec votre logo. Pour commander des gobelets carton personnalisés, consultez notre gamme impression logo. Minimum 250 pièces. Sérigraphie 1 à 4 couleurs Pantone. BAT numérique sous 48 heures. Production 2 à 3 semaines après validation du BAT.",
    personalizable: false,
    faq: [
      {
        question: "Le couvercle est-il inclus avec ce gobelet ?",
        answer:
          "Non. Le couvercle dôme 80 mm se commande séparément dans notre catalogue gobelets carton. Référence COUV-80-DO disponible en stock. Compatible avec tous les gobelets 24 cl diamètre 80 mm de notre gamme.",
      },
      {
        question: "Ce gobelet tient-il les boissons chaudes sans brûler les mains ?",
        answer:
          "Oui. Le carton kraft double paroi isole la chaleur. Vous pouvez tenir un café à 85°C pendant 15 minutes sans gêne. Ce gobelet convient au café, thé, chocolat chaud et boissons froides de 4°C à 85°C. Ne le réchauffez pas au micro-ondes.",
      },
      {
        question: "Pourquoi choisir un emballage individuel pour ces gobelets ?",
        answer:
          "L'emballage individuel protège chaque gobelet jusqu'à la prise en main. Cette solution élimine les contaminations croisées en cafétéria, hôtel et espace d'accueil. Les hôtels Ibis Budget, les distributeurs Selecta et les salles de séminaire utilisent ce format pour garantir l'hygiène en libre-service.",
      },
      {
        question: "Faut-il commander un minimum de packs pour ce produit ?",
        answer:
          "Non pour les particuliers et petits volumes. Vous commandez dès 1 pack de 50 unités. Les tarifs dégressifs s'activent dès 10 packs pour les comptes professionnels : remise de 8 % plus 1 pack offert dès 10 packs commandés.",
      },
      {
        question: "Peut-on personnaliser ces gobelets avec notre logo d'entreprise ?",
        answer:
          "Non pour cette référence standard. Pour commander des gobelets carton avec logo imprimé, consultez notre gamme personnalisation. Minimum 250 pièces. Sérigraphie 1 à 4 couleurs Pantone. BAT numérique sous 48 heures. Production 2 à 3 semaines après validation.",
      },
    ],
    crossSell: [
      {
        slug: "gobelet-carton-24cl-kraft-individuel",
        name: "Gobelet carton 18 cl Kraft (individuel)",
        priceHt: 2.9,
        image: gobeletImage,
        category: "Gobelets",
        priceFrom: "2,90 € HT",
        priceWas: "3,60 € HT",
        rating: 4.8,
        reviewCount: 5,
        packLabel: "Lot de 50",
      },
      {
        slug: "gobelet-carton-24cl-kraft-individuel",
        name: "Kit couverts 6 en 1 bois kraft",
        priceHt: 8.99,
        image: "/products/kit-couverts-6.jpg",
        category: "Couverts",
        priceFrom: "8,99 € HT",
        rating: 5,
        reviewCount: 4,
        packLabel: "Lot de 100",
      },
      {
        slug: "gobelet-carton-24cl-kraft-individuel",
        name: "Gobelet smoothie 35 à 65 cl",
        priceHt: 4.5,
        image: "/products/gobelet-smoothie.jpg",
        category: "Gobelets",
        priceFrom: "4,50 € HT",
        rating: 4.9,
        reviewCount: 8,
        packLabel: "Lot de 50",
      },
      {
        slug: "gobelet-carton-24cl-kraft-individuel",
        name: "Sachet couverts bois kraft",
        priceHt: 6.5,
        image: "/products/sachet-couverts-bois.jpg",
        category: "Couverts",
        priceFrom: "6,50 € HT",
        rating: 4.7,
        reviewCount: 6,
        packLabel: "Lot de 50",
      },
      {
        slug: "gobelet-carton-24cl-kraft-individuel",
        name: "Cuillère bois 16 cm",
        priceHt: 2.4,
        image: "/products/cuillere-bois.jpg",
        category: "Couverts",
        priceFrom: "2,40 € HT",
        rating: 4.8,
        reviewCount: 3,
        packLabel: "Lot de 100",
      },
      {
        slug: "gobelet-carton-24cl-kraft-individuel",
        name: "Gobelet carton 24 cl blanc",
        priceHt: 3.1,
        image: gobeletImage,
        category: "Gobelets",
        priceFrom: "3,10 € HT",
        priceWas: "3,80 € HT",
        rating: 4.6,
        reviewCount: 4,
        packLabel: "Lot de 50",
      },
    ],
    images: [
      {
        src: gobeletImageRetouched,
        alt: "Gobelet carton kraft 24 cl emballé individuellement — visuel studio unifié",
      },
      {
        src: gobeletImageOriginal,
        alt: "Photo catalogue d'origine du gobelet kraft 24 cl",
      },
    ],
  };
