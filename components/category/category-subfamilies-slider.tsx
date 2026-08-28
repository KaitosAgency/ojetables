"use client";

import { CatalogFamilyCard } from "@/components/catalog/catalog-family-card";
import { ContentSlider, ContentSliderSlide } from "@/components/ui/content-slider";
import { subfamiliesSliderConfig } from "@/lib/content-slider-configs";
import type { CategorySubfamily } from "@/lib/categories";

type CategorySubfamiliesSliderProps = {
  subfamilies: readonly CategorySubfamily[];
  className?: string;
};

export function CategorySubfamiliesSlider({
  subfamilies,
  className,
}: CategorySubfamiliesSliderProps) {
  const { slideClassName, ...sliderProps } = subfamiliesSliderConfig;

  return (
    <ContentSlider ariaLabel="Sous-familles de la catégorie" className={className} {...sliderProps}>
      {subfamilies.map((subfamily) => (
        <ContentSliderSlide key={subfamily.id} className={slideClassName}>
          <CatalogFamilyCard
            label={subfamily.label}
            description={subfamily.description}
            image={subfamily.image}
            href={subfamily.href}
            ctaLabel="Explorer"
            className="h-full"
          />
        </ContentSliderSlide>
      ))}
    </ContentSlider>
  );
}
