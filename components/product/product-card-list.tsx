import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ProductCardListProps = {
  children: ReactNode;
  className?: string;
  /** Libellé pour lecteurs d'écran (grille catalogue produits). */
  ariaLabel?: string;
};

/** Liste sémantique de cartes produit — remplace le `<ul><li><h2>` du template Magento. */
export function ProductCardList({ children, className, ariaLabel }: ProductCardListProps) {
  return (
    <ul
      className={cn("m-0 list-none p-0", className)}
      aria-label={ariaLabel}
    >
      {children}
    </ul>
  );
}

type ProductCardListItemProps = {
  children: ReactNode;
  className?: string;
};

export function ProductCardListItem({ children, className }: ProductCardListItemProps) {
  return <li className={cn("min-w-0", className)}>{children}</li>;
}
