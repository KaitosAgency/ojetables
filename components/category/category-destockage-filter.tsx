"use client";

import { Flame } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CategoryDestockageFilterProps = {
  active: boolean;
  promoCount: number;
  onToggle: (active: boolean) => void;
  className?: string;
};

export function CategoryDestockageFilter({
  active,
  promoCount,
  onToggle,
  className,
}: CategoryDestockageFilterProps) {
  if (promoCount === 0) return null;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onToggle(!active)}
      className={cn(
        buttonVariants({ variant: "brandDestock", size: "sm" }),
        "nav-destock-link h-9 min-h-9 w-full gap-2 !px-3.5 !py-2 text-sm shadow-none",
        active &&
          "border-brand-kraft/50 bg-brand-kraft/12 text-brand-kraft-dark shadow-none hover:border-brand-kraft/55 hover:bg-brand-kraft/16 hover:shadow-none",
        className,
      )}
    >
      <Flame
        className={cn(
          "nav-destock-flame size-3.5 shrink-0",
          active ? "text-brand-kraft-dark" : "text-brand-kraft",
        )}
        aria-hidden
      />
      <span className="flex-1 text-left font-semibold">Destockage</span>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-xs font-bold tabular-nums",
          active
            ? "bg-brand-kraft/25 text-brand-kraft-dark"
            : "bg-brand-navy/8 text-brand-navy",
        )}
      >
        {promoCount}
      </span>
    </button>
  );
}
