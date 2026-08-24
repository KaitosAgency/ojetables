"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { avisGarantis } from "@/lib/site";

const WIDGET_CONTAINER_CLASS = "agJsWidget";
const WIDGET_URL = `https://www.societe-des-avis-garantis.fr/wp-content/plugins/ag-core/widgets/cache/jsv2/${avisGarantis.siteId}.html`;

function stripScripts(html: string) {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

function shouldMountWidget(pathname: string) {
  return pathname === "/" || pathname.startsWith("/produit/");
}

export function AvisGarantisOfficialWidget() {
  const pathname = usePathname();

  useEffect(() => {
    if (!shouldMountWidget(pathname)) return;

    let cancelled = false;

    async function mountWidget() {
      if (document.querySelector(`.${WIDGET_CONTAINER_CLASS}`)) return;

      const container = document.createElement("div");
      container.className = `${WIDGET_CONTAINER_CLASS} agJsWidget--maquette`;
      document.body.appendChild(container);

      try {
        const response = await fetch(WIDGET_URL);
        if (!response.ok || cancelled) return;

        const html = stripScripts(await response.text());
        if (cancelled || !container.isConnected) return;

        container.innerHTML = html;
        container.style.opacity = "0";
        container.style.display = "block";

        requestAnimationFrame(() => {
          container.style.transition = "opacity 0.6s ease";
          container.style.opacity = "1";
        });
      } catch {
        container.remove();
      }
    }

    const timeoutId = window.setTimeout(() => {
      void mountWidget();
    }, 2000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      document.querySelector(`.${WIDGET_CONTAINER_CLASS}`)?.remove();
    };
  }, [pathname]);

  return null;
}
