import { getProductPageBreadcrumbs, type Product } from "@/lib/products";
import { getProductReviewEntities, getProductSchemaDescription } from "@/lib/product-seo";
import { getSiteUrl, site } from "@/lib/site";
import { getStandardShippingCostHt } from "@/lib/shipping";

import { faqPageEntity } from "./faq";
import { breadcrumbEntity, merchantReturnPolicyEntity } from "./shared";

export function productPageJsonLd(product: Product, path: string) {
  const breadcrumbs = getProductPageBreadcrumbs(product);

  const productEntity = {
    "@type": "Product",
    "@id": `${getSiteUrl()}${path}#product`,
    name: product.name,
    description: getProductSchemaDescription(product),
    image: product.images.map((image) =>
      image.src.startsWith("http") ? image.src : `${getSiteUrl()}${image.src}`,
    ),
    sku: product.sku,
    ...(product.mpn ? { mpn: product.mpn } : {}),
    ...(product.gtin ? { gtin: product.gtin } : {}),
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
      price: product.priceTtc.toFixed(2),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.priceHt.toFixed(2),
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      ...(product.priceWasHt != null && product.priceWasHt > product.priceHt
        ? {
            priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              .toISOString()
              .split("T")[0],
          }
        : {}),
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: getStandardShippingCostHt(product.priceHt).toFixed(2),
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
    dateModified: product.updatedAt,
    isPartOf: {
      "@id": `${getSiteUrl()}/#website`,
    },
    about: {
      "@id": `${getSiteUrl()}${path}#product`,
    },
  };

  const videoEntities =
    product.faqVideos?.map((video, index) => ({
      "@type": "VideoObject" as const,
      "@id": `${getSiteUrl()}${path}#video-${index + 1}`,
      name: `${video.label} — ${product.shortName}`,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      uploadDate: video.uploadDate,
      duration: video.duration,
      contentUrl: video.videoUrl,
      embedUrl: video.videoUrl,
      publisher: {
        "@id": `${getSiteUrl()}/#organization`,
      },
    })) ?? [];

  const reviewEntities = getProductReviewEntities(product, path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageEntity,
      productEntity,
      {
        "@id": `${getSiteUrl()}${path}#faq`,
        ...faqPageEntity(product.faq),
      },
      ...(videoEntities.length > 0 ? videoEntities : []),
      ...reviewEntities,
      breadcrumbEntity(path, breadcrumbs),
    ],
  };
}
