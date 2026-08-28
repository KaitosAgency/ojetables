"use client";

import { Truck } from "lucide-react";

import { ShippingDetailsContent } from "@/components/product/shipping-details-content";
import { DisclosureCard } from "@/components/ui/disclosure-card";
import type { Product } from "@/lib/products";

type ProductShippingAccordionProps = {
  product: Product;
  lineTotalHt: number;
};

export function ProductShippingAccordion({
  product,
  lineTotalHt,
}: ProductShippingAccordionProps) {
  return (
    <DisclosureCard
      id="product-shipping-details"
      title="Modalités de livraison"
      icon={<Truck className="size-4 shrink-0" strokeWidth={2} aria-hidden />}
      scrollMarginClassName="scroll-mt-[calc(var(--site-header-height)+var(--site-header-gap))]"
    >
      <ShippingDetailsContent product={product} lineTotalHt={lineTotalHt} />
    </DisclosureCard>
  );
}
