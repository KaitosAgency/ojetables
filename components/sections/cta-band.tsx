import { LinkButton } from "@/components/ui/link-button";

export function CtaBand() {
  return (
    <section id="devis" className="section-divider-top bg-white section-padding">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">Compte pro</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
          Tarifs dégressifs et devis volume en 2 minutes.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Créez votre compte professionnel ou demandez un devis pour vos volumes. Livraison 24/72h,
          paiement à 30 jours.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-stretch">
          <LinkButton href="#compte-pro" id="compte-pro" variant="brand" size="cta">
            Créer un compte pro
          </LinkButton>
          <LinkButton href="#devis" variant="brandOutline" size="cta">
            Demander un devis
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
