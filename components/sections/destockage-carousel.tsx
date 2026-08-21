"use client";

import { ProductCard } from "@/components/product/product-card";
import { ContentSlider, ContentSliderSlide } from "@/components/ui/content-slider";
import { destockageItems } from "@/lib/site";

export function DestockageCarousel({ className }: { className?: string }) {
  return (
    <ContentSlider ariaLabel="Produits destockage" variant="light" className={className}>
      {destockageItems.map((product) => (
        <ContentSliderSlide key={product.name}>
          <ProductCard {...product} className="h-full shadow-md" />
        </ContentSliderSlide>
      ))}
    </ContentSlider>
  );
}
