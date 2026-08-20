import { Upload } from "lucide-react";
import { PersonalizationWizard } from "@/components/personalization/personalization-wizard";
import { FaqWithStructuredData } from "@/components/sections/faq-with-structured-data";
import { SectionHeader } from "@/components/sections/section-header";
import { LinkButton } from "@/components/ui/link-button";
import {
  personalizationFaq,
  personalizationProductTypes,
  personalizationSteps,
  routes,
} from "@/lib/site";

export function PersonalizationSection() {
  return (
    <section id="personnalisation" className="section-padding scroll-mt-36 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="Personnalisation"
          title="Votre logo, enfin un parcours clair"
          description="Fini les messages contradictoires et les options cachées : choisissez, chiffrez, envoyez, validez."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {personalizationSteps.map((item) => (
            <article
              key={item.step}
              className="relative rounded-2xl border border-border bg-brand-beige/30 p-5"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {personalizationProductTypes.map((product) => (
            <article
              key={product.id}
              className="card-outline flex flex-col rounded-2xl p-5"
            >
              <h3 className="font-bold text-brand-navy">{product.label}</h3>
              <dl className="mt-4 flex-1 space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Minimum</dt>
                  <dd className="font-medium text-brand-navy">{product.minQty}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Dès</dt>
                  <dd className="font-medium text-brand-navy">{product.unitFrom}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Délai</dt>
                  <dd className="font-medium text-brand-navy">{product.delay}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">{product.technique}</p>
              <LinkButton
                href={product.href}
                variant="brandOutline"
                size="ctaSm"
                className="mt-4 w-full"
              >
                Choisir
              </LinkButton>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <PersonalizationWizard />

          <div className="rounded-2xl border border-dashed border-brand-teal/35 bg-brand-beige/20 p-6 md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              <Upload className="h-6 w-6 text-brand-teal" aria-hidden />
            </div>
            <h3 className="mt-5 text-xl font-bold text-brand-navy">Déposez votre visuel</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Zone d&apos;upload prévue après commande ou devis — formats PDF, AI, SVG ou PNG haute
              définition. Un BAT vous est envoyé sous 48h pour validation avant impression.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-white px-4 py-8 text-center">
              <p className="text-sm font-medium text-brand-navy">
                Glissez votre logo ici
              </p>
              <p className="mt-1 text-xs text-muted-foreground">ou parcourir vos fichiers</p>
              <LinkButton href={routes.quote} variant="brand" size="ctaSm" className="mt-4">
                Demander un devis avec fichier
              </LinkButton>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Maquette interactive — upload simulé, sans envoi réel.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <h3 className="text-xl font-bold text-brand-navy">Questions fréquentes</h3>
          <FaqWithStructuredData items={personalizationFaq} className="mt-6" />
        </div>
      </div>
    </section>
  );
}
