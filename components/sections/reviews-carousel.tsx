"use client";

import { ContentSlider, ContentSliderSlide } from "@/components/ui/content-slider";
import { StarRating } from "@/components/ui/star-rating";
import { reviewsFallback } from "@/lib/site";

export function ReviewsCarousel() {
  return (
    <ContentSlider ariaLabel="Avis clients" variant="dark" className="mt-10">
      {reviewsFallback.map((review) => (
        <ContentSliderSlide key={review.id}>
          <blockquote className="flex h-full min-h-[11.5rem] flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:min-h-[12rem] md:p-6">
            <div className="flex items-start justify-between gap-3">
              <StarRating size="sm" value={review.rating} />
              <time className="shrink-0 text-xs text-slate-500">{review.relativeTime}</time>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
              &ldquo;{review.text}&rdquo;
            </p>
            <footer className="mt-5 text-sm font-semibold text-white">{review.author}</footer>
          </blockquote>
        </ContentSliderSlide>
      ))}
    </ContentSlider>
  );
}
