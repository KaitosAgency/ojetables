"use client";

import { ProductCard } from "@/components/product/product-card";
import { ContentSlider, ContentSliderSlide } from "@/components/ui/content-slider";
import { categoryReviewsSliderConfig } from "@/lib/content-slider-configs";
import type { ProductCardProps } from "@/components/product/product-card";

type CategoryReviewsCarouselProps = {
  products: readonly ProductCardProps[];
};

export function CategoryReviewsCarousel({ products }: CategoryReviewsCarouselProps) {
  if (products.length === 0) return null;

  const { slideClassName, ...sliderProps } = categoryReviewsSliderConfig;

  return (
    <ContentSlider ariaLabel="Produits les mieux notés de la catégorie" {...sliderProps}>
      {products.map((product) => (
          <ContentSliderSlide key={product.id ?? product.name} className={slideClassName}>
            <ProductCard {...product} variant="compact" titleAs="h4" className="h-full" />
          </ContentSliderSlide>
        ))}
    </ContentSlider>
  );
}
