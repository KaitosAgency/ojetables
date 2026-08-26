import dynamic from "next/dynamic";
import Image from "next/image";

import { SectionHeader } from "@/components/sections/section-header";
import { TrustRatingInline } from "@/components/trust/trust-rating-inline";
import { LinkButton } from "@/components/ui/link-button";
import type { ProductCardProps } from "@/components/product/product-card";
import {
  computeCategoryReviewAggregate,
  getTopReviewedCategoryProducts,
} from "@/lib/category-reviews";
import { avisGarantis, site } from "@/lib/site";

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

  return (
    <section className="section-padding border-t border-border/60 bg-brand-beige">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left">
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
                  vérifiée par{" "}
                  <a
                    href={avisGarantis.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-brand-navy underline-offset-2 transition-colors hover:text-brand-teal-dim hover:underline"
                  >
                    <Image
                      src={avisGarantis.assets.cocarde}
                      alt=""
                      width={16}
                      height={16}
                      className="inline-block size-4 shrink-0"
                      aria-hidden
                    />
                    Société des Avis Garantis
                  </a>
                  .
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
          </div>

          <div className="flex min-w-0 flex-col justify-center lg:col-span-7">
            <CategoryReviewsCarousel products={topProducts} />
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
          </div>
        </div>
      </div>
    </section>
  );
}
