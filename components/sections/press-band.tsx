import Image from "next/image";
import { pressMedia, pressTvFeature } from "@/lib/site";
import { cn } from "@/lib/utils";
import { JsonLd, pressVideoJsonLd } from "@/components/seo/json-ld";
import { PressTvVideo } from "./press-tv-video";
import { SectionHeader } from "./section-header";

export function PressBand() {
  return (
    <section
      aria-labelledby="press-band-heading"
      className="border-y border-border/60 bg-white py-10 md:py-14"
    >
      <JsonLd data={pressVideoJsonLd()} />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label={pressTvFeature.label}
          title={pressTvFeature.title}
          titleId="press-band-heading"
          description={pressTvFeature.description}
          align="center"
          titleClassName="text-2xl md:text-3xl"
        />

        <PressTvVideo />

        <div className="mt-12 border-t border-border/50 pt-8 md:mt-14 md:pt-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Eux aussi ils parlent de nous
          </p>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10 md:mt-6">
            {pressMedia.map((media) => (
              <li key={media.name}>
                <a
                  href={media.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  title={media.title}
                  className="press-band__link inline-flex items-center justify-center outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"
                >
                  <Image
                    src={media.src}
                    alt={media.name}
                    width={220}
                    height={48}
                    className={cn(
                      "press-band__logo press-band__logo--secondary w-auto object-contain",
                      media.className,
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
