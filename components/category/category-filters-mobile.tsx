"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { CategoryFiltersPanel } from "@/components/category/category-filters-panel";
import { AppSheetHeader } from "@/components/layout/app-sheet-header";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  vaisselleJetableFilterGroups,
  type CategoryFilterGroup,
} from "@/lib/category-filters";
import type { CategoryPriceRange } from "@/lib/category-price-filter";

type CategoryFiltersMobileProps = {
  groups?: readonly CategoryFilterGroup[];
  activeFilterKeysByGroup?: Record<string, string[]>;
  onFilterChange?: (active: Record<string, string[]>) => void;
  priceBounds?: CategoryPriceRange;
  priceRange?: CategoryPriceRange | null;
  onPriceRangeChange?: (value: CategoryPriceRange | null) => void;
  destockageOnly?: boolean;
  promoCount?: number;
  onDestockageChange?: (active: boolean) => void;
  favoritesOnly?: boolean;
  favoriteCount?: number;
  onFavoritesChange?: (active: boolean) => void;
  onSearchClear?: () => void;
  activeFilterCount?: number;
};

export function CategoryFiltersMobile({
  groups = vaisselleJetableFilterGroups,
  activeFilterKeysByGroup,
  onFilterChange,
  priceBounds,
  priceRange,
  onPriceRangeChange,
  destockageOnly,
  promoCount,
  onDestockageChange,
  favoritesOnly,
  favoriteCount,
  onFavoritesChange,
  onSearchClear,
  activeFilterCount = 0,
}: CategoryFiltersMobileProps) {
  const [open, setOpen] = useState(false);
  const [sheetActiveCount, setSheetActiveCount] = useState(0);
  const badgeCount = activeFilterCount > 0 ? activeFilterCount : sheetActiveCount;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            className={cn(
              "category-catalog-filter-btn inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-border/90 bg-white px-3 text-[0.8125rem] font-medium text-brand-navy outline-none transition-colors",
              "hover:border-brand-kraft/25 hover:bg-brand-beige/60",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal/45",
              "lg:hidden",
            )}
            aria-label={
              badgeCount > 0
                ? `Filtrer les produits (${badgeCount} actif${badgeCount > 1 ? "s" : ""})`
                : "Filtrer les produits"
            }
          >
            <SlidersHorizontal className="size-4 shrink-0 text-brand-navy/70" aria-hidden />
            <span>Filtrer</span>
            {badgeCount > 0 ? (
              <span className="rounded-full bg-brand-teal px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                {badgeCount}
              </span>
            ) : null}
          </button>
        }
      />
      <SheetContent side="left" className="w-[min(100vw-1rem,20rem)] gap-0 p-0 sm:max-w-xs">
        <AppSheetHeader title="Filtrer la sélection" />
        <div className="flex-1 overflow-y-auto p-4">
          <CategoryFiltersPanel
            variant="sheet"
            groups={groups}
            activeFilterKeysByGroup={activeFilterKeysByGroup}
            onFilterChange={onFilterChange}
            priceBounds={priceBounds}
            priceRange={priceRange}
            onPriceRangeChange={onPriceRangeChange}
            destockageOnly={destockageOnly}
            promoCount={promoCount}
            onDestockageChange={onDestockageChange}
            favoritesOnly={favoritesOnly}
            favoriteCount={favoriteCount}
            onFavoritesChange={onFavoritesChange}
            onSearchClear={onSearchClear}
            onAppliedChange={setSheetActiveCount}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
