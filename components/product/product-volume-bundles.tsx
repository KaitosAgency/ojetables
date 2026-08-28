"use client";

import Image from "next/image";

import type { VolumeBundleReward } from "@/lib/products";
import { formatPriceWithEuro } from "@/lib/product-format";
import { cn } from "@/lib/utils";

type ProductVolumeBundlesProps = {
  bundles: readonly VolumeBundleReward[];
  quantity: number;
};

function BundleThresholdBadge({
  thresholdHt,
  unlocked,
}: {
  thresholdHt: number;
  unlocked: boolean;
}) {
  return (
    <span
      className={cn(
        "product-volume-bundle__badge",
        unlocked ? "product-volume-bundle__badge--unlocked" : "product-volume-bundle__badge--locked",
      )}
      aria-hidden
    >
      <span>À</span>
      <span>PARTIR</span>
      <span>DE</span>
      <span>{formatPriceWithEuro(thresholdHt)}</span>
    </span>
  );
}

function BundleCard({
  bundle,
  unlocked,
}: {
  bundle: VolumeBundleReward;
  unlocked: boolean;
}) {
  return (
    <li className="min-w-0 overflow-visible">
      <div
        className={cn(
          "relative flex aspect-square w-full flex-col overflow-visible rounded-lg border bg-white p-2",
          unlocked ? "border-brand-teal" : "border-neutral-300",
        )}
      >
        <BundleThresholdBadge thresholdHt={bundle.thresholdHt} unlocked={unlocked} />

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center pt-1">
          <div className="relative aspect-square w-[72%] max-w-[5.5rem]">
            <Image
              src={bundle.image}
              alt={bundle.imageAlt}
              fill
              sizes="88px"
              className={cn(
                "object-contain transition-[filter] duration-300",
                !unlocked && "grayscale",
              )}
            />
          </div>
        </div>

        <p
          className={cn(
            "shrink-0 px-0.5 text-center text-[10px] font-bold leading-snug sm:text-[11px]",
            unlocked ? "text-brand-teal-dim" : "text-neutral-400",
          )}
        >
          {bundle.name}
        </p>
      </div>
    </li>
  );
}

export function ProductVolumeBundles({ bundles, quantity }: ProductVolumeBundlesProps) {
  return (
    <section aria-label="Bonus volume" className="product-volume-bundles">
      <ul className="grid grid-cols-3 gap-2 overflow-visible sm:gap-2.5">
        {bundles.map((bundle) => (
          <BundleCard
            key={bundle.minPacks}
            bundle={bundle}
            unlocked={quantity >= bundle.minPacks}
          />
        ))}
      </ul>
    </section>
  );
}
