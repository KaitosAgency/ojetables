"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppSheetHeader } from "@/components/layout/app-sheet-header";
import { ShippingDetailsContent } from "@/components/product/shipping-details-content";
import type { Product } from "@/lib/products";
import { shippingDeliverySubtitle } from "@/lib/shipping";

type ProductShippingModalProps = {
  product: Product;
};

export function ProductShippingModal({ product }: ProductShippingModalProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <button
            type="button"
            className="cursor-pointer text-sm font-semibold text-brand-teal underline-offset-4 outline-none transition-colors hover:text-brand-teal-dim hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal/45"
          >
            En savoir plus sur la livraison
          </button>
        }
      />
      <SheetContent side="right" className="w-[min(100vw-1rem,26rem)] gap-0 p-0">
        <AppSheetHeader
          variant="brand"
          title="Nos options de livraison"
          description={shippingDeliverySubtitle}
        />

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <ShippingDetailsContent product={product} density="compact" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
