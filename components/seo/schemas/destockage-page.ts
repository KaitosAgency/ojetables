import { parseFrenchPrice, productCardAbsoluteUrl } from "@/lib/category-price";
import { getSiteUrl } from "@/lib/site";
import type { ProductTeaser } from "@/lib/types/product-teaser";
import type { BreadcrumbItem } from "@/lib/types/breadcrumb";

import { breadcrumbEntity } from "./shared";

type DestockagePageMeta = {
  title: string;
  description: string;
};

export function destockagePageJsonLd(
  page: DestockagePageMeta,
  products: readonly ProductTeaser[],
  path: string,
) {
  const base = getSiteUrl();
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Accueil", path: "/" },
    { name: "Destockage" },
  ];

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${base}${path}#webpage`,
    url: `${base}${path}`,
    name: page.title,
    description: page.description,
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
  };

  const collection = {
    "@type": "Collection",
    "@id": `${base}${path}#collection`,
    name: page.title,
    description: page.description,
    numberOfItems: products.length,
  };

  const productItemList = {
    "@type": "ItemList",
    "@id": `${base}${path}#itemlist-products`,
    name: "Produits destockage Ojetables",
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

  return {
    "@context": "https://schema.org",
    "@graph": [collectionPage, collection, productItemList, breadcrumbEntity(path, breadcrumbs)],
  };
}
