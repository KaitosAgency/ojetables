import { PersonalizationProcessSection } from "@/components/personalization/personalization-process-section";
import { FaqWithStructuredData } from "@/components/sections/faq-with-structured-data";
import { personalizationFaq } from "@/lib/site";

export function PersonalizationSection() {
  return (
    <section id="personnalisation" className="section-padding scroll-mt-36 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PersonalizationProcessSection />

        <div className="mt-16 max-w-3xl">
          <h3 className="text-xl font-bold text-brand-navy">Questions fréquentes</h3>
          <FaqWithStructuredData items={personalizationFaq} className="mt-6" />
        </div>
      </div>
    </section>
  );
}
