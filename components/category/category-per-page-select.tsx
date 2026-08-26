"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_PER_PAGE_OPTIONS } from "@/lib/category-pagination";
import { cn } from "@/lib/utils";

type CategoryPerPageSelectProps = {
  value: number;
  onValueChange: (value: number) => void;
  className?: string;
};

export function CategoryPerPageSelect({
  value,
  onValueChange,
  className,
}: CategoryPerPageSelectProps) {
  return (
    <div className={cn("flex shrink-0 items-center gap-1.5 whitespace-nowrap", className)}>
      <span className="hidden text-muted-foreground md:inline">Afficher</span>
      <Select
        value={String(value)}
        onValueChange={(nextValue) => {
          if (nextValue) onValueChange(Number.parseInt(nextValue, 10));
        }}
      >
        <SelectTrigger
          size="sm"
          className="!h-8 !min-h-8 w-[4.75rem] shrink-0 cursor-pointer gap-0.5 border-border/90 bg-white py-0 pl-2.5 pr-1.5 text-sm leading-none tabular-nums text-brand-navy shadow-none [&_svg]:size-3.5"
          aria-label="Nombre de produits par page"
        >
          <SelectValue className="flex-1 text-center">{value}</SelectValue>
        </SelectTrigger>
        <SelectContent align="start">
          {CATEGORY_PER_PAGE_OPTIONS.map((option) => (
            <SelectItem key={option} value={String(option)} className="cursor-pointer">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="hidden text-muted-foreground md:inline">/ page</span>
    </div>
  );
}
