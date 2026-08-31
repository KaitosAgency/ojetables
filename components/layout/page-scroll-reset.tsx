"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

import {
  applyPageScrollReset,
  applyProductPageScrollReset,
} from "@/lib/scroll-reset";

type PageScrollResetProps = {
  mode: "home" | "product";
};

/** À l’arrivée sur une page : annule hash / restauration de scroll du navigateur. */
export function PageScrollReset({ mode }: PageScrollResetProps) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (mode === "product") {
      applyProductPageScrollReset();
      return;
    }

    applyPageScrollReset({ preserveValidHash: false });
  }, [mode, pathname]);

  return null;
}
