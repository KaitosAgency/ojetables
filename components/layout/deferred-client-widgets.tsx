"use client";

import dynamic from "next/dynamic";

const AnimatedTabTitle = dynamic(
  () =>
    import("@/components/marketing/animated-tab-title").then((module) => ({
      default: module.AnimatedTabTitle,
    })),
  { ssr: false },
);

const LeadMagnetPopup = dynamic(
  () =>
    import("@/components/marketing/lead-magnet-popup").then((module) => ({
      default: module.LeadMagnetPopup,
    })),
  { ssr: false },
);

const AvisGarantisOfficialWidget = dynamic(
  () =>
    import("@/components/trust/avis-garantis-official-widget").then((module) => ({
      default: module.AvisGarantisOfficialWidget,
    })),
  { ssr: false },
);

export function DeferredClientWidgets() {
  return (
    <>
      <AnimatedTabTitle />
      <LeadMagnetPopup />
      <AvisGarantisOfficialWidget />
    </>
  );
}
