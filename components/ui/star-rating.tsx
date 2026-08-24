import { cn } from "@/lib/utils";

type StarRatingProps = {
  className?: string;
  size?: "sm" | "md";
  /** Note sur 5 - défaut 5 (affichage plein, ex. note boutique). */
  value?: number;
  /** Variante pour fond sombre (footer, bandeau navy). */
  tone?: "default" | "inverse";
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function StarRating({ className, size = "md", value = 5, tone = "default" }: StarRatingProps) {
  const starSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  const clamped = Math.max(0, Math.min(5, value));
  const emptyStarClass =
    tone === "inverse"
      ? "fill-white/15 text-white/15"
      : "fill-muted-foreground/20 text-muted-foreground/20";

  return (
    <span className={cn("inline-flex gap-px", className)}>
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.max(0, Math.min(1, clamped - index));

        return (
          <span key={index} className="relative inline-flex shrink-0">
            <StarIcon className={cn(starSize, emptyStarClass)} />
            {fill > 0 ? (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <StarIcon className={cn(starSize, "fill-amber-400 text-amber-400")} />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}
