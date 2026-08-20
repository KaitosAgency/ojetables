import { LinkButton } from "@/components/ui/link-button";

export function B2cTeaser() {
  return (
    <section id="evenements" className="section-padding bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-3xl border border-brand-kraft/30 bg-gradient-to-br from-brand-beige to-white p-8 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">Particuliers</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
            Organisez un mariage, une réception, un anniversaire ?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Vaisselle éco dès petites quantités — sans sacrifier le positionnement pro. Une entrée B2C
            claire pour vos événements privés.
          </p>
          <LinkButton href="#" variant="brandOutline" size="cta" className="mt-6">
            Voir nos solutions événements
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
