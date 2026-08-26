"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CategorySearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  categoryLabel: string;
  className?: string;
};

function getSearchPlaceholder(categoryLabel: string): string {
  const label = categoryLabel.toLowerCase();
  if (label.length > 14) {
    return "Rechercher un produit";
  }
  return `Rechercher dans ${label}`;
}

export function CategorySearchInput({
  value,
  onChange,
  categoryLabel,
  className,
}: CategorySearchInputProps) {
  const ariaLabel = `Rechercher dans ${categoryLabel.toLowerCase()}`;
  const placeholder = getSearchPlaceholder(categoryLabel);

  return (
    <form
      role="search"
      className={cn("relative min-w-0", className)}
      onSubmit={(event) => event.preventDefault()}
    >
      <Search
        className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        name="category-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="!h-9 !min-h-9 max-h-9 w-full min-w-0 border-border/90 bg-white py-0 pl-8 pr-8 text-sm leading-none shadow-none placeholder:text-sm focus-visible:bg-white"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-1.5 top-1/2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-brand-navy"
          aria-label="Effacer la recherche"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      ) : null}
    </form>
  );
}
