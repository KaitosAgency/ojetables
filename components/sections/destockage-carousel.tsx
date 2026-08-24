"use client";

import { ProductCard } from "@/components/product/product-card";
import {
  ContentSlider,
  ContentSliderSlide,
} from "@/components/ui/content-slider";
import { destockageItems } from "@/lib/site";

const destockageSlideClassName =
  "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]";

export function DestockageCarousel({ className }: { className?: string }) {
  return (
    <ContentSlider
      ariaLabel="Produits destockage"
      variant="kraft"
      className={className}
      autoPlay
      autoPlayInterval={4500}
    >
      {destockageItems.map((product) => (
        <ContentSliderSlide key={product.name} className={destockageSlideClassName}>
          <ProductCard {...product} className="h-full" />
        </ContentSliderSlide>
      ))}
    </ContentSlider>
  );
}
