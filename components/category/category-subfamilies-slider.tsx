"use client";

import { CatalogFamilyCard } from "@/components/catalog/catalog-family-card";
import { ContentSlider, ContentSliderSlide } from "@/components/ui/content-slider";
import type { CategorySubfamily } from "@/lib/categories";

const subfamilySlideClassName =
  "w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-[calc(20%-0.8rem)]";

type CategorySubfamiliesSliderProps = {
  subfamilies: readonly CategorySubfamily[];
  className?: string;
};

export function CategorySubfamiliesSlider({
  subfamilies,
  className,
}: CategorySubfamiliesSliderProps) {
  return (
    <ContentSlider
      ariaLabel="Sous-familles de la catégorie"
      variant="light"
      className={className}
      autoPlay
      autoPlayInterval={5000}
    >
      {subfamilies.map((subfamily) => (
        <ContentSliderSlide key={subfamily.id} className={subfamilySlideClassName}>
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
