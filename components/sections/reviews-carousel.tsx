"use client";

import { BadgeCheck } from "lucide-react";

import { ContentSlider, ContentSliderSlide } from "@/components/ui/content-slider";
import { StarRating } from "@/components/ui/star-rating";
import { reviewsFallback } from "@/lib/site";

export function ReviewsCarousel() {
  return (
    <ContentSlider
      ariaLabel="Avis clients"
      variant="light"
      trackClassName="pb-4 pt-2"
    >
      {reviewsFallback.map((review) => (
        <ContentSliderSlide
          key={review.id}
          className="sm:w-[calc(50%-0.5rem)] lg:!w-[calc(50%-0.5rem)]"
        >
          <blockquote className="flex h-full min-h-[12.5rem] flex-col rounded-2xl border border-brand-navy/8 bg-white p-5 shadow-sm md:p-6">
            <div className="flex items-center gap-2">
              <StarRating size="sm" value={review.rating} />
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-teal-dim">
                <BadgeCheck className="size-3.5 shrink-0" aria-hidden />
                Avis vérifié
              </span>
            </div>

            <p className="mt-4 line-clamp-2 flex-1 text-sm leading-relaxed text-brand-navy/80">
              &ldquo;{review.text}&rdquo;
            </p>

            <footer className="mt-5 flex items-baseline justify-between gap-3 pb-1">
              <cite className="text-sm font-semibold not-italic text-brand-navy">{review.author}</cite>
              <span className="shrink-0 text-xs text-muted-foreground">{review.relativeTime}</span>
            </footer>
          </blockquote>
        </ContentSliderSlide>
      ))}
    </ContentSlider>
  );
}
