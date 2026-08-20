"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { headerActions } from "@/lib/site";
import { cn } from "@/lib/utils";

const searchInputClass =
  "h-8 w-full border-border/80 py-0 pl-8 text-xs md:text-sm focus-visible:bg-white";

type HeaderSearchProps = {
  className?: string;
  compact?: boolean;
};

export function HeaderSearch({ className, compact = false }: HeaderSearchProps) {
  return (
    <form
      role="search"
      className={cn("relative w-full", className)}
      onSubmit={(event) => event.preventDefault()}
    >
      <Search
        className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        name="q"
        placeholder={headerActions.searchPlaceholder}
        className={cn(searchInputClass, compact ? "bg-white" : "bg-brand-beige/40")}
        aria-label="Rechercher sur Ojetables"
      />
    </form>
  );
}
