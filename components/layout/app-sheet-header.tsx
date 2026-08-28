import type { ReactNode } from "react";

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type AppSheetHeaderVariant = "default" | "brand";

const variantStyles: Record<
  AppSheetHeaderVariant,
  { header: string; title: string; description: string }
> = {
  default: {
    header: "border-b border-border/60 bg-white px-4 py-4 text-left sm:px-5",
    title: "text-base font-bold text-brand-navy",
    description: "text-sm text-muted-foreground",
  },
  brand: {
    header: "border-b border-border/60 bg-brand-teal px-5 py-4 text-left",
    title: "text-base font-bold uppercase tracking-wide text-white",
    description: "text-sm font-medium text-white/90",
  },
};

type AppSheetHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  variant?: AppSheetHeaderVariant;
  className?: string;
};

/** En-tête unifié pour les sheets (filtres, livraison, menu…). */
export function AppSheetHeader({
  title,
  description,
  variant = "default",
  className,
}: AppSheetHeaderProps) {
  const styles = variantStyles[variant];

  return (
    <SheetHeader className={cn(styles.header, className)}>
      <SheetTitle className={styles.title}>{title}</SheetTitle>
      {description ? (
        <SheetDescription className={styles.description}>{description}</SheetDescription>
      ) : null}
    </SheetHeader>
  );
}
