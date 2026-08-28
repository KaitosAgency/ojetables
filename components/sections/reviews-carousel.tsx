"use client";

import { BadgeCheck } from "lucide-react";

import { ContentSlider, ContentSliderSlide } from "@/components/ui/content-slider";
import { interactiveCardSurfaceClassName } from "@/components/ui/interactive-card";
import { StarRating } from "@/components/ui/star-rating";
import { reviewsSliderConfig } from "@/lib/content-slider-configs";
import { cn } from "@/lib/utils";
import { reviewsFallback } from "@/lib/site";

export function ReviewsCarousel() {
  const { slideClassName, ...sliderProps } = reviewsSliderConfig;

  return (
    <ContentSlider ariaLabel="Avis clients" {...sliderProps}>
      {reviewsFallback.map((review) => (
        <ContentSliderSlide key={review.id} className={slideClassName}>
          <blockquote
            className={cn(
              "flex h-full min-h-[12.5rem] flex-col rounded-2xl bg-white p-5 md:p-6",
              interactiveCardSurfaceClassName,
            )}
          >
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
