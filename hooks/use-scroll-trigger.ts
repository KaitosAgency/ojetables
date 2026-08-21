"use client";

import { useEffect, useState } from "react";

import { leadMagnet } from "@/lib/site";

export function getScrollProgress(): number {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return 0;
  return window.scrollY / scrollHeight;
}

function isLeadMagnetDismissed(): boolean {
  try {
    return Boolean(localStorage.getItem(leadMagnet.storageKey));
  } catch {
    return false;
  }
}

export function dismissLeadMagnet(): void {
  try {
    localStorage.setItem(leadMagnet.storageKey, "dismissed");
  } catch {
    // ignore storage errors (private mode, etc.)
  }
}

export const LEAD_MAGNET_RESET_EVENT = "ojetables:lead-magnet-reset";

/** Debug maquette : efface le stockage lead magnet et réinitialise le popup. */
export function resetLeadMagnetDebug(): void {
  try {
    localStorage.removeItem(leadMagnet.storageKey);
  } catch {
    // ignore storage errors
  }

  try {
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0]?.trim();
      if (!name) return;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  } catch {
    // ignore cookie errors
  }

  window.dispatchEvent(new CustomEvent(LEAD_MAGNET_RESET_EVENT));
}

export function useScrollTrigger(threshold = leadMagnet.scrollThreshold): boolean {
  const [triggered, setTriggered] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    function handleReset() {
      setTriggered(false);
      setResetKey((value) => value + 1);
    }

    window.addEventListener(LEAD_MAGNET_RESET_EVENT, handleReset);
    return () => window.removeEventListener(LEAD_MAGNET_RESET_EVENT, handleReset);
  }, []);

  useEffect(() => {
    if (triggered || isLeadMagnetDismissed()) return;

    function checkScroll() {
      if (getScrollProgress() >= threshold) {
        setTriggered(true);
      }
    }

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [threshold, triggered, resetKey]);

  return triggered;
}
