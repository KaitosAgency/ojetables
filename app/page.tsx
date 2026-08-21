import { BestSellersSection } from "@/components/sections/best-sellers-section";
import { StatsBand } from "@/components/sections/stats-band";
import { CatalogFamiliesSection } from "@/components/sections/catalog-families-section";
import { CtaBand } from "@/components/sections/cta-band";
import { DestockageBand } from "@/components/sections/destockage-band";
import { EcoSection } from "@/components/sections/eco-section";
import { FaqWithStructuredData } from "@/components/sections/faq-with-structured-data";
import { HeroSection } from "@/components/sections/hero-section";
import { PersonalizationSection } from "@/components/sections/personalization-section";
import { ReviewsBand } from "@/components/sections/reviews-band";
import { SectorsSection } from "@/components/sections/sectors-section";
import { TrustSection } from "@/components/sections/trust-section";
import { B2cTeaser } from "@/components/sections/b2c-teaser";
import { SectionHeader } from "@/components/sections/section-header";
import { homeFaq } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBand />
      <BestSellersSection />
      <SectorsSection />
      <PersonalizationSection />
      <CatalogFamiliesSection />
      <DestockageBand />
      <TrustSection />
      <ReviewsBand />
      <EcoSection />
      <B2cTeaser />
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <SectionHeader
            label="FAQ"
            title="Questions fréquentes"
            description="Réponses structurées pour Google et les assistants IA."
            align="center"
          />
          <FaqWithStructuredData items={homeFaq} className="mt-10" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
