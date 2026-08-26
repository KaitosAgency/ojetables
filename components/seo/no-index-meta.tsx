"use client";

import { useEffect } from "react";

/** Injecte noindex sur les pages client-only (error boundary). */
export function NoIndexMeta() {
  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]');
    const previousContent = existing?.getAttribute("content") ?? null;

    const meta = existing ?? document.createElement("meta");
    if (!existing) {
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex, follow");

    const canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href") ?? null;
    canonical?.remove();

    return () => {
      if (previousContent) {
        meta.setAttribute("content", previousContent);
      } else {
        meta.remove();
      }
      if (previousCanonical && canonical) {
        document.head.appendChild(canonical);
        canonical.setAttribute("href", previousCanonical);
      }
    };
  }, []);

  return null;
}
