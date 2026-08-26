"use client";

import { CategoryDestockageFilter } from "@/components/category/category-destockage-filter";
import { CategoryFavoritesFilter } from "@/components/category/category-favorites-filter";
import { cn } from "@/lib/utils";

type CategoryQuickFiltersProps = {
  destockageOnly?: boolean;
  promoCount?: number;
  onDestockageChange?: (active: boolean) => void;
  favoritesOnly?: boolean;
  favoriteCount?: number;
  onFavoritesChange?: (active: boolean) => void;
  className?: string;
};

export function CategoryQuickFilters({
  destockageOnly = false,
  promoCount = 0,
  onDestockageChange,
  favoritesOnly = false,
  favoriteCount = 0,
  onFavoritesChange,
  className,
}: CategoryQuickFiltersProps) {
  const showDestockage = promoCount > 0;

  return (
    <>
      <div className={cn("flex items-stretch gap-2 px-4 py-3", className)}>
        {showDestockage ? (
          <CategoryDestockageFilter
            active={destockageOnly}
            promoCount={promoCount}
            onToggle={onDestockageChange ?? (() => undefined)}
            className="min-w-0 flex-1"
          />
        ) : null}
        <CategoryFavoritesFilter
          active={favoritesOnly}
          favoriteCount={favoriteCount}
          onToggle={onFavoritesChange ?? (() => undefined)}
        />
      </div>
      <hr className="mx-2 border-0 border-t border-border/60" aria-hidden />
    </>
  );
}
