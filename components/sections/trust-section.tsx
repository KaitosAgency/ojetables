import { Award, CreditCard, Package, Star, type LucideIcon } from "lucide-react";
import { trustPillars } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

const trustIcons: LucideIcon[] = [Star, Package, CreditCard, Award];

function TrustCardIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative mb-4 flex h-10 w-10 items-center justify-center">
      <div className="absolute inset-0 rounded-lg bg-brand-kraft/15" />
      <Icon className="relative h-5 w-5 text-brand-navy" strokeWidth={1.75} aria-hidden />
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="Pourquoi Ojetables ?"
          title="Réassurance pro, visible dès la homepage."
          description="9,5/10 sur 2 417 avis, livraison 24/48h, paiement 30j pro et passages TV M6 & Capital."
        />

        <div className="trust-cards mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((pillar, index) => {
            const Icon = trustIcons[index] ?? Star;
            return (
              <div
                key={pillar.title}
                className={cn(
                  "trust-card flex h-full flex-col rounded-2xl p-5 sm:p-6",
                  index === 0 && "trust-card-default",
                )}
              >
                <TrustCardIcon icon={Icon} />
                <h3 className="text-base font-bold leading-snug text-brand-navy sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
