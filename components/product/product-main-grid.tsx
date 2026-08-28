"use client";

import { useEffect, useRef } from "react";

import { ProductContentSections } from "@/components/product/product-content-sections";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import {
  interactiveCardShadowClassName,
} from "@/components/ui/interactive-card";
import { createProductStickyScrollSync } from "@/lib/product-sticky-scroll";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductMainGridProps = {
  product: Product;
};

export function ProductMainGrid({ product }: ProductMainGridProps) {
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stickyItems = stickyRef.current;
    if (!stickyItems) return;

    return createProductStickyScrollSync(stickyItems);
  }, []);

  return (
    <div className="product-current-grid mt-8 flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch lg:gap-x-3 xl:gap-x-4">
      <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
        <ProductGallery product={product} />
      </div>

      <div className="product-init-sticky order-2 min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
        <div ref={stickyRef} className="product-sticky-items">
          <aside
            id="product-purchase"
            className={cn(
              "product-purchase-card rounded-lg bg-white p-5 md:p-6",
              interactiveCardShadowClassName,
            )}
          >
            <ProductPurchasePanel product={product} />
          </aside>
        </div>
      </div>

      <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2">
        <ProductContentSections product={product} embedded />
      </div>
    </div>
  );
}
