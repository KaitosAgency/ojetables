"use client";

/** @maquette-only — cross-sell : href unique vers la fiche exemple. */
import { ProductCard } from "@/components/product/product-card";
import { ProductCrossSellSlider } from "@/components/product/product-cross-sell-slider";
import { ContentSliderSlide } from "@/components/ui/content-slider";
import { crossSellSliderConfig } from "@/lib/content-slider-configs";
import type { Product } from "@/lib/products";
import { maquetteProductHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProductCrossSellProps = {
  product: Product;
  className?: string;
};

const headingClassName = "text-2xl font-bold tracking-tight text-brand-navy md:text-3xl";

/** 3 cartes visibles par ligne dans la colonne éditoriale. */

export function ProductCrossSell({ product, className }: ProductCrossSellProps) {
  if (product.crossSell.length === 0) return null;

  return (
    <section
      id="similaires"
      aria-labelledby="product-cross-sell-title"
      className={cn("min-w-0", className)}
    >
      <h2 id="product-cross-sell-title" className={headingClassName}>
        Ces produits similaires pourraient vous intéresser
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        D&apos;autres références de vaisselle jetable complémentaires, disponibles en stock et
        livrables sous 24/72 h.
      </p>

      <ProductCrossSellSlider className="mt-8 min-w-0">
        {product.crossSell.map((item) => (
          <ContentSliderSlide
            key={`${item.slug}-${item.name}`}
            className={crossSellSliderConfig.slideClassName}
          >
            <ProductCard
              id={item.slug}
              name={item.name}
              image={item.image}
              category={item.category}
              priceFrom={item.priceFrom}
              priceWas={item.priceWas}
              href={maquetteProductHref}
              rating={item.rating}
              reviewCount={item.reviewCount}
              packLabel={item.packLabel}
              titleAs="h4"
              className="h-full"
              showQuickActions={false}
            />
          </ContentSliderSlide>
        ))}
      </ProductCrossSellSlider>
    </section>
  );
}
