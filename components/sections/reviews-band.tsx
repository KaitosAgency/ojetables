import dynamic from "next/dynamic";
import Image from "next/image";

import { avisGarantis } from "@/lib/site";
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
    <section className="section-padding bg-brand-beige">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              label="Avis clients"
              title="Ils commandent, et ils reviennent."
              titleClassName="max-w-none text-3xl md:text-4xl"
              description={
                <>
                  2 417 avis certifiés après achat réel. Note moyenne 9,5/10 vérifiée par{" "}
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
              descriptionClassName="text-sm leading-relaxed md:text-base"
            />

            <TrustRatingInline variant="featured" className="mt-6" />
          </div>

          <div className="flex min-w-0 flex-col justify-center lg:col-span-7">
            <ReviewsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
