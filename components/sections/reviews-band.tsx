import { site } from "@/lib/site";
import { BandBottomArc } from "@/components/ui/band-bottom-arc";
import { StarRating } from "@/components/ui/star-rating";
import { ReviewsCarousel } from "@/components/sections/reviews-carousel";

export function ReviewsBand() {
  return (
    <section className="band-arc-overlap section-divider-top relative z-10 bg-brand-navy pb-5 md:pb-6">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">Avis clients</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-4xl">
              {site.aggregateRating.display} sur {site.aggregateRating.count.toLocaleString("fr-FR")} avis
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
              Réputation certifiée {site.aggregateRating.label} — un levier de conversion sous-exploité sur
              le site actuel.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StarRating />
              <a
                href={site.aggregateRating.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                {site.aggregateRating.label}
              </a>
            </div>
          </div>
        </div>

        <ReviewsCarousel />
      </div>
      <BandBottomArc className="text-background" />
    </section>
  );
}
