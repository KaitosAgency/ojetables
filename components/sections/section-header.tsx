import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label?: string;
  title?: string;
  description?: ReactNode;
  align?: "left" | "center";
  titleClassName?: string;
  descriptionClassName?: string;
  badge?: ReactNode;
  tone?: "default" | "inverse";
  titleAs?: "h1" | "h2";
  titleId?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  titleClassName,
  descriptionClassName,
  badge,
  tone = "default",
  titleAs = "h2",
  titleId,
}: SectionHeaderProps) {
  const isInverse = tone === "inverse";
  const TitleTag = titleAs;

  return (
    <div className={cn(align === "center" && "text-center")}>
      {badge ? (
        <div className={cn(align === "center" && "flex justify-center")}>{badge}</div>
      ) : label ? (
        <p
          className={cn(
            "text-sm font-bold uppercase tracking-[0.2em]",
            isInverse ? "text-brand-kraft" : "text-brand-teal",
          )}
        >
          {label}
        </p>
      ) : null}
      {title ? (
        <TitleTag
          id={titleId}
          className={cn(
            "mt-3 font-bold tracking-tight",
            isInverse ? "text-brand-beige" : "text-brand-navy",
            align === "center" ? "text-3xl md:text-4xl" : "max-w-3xl text-3xl md:text-5xl",
            titleClassName,
          )}
        >
          {title}
        </TitleTag>
      ) : null}
      {description ? (
        <p
          className={cn(
            title ? "mt-4 text-lg" : badge || label ? "mt-3 text-lg" : "text-lg",
            isInverse ? "text-brand-beige/65" : "text-muted-foreground",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
