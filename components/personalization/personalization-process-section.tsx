"use client";

import { useEffect, useRef, useState } from "react";
import { PERSONALIZATION_PROCESS_MOCKUPS } from "@/components/personalization/personalization-process-mockups";
import { SectionHeader } from "@/components/sections/section-header";
import { personalizationSteps } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PersonalizationProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <SectionHeader
        label="Personnalisation"
        title="Personnalisez vos emballages avec votre logo"
        description="Même parcours que sur la fiche produit : gabarit, dépôt du visuel, puis commande — BAT sous 48 h."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {personalizationSteps.map((step, index) => {
          const Mockup = PERSONALIZATION_PROCESS_MOCKUPS[index];

          return (
            <article
              key={step.step}
              className={cn(
                "perso-process-card flex flex-col items-center rounded-2xl border border-border/80 bg-white px-4 pb-7 pt-4 text-center shadow-[0_8px_32px_rgb(61_44_38/0.06)]",
                isVisible && "perso-process-card--visible",
              )}
              style={isVisible ? { animationDelay: `${150 + index * 100}ms` } : undefined}
            >
              {Mockup ? <Mockup active={isVisible} /> : null}

              <span className="mt-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white shadow-sm">
                {step.step}
              </span>
              <h3 className="mt-3 text-base font-bold text-brand-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
