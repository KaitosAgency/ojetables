"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

import { useMaquetteShop } from "@/lib/maquette-shop-context";
import { routes } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProductCardFavoriteButtonProps = {
  productKey: string;
  productName: string;
  className?: string;
};

type ProductCardAddToCartButtonProps = {
  productKey: string;
  productName: string;
  isQuote?: boolean;
  className?: string;
  variant?: "compact" | "expandable";
};

const quickActionRestClassName =
  "border-brand-navy/10 bg-white/60 text-brand-navy/65 backdrop-blur-sm";

const quickActionActiveClassName =
  "border-brand-kraft/40 bg-brand-beige text-brand-kraft-dark";

const quickActionHoverClassName =
  "hover:border-brand-kraft/40 hover:bg-brand-beige hover:text-brand-kraft-dark";

const quickActionActiveHoverClassName =
  "hover:border-brand-navy/25 hover:bg-white/95 hover:text-brand-navy/55 hover:shadow-[0_2px_8px_-2px_rgb(61_44_38/0.12)]";

const favoriteButtonClassName =
  "group/fav flex size-7 cursor-pointer items-center justify-center rounded-full border transition-[border-color,background-color,color,transform,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-kraft/40 active:scale-95";

const cartIconButtonSharedClassName =
  "flex h-7 cursor-pointer items-center justify-center rounded-[7px] border border-brand-navy/12 bg-white/80 text-brand-navy/40 transition-[border-color,background-color,color,transform] hover:border-brand-teal hover:bg-brand-teal hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal/50 active:scale-95";

const cartIconButtonCompactClassName = cn(cartIconButtonSharedClassName, "size-7 shrink-0");

const cartIconButtonExpandableClassName = cn(
  cartIconButtonSharedClassName,
  "product-card-cart-expand-btn",
);

function getCartIconButtonClassName(
  variant: ProductCardAddToCartButtonProps["variant"],
  className?: string,
) {
  return cn(
    variant === "expandable" ? cartIconButtonExpandableClassName : cartIconButtonCompactClassName,
    className,
  );
}

export function ProductCardFavoriteButton({
  productKey,
  productName,
  className,
}: ProductCardFavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useMaquetteShop();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const favorited = mounted && isFavorite(productKey);
  const addLabel = `Ajouter ${productName} aux favoris`;
  const removeLabel = `Retirer ${productName} des favoris`;

  return (
    <button
      type="button"
      className={cn(
        favoriteButtonClassName,
        favorited
          ? cn(quickActionActiveClassName, quickActionActiveHoverClassName)
          : cn(quickActionRestClassName, quickActionHoverClassName),
        className,
      )}
      aria-label={favorited ? removeLabel : addLabel}
      aria-pressed={favorited}
      onClick={() => toggleFavorite(productKey)}
    >
      <Heart
        className={cn(
          "size-3 transition-[fill,color] duration-150",
          favorited && "fill-current group-hover/fav:fill-none",
        )}
        strokeWidth={2}
        aria-hidden
      />
    </button>
  );
}

export function ProductCardAddToCartButton({
  productKey,
  productName,
  isQuote = false,
  className,
  variant = "compact",
}: ProductCardAddToCartButtonProps) {
  const { addToCart } = useMaquetteShop();
  const buttonClassName = getCartIconButtonClassName(variant, className);

  if (isQuote) {
    return (
      <Link
        href={routes.quote}
        className={buttonClassName}
        aria-label={`Demander un devis pour ${productName}`}
      >
        <ShoppingCart className="size-4 shrink-0" strokeWidth={2} aria-hidden />
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonClassName}
      aria-label={`Ajouter ${productName} au panier`}
      onClick={() => addToCart(productKey, productName)}
    >
      <ShoppingCart className="size-4 shrink-0" strokeWidth={2} aria-hidden />
    </button>
  );
}
