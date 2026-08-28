import dynamic from "next/dynamic";

import {
  AvisGarantisInlineLink,
  ReviewsBandLayout,
} from "@/components/sections/reviews-band-layout";
import { SectionHeader } from "@/components/sections/section-header";
import { TrustRatingInline } from "@/components/trust/trust-rating-inline";
import { LinkButton } from "@/components/ui/link-button";
import type { ProductCardProps } from "@/components/product/product-card";
import {
  computeCategoryReviewAggregate,
  getTopReviewedCategoryProducts,
} from "@/lib/category-reviews";
import { site, avisGarantis } from "@/lib/site";

function CategoryReviewsCarouselSkeleton() {
  return (
    <div className="min-h-[14rem] animate-pulse rounded-2xl bg-brand-navy/5" aria-hidden />
  );
}

const CategoryReviewsCarousel = dynamic(
  () =>
    import("@/components/category/category-reviews-carousel").then((module) => ({
      default: module.CategoryReviewsCarousel,
    })),
  { loading: () => <CategoryReviewsCarouselSkeleton /> },
);

type CategoryReviewsBandProps = {
  categoryLabel: string;
  products: readonly ProductCardProps[];
};

export function CategoryReviewsBand({ categoryLabel, products }: CategoryReviewsBandProps) {
  const aggregate = computeCategoryReviewAggregate(products);
  const topProducts = getTopReviewedCategoryProducts(products);

  if (!aggregate) return null;

  const reviewsCta = (
    <LinkButton
      href={avisGarantis.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="brandOutline"
      size="ctaSm"
      className="mt-6 w-full justify-center lg:hidden"
    >
      Voir tous les avis certifiés ({site.aggregateRating.count.toLocaleString("fr-FR")})
    </LinkButton>
  );

  return (
    <ReviewsBandLayout
      sectionClassName="border-t border-border/60"
      headerClassName="flex flex-col items-center text-center lg:items-start lg:text-left"
      header={
        <>
          <SectionHeader
            label="Avis produits"
            title={`Ils recommandent nos ${categoryLabel.toLowerCase()}`}
            titleClassName="max-w-none text-3xl md:text-4xl"
            description={
              <>
                Note moyenne des produits notés de cette catégorie :{" "}
                <strong>{aggregate.displayRating}</strong> sur{" "}
                {aggregate.reviewCount.toLocaleString("fr-FR")} avis produits certifiés (
                {aggregate.productCountWithReviews.toLocaleString("fr-FR")} références). Boutique
                vérifiée par <AvisGarantisInlineLink />.
              </>
            }
            descriptionClassName="mx-auto max-w-xl text-sm leading-relaxed md:text-base lg:mx-0 lg:max-w-none"
          />

          <TrustRatingInline
            variant="featured"
            className="mt-6 lg:justify-start"
            scoreDisplay={aggregate.displayRating}
            reviewCount={aggregate.reviewCount}
            starValue={aggregate.ratingValue}
            reviewCountSuffix="avis produits"
          />

          <LinkButton
            href={avisGarantis.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="brandOutline"
            size="ctaSm"
            className="mt-6 hidden w-full justify-center lg:inline-flex lg:w-auto lg:self-start"
          >
            Voir tous les avis certifiés ({site.aggregateRating.count.toLocaleString("fr-FR")})
          </LinkButton>
        </>
      }
      carousel={<CategoryReviewsCarousel products={topProducts} />}
      footer={reviewsCta}
    />
  );
}
