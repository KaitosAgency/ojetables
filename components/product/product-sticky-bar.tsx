"use client";

import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/link-button";
import type { Product } from "@/lib/products";
import { formatPriceWithEuro } from "@/lib/product-format";
import { routes } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProductStickyBarProps = {
  product: Product;
};

/** Apparaît quand le bloc d'achat principal sort du viewport (mobile et tablette). */
export function ProductStickyBar({ product }: ProductStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("product-purchase");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.setAttribute("data-product-sticky-bar-visible", "");
    } else {
      document.body.removeAttribute("data-product-sticky-bar-visible");
    }

    return () => document.body.removeAttribute("data-product-sticky-bar-visible");
  }, [visible]);

  const hasPromo = product.priceWasHt != null && product.priceWasHt > product.priceHt;
  const priceWasHt = product.priceWasHt ?? null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-2.5 shadow-[0_-2px_12px_rgb(61_44_38/0.08)] backdrop-blur-sm transition-transform duration-200 lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-left text-xs font-semibold text-brand-navy">{product.shortName}</p>
          <div className="flex items-baseline justify-start gap-2">
            {hasPromo && priceWasHt != null ? (
              <p className="text-xs tabular-nums text-muted-foreground line-through whitespace-nowrap">
                {formatPriceWithEuro(priceWasHt)}
              </p>
            ) : null}
            <p className="whitespace-nowrap text-sm font-bold tabular-nums text-brand-teal">
              {formatPriceWithEuro(product.priceHt)}
            </p>
          </div>
        </div>
        <LinkButton
          href={routes.cart}
          variant="brand"
          size="ctaSm"
          className="shrink-0"
          tabIndex={visible ? undefined : -1}
        >
          Ajouter au panier
        </LinkButton>
      </div>
    </div>
  );
}
