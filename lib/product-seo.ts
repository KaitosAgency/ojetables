import type { Product } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

/** Concatène les sections éditoriales en texte brut (texte + labels de liens). */
export function flattenProductDescription(product: Product): string {
  const chunks: string[] = [];

  for (const section of product.descriptionSections) {
    for (const paragraph of section.paragraphs) {
      for (const part of paragraph) {
        chunks.push(part.type === "text" ? part.value : part.label);
      }
    }
  }

  return chunks.join(" ").replace(/\s+/g, " ").trim();
}

/** Description Product schema — troncature propre à N mots. */
export function getProductSchemaDescription(product: Product, maxWords = 150): string {
  const fullText = flattenProductDescription(product);
  if (!fullText) return product.description;

  const words = fullText.split(/\s+/);
  if (words.length <= maxWords) return fullText;

  return `${words.slice(0, maxWords).join(" ")}…`;
}

export function getProductReviewEntities(product: Product, path: string) {
  const productId = `${getSiteUrl()}${path}#product`;

  return product.productReviews.map((review, index) => ({
    "@type": "Review" as const,
    "@id": `${getSiteUrl()}${path}#review-${index + 1}`,
    itemReviewed: {
      "@id": productId,
    },
    author: {
      "@type": "Person" as const,
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating" as const,
      ratingValue: String(review.rating),
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: review.text,
    datePublished: review.publishedAt,
  }));
}
