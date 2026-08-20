import Link from "next/link";
import { sectors } from "@/lib/site";
import { SectionHeader } from "./section-header";

export function SectorsSection() {
  return (
    <section id="produits" className="section-padding section-glow">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="Par métier"
          title="Best-sellers par secteur"
          description="Des entrées claires pour vos acheteurs pro — traiteurs, CHR, collectivités et personnalisation."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {sectors.map((sector) => (
            <article
              key={sector.title}
              className="card-outline rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-brand-navy">{sector.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sector.description}</p>
              <Link
                href={sector.href}
                className="mt-5 inline-flex text-sm font-semibold text-brand-teal transition-colors hover:text-brand-teal-dim"
              >
                {sector.cta} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
