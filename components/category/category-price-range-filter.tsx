"use client";

import {
  formatCategoryPrice,
  type CategoryPriceRange,
} from "@/lib/category-price-filter";
import { cn } from "@/lib/utils";

type CategoryPriceRangeFilterProps = {
  bounds: CategoryPriceRange;
  value: CategoryPriceRange | null;
  onChange: (value: CategoryPriceRange | null) => void;
  className?: string;
};

function clampRange(
  min: number,
  max: number,
  bounds: CategoryPriceRange,
): CategoryPriceRange {
  const nextMin = Math.max(bounds.min, Math.min(min, bounds.max));
  const nextMax = Math.min(bounds.max, Math.max(max, bounds.min));
  if (nextMin <= nextMax) return { min: nextMin, max: nextMax };
  return { min: nextMax, max: nextMin };
}

function emitRange(
  min: number,
  max: number,
  bounds: CategoryPriceRange,
  onChange: (value: CategoryPriceRange | null) => void,
) {
  const clamped = clampRange(min, max, bounds);
  if (clamped.min === bounds.min && clamped.max === bounds.max) {
    onChange(null);
  } else {
    onChange(clamped);
  }
}

export function CategoryPriceRangeFilter({
  bounds,
  value,
  onChange,
  className,
}: CategoryPriceRangeFilterProps) {
  const display = value ?? bounds;
  const span = bounds.max - bounds.min || 1;
  const minPercent = ((display.min - bounds.min) / span) * 100;
  const maxPercent = ((display.max - bounds.min) / span) * 100;

  return (
    <div className={cn("px-1 pt-0.5", className)}>
      <div className="flex items-center justify-between gap-2 text-xs tabular-nums text-muted-foreground">
        <span>{formatCategoryPrice(display.min)}</span>
        <span>{formatCategoryPrice(display.max)}</span>
      </div>

      <div className="relative mt-4 h-6">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-brand-beige" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-teal"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={1}
          value={display.min}
          aria-label="Prix minimum"
          onChange={(event) => {
            const nextMin = Number.parseInt(event.target.value, 10);
            emitRange(nextMin, Math.max(nextMin, display.max), bounds, onChange);
          }}
          className="category-price-range-input category-price-range-input--min absolute inset-x-0 top-0 h-6 w-full"
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={1}
          value={display.max}
          aria-label="Prix maximum"
          onChange={(event) => {
            const nextMax = Number.parseInt(event.target.value, 10);
            emitRange(Math.min(display.min, nextMax), nextMax, bounds, onChange);
          }}
          className="category-price-range-input category-price-range-input--max absolute inset-x-0 top-0 h-6 w-full"
        />
      </div>
    </div>
  );
}
