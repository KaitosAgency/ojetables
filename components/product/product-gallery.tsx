"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div
        className="product-placeholder flex aspect-square items-center justify-center rounded-2xl border border-border p-8"
        style={{ background: `linear-gradient(145deg, ${product.imageColors[activeIndex]}, ${product.imageColors[1]})` }}
      >
        <div className="text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Visuel produit</p>
          <p className="mt-2 text-xl font-bold">{product.shortName}</p>
        </div>
      </div>

      <div className="flex gap-3">
        {product.imageColors.map((color, index) => (
          <button
            key={color}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-16 w-16 rounded-xl border-2 transition-all",
              activeIndex === index ? "border-brand-teal ring-2 ring-brand-teal/30" : "border-border",
            )}
            style={{ background: color }}
            aria-label={`Vue ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
