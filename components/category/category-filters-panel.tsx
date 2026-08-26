"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CategoryQuickFilters } from "@/components/category/category-quick-filters";
import { CategoryPriceRangeFilter } from "@/components/category/category-price-range-filter";
import {
  vaisselleJetableFilterGroups,
  type CategoryFilterGroup,
} from "@/lib/category-filters";
import {
  isPriceRangeActive,
  type CategoryPriceRange,
} from "@/lib/category-price-filter";
import { cn } from "@/lib/utils";

type CategoryFiltersPanelProps = {
  className?: string;
  groups?: readonly CategoryFilterGroup[];
  variant?: "sidebar" | "sheet";
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
  onAppliedChange?: (count: number) => void;
};

function buildInitialState(groups: readonly CategoryFilterGroup[]) {
  return Object.fromEntries(
    groups.flatMap((group) => group.options.map((option) => [`${group.id}:${option.id}`, false])),
  ) as Record<string, boolean>;
}

function keysFromCheckboxState(
  groups: readonly CategoryFilterGroup[],
  selected: Record<string, boolean>,
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const group of groups) {
    const keys = group.options
      .filter((option) => selected[`${group.id}:${option.id}`] && option.filterKey)
      .map((option) => option.filterKey as string);
    if (keys.length > 0) result[group.id] = keys;
  }

  return result;
}

function checkboxStateFromKeys(
  groups: readonly CategoryFilterGroup[],
  active: Record<string, string[]>,
): Record<string, boolean> {
  const state = buildInitialState(groups);

  for (const group of groups) {
    const activeKeys = active[group.id] ?? [];
    for (const option of group.options) {
      if (option.filterKey && activeKeys.includes(option.filterKey)) {
        state[`${group.id}:${option.id}`] = true;
      }
    }
  }

  return state;
}

export function CategoryFiltersPanel({
  className,
  groups = vaisselleJetableFilterGroups,
  variant = "sidebar",
  activeFilterKeysByGroup,
  onFilterChange,
  priceBounds,
  priceRange = null,
  onPriceRangeChange,
  destockageOnly = false,
  promoCount = 0,
  onDestockageChange,
  favoritesOnly = false,
  favoriteCount = 0,
  onFavoritesChange,
  onSearchClear,
  onAppliedChange,
}: CategoryFiltersPanelProps) {
  const [selected, setSelected] = useState(() =>
    activeFilterKeysByGroup
      ? checkboxStateFromKeys(groups, activeFilterKeysByGroup)
      : buildInitialState(groups),
  );
  const isSheet = variant === "sheet";
  const openGroupIds = groups.map((group) => group.id);

  const checkboxActiveCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected],
  );
  const priceActive =
    priceBounds !== undefined && isPriceRangeActive(priceRange, priceBounds);
  const destockageActive = destockageOnly;
  const favoritesActive = favoritesOnly;
  const activeCount =
    checkboxActiveCount +
    (priceActive ? 1 : 0) +
    (destockageActive ? 1 : 0) +
    (favoritesActive ? 1 : 0);

  useEffect(() => {
    if (activeFilterKeysByGroup) {
      setSelected(checkboxStateFromKeys(groups, activeFilterKeysByGroup));
    }
  }, [activeFilterKeysByGroup, groups]);

  useEffect(() => {
    onAppliedChange?.(activeCount);
  }, [activeCount, onAppliedChange]);

  function toggleFilter(key: string, checked: boolean) {
    const nextSelected = { ...selected, [key]: checked };
    setSelected(nextSelected);
    onFilterChange?.(keysFromCheckboxState(groups, nextSelected));
  }

  function resetFilters() {
    const empty = buildInitialState(groups);
    setSelected(empty);
    onFilterChange?.({});
    onPriceRangeChange?.(null);
    onDestockageChange?.(false);
    onFavoritesChange?.(false);
    onSearchClear?.();
  }

  return (
    <div
      className={cn(
        isSheet
          ? "bg-transparent"
          : "rounded-lg border border-border/90 bg-white shadow-[0_1px_0_rgb(61_44_38/0.04)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-4 py-3",
          !isSheet && "border-b border-border/60",
        )}
      >
        <div>
          {!isSheet ? (
            <p className="text-sm font-bold text-brand-navy">Filtrer</p>
          ) : null}
          <p className={cn("text-xs text-muted-foreground", !isSheet && "mt-0.5")}>
            {activeCount > 0
              ? `${activeCount} filtre${activeCount > 1 ? "s" : ""} actif${activeCount > 1 ? "s" : ""}`
              : "Tous les produits"}
          </p>
        </div>
        {activeCount > 0 ? (
          <Button
            type="button"
            variant="link"
            size="sm"
            className="h-8 shrink-0 gap-1.5 rounded-lg border border-border/90 bg-white px-2.5 text-xs font-medium text-brand-navy no-underline shadow-[0_1px_0_rgb(61_44_38/0.04)] hover:border-brand-teal/45 hover:bg-brand-teal/[0.06] hover:text-brand-teal hover:no-underline"
            onClick={resetFilters}
          >
            <RotateCcw className="size-3.5 shrink-0" aria-hidden />
            Réinitialiser
          </Button>
        ) : null}
      </div>

      <CategoryQuickFilters
        destockageOnly={destockageOnly}
        promoCount={promoCount}
        onDestockageChange={onDestockageChange}
        favoritesOnly={favoritesOnly}
        favoriteCount={favoriteCount}
        onFavoritesChange={onFavoritesChange}
        className={isSheet ? "px-0" : undefined}
      />

      <div className={cn("px-2 py-1", isSheet && "px-0")}>
        <Accordion
          multiple
          defaultValue={priceBounds ? ["prix", ...openGroupIds] : openGroupIds}
          className="w-full"
        >
          {priceBounds ? (
            <AccordionItem value="prix" className="border-border/60 px-2">
              <AccordionTrigger className="py-3 text-sm font-semibold text-brand-navy hover:no-underline">
                Prix
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <CategoryPriceRangeFilter
                  bounds={priceBounds}
                  value={priceRange}
                  onChange={onPriceRangeChange ?? (() => undefined)}
                />
              </AccordionContent>
            </AccordionItem>
          ) : null}
          {groups.map((group) => (
            <AccordionItem key={group.id} value={group.id} className="border-border/60 px-2">
              <AccordionTrigger className="py-3 text-sm font-semibold text-brand-navy hover:no-underline">
                {group.label}
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <ul className="space-y-2.5">
                  {group.options.map((option) => {
                    const key = `${group.id}:${option.id}`;

                    return (
                      <li key={key}>
                        <Label className="items-start gap-3 py-0.5">
                          <Checkbox
                            checked={selected[key]}
                            onCheckedChange={(checked) => toggleFilter(key, checked === true)}
                            className="mt-0.5"
                            disabled={!option.filterKey}
                          />
                          <span className="flex min-w-0 flex-1 items-center justify-between gap-2 leading-snug">
                            <span className="text-sm text-brand-navy">{option.label}</span>
                            {option.count !== undefined ? (
                              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                                {option.count}
                              </span>
                            ) : null}
                          </span>
                        </Label>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
