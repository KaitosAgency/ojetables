"use client";

import { Coffee, Package, Recycle } from "lucide-react";

import type { ProductFeaturePicto, ProductFeaturePictoId } from "@/lib/products";
import {
  getProductFeatureAnchorId,
  openProductFeature,
} from "@/lib/product-feature-anchors";
import { cn } from "@/lib/utils";

type ProductFeaturePictosProps = {
  pictos: readonly ProductFeaturePicto[];
  /** Coup d'œil au-dessus du panier (comme sur ojetables.fr). */
  variant?: "highlight" | "detailed";
  className?: string;
};

const iconClassName = "size-7 shrink-0";

export function FeaturePictoIcon({
  id,
  className,
}: {
  id: ProductFeaturePictoId;
  className?: string;
}) {
  switch (id) {
    case "biodegradable":
      return (
        <Recycle
          aria-hidden
          strokeWidth={2}
          className={cn(iconClassName, "text-brand-teal", className)}
        />
      );
    case "hot":
      return (
        <Coffee
          aria-hidden
          strokeWidth={2}
          className={cn(iconClassName, "text-brand-kraft-dark", className)}
        />
      );
    case "food-safe":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden
          className={cn(iconClassName, className)}
        >
          <path
            d="M24 11l9 4.5v8.5c0 5.5-3.2 9.8-9 11.5-5.8-1.7-9-6-9-11.5v-8.5L24 11Z"
            className="stroke-brand-teal"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M18 25l5 5 9-10"
            className="stroke-brand-navy"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "individual-wrap":
      return (
        <Package
          aria-hidden
          strokeWidth={2}
          className={cn(iconClassName, "text-brand-navy/70", className)}
        />
      );
  }
}

const pictoLinkClassName =
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-border/80 bg-white shadow-[0_1px_0_rgb(61_44_38/0.04)] transition-colors hover:border-brand-teal/40 hover:bg-brand-teal/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal/45";

export function ProductFeaturePictos({
  pictos,
  variant = "highlight",
  className,
}: ProductFeaturePictosProps) {
  const items =
    variant === "highlight"
      ? pictos.filter((picto) => picto.highlight)
      : pictos.filter((picto) => picto.id !== "food-safe");

  if (items.length === 0) return null;

  if (variant === "highlight") {
    return (
      <ul className={cn("mt-4 flex flex-wrap gap-2", className)}>
        {items.map((picto) => (
          <li key={picto.id}>
            <a
              href={`#${getProductFeatureAnchorId(picto.id)}`}
              title={picto.label}
              aria-label={`${picto.label} — voir le détail dans les spécifications`}
              className={pictoLinkClassName}
              onClick={(event) => {
                event.preventDefault();
                openProductFeature(picto.id);
              }}
            >
              <FeaturePictoIcon id={picto.id} />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("mt-8 grid gap-4 sm:grid-cols-2", className)}>
      {items.map((picto) => (
        <li
          key={picto.id}
          className="flex gap-3 rounded-xl border border-border bg-white p-4"
        >
          <FeaturePictoIcon id={picto.id} className="size-11" />
          <div>
            <p className="font-semibold text-brand-navy">{picto.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {picto.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
