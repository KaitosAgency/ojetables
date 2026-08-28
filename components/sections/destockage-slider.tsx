"use client";

import type { ReactNode } from "react";

import { ContentSlider } from "@/components/ui/content-slider";
import { destockageSliderConfig } from "@/lib/content-slider-configs";

export { destockageSlideClassName } from "@/lib/content-slider-configs";
export { ContentSliderSlide } from "@/components/ui/content-slider";

type DestockageSliderProps = {
  children: ReactNode;
  className?: string;
};

/** Carrousel destockage — les cartes produit sont passées en children (RSC). */
export function DestockageSlider({ children, className }: DestockageSliderProps) {
  const { variant, autoPlay, autoPlayInterval } = destockageSliderConfig;

  return (
    <ContentSlider
      ariaLabel="Produits destockage"
      className={className}
      variant={variant}
      autoPlay={autoPlay}
      autoPlayInterval={autoPlayInterval}
    >
      {children}
    </ContentSlider>
  );
}
