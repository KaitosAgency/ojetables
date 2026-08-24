"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const contentSliderSlideClassName =
  "w-[88%] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]";

type ContentSliderProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  ariaLabel?: string;
  variant?: "light" | "dark" | "green" | "kraft";
  autoPlay?: boolean;
  autoPlayInterval?: number;
  enableDrag?: boolean;
};

export function ContentSlider({
  children,
  className,
  trackClassName,
  ariaLabel = "Carrousel",
  variant = "light",
  autoPlay = false,
  autoPlayInterval = 4500,
  enableDrag = true,
}: ContentSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const snapIndicesRef = useRef<number[]>([0]);
  const autoPlayPausedRef = useRef(false);
  const autoPlayPauseUntilRef = useRef(0);
  const isInViewRef = useRef(true);
  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    dragged: false,
    pointerId: -1,
  });
  const isDark = variant === "dark";
  const isGreen = variant === "green";
  const isKraft = variant === "kraft";
  const useEdgeMask = variant === "light" || isKraft;

  const pauseAutoPlay = useCallback((durationMs = 8000) => {
    autoPlayPauseUntilRef.current = Date.now() + durationMs;
  }, []);

  const isAutoPlayPaused = useCallback(() => {
    return (
      autoPlayPausedRef.current ||
      !isInViewRef.current ||
      Date.now() < autoPlayPauseUntilRef.current
    );
  }, []);

  const getMaxScrollLeft = useCallback((track: HTMLElement) => {
    return Math.max(0, track.scrollWidth - track.clientWidth);
  }, []);

  const computeSnapIndices = useCallback(
    (track: HTMLElement) => {
      const slides = Array.from(track.children) as HTMLElement[];
      if (slides.length === 0) return [0];

      const maxScroll = getMaxScrollLeft(track);
      if (maxScroll <= 2) return [0];

      const indices: number[] = [];
      slides.forEach((slide, index) => {
        if (slide.offsetLeft <= maxScroll + 2) {
          indices.push(index);
        }
      });

      return indices.length > 0 ? indices : [slides.length - 1];
    },
    [getMaxScrollLeft],
  );

  const scrollToPage = useCallback(
    (pageIndex: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;

      const snapIndices = computeSnapIndices(track);
      const slideIndex = snapIndices[pageIndex] ?? snapIndices[snapIndices.length - 1] ?? 0;
      const slide = track.children[slideIndex] as HTMLElement | undefined;
      if (!slide) return;

      track.scrollTo({
        left: Math.min(slide.offsetLeft, getMaxScrollLeft(track)),
        behavior,
      });
    },
    [computeSnapIndices, getMaxScrollLeft],
  );

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const snapIndices = computeSnapIndices(track);
    snapIndicesRef.current = snapIndices;
    setPageCount(snapIndices.length);
    if (snapIndices.length === 0) return;

    const maxScroll = getMaxScrollLeft(track);
    const scrollLeft = track.scrollLeft;
    let activePage = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    snapIndices.forEach((slideIndex, pageIndex) => {
      const slide = track.children[slideIndex] as HTMLElement;
      const target = Math.min(slide.offsetLeft, maxScroll);
      const distance = Math.abs(target - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        activePage = pageIndex;
      }
    });

    activeIndexRef.current = activePage;
    setActiveIndex(activePage);
  }, [computeSnapIndices, getMaxScrollLeft]);

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

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !autoPlay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [autoPlay]);

  useEffect(() => {
    if (!autoPlay || pageCount <= 1) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      if (isAutoPlayPaused()) return;
      const nextPage = (activeIndexRef.current + 1) % pageCount;
      scrollToPage(nextPage);
    }, autoPlayInterval);

    return () => window.clearInterval(interval);
  }, [autoPlay, autoPlayInterval, pageCount, scrollToPage, isAutoPlayPaused]);

  useEffect(() => {
    if (!enableDrag) return;

    const trackEl = trackRef.current;
    if (!trackEl) return;

    function handleWheel(event: WheelEvent) {
      const el = trackRef.current;
      if (!el) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (delta === 0) return;

      el.scrollLeft += delta;
      pauseAutoPlay();
      event.preventDefault();
    }

    trackEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => trackEl.removeEventListener("wheel", handleWheel);
  }, [enableDrag, pauseAutoPlay, children]);

  useEffect(() => {
    if (!enableDrag) return;

    function handlePointerMove(event: PointerEvent) {
      const drag = dragStateRef.current;
      if (!drag.isDown) return;

      const track = trackRef.current;
      if (!track) return;

      event.preventDefault();

      const delta = event.clientX - drag.startX;
      if (Math.abs(delta) > 4) {
        drag.dragged = true;
      }

      track.scrollLeft = drag.scrollLeft - delta;
    }

    function endPointerDrag(event: PointerEvent) {
      const drag = dragStateRef.current;
      if (!drag.isDown) return;

      const wasDragging = drag.dragged;
      drag.isDown = false;
      drag.pointerId = -1;

      const track = trackRef.current;
      if (track) {
        track.style.scrollSnapType = "";
        if (track.hasPointerCapture(event.pointerId)) {
          track.releasePointerCapture(event.pointerId);
        }
        if (wasDragging) {
          const snapIndices = snapIndicesRef.current;
          const maxScroll = getMaxScrollLeft(track);
          let activePage = 0;
          let closestDistance = Number.POSITIVE_INFINITY;

          snapIndices.forEach((slideIndex, pageIndex) => {
            const slide = track.children[slideIndex] as HTMLElement;
            const target = Math.min(slide.offsetLeft, maxScroll);
            const distance = Math.abs(target - track.scrollLeft);
            if (distance < closestDistance) {
              closestDistance = distance;
              activePage = pageIndex;
            }
          });

          scrollToPage(activePage);
        }
      }
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", endPointerDrag);
    window.addEventListener("pointercancel", endPointerDrag);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", endPointerDrag);
      window.removeEventListener("pointercancel", endPointerDrag);
    };
  }, [enableDrag, scrollToPage, getMaxScrollLeft]);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!enableDrag || event.pointerType === "touch" || event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    dragStateRef.current = {
      isDown: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
      dragged: false,
      pointerId: event.pointerId,
    };
    track.style.scrollSnapType = "none";
    track.setPointerCapture(event.pointerId);
    pauseAutoPlay();
  }

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    if (!enableDrag) return;
    event.preventDefault();
  }

  function handleDragStartCapture(event: React.DragEvent<HTMLDivElement>) {
    if (!enableDrag) return;
    event.preventDefault();
  }

  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (dragStateRef.current.dragged) {
      event.preventDefault();
      event.stopPropagation();
      dragStateRef.current.dragged = false;
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative min-w-0", className)}
      onMouseEnter={() => {
        if (autoPlay) autoPlayPausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (autoPlay) autoPlayPausedRef.current = false;
      }}
    >
      <div className={cn("relative min-w-0", useEdgeMask && "content-slider__fade-edges")}>
        {isGreen ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-teal-dim to-transparent sm:w-14" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-teal-dim to-transparent sm:w-14" />
          </>
        ) : isDark ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-navy to-transparent sm:w-14" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-navy to-transparent sm:w-14" />
          </>
        ) : null}

        <div
          ref={trackRef}
          className={cn(
            "content-slider__track relative flex gap-4 overflow-x-auto overscroll-x-contain pb-1 pt-1 touch-pan-x",
            enableDrag && "cursor-grab active:cursor-grabbing select-none",
            trackClassName,
          )}
          aria-label={ariaLabel}
          aria-roledescription="carrousel"
          onPointerDownCapture={handlePointerDown}
          onDragStart={handleDragStart}
          onDragStartCapture={handleDragStartCapture}
          onClickCapture={handleClickCapture}
          onTouchStart={() => pauseAutoPlay()}
        >
          {children}
        </div>
      </div>

      {pageCount > 1 ? (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2" role="tablist" aria-label="Pagination du carrousel">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? isGreen
                      ? "w-8 bg-white"
                      : isKraft
                        ? "w-8 bg-brand-kraft-dark"
                        : "w-8 bg-brand-teal"
                    : isDark || isGreen
                      ? "w-2 bg-white/25 hover:bg-white/40"
                      : isKraft
                        ? "w-2 bg-brand-kraft/25 hover:bg-brand-kraft/40"
                        : "w-2 bg-brand-navy/20 hover:bg-brand-navy/35",
                )}
                onClick={() => {
                  pauseAutoPlay();
                  scrollToPage(index);
                }}
                aria-label={`Aller à la page ${index + 1}`}
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
