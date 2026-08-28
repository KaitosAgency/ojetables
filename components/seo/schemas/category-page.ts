import type { Category } from "@/lib/categories";
import { parseFrenchPrice, productCardAbsoluteUrl } from "@/lib/category-price";
import { getCategoryAggregateOffer } from "@/lib/category-price-filter";
import { computeCategoryReviewAggregate } from "@/lib/category-reviews";
import { getSiteUrl } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/types/breadcrumb";

import { faqPageEntity } from "./faq";
import { breadcrumbEntity } from "./shared";

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
