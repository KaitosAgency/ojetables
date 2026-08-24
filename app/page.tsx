import type { Metadata } from "next";

import { BestSellersSection } from "@/components/sections/best-sellers-section";
import { StatsBand } from "@/components/sections/stats-band";
import { CatalogFamiliesSection } from "@/components/sections/catalog-families-section";
import { DestockageBand } from "@/components/sections/destockage-band";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeFaqSection } from "@/components/sections/home-faq-section";
import { PersonalizationSection } from "@/components/sections/personalization-section";
import { PressBand } from "@/components/sections/press-band";
import { ReviewsBand } from "@/components/sections/reviews-band";
import { SectorsSection } from "@/components/sections/sectors-section";
import { createPageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Vaisselle jetable éco-responsable | Livraison 24/72h en France",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBand />
      <BestSellersSection />
      <SectorsSection />
      <PressBand />
      <DestockageBand />
      <PersonalizationSection />
      <CatalogFamiliesSection />
      <ReviewsBand />
      <HomeFaqSection />
    </>
  );
}
