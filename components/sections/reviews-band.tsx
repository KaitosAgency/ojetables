import dynamic from "next/dynamic";

import {
  AvisGarantisInlineLink,
  ReviewsBandLayout,
} from "@/components/sections/reviews-band-layout";
import { SectionHeader } from "@/components/sections/section-header";
import { TrustRatingInline } from "@/components/trust/trust-rating-inline";

function ReviewsCarouselSkeleton() {
  return (
    <div className="min-h-[14rem] animate-pulse rounded-2xl bg-brand-navy/5" aria-hidden />
  );
}

const ReviewsCarousel = dynamic(
  () =>
    import("@/components/sections/reviews-carousel").then((module) => ({
      default: module.ReviewsCarousel,
    })),
  { loading: () => <ReviewsCarouselSkeleton /> },
);

export function ReviewsBand() {
  return (
    <ReviewsBandLayout
      header={
        <>
          <SectionHeader
            label="Avis clients"
            title="Ils commandent, et ils reviennent."
            titleClassName="max-w-none text-3xl md:text-4xl"
            description={
              <>
                2 417 avis certifiés après achat réel. Note moyenne 9,5/10 vérifiée par{" "}
                <AvisGarantisInlineLink />.
              </>
            }
            descriptionClassName="text-sm leading-relaxed md:text-base"
          />
          <TrustRatingInline variant="featured" className="mt-6" />
        </>
      }
      carousel={<ReviewsCarousel />}
    />
  );
}
