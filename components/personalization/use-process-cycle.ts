"use client";

import { useEffect, useState } from "react";

const DEFAULT_CYCLE_MS = 8000;

/** Re-déclenche les animations CSS à chaque cycle tant que le mockup est actif. */
export function useProcessCycle(active: boolean, cycleMs = DEFAULT_CYCLE_MS) {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setCycle((current) => current + 1);
    const id = window.setInterval(() => setCycle((current) => current + 1), cycleMs);
    return () => window.clearInterval(id);
  }, [active, cycleMs]);

  return cycle;
}
