"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_SORT_OPTIONS,
  getCategorySortLabel,
  isCategorySortKey,
  type CategorySortKey,
} from "@/lib/category-sort";
import { cn } from "@/lib/utils";

type CategorySortSelectProps = {
  value: CategorySortKey;
  onValueChange: (value: CategorySortKey) => void;
  className?: string;
};

export function CategorySortSelect({ value, onValueChange, className }: CategorySortSelectProps) {
  return (
    <div className={cn("flex items-center gap-2 sm:h-9", className)}>
      <span className="hidden text-sm text-muted-foreground sm:inline">Tri</span>
      <Select
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue && isCategorySortKey(nextValue)) {
            onValueChange(nextValue);
          }
        }}
      >
        <SelectTrigger
          size="sm"
          className="!h-9 !min-h-9 max-h-9 w-full min-w-0 cursor-pointer border-border/90 bg-white py-0 text-sm leading-none text-brand-navy shadow-none sm:w-auto sm:min-w-[9.5rem]"
          aria-label="Trier les produits"
        >
          <SelectValue>{getCategorySortLabel(value)}</SelectValue>
        </SelectTrigger>
        <SelectContent align="end">
          {CATEGORY_SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value} className="cursor-pointer">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
