import Link from "next/link";
import { Mail, Phone, Truck } from "lucide-react";

import { site, topBar } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeaderTopBarProps = {
  className?: string;
};

export function HeaderTopBar({ className }: HeaderTopBarProps) {
  return (
    <div className={cn("bg-brand-navy-deep text-white", className)}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-1.5 text-center text-[11px] leading-tight md:px-6 md:text-xs lg:justify-between lg:text-left">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 lg:justify-start">
          <p className="inline-flex items-center gap-1 font-medium">
            <Truck className="h-3 w-3 shrink-0 opacity-90" aria-hidden />
            {topBar.delivery}
          </p>
          <span className="hidden opacity-50 lg:inline" aria-hidden>
            |
          </span>
          <p className="inline-flex items-center gap-1 font-bold text-brand-teal-light">
            Nouveaux clients : -5% avec le code BIENVENUE
          </p>
        </div>
        <HeaderTopBarContactLinks layout="inline" />
      </div>
    </div>
  );
}

type HeaderTopBarContactLinksProps = {
  layout: "inline" | "stacked";
  className?: string;
};

/** Liens contact top barre — réutilisés dans le menu mobile. */
export function HeaderTopBarContactLinks({ layout, className }: HeaderTopBarContactLinksProps) {
  const isInline = layout === "inline";

  return (
    <div
      className={cn(
        isInline
          ? "hidden flex-wrap items-center gap-x-3 gap-y-0.5 lg:flex"
          : "flex flex-col items-center gap-0.5",
        className,
      )}
    >
      <a
        href={site.phoneHref}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-90",
          !isInline && "justify-center rounded-md px-1.5 py-1.5 text-xs font-medium text-brand-navy hover:bg-muted",
        )}
      >
        <Phone
          className={cn("shrink-0", isInline ? "h-3 w-3 opacity-90" : "h-3.5 w-3.5 text-brand-teal")}
          aria-hidden
        />
        {site.phone}
      </a>
      <a
        href={`mailto:${site.email}`}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-90",
          !isInline && "justify-center rounded-md px-1.5 py-1.5 text-xs font-medium text-brand-navy hover:bg-muted",
        )}
      >
        <Mail
          className={cn("shrink-0", isInline ? "h-3 w-3 opacity-90" : "h-3.5 w-3.5 text-brand-teal")}
          aria-hidden
        />
        {site.email}
      </a>
      {isInline ? (
        <Link
          href={topBar.contactHref}
          className="cursor-pointer font-semibold underline-offset-2 hover:underline"
        >
          {topBar.contactLabel}
        </Link>
      ) : null}
    </div>
  );
}
