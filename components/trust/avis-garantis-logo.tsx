import Image from "next/image";

import { avisGarantis, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type AvisGarantisLogoProps = {
  className?: string;
  height?: number;
  showCertificateLink?: boolean;
  tone?: "light" | "dark";
};

export function AvisGarantisLogo({
  className,
  height = 32,
  showCertificateLink = false,
  tone = "dark",
}: AvisGarantisLogoProps) {
  const width = Math.round(height * 4.3);
  const isLight = tone === "light";

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <a
        href={avisGarantis.reviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex transition-opacity hover:opacity-90"
        aria-label={`${site.aggregateRating.display} sur ${site.aggregateRating.count.toLocaleString("fr-FR")} avis certifiés ${site.aggregateRating.label}`}
      >
        <Image
          src={avisGarantis.assets.logo}
          alt={site.aggregateRating.label}
          width={width}
          height={height}
          className="h-auto w-auto"
          style={{ height: `${height}px`, width: "auto" }}
        />
      </a>
      {showCertificateLink ? (
        <a
          href={avisGarantis.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-xs underline-offset-2 transition-colors hover:underline",
            isLight
              ? "text-muted-foreground hover:text-brand-navy"
              : "text-brand-beige/80 hover:text-white",
          )}
        >
          {avisGarantis.certificateLabel}
        </a>
      ) : null}
    </div>
  );
}
