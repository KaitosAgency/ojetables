"use client";

import { useMemo, useState } from "react";

import { AvisGarantisLogo } from "@/components/trust/avis-garantis-logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarRating } from "@/components/ui/star-rating";
import type { Product, ProductReviewItem } from "@/lib/products";
import { avisGarantis } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProductReviewsPanelProps = {
  product: Product;
  className?: string;
};

type ReviewSortKey = "helpful" | "recent" | "rating";

const REVIEW_SORT_OPTIONS: { value: ReviewSortKey; label: string }[] = [
  { value: "helpful", label: "Les plus utiles" },
  { value: "recent", label: "Les plus récents" },
  { value: "rating", label: "Meilleures notes" },
];

function sortReviews(items: readonly ProductReviewItem[], sort: ReviewSortKey) {
  const list = [...items];

  switch (sort) {
    case "recent":
      return list.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    default:
      return list;
  }
}

function StarDistributionBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="grid grid-cols-[5.75rem_minmax(0,1fr)_2.25rem] items-center gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-amber-400 transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-right text-xs tabular-nums text-muted-foreground">{percent} %</span>
    </div>
  );
}

function formatReviewDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export function ProductReviewsPanel({ product, className }: ProductReviewsPanelProps) {
  const [sort, setSort] = useState<ReviewSortKey>("helpful");
  const sortedReviews = useMemo(
    () => sortReviews(product.productReviews, sort),
    [product.productReviews, sort],
  );

  const ratingDisplay = product.rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

  return (
    <article
      className={cn("overflow-hidden rounded-xl border border-border bg-white", className)}
      aria-labelledby="avis-title"
    >
      <div className="border-b border-border bg-secondary/80 px-4 py-3 sm:px-5">
        <h2 id="avis-title" className="text-base font-bold text-brand-navy">
          Avis clients
        </h2>
      </div>

      <div className="px-4 py-5 sm:px-5 sm:py-6">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <div>
            <p className="text-sm font-bold text-brand-navy">Note générale</p>
            <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-brand-navy">
              {ratingDisplay}
              <span className="text-lg font-semibold text-muted-foreground"> / 5</span>
            </p>
            <StarRating value={product.rating} size="md" className="mt-2" />
            <p className="mt-2 text-sm text-muted-foreground">
              Sur une moyenne de{" "}
              <strong className="font-semibold text-brand-navy">
                {product.reviewCount.toLocaleString("fr-FR")} avis
              </strong>
            </p>
            <AvisGarantisLogo
              height={28}
              showCertificateLink
              tone="light"
              className="mt-4 items-start"
            />
          </div>

          <div className="space-y-2 sm:border-l sm:border-border/70 sm:pl-8">
            {product.reviewDistribution.map((row) => (
              <StarDistributionBar
                key={row.stars}
                label={`${row.stars} étoile${row.stars > 1 ? "s" : ""}`}
                percent={row.percent}
              />
            ))}
          </div>
        </div>

        <div className="my-6 border-t border-border/70" />

        <div>
          <h3 className="text-sm font-bold text-brand-navy">Témoignages de nos clients</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.reviewInsights.summary}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-brand-navy">Les plus :</strong>{" "}
            {product.reviewInsights.pros.join(", ")}.
          </p>
          <p className="mt-3 text-xs italic text-brand-teal-dim">
            *Généré par IA à partir du texte des commentaires clients
          </p>
        </div>

        <div className="my-6 border-t border-border/70" />

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">Trier par :</span>
          <Select
            value={sort}
            onValueChange={(nextValue) => {
              if (
                nextValue === "helpful" ||
                nextValue === "recent" ||
                nextValue === "rating"
              ) {
                setSort(nextValue);
              }
            }}
          >
            <SelectTrigger
              size="sm"
              className="!h-9 !min-h-9 max-h-9 min-w-[11rem] cursor-pointer border-border/90 bg-white py-0 text-sm text-brand-navy shadow-none"
              aria-label="Trier les avis"
            >
              <SelectValue>
                {REVIEW_SORT_OPTIONS.find((option) => option.value === sort)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
              {REVIEW_SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ul className="mt-5 divide-y divide-border/70">
          {sortedReviews.map((review) => (
            <li key={review.id} className="py-5 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <StarRating value={review.rating} size="sm" />
                <span className="text-xs text-muted-foreground">
                  Publié le {formatReviewDate(review.publishedAt)}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-brand-navy">{review.author}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.text}</p>
            </li>
          ))}
        </ul>

        <a
          href={avisGarantis.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex text-sm font-semibold text-brand-teal hover:text-brand-teal-dim hover:underline"
        >
          Voir tous les avis certifiés →
        </a>
      </div>
    </article>
  );
}
