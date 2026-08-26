"use client";

import type { ReactNode } from "react";

import { ProductCardAddToCartButton } from "@/components/product/product-card-quick-actions";

type ProductCardFooterActionsProps = {
  price: ReactNode;
  productKey: string;
  productName: string;
  isQuote?: boolean;
};

export function ProductCardFooterActions({
  price,
  productKey,
  productName,
  isQuote = false,
}: ProductCardFooterActionsProps) {
  return (
    <div className="product-card-price-row">
      <div className="product-card-price-mask">{price}</div>
      <div className="product-card-cart-expand-track">
        <ProductCardAddToCartButton
          productKey={productKey}
          productName={productName}
          isQuote={isQuote}
          variant="expandable"
        />
      </div>
    </div>
  );
}
