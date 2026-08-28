import type { ComponentProps } from "react";

import type { ContentSlider } from "@/components/ui/content-slider";

type ContentSliderProps = ComponentProps<typeof ContentSlider>;

export type ContentSliderPreset = Pick<
  ContentSliderProps,
  "variant" | "autoPlay" | "autoPlayInterval" | "trackClassName"
> & {
  slideClassName: string;
};

export const blogPostsSliderConfig: ContentSliderPreset = {
  slideClassName:
    "w-[88%] sm:w-[calc(50%-0.25rem)] md:w-[calc(33.333%-0.33rem)] lg:w-[calc(20%-0.6rem)]",
  variant: "light",
  autoPlay: true,
  autoPlayInterval: 5500,
  trackClassName: "gap-2 pb-2 pt-1 lg:gap-3",
};

export const destockageSliderConfig: ContentSliderPreset = {
  slideClassName: "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]",
  variant: "kraft",
  autoPlay: true,
  autoPlayInterval: 4500,
};

/** Alias rétrocompat pour les imports existants. */
export const destockageSlideClassName = destockageSliderConfig.slideClassName;

export const crossSellSliderConfig: ContentSliderPreset = {
  slideClassName: "w-[calc(33.333%-0.5rem)] sm:w-[calc(33.333%-0.67rem)]",
  variant: "light",
  autoPlay: true,
  autoPlayInterval: 4500,
  trackClassName: "gap-3 pb-2 pt-2 sm:gap-4",
};

export const subfamiliesSliderConfig: ContentSliderPreset = {
  slideClassName: "w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-[calc(20%-0.8rem)]",
  variant: "light",
  autoPlay: true,
  autoPlayInterval: 5000,
};

export const categoryReviewsSliderConfig: ContentSliderPreset = {
  slideClassName: "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]",
  variant: "light",
  trackClassName: "gap-3 pb-4 pt-2 sm:gap-4",
};

export const reviewsSliderConfig: ContentSliderPreset = {
  slideClassName: "sm:w-[calc(50%-0.5rem)] lg:!w-[calc(50%-0.5rem)]",
  variant: "light",
  trackClassName: "pb-4 pt-2",
};
