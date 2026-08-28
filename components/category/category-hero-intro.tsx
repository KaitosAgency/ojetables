"use client";

import { ExpandableClampText } from "@/components/ui/expandable-clamp-text";
import { cn } from "@/lib/utils";

type CategoryHeroIntroProps = {
  text: string;
  className?: string;
};

export function CategoryHeroIntro({ text, className }: CategoryHeroIntroProps) {
  return (
    <ExpandableClampText
      html={text}
      lines={3}
      expandLabel="Lire la suite"
      wrapperClassName={cn("max-w-2xl", className)}
      className="text-sm leading-relaxed text-muted-foreground md:text-base"
    />
  );
}
