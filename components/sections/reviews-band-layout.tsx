import type { ReactNode } from "react";
import Image from "next/image";

import { PageContainer } from "@/components/layout/page-container";
import { avisGarantis } from "@/lib/site";
import { cn } from "@/lib/utils";

type AvisGarantisInlineLinkProps = {
  className?: string;
};

export function AvisGarantisInlineLink({ className }: AvisGarantisInlineLinkProps) {
  return (
    <a
      href={avisGarantis.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 font-medium text-brand-navy underline-offset-2 transition-colors hover:text-brand-teal-dim hover:underline",
        className,
      )}
    >
      <Image
        src={avisGarantis.assets.cocarde}
        alt=""
        width={16}
        height={16}
        className="inline-block size-4 shrink-0"
        aria-hidden
      />
      Société des Avis Garantis
    </a>
  );
}

type ReviewsBandLayoutProps = {
  header: ReactNode;
  carousel: ReactNode;
  footer?: ReactNode;
  sectionClassName?: string;
  headerClassName?: string;
};

export function ReviewsBandLayout({
  header,
  carousel,
  footer,
  sectionClassName,
  headerClassName,
}: ReviewsBandLayoutProps) {
  return (
    <section className={cn("section-padding bg-brand-beige", sectionClassName)}>
      <PageContainer>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className={cn("lg:col-span-5", headerClassName)}>{header}</div>
          <div className="flex min-w-0 flex-col justify-center lg:col-span-7">
            {carousel}
            {footer}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
