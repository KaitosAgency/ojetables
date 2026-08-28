"use client";

import { useEffect, type RefObject } from "react";

/** Ferme le megamenu au clic extérieur ou Échap — logique partagée desktop. */
export function useCatalogNavDismiss(
  headerRef: RefObject<HTMLElement | null>,
  activeCategoryId: string | null,
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!activeCategoryId) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (headerRef.current?.contains(event.target as Node)) return;
      onDismiss();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onDismiss();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeCategoryId, headerRef, onDismiss]);
}
