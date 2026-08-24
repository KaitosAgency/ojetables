import Image from "next/image";
import { clientLogos } from "@/lib/site";
import { cn } from "@/lib/utils";

const marqueeLogos = [...clientLogos, ...clientLogos];

export function ClientLogosMarquee() {
  return (
    <div className="client-logos-marquee relative min-w-0 overflow-hidden">
      <div className="client-logos-marquee__track flex items-center">
        {marqueeLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="client-logos-marquee__item flex h-16 shrink-0 items-center justify-center px-8 sm:h-[4.5rem] sm:px-5"
            aria-hidden={index >= clientLogos.length}
          >
            <Image
              src={logo.src}
              alt={index < clientLogos.length ? logo.name : ""}
              width={220}
              height={72}
              className={cn("client-logos-marquee__logo w-auto object-contain", logo.className)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
