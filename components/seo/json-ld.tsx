import type { Category } from "@/lib/categories";
import { parseFrenchPrice, productCardAbsoluteUrl } from "@/lib/category-price";
import { getCategoryAggregateOffer } from "@/lib/category-price-filter";
import { computeCategoryReviewAggregate } from "@/lib/category-reviews";
import {
  catalogNavCategories,
  getSiteUrl,
  merchantReturnPolicy,
  nav,
  pressTvFeature,
  routes,
  site,
  type CatalogFamily,
  type CatalogNavCategory,
  type FaqItem,
  type NavLink,
} from "@/lib/site";
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

function absoluteNavUrl(href: string, base: string): string {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }
  if (href.startsWith("/#")) {
    return `${base}${href}`;
  }
  if (href.startsWith("#")) {
    return `${base}/${href}`;
  }
  if (href.startsWith("/")) {
    return `${base}${href}`;
  }
  return `${base}/${href}`;
}

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

function merchantReturnPolicyEntity() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: merchantReturnPolicy.applicableCountry,
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: merchantReturnPolicy.returnDays,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
    returnPolicyUrl: merchantReturnPolicy.url,
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

export function faqPageEntity(faq: readonly FaqItem[]) {
  return {
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

export function faqJsonLd(faq: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    ...faqPageEntity(faq),
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
      hasMerchantReturnPolicy: merchantReturnPolicyEntity(),
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

export function categoryPageJsonLd(category: Category, path: string) {
  const base = getSiteUrl();
  const products = category.products;
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Accueil", path: "/" },
    { name: category.label },
  ];

  const reviewAggregate = computeCategoryReviewAggregate(products);
  const aggregateOffer = getCategoryAggregateOffer(products);

  const aggregateRatingEntity = reviewAggregate
    ? {
        "@type": "AggregateRating",
        "@id": `${base}${path}#category-rating`,
        ratingValue: String(reviewAggregate.ratingValue),
        reviewCount: String(reviewAggregate.reviewCount),
        bestRating: "5",
        worstRating: "1",
      }
    : null;

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
    publisher: {
      "@id": `${base}/#organization`,
    },
    mainEntity: {
      "@id": `${base}${path}#collection`,
    },
    about: {
      "@id": `${base}${path}#itemlist-products`,
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

  if (aggregateRatingEntity) {
    (collection as Record<string, unknown>).aggregateRating = {
      "@id": aggregateRatingEntity["@id"],
    };
  }

  if (aggregateOffer) {
    (collection as Record<string, unknown>).offers = {
      "@type": "AggregateOffer",
      url: `${base}${path}`,
      lowPrice: aggregateOffer.lowPrice,
      highPrice: aggregateOffer.highPrice,
      priceCurrency: "EUR",
      offerCount: String(aggregateOffer.offerCount),
      availability: "https://schema.org/InStock",
    };
  }

  const productItemList = {
    "@type": "ItemList",
    "@id": `${base}${path}#itemlist-products`,
    name: `Produits ${category.label} Ojetables`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      const productUrl = productCardAbsoluteUrl(product.href, base);
      const price = parseFrenchPrice(product.priceFrom);

      const productEntity: Record<string, unknown> = {
        "@type": "Product",
        name: product.name,
        url: productUrl,
        image: product.image.startsWith("http") ? product.image : `${base}${product.image}`,
      };

      if (price !== null) {
        productEntity.offers = {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "EUR",
          price: price.toFixed(2),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        };
      }

      const rating = product.rating ?? 0;
      const reviewCount = product.reviewCount ?? 0;
      if (rating > 0 && reviewCount > 0) {
        productEntity.aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: String(rating),
          reviewCount: String(reviewCount),
          bestRating: "5",
          worstRating: "1",
        };
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: productUrl,
        item: productEntity,
      };
    }),
  };

  const subfamilyItemList = {
    "@type": "ItemList",
    "@id": `${base}${path}#itemlist-subfamilies`,
    name: `Gammes associées ${category.label}`,
    numberOfItems: category.subfamilies.length,
    itemListElement: category.subfamilies.map((subfamily, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: subfamily.label,
      url: subfamily.href.startsWith("http")
        ? subfamily.href
        : `${base}${subfamily.href.startsWith("/") ? subfamily.href : `/${subfamily.href}`}`,
      image: subfamily.image.startsWith("http") ? subfamily.image : `${base}${subfamily.image}`,
    })),
  };

  const faqEntity = {
    "@id": `${base}${path}#faq`,
    ...faqPageEntity(category.faq),
  };

  const graph: Record<string, unknown>[] = [
    collectionPage,
    collection,
    productItemList,
    subfamilyItemList,
    faqEntity,
    breadcrumbEntity(path, breadcrumbs),
  ];

  if (aggregateRatingEntity) {
    graph.push(aggregateRatingEntity);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
