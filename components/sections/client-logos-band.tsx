import { clientLogos } from "@/lib/site";
import { SectionHeader } from "./section-header";

type ClientLogosBandProps = {
  compact?: boolean;
};

export function ClientLogosBand({ compact = false }: ClientLogosBandProps) {
  return (
    <section className={compact ? "bg-white py-10" : "section-padding bg-white"}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {!compact ? (
          <SectionHeader
            label="Preuve sociale"
            title="Ils nous font confiance"
            description="Des références B2B visibles dès la homepage — votre meilleur argument commercial."
            align="center"
          />
        ) : (
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">
            Ils nous font confiance
          </p>
        )}

        <ul
          className={
            compact
              ? "mt-6 flex flex-wrap items-center justify-center gap-3"
              : "mt-10 flex flex-wrap items-center justify-center gap-4"
          }
        >
          {clientLogos.map((logo) => (
            <li
              key={logo.name}
              className="inline-flex min-w-[8rem] items-center justify-center rounded-xl border border-border bg-brand-beige/50 px-5 py-3 text-sm font-semibold text-brand-navy"
            >
              {logo.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
