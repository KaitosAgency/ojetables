import type { ProductCardProps } from "@/components/product/product-card";

export type CategoryReviewAggregate = {
  productCountWithReviews: number;
  reviewCount: number;
  ratingValue: number;
  displayRating: string;
};

export function computeCategoryReviewAggregate(
  products: readonly ProductCardProps[],
): CategoryReviewAggregate | null {
  const withReviews = products.filter(
    (product) => (product.reviewCount ?? 0) > 0 && (product.rating ?? 0) > 0,
  );

  if (withReviews.length === 0) return null;

  const reviewCount = withReviews.reduce(
    (sum, product) => sum + (product.reviewCount ?? 0),
    0,
  );
  const ratingValue =
    withReviews.reduce((sum, product) => sum + (product.rating ?? 0), 0) / withReviews.length;

  const rounded = Math.round(ratingValue * 10) / 10;

  return {
    productCountWithReviews: withReviews.length,
    reviewCount,
    ratingValue: rounded,
    displayRating: `${rounded.toFixed(1).replace(".", ",")}/5`,
  };
}

export function getTopReviewedCategoryProducts(
  products: readonly ProductCardProps[],
  limit = 6,
): ProductCardProps[] {
  return [...products]
    .filter((product) => (product.reviewCount ?? 0) > 0 && (product.rating ?? 0) > 0)
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, limit);
}
