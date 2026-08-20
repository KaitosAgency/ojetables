import { BandBottomArc } from "@/components/ui/band-bottom-arc";
import { proofStats, statsBandBadges } from "@/lib/site";

export function StatsBand() {
  return (
    <section className="relative z-10 bg-brand-navy pb-5 md:pb-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {proofStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold tracking-tight text-brand-teal md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <ul className="flex flex-wrap items-center gap-2">
          {statsBandBadges.map((badge) => (
            <li
              key={badge.label}
              className="inline-flex items-center gap-2 rounded-full border border-brand-teal/15 bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-400"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal/70" aria-hidden />
              {badge.label}
            </li>
          ))}
        </ul>
      </div>
      <BandBottomArc />
    </section>
  );
}
