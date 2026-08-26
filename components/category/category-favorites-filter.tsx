"use client";

import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

type CategoryFavoritesFilterProps = {
  active: boolean;
  favoriteCount: number;
  onToggle: (active: boolean) => void;
  className?: string;
};

export function CategoryFavoritesFilter({
  active,
  favoriteCount,
  onToggle,
  className,
}: CategoryFavoritesFilterProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={
        active
          ? `Afficher tous les produits (${favoriteCount} favori${favoriteCount > 1 ? "s" : ""} dans cette catégorie)`
          : `Afficher uniquement mes favoris (${favoriteCount} dans cette catégorie)`
      }
      onClick={() => onToggle(!active)}
      className={cn(
        "relative inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-[border-color,background-color,color]",
        active
          ? "border-brand-kraft/45 bg-brand-beige text-brand-kraft-dark"
          : "border-border/90 bg-white text-brand-navy/55 hover:border-brand-kraft/30 hover:bg-brand-beige/50 hover:text-brand-kraft-dark",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-kraft/40 active:scale-95",
        className,
      )}
    >
      <Heart
        className={cn("size-3.5 transition-[fill,color]", active && "fill-current")}
        strokeWidth={2}
        aria-hidden
      />
      {favoriteCount > 0 ? (
        <span
          className={cn(
            "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none",
            active ? "bg-brand-kraft-dark text-white" : "bg-brand-teal text-white",
          )}
        >
          {favoriteCount > 9 ? "9+" : favoriteCount}
        </span>
      ) : null}
    </button>
  );
}
