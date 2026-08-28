import Link from "next/link";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductPersonalizableBadgeProps = {
  className?: string;
  /** `lg` pour la galerie fiche produit, `sm` pour les cartes catalogue. */
  size?: "sm" | "lg";
  /** Lien ancre — galerie fiche produit vers le bloc Personnaliser. */
  href?: string;
};

const badgeSizes = {
  sm: {
    box: "h-6 w-6 rounded-md",
    icon: "h-3.5 w-3.5",
  },
  lg: {
    box: "h-11 w-11 rounded-full",
    icon: "size-6",
  },
} as const;

const badgeClassName =
  "flex items-center justify-center border border-brand-teal/25 bg-white text-brand-teal-dim";

/** Picto « personnalisable » — cartes catalogue ou lien galerie fiche produit. */
export function ProductPersonalizableBadge({
  className,
  size = "sm",
  href,
}: ProductPersonalizableBadgeProps) {
  const styles = badgeSizes[size];
  const classes = cn(badgeClassName, styles.box, className);

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          classes,
          "cursor-pointer transition-colors hover:border-brand-teal/45 hover:bg-brand-teal/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal/45",
        )}
        aria-label="Aller au bouton Personnaliser"
      >
        <Palette className={styles.icon} strokeWidth={2} aria-hidden />
      </Link>
    );
  }

  return (
    <span
      role="img"
      className={cn(classes, "pointer-events-none")}
      aria-label="Personnalisation disponible"
    >
      <Palette className={styles.icon} strokeWidth={2} aria-hidden />
    </span>
  );
}
