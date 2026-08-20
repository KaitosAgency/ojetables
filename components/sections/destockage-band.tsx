import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { destockageItems } from "@/lib/site";

export function DestockageBand() {
  return (
    <section id="destockage" className="scroll-mt-36 border-y border-border bg-brand-kraft/10 py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-kraft">
              Destockage
            </p>
            <h2 className="mt-2 text-2xl font-bold text-brand-navy md:text-3xl">
              Promotions & fins de série
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Accès direct depuis le menu — stocks limités, prix cassés sur références sélectionnées.
            </p>
          </div>
          <LinkButton href="#" variant="brandOutline" size="ctaSm">
            Voir tout le destockage
          </LinkButton>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destockageItems.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-border bg-white p-4 shadow-sm"
            >
              <Badge
                variant="outline"
                className="border-brand-kraft/50 bg-brand-kraft/15 text-[11px] font-bold uppercase text-brand-navy"
              >
                {item.badge}
              </Badge>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-brand-navy">
                {item.name}
              </h3>
              <p className="mt-3 text-sm">
                <span className="text-muted-foreground line-through">{item.priceWas}</span>{" "}
                <span className="font-bold text-brand-teal">{item.priceNow}</span>
                <span className="text-muted-foreground"> HT</span>
              </p>
              <LinkButton href="#" variant="link" className="mt-2 h-auto p-0 text-brand-teal">
                Voir l&apos;offre →
              </LinkButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
