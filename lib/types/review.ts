/** Champs communs à tous les avis (site, fiche produit, carrousels). */
export type ReviewItem = {
  id: string;
  author: string;
  rating: number;
  text: string;
};

export type ReviewItemWithRelativeTime = ReviewItem & {
  relativeTime: string;
};

export type ReviewItemWithPublishedAt = ReviewItem & {
  publishedAt: string;
};

export function toReviewItem(review: ReviewItemWithRelativeTime | ReviewItemWithPublishedAt): ReviewItem {
  return {
    id: review.id,
    author: review.author,
    rating: review.rating,
    text: review.text,
  };
}

export function toProductReview(
  review: ReviewItem,
  publishedAt: string,
): ReviewItemWithPublishedAt {
  return { ...review, publishedAt };
}

export function toSiteReview(
  review: ReviewItem,
  relativeTime: string,
): ReviewItemWithRelativeTime {
  return { ...review, relativeTime };
}
