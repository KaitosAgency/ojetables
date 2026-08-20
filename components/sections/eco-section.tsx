import { ecoCommitments } from "@/lib/site";
import { SectionHeader } from "./section-header";

export function EcoSection() {
  return (
    <section id="eco" className="section-padding bg-brand-beige/40">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="Engagements"
          title="Nos engagements éco"
          description="Conformité loi AGEC, alternatives au plastique et produits certifiés contact alimentaire."
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {ecoCommitments.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl border border-brand-teal/20 bg-white px-5 py-4 text-sm font-medium text-brand-navy"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
