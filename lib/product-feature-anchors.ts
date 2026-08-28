import type { ProductFeaturePictoId } from "@/lib/products";

/** Ancre colonne gauche pour un picto atout (accordéon specs). */
export function getProductFeatureAnchorId(id: ProductFeaturePictoId): string {
  return `feature-${id}`;
}

export const productFeatureScrollMarginClassName =
  "scroll-mt-[calc(var(--site-header-height)+var(--site-header-gap)+3rem)]";

export const PRODUCT_FEATURE_OPEN_EVENT = "product-feature-open";

type ProductFeatureOpenDetail = {
  id: ProductFeaturePictoId;
  scroll?: boolean;
};

/** Ouvre l’accordéon atout + scroll (1 clic depuis le panneau d’achat). */
export function openProductFeature(id: ProductFeaturePictoId, options?: { scroll?: boolean }) {
  if (typeof window === "undefined") return;

  const anchorId = getProductFeatureAnchorId(id);
  const scroll = options?.scroll ?? true;

  window.dispatchEvent(
    new CustomEvent<ProductFeatureOpenDetail>(PRODUCT_FEATURE_OPEN_EVENT, {
      detail: { id, scroll },
    }),
  );

  window.history.pushState(null, "", `#${anchorId}`);
}

export function parseProductFeatureHash(
  hash: string,
  validIds: readonly ProductFeaturePictoId[],
): ProductFeaturePictoId | null {
  const normalized = hash.replace(/^#/, "");
  if (!normalized.startsWith("feature-")) return null;

  const pictoId = normalized.slice("feature-".length) as ProductFeaturePictoId;
  return validIds.includes(pictoId) ? pictoId : null;
}

export function scrollToProductFeature(id: ProductFeaturePictoId) {
  if (typeof window === "undefined") return;

  const scrollToTarget = () => {
    document.getElementById(getProductFeatureAnchorId(id))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Laisse le panneau accordéon commencer à s’ouvrir avant le scroll.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(scrollToTarget);
  });
}

export type { ProductFeatureOpenDetail };
