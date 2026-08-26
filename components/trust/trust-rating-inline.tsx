import { StarRating } from "@/components/ui/star-rating";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type TrustRatingInlineProps = {
  variant?: "compact" | "featured";
  className?: string;
  /** Affichage personnalisé (ex. « 4,7/5 » pour une catégorie). */
  scoreDisplay?: string;
  reviewCount?: number;
  reviewsHref?: string;
  starValue?: number;
  reviewCountSuffix?: string;
};

export function TrustRatingInline({
  variant = "compact",
  className,
  scoreDisplay,
  reviewCount,
  reviewsHref,
  starValue,
  reviewCountSuffix = "avis",
}: TrustRatingInlineProps) {
  const { aggregateRating } = site;
  const displayScore = scoreDisplay ?? aggregateRating.display;
  const count = reviewCount ?? aggregateRating.count;
  const href = reviewsHref ?? aggregateRating.reviewsUrl;
  const stars = starValue ?? (aggregateRating.score / 10) * 5;
  const reviewLabel = `${displayScore} sur ${count.toLocaleString("fr-FR")} ${reviewCountSuffix}`;

  if (variant === "featured") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-2 lg:flex-row lg:items-end lg:gap-4",
          className,
        )}
      >
        <p className="text-5xl font-bold leading-none tracking-tight text-brand-navy md:text-6xl">
          {displayScore}
        </p>
        <div className="pb-0 text-center lg:pb-1 lg:text-left">
          <StarRating value={stars} />
          <p className="mt-1 text-sm text-muted-foreground">
            sur {count.toLocaleString("fr-FR")} {reviewCountSuffix}
          </p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 transition-colors hover:text-brand-navy",
        className,
      )}
      aria-label={`${reviewLabel} - voir les avis ${aggregateRating.label}`}
    >
      <StarRating size="sm" value={stars} />
      <span className="underline underline-offset-2">{reviewLabel}</span>
    </a>
  );
}
