"use client";

import { useEffect, type RefObject } from "react";

/** Mesure la hauteur sticky du header (crans carton inclus) → `--site-header-height`. */
export function useSiteHeaderHeight(headerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const root = document.documentElement;

    const headerElement = header;

    function syncSiteHeaderHeight() {
      const styles = getComputedStyle(root);
      const crans =
        Number.parseFloat(styles.getPropertyValue("--header-crans-height")) || 10;
      const height = headerElement.getBoundingClientRect().height + crans;
      root.style.setProperty("--site-header-height", `${Math.ceil(height)}px`);
    }

    syncSiteHeaderHeight();

    const observer = new ResizeObserver(syncSiteHeaderHeight);
    observer.observe(headerElement);
    window.addEventListener("resize", syncSiteHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncSiteHeaderHeight);
    };
  }, [headerRef]);
}
