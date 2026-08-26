"use client";

import { useEffect } from "react";

type FilterRobotsMetaProps = {
  active: boolean;
};

/** noindex quand facettes actives (preview maquette — filtres hors URL). */
export function FilterRobotsMeta({ active }: FilterRobotsMetaProps) {
  useEffect(() => {
    if (!active) return;

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, [active]);

  return null;
}
