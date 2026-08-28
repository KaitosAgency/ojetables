"use client";

import type { ReactNode } from "react";

import { ContentSlider } from "@/components/ui/content-slider";
import { crossSellSliderConfig } from "@/lib/content-slider-configs";

type ProductCrossSellSliderProps = {
  children: ReactNode;
  className?: string;
};

/** Carrousel cross-sell — 3 cartes visibles, défilement infini. */
export function ProductCrossSellSlider({ children, className }: ProductCrossSellSliderProps) {
  const { variant, autoPlay, autoPlayInterval, trackClassName } = crossSellSliderConfig;

  return (
    <ContentSlider
      ariaLabel="Produits similaires"
      className={className}
      variant={variant}
      autoPlay={autoPlay}
      autoPlayInterval={autoPlayInterval}
      trackClassName={trackClassName}
    >
      {children}
    </ContentSlider>
  );
}
