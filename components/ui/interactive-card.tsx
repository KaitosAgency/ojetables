import { cn } from "@/lib/utils";

/** Ombres partagées - cartes cliquables, FAQ, etc. */
export const interactiveCardShadowClassName =
  "shadow-[0_1px_0_rgb(61_44_38/0.04)]";

export const interactiveCardShadowHoverClassName =
  "hover:shadow-[0_10px_28px_-14px_rgb(61_44_38/0.22)]";

export const interactiveCardBorderClassName = "border border-border/90";

/** Ombre repos + hover (aligné ProductCard). */
export const interactiveCardElevationClassName = cn(
  interactiveCardShadowClassName,
  interactiveCardShadowHoverClassName,
);

/** Bordure + ombre + hover bordure — cartes cliquables hors layout flex. */
export const interactiveCardSurfaceClassName = cn(
  interactiveCardBorderClassName,
  interactiveCardElevationClassName,
  "transition-all hover:border-brand-kraft/30",
);

/** Base cliquable partagée - product cards, catégories catalogue, etc. */
export const interactiveCardBaseClassName =
  "group flex h-full flex-col overflow-hidden rounded-lg bg-white transition-all";

/** Style par défaut - aligné section « Par métier » (ProductCard). */
export const interactiveCardClassName = cn(
  interactiveCardBaseClassName,
  interactiveCardBorderClassName,
  interactiveCardShadowClassName,
  "hover:border-brand-kraft/30",
  interactiveCardShadowHoverClassName,
);

/** Accordéon FAQ - même langage que les cartes, état ouvert renforcé. */
export function faqItemClassName(isOpen: boolean): string {
  return cn(
    interactiveCardBaseClassName,
    interactiveCardBorderClassName,
    interactiveCardShadowClassName,
    "transition-[border-color,box-shadow] duration-200",
    isOpen
      ? "border-brand-teal/35 shadow-[0_10px_28px_-14px_rgb(61_44_38/0.22)]"
      : cn("hover:border-brand-kraft/30", interactiveCardShadowHoverClassName),
  );
}

export type InteractiveCardAccent = "default" | "teal" | "kraft" | "partner";

const interactiveCardHoverShadow = "hover:shadow-[0_10px_28px_-14px_rgb(61_44_38/0.22)]";

export function interactiveCardClassNameFor(accent?: InteractiveCardAccent): string {
  switch (accent) {
    case "teal":
      return cn(interactiveCardBaseClassName, "card-outline-teal", interactiveCardHoverShadow);
    case "kraft":
      return cn(interactiveCardBaseClassName, "card-outline-kraft", interactiveCardHoverShadow);
    case "partner":
      return cn(interactiveCardBaseClassName, "card-outline-garcia", interactiveCardHoverShadow);
    default:
      return interactiveCardClassName;
  }
}
