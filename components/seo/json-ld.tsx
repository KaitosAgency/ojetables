import type { Category } from "@/lib/categories";
import { categoryPath } from "@/lib/categories";
import type { ProductCardProps } from "@/components/product/product-card";
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

  const primaryImage = product.images[0]?.src;
  const imageUrl = primaryImage?.startsWith("http")
    ? primaryImage
    : `${getSiteUrl()}${primaryImage}`;

  const productEntity = {
    "@type": "Product",
    "@id": `${getSiteUrl()}${path}#product`,
    name: product.name,
    description: product.description,
    image: imageUrl,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(product.rating),
      reviewCount: String(product.reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      url: `${getSiteUrl()}${path}`,
      priceCurrency: "EUR",
      price: product.priceHt.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      ...(product.priceWasHt != null && product.priceWasHt > product.priceHt
        ? { priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            .toISOString()
            .split("T")[0] }
        : {}),
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

export function categoryPageJsonLd(
  category: Category,
  products: readonly ProductCardProps[],
  path: string,
) {
  const base = getSiteUrl();
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Accueil", path: "/" },
    { name: category.label },
  ];

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${base}${path}#webpage`,
    url: `${base}${path}`,
    name: category.metaTitle,
    description: category.metaDescription,
    inLanguage: "fr-FR",
    isPartOf: {
      "@id": `${base}/#website`,
    },
    about: {
      "@id": `${base}${path}#collection`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${base}${category.image}`,
    },
  };

  const collection = {
    "@type": "Collection",
    "@id": `${base}${path}#collection`,
    name: category.title,
    description: category.description,
    image: `${base}${category.image}`,
    numberOfItems: products.length,
  };

  const itemList = {
    "@type": "ItemList",
    "@id": `${base}${path}#itemlist`,
    name: `Produits ${category.label} Ojetables`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: product.href.startsWith("http")
        ? product.href
        : `${base}${product.href.startsWith("/") ? product.href : `/${product.href}`}`,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      collectionPage,
      collection,
      itemList,
      breadcrumbEntity(path, breadcrumbs),
    ],
  };
}
