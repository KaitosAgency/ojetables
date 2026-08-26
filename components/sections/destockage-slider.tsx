"use client";

import type { ReactNode } from "react";

import {
  ContentSlider,
  ContentSliderSlide,
} from "@/components/ui/content-slider";

export { ContentSliderSlide };

export const destockageSlideClassName =
  "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]";

type DestockageSliderProps = {
  children: ReactNode;
  className?: string;
};

/** Carrousel destockage — les cartes produit sont passées en children (RSC). */
export function DestockageSlider({ children, className }: DestockageSliderProps) {
  return (
    <ContentSlider
      ariaLabel="Produits destockage"
      variant="kraft"
      className={className}
      autoPlay
      autoPlayInterval={4500}
    >
      {children}
    </ContentSlider>
  );
}
