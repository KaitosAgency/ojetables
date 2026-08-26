"use client";

import Image from "next/image";
import Link from "next/link";

import { ContentSlider, ContentSliderSlide } from "@/components/ui/content-slider";
import { interactiveCardSurfaceClassName } from "@/components/ui/interactive-card";
import { StarRating } from "@/components/ui/star-rating";
import { cn } from "@/lib/utils";
import type { ProductCardProps } from "@/components/product/product-card";

type CategoryReviewsCarouselProps = {
  products: readonly ProductCardProps[];
};

const categoryReviewSlideClassName =
  "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]";

export function CategoryReviewsCarousel({ products }: CategoryReviewsCarouselProps) {
  if (products.length === 0) return null;

  return (
    <ContentSlider
      ariaLabel="Produits les mieux notés de la catégorie"
      variant="light"
      trackClassName="gap-3 pb-4 pt-2 sm:gap-4"
    >
      {products.map((product) => {
        const isExternal = product.href.startsWith("http");
        const reviewCount = product.reviewCount ?? 0;
        const rating = product.rating ?? 0;

        return (
          <ContentSliderSlide key={product.href} className={categoryReviewSlideClassName}>
            <Link
              href={product.href}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-lg bg-white",
                interactiveCardSurfaceClassName,
              )}
              aria-label={`${product.name} — ${rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} sur 5, ${reviewCount.toLocaleString("fr-FR")} avis`}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 33vw, 200px"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {product.packLabel ? (
                  <span className="absolute bottom-1.5 right-1.5 z-10 rounded-md bg-brand-beige px-1.5 py-1 text-[10px] font-medium leading-none text-muted-foreground">
                    {product.packLabel}
                  </span>
                ) : null}
              </div>

              <div className="da-hatch-divider shrink-0" aria-hidden />

              <div className="flex flex-1 flex-col px-2 pb-2.5 pt-2 sm:px-3 sm:pb-3 sm:pt-2.5">
                <p className="text-[9px] font-bold tracking-[0.1em] text-brand-kraft-dark/85 sm:text-[10px] sm:tracking-[0.12em]">
                  {product.category}
                </p>
                <p
                  className="mt-1 line-clamp-2 text-[12px] font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-teal-dim sm:mt-1.5 sm:text-[13px]"
                  title={product.name}
                >
                  {product.name}
                </p>
                <p className="mt-1.5 flex items-center gap-1">
                  <StarRating size="sm" value={rating} />
                  <span className="text-[11px] tabular-nums text-muted-foreground">
                    ({reviewCount.toLocaleString("fr-FR")})
                  </span>
                </p>
              </div>
            </Link>
          </ContentSliderSlide>
        );
      })}
    </ContentSlider>
  );
}
