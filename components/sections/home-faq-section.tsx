import { JsonLd, homePageJsonLd } from "@/components/seo/json-ld";
import { FaqWithStructuredData } from "@/components/sections/faq-with-structured-data";
import { SectionHeader } from "@/components/sections/section-header";
import { homeFaq } from "@/lib/site";

export function HomeFaqSection() {
  return (
    <section className="section-padding bg-white">
      <JsonLd data={homePageJsonLd()} />
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeader
          label="FAQ"
          title="Questions fréquentes"
          description="Livraison, tarifs, personnalisation, conformité AGEC : toutes les réponses à vos questions."
          align="center"
        />
        <FaqWithStructuredData items={homeFaq} className="mt-10" />
      </div>
    </section>
  );
}
