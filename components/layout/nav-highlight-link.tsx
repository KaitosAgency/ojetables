import Link from "next/link";
import { Flame } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import type { NavHighlight } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavHighlightLinkProps = {
  item: NavHighlight;
  className?: string;
};

export function NavHighlightLink({ item, className }: NavHighlightLinkProps) {
  if (item.accent === "destock") {
    return (
      <Link
        href={item.href}
        className={cn(
          buttonVariants({ variant: "brandDestock", size: "ctaSm" }),
          "inline-flex h-8 shrink-0 items-center gap-1.5 !px-4 text-xs lg:text-sm",
          className,
        )}
      >
        <Flame className="size-3.5 shrink-0 text-brand-kraft" aria-hidden />
        {item.label}
      </Link>
    );
  }

  return (
    <LinkButton
      href={item.href}
      variant="brandNavy"
      size="ctaSm"
      className={cn("relative h-8 shrink-0 text-xs lg:text-sm", className)}
    >
      {item.label}
    </LinkButton>
  );
}
