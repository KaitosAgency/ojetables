"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ProductPersonalizableBadge } from "@/components/product/product-personalizable-badge";
import { PRODUCT_PERSONALIZE_ANCHOR_ID } from "@/components/product/product-personalize-panel";
import type { Product } from "@/lib/products";
import { getDiscountPercentFromPrices } from "@/lib/product-format";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  product: Product;
};

function getDiscountPercent(product: Product): number | null {
  if (product.priceWasHt == null || product.priceWasHt <= product.priceHt) return null;
  return getDiscountPercentFromPrices(product.priceWasHt, product.priceHt);
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const activeImage = product.images[activeIndex] ?? product.images[0];
  const discountPercent = getDiscountPercent(product);
  const hasThumbnails = product.images.length > 1;

  function goToImage(index: number) {
    setActiveIndex(Math.max(0, Math.min(index, product.images.length - 1)));
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartXRef.current == null || !hasThumbnails) return;

    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchEndX == null) return;

    const delta = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(delta) < 48) return;
    goToImage(activeIndex + (delta < 0 ? 1 : -1));
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "gap-3",
          hasThumbnails ? "flex flex-col sm:flex-row sm:items-stretch" : "block",
        )}
      >
        {hasThumbnails ? (
          <div className="hidden shrink-0 flex-row gap-3 sm:flex sm:w-16 sm:flex-col">
            {product.images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => goToImage(index)}
                className={cn(
                  "relative h-16 w-16 cursor-pointer overflow-hidden rounded-lg border bg-white transition-colors",
                  activeIndex === index
                    ? "border-brand-teal"
                    : "border-border hover:border-brand-teal/50",
                )}
                aria-label={`Vue ${index + 1} : ${image.alt}`}
                aria-current={activeIndex === index}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className="relative isolate aspect-square overflow-hidden rounded-2xl border border-border bg-white"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {discountPercent ? (
              <span className="product-card__promo-ribbon product-gallery__promo-ribbon" aria-hidden>
                -{discountPercent}%
              </span>
            ) : null}
            {product.personalizable ? (
              <ProductPersonalizableBadge
                size="lg"
                href={`#${PRODUCT_PERSONALIZE_ANCHOR_ID}`}
                className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4"
              />
            ) : null}
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain p-6"
            />
          </div>

          {hasThumbnails ? (
            <div
              className="flex items-center justify-center gap-2 pt-4 sm:hidden"
              role="tablist"
              aria-label="Indicateur des vues produit"
            >
              {product.images.map((image, index) => (
                <button
                  key={`gallery-thumb-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-label={`Vue ${index + 1}`}
                  onClick={() => goToImage(index)}
                  className={cn(
                    "cursor-pointer rounded-full transition-all duration-200",
                    activeIndex === index
                      ? "h-2 w-6 bg-brand-teal"
                      : "size-2 bg-muted-foreground/30 hover:bg-muted-foreground/45",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
