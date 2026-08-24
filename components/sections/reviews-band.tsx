import Image from "next/image";

import { avisGarantis, site } from "@/lib/site";
import { StarRating } from "@/components/ui/star-rating";
import { ReviewsCarousel } from "@/components/sections/reviews-carousel";

export function ReviewsBand() {
  return (
    <section className="section-padding bg-brand-beige">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="max-w-md lg:col-span-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">Avis clients</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
              Ils commandent, et ils reviennent.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Avis collectés après un achat réel, certifiés par{" "}
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
            </p>

            <div className="mt-6 flex items-end gap-4">
              <p className="text-5xl font-bold leading-none tracking-tight text-brand-navy md:text-6xl">
                {site.aggregateRating.display}
              </p>
              <div className="pb-1">
                <StarRating />
                <p className="mt-1 text-sm text-muted-foreground">
                  sur {site.aggregateRating.count.toLocaleString("fr-FR")} avis
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <ReviewsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
