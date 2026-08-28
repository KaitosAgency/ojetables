"use client";

import { useLayoutEffect } from "react";

import { applyPageScrollReset } from "@/lib/scroll-reset";

type PageScrollResetProps = {
  mode: "home" | "product";
};

/** À l’arrivée sur une page : annule hash / restauration de scroll du navigateur. */
export function PageScrollReset({ mode }: PageScrollResetProps) {
  useLayoutEffect(() => {
    applyPageScrollReset({ preserveValidHash: mode === "product" });
  }, [mode]);

  return null;
}
