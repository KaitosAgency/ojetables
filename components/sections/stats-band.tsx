import { BandBottomArc } from "@/components/ui/band-bottom-arc";
import { ClientLogosMarquee } from "@/components/sections/client-logos-marquee";

export function StatsBand() {
  return (
    <section className="band-arc-overlap relative z-10 overflow-hidden bg-brand-navy pb-5 md:pb-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_120%_at_0%_50%,rgb(209_125_60/0.1),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_100%_50%,rgb(255_255_255/0.03),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,15rem)_1fr]">
          <div>
            <span className="inline-flex rounded-full border border-brand-kraft/30 bg-brand-kraft/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-kraft">
              Ils nous choisissent
            </span>
            <p className="mt-3 text-base leading-relaxed text-brand-beige/65">
              Des partenaires exigeants nous font confiance au quotidien.
            </p>
          </div>

          <ClientLogosMarquee />
        </div>
      </div>
      <BandBottomArc className="text-white" />
    </section>
  );
}
