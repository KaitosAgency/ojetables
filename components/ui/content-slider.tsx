"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const contentSliderSlideClassName =
  "w-[88%] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]";

type ContentSliderProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  variant?: "light" | "dark";
};

export function ContentSlider({
  children,
  className,
  ariaLabel = "Carrousel",
  variant = "light",
}: ContentSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const isDark = variant === "dark";

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    setSlideCount(slides.length);
    if (slides.length === 0) return;

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distance = Math.abs(slideCenter - trackCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, children]);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className={cn("relative min-w-0", className)}>
      {isDark ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-navy to-transparent sm:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-navy to-transparent sm:w-14" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-beige/95 to-transparent sm:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white/95 to-transparent sm:w-14" />
        </>
      )}

      <div
        ref={trackRef}
        className="content-slider__track flex gap-4 overflow-x-auto overscroll-x-contain pb-1 pt-1"
        aria-label={ariaLabel}
        aria-roledescription="carrousel"
      >
        {children}
      </div>

      {slideCount > 1 ? (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2" role="tablist" aria-label="Pagination du carrousel">
            {Array.from({ length: slideCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-brand-teal"
                    : isDark
                      ? "w-2 bg-white/25 hover:bg-white/40"
                      : "w-2 bg-brand-navy/20 hover:bg-brand-navy/35",
                )}
                onClick={() => scrollToIndex(index)}
                aria-label={`Aller à l'élément ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ContentSliderSlide({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "content-slider__slide shrink-0 snap-start",
        contentSliderSlideClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}
