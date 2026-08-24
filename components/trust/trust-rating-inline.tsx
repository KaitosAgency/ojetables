import { StarRating } from "@/components/ui/star-rating";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type TrustRatingInlineProps = {
  variant?: "compact" | "featured";
  className?: string;
};

export function TrustRatingInline({ variant = "compact", className }: TrustRatingInlineProps) {
  const { aggregateRating } = site;
  const reviewLabel = `${aggregateRating.display} sur ${aggregateRating.count.toLocaleString("fr-FR")} avis`;

  if (variant === "featured") {
    return (
      <div className={cn("flex items-end gap-4", className)}>
        <p className="text-5xl font-bold leading-none tracking-tight text-brand-navy md:text-6xl">
          {aggregateRating.display}
        </p>
        <div className="pb-1">
          <StarRating />
          <p className="mt-1 text-sm text-muted-foreground">
            sur {aggregateRating.count.toLocaleString("fr-FR")} avis
          </p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={aggregateRating.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 transition-colors hover:text-brand-navy",
        className,
      )}
      aria-label={`${reviewLabel} - voir les avis ${aggregateRating.label}`}
    >
      <StarRating size="sm" />
      <span className="underline underline-offset-2">{reviewLabel}</span>
    </a>
  );
}
