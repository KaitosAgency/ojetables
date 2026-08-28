"use client";

import { useEffect, useMemo, useState } from "react";

import { FeaturePictoIcon } from "@/components/product/product-feature-pictos";
import { DisclosureCardGroup } from "@/components/ui/disclosure-card";
import type { ProductFeaturePicto } from "@/lib/products";
import {
  getProductFeatureAnchorId,
  parseProductFeatureHash,
  PRODUCT_FEATURE_OPEN_EVENT,
  productFeatureScrollMarginClassName,
  scrollToProductFeature,
  type ProductFeatureOpenDetail,
} from "@/lib/product-feature-anchors";

type ProductFeaturePictosAccordionProps = {
  pictos: readonly ProductFeaturePicto[];
  className?: string;
};

function openIdFromHash(items: readonly ProductFeaturePicto[]): string | null {
  if (typeof window === "undefined") return null;

  const validIds = items.map((item) => item.id);
  return parseProductFeatureHash(window.location.hash, validIds);
}

export function ProductFeaturePictosAccordion({
  pictos,
  className,
}: ProductFeaturePictosAccordionProps) {
  const items = useMemo(
    () => pictos.filter((picto) => picto.id !== "food-safe"),
    [pictos],
  );
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fromHash = openIdFromHash(items);
    if (fromHash) setOpenId(fromHash);
  }, [items]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const { detail } = event as CustomEvent<ProductFeatureOpenDetail>;
      if (!items.some((item) => item.id === detail.id)) return;

      setOpenId(detail.id);
      if (detail.scroll) scrollToProductFeature(detail.id);
    };

    const syncFromHash = () => {
      const fromHash = openIdFromHash(items);
      if (fromHash) setOpenId(fromHash);
    };

    window.addEventListener(PRODUCT_FEATURE_OPEN_EVENT, onOpen);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener(PRODUCT_FEATURE_OPEN_EVENT, onOpen);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [items]);

  return (
    <DisclosureCardGroup
      className={className ?? "mt-6"}
      heading={
        <>
          <span className="size-2 shrink-0 rounded-full bg-brand-teal" aria-hidden />
          Atouts de la référence
        </>
      }
      openId={openId}
      onOpenChange={setOpenId}
      items={items.map((picto) => ({
        id: picto.id,
        anchorId: getProductFeatureAnchorId(picto.id),
        scrollMarginClassName: productFeatureScrollMarginClassName,
        title: picto.label,
        icon: <FeaturePictoIcon id={picto.id} className="size-5" />,
        content: (
          <p className="text-sm leading-relaxed text-muted-foreground">{picto.description}</p>
        ),
      }))}
    />
  );
}
