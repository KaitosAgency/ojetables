import { site, getSiteUrl, type CatalogFamily, type FaqItem } from "@/lib/site";
import type { Product } from "@/lib/products";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export type BreadcrumbItem = {
  name: string;
  path?: string;
  shortName?: string;
};

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

export function catalogItemListJsonLd(families: readonly CatalogFamily[]) {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catalogue vaisselle jetable Ojetables — 12 familles",
    description:
      "Les 12 catégories du catalogue Ojetables : vaisselle jetable, verrines, bio/écolo, snack, sacs, gobelets, plateaux, nappage, hygiène, personnalisation, destockage et Garcia de Pou.",
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

export function faqJsonLd(faq: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function breadcrumbEntity(path: string, breadcrumbs: readonly BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${getSiteUrl()}${path}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${getSiteUrl()}${item.path}` } : {}),
    })),
  };
}

export function productPageJsonLd(product: Product, path: string) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Accueil", path: "/" },
    { name: product.category, path: product.categoryPath },
    { name: product.shortName },
  ];

  const productEntity = {
    "@type": "Product",
    "@id": `${getSiteUrl()}${path}#product`,
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(site.aggregateRating.score),
      reviewCount: String(site.aggregateRating.count),
      bestRating: "10",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      url: `${getSiteUrl()}${path}`,
      priceCurrency: "EUR",
      price: product.priceHt.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "EUR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
        },
      },
    },
  };

  const webPageEntity = {
    "@type": "WebPage",
    "@id": `${getSiteUrl()}${path}#webpage`,
    url: `${getSiteUrl()}${path}`,
    name: product.metaTitle,
    description: product.metaDescription,
    inLanguage: "fr-FR",
    isPartOf: {
      "@id": `${getSiteUrl()}/#website`,
    },
    about: {
      "@id": `${getSiteUrl()}${path}#product`,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPageEntity, productEntity, breadcrumbEntity(path, breadcrumbs)],
  };
}

export function breadcrumbJsonLd(path: string, breadcrumbs: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    ...breadcrumbEntity(path, breadcrumbs),
  };
}
