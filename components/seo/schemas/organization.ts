import {
  catalogNavCategories,
  getSiteUrl,
  nav,
  pressTvFeature,
  routes,
  site,
  type CatalogFamily,
  type CatalogNavCategory,
  type NavLink,
} from "@/lib/site";

import { absoluteNavUrl } from "./shared";

function navLinkSiteNavigationElement(item: NavLink, base: string): Record<string, unknown> {
  const element: Record<string, unknown> = {
    "@type": "SiteNavigationElement",
    name: item.label,
    url: absoluteNavUrl(item.href, base),
  };

  if (item.children?.length) {
    element.hasPart = item.children.map((child) => navLinkSiteNavigationElement(child, base));
  }

  return element;
}

function catalogCategorySiteNavigationElement(
  category: CatalogNavCategory,
  base: string,
): Record<string, unknown> {
  const groups = category.groups ?? [{ title: category.label, items: category.items ?? [] }];
  const subLinks = groups.flatMap((group) => group.items);

  return {
    "@type": "SiteNavigationElement",
    name: category.label,
    url: absoluteNavUrl(category.href, base),
    ...(subLinks.length
      ? { hasPart: subLinks.map((item) => navLinkSiteNavigationElement(item, base)) }
      : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "OnlineStore"],
    "@id": `${getSiteUrl()}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: getSiteUrl(),
    telephone: site.phone.replace(/\s/g, ""),
    email: site.email,
    description: site.description,
    image: `${getSiteUrl()}/opengraph-image`,
    foundingDate: String(site.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.aggregateRating.score,
      reviewCount: site.aggregateRating.count,
      bestRating: 10,
      worstRating: 1,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    url: getSiteUrl(),
    name: site.name,
    publisher: {
      "@id": `${getSiteUrl()}/#organization`,
    },
    inLanguage: "fr-FR",
  };
}

export function siteNavigationJsonLd() {
  const base = getSiteUrl();

  const mainNavigationElements: Record<string, unknown>[] = [
    {
      "@type": "SiteNavigationElement",
      name: "Accueil",
      url: `${base}/`,
    },
    {
      "@type": "SiteNavigationElement",
      name: nav.productsLabel,
      url: absoluteNavUrl(nav.productsHref, base),
    },
    ...nav.highlights.map((item) => ({
      "@type": "SiteNavigationElement",
      name: item.label,
      url: absoluteNavUrl(item.href, base),
    })),
    ...nav.main.map((item) => ({
      "@type": "SiteNavigationElement",
      name: item.label,
      url: absoluteNavUrl(item.href, base),
    })),
    {
      "@type": "SiteNavigationElement",
      name: "Mon compte",
      url: routes.account,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SiteNavigationElement",
        "@id": `${base}/#navigation-main`,
        name: "Navigation principale Ojetables",
        hasPart: mainNavigationElements,
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${base}/#navigation-catalog`,
        name: "Catalogue produits Ojetables",
        url: absoluteNavUrl(routes.category, base),
        hasPart: catalogNavCategories.map((category) =>
          catalogCategorySiteNavigationElement(category, base),
        ),
      },
    ],
  };
}

export function pressVideoJsonLd() {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${base}/#press-tv-video`,
    name: `${pressTvFeature.label} — ${pressTvFeature.title}`,
    description: pressTvFeature.description,
    thumbnailUrl: `${base}${pressTvFeature.src}`,
    uploadDate: pressTvFeature.uploadDate,
    duration: pressTvFeature.duration,
    contentUrl: pressTvFeature.videoUrl,
    embedUrl: `https://www.dailymotion.com/embed/video/${pressTvFeature.videoId}`,
    publisher: {
      "@id": `${base}/#organization`,
    },
  };
}

export function catalogItemListJsonLd(families: readonly CatalogFamily[]) {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nos catégories : catalogue vaisselle jetable Ojetables",
    description:
      "Catégories du catalogue Ojetables : vaisselle jetable, verrines, bio/écolo, snack, sacs, gobelets, plateaux, nappage, hygiène, personnalisation, destockage et Garcia de Pou.",
    numberOfItems: families.length,
    itemListElement: families.map((family, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: family.originalLabel ?? family.label,
      description: family.description,
      image: family.image.startsWith("http") ? family.image : `${base}${family.image}`,
      url: family.href.startsWith("http")
        ? family.href
        : `${base}${family.href.startsWith("/") || family.href.startsWith("#") ? family.href : `/${family.href}`}`,
    })),
  };
}

export function homePageJsonLd() {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${base}/#webpage`,
    url: `${base}/`,
    name: "Vaisselle jetable éco-responsable | Livraison 24/72h en France | Ojetables",
    description: site.description,
    inLanguage: "fr-FR",
    isPartOf: {
      "@id": `${base}/#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${base}/opengraph-image`,
    },
  };
}
