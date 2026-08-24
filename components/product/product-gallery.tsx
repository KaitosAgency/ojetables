"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = product.images[activeIndex] ?? product.images[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-white">
        {product.packLabel ? (
          <span
            className="absolute bottom-3 right-3 z-10 rounded-md bg-brand-beige px-2 py-1 text-xs font-medium text-muted-foreground"
          >
            {product.packLabel}
          </span>
        ) : null}
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6"
        />
      </div>

      {product.images.length > 1 ? (
        <div className="flex gap-3">
          {product.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-16 overflow-hidden rounded-xl border-2 bg-white transition-all",
                activeIndex === index
                  ? "border-brand-teal ring-2 ring-brand-teal/30"
                  : "border-border hover:border-brand-teal/50",
              )}
              aria-label={`Vue ${index + 1}`}
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
    </div>
  );
}
