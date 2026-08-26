import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { CategoryPerPageSelect } from "@/components/category/category-per-page-select";
import {
  categoryPagePath,
  getCategoryPageRange,
} from "@/lib/category-pagination";
import { cn } from "@/lib/utils";

type CategoryPaginationProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  perPage: number;
  className?: string;
  disableLinks?: boolean;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
};

const MOBILE_PAGE_WINDOW = 6;
const DESKTOP_PAGE_WINDOW = 5;

export function CategoryPagination({
  basePath,
  currentPage,
  totalPages,
  totalProducts,
  perPage,
  className,
  disableLinks = false,
  onPageChange,
  onPerPageChange,
}: CategoryPaginationProps) {
  if (totalProducts === 0) return null;

  const pageRangeMobile = getCategoryPageRange(
    currentPage,
    totalPages,
    MOBILE_PAGE_WINDOW,
  );
  const pageRangeDesktop = getCategoryPageRange(
    currentPage,
    totalPages,
    DESKTOP_PAGE_WINDOW,
  );
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const useClientNav = disableLinks && onPageChange;

  const pageButtonClass =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-sm font-medium transition-colors";
  const pageButtonFillClass = cn(pageButtonClass, "min-w-0 flex-1 px-0");
  const navButtonClass = cn(
    pageButtonClass,
    "inline-flex shrink-0 flex-row items-center gap-1 px-2.5 whitespace-nowrap",
    "border border-border/90 bg-white text-brand-navy hover:border-brand-teal/40 hover:text-brand-teal-dim",
  );
  const activeClass = "bg-brand-teal text-white pointer-events-none";
  const idleClass =
    "border border-border/90 bg-white text-brand-navy hover:border-brand-teal/40 hover:text-brand-teal-dim";
  const disabledNavClass = cn(navButtonClass, "cursor-not-allowed opacity-50");

  function PageLink({
    page,
    label,
    buttonClassName = pageButtonClass,
  }: {
    page: number;
    label: string;
    buttonClassName?: string;
  }) {
    const classes = cn(buttonClassName, page === currentPage ? activeClass : idleClass);

    if (useClientNav) {
      return (
        <button
          type="button"
          className={classes}
          aria-current={page === currentPage ? "page" : undefined}
          disabled={page === currentPage}
          onClick={() => onPageChange?.(page)}
        >
          {label}
        </button>
      );
    }

    if (disableLinks) {
      return (
        <span
          className={classes}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {label}
        </span>
      );
    }

    return (
      <Link
        href={categoryPagePath(basePath, page, perPage)}
        className={classes}
        aria-current={page === currentPage ? "page" : undefined}
      >
        {label}
      </Link>
    );
  }

  function NavButton({
    direction,
    targetPage,
    disabled,
  }: {
    direction: "prev" | "next";
    targetPage: number | null;
    disabled: boolean;
  }) {
    const text = direction === "prev" ? "Préc." : "Suiv.";
    const ariaLabel = direction === "prev" ? "Page précédente" : "Page suivante";
    const icon =
      direction === "prev" ? (
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
      ) : (
        <ChevronRight className="size-4 shrink-0" aria-hidden />
      );

    const content = (
      <>
        {direction === "prev" ? icon : null}
        <span className="hidden sm:inline">{text}</span>
        {direction === "next" ? icon : null}
      </>
    );

    if (disabled) {
      return (
        <span className={disabledNavClass} aria-disabled="true">
          {content}
        </span>
      );
    }

    if (useClientNav && targetPage) {
      return (
        <button
          type="button"
          className={navButtonClass}
          onClick={() => onPageChange?.(targetPage)}
          aria-label={ariaLabel}
        >
          {content}
        </button>
      );
    }

    if (disableLinks) {
      return (
        <span className={disabledNavClass} aria-disabled="true">
          {content}
        </span>
      );
    }

    if (!targetPage) return null;

    return (
      <Link
        href={categoryPagePath(basePath, targetPage, perPage)}
        className={navButtonClass}
        rel={direction === "prev" ? "prev" : "next"}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  function PageNumberStrip({
    pageRange,
    fillWidth = false,
  }: {
    pageRange: number[];
    fillWidth?: boolean;
  }) {
    if (fillWidth) {
      return (
        <>
          {pageRange.map((page) => (
            <PageLink
              key={page}
              page={page}
              label={String(page)}
              buttonClassName={pageButtonFillClass}
            />
          ))}
        </>
      );
    }

    return (
      <>
        {pageRange[0] > 1 ? (
          <>
            <PageLink page={1} label="1" />
            {pageRange[0] > 2 ? (
              <span className="px-0.5 text-muted-foreground" aria-hidden>…</span>
            ) : null}
          </>
        ) : null}

        {pageRange.map((page) => (
          <PageLink key={page} page={page} label={String(page)} />
        ))}

        {pageRange[pageRange.length - 1] < totalPages ? (
          <>
            {pageRange[pageRange.length - 1] < totalPages - 1 ? (
              <span className="px-0.5 text-muted-foreground" aria-hidden>…</span>
            ) : null}
            <PageLink page={totalPages} label={String(totalPages)} />
          </>
        ) : null}
      </>
    );
  }

  return (
    <nav
      className={cn("category-pagination flex flex-col gap-3 text-sm", className)}
      aria-label="Pagination du catalogue"
    >
      {totalPages > 1 ? (
        <div className="flex w-full items-center gap-1 sm:hidden">
          <NavButton direction="prev" targetPage={prevPage} disabled={!prevPage} />
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <PageNumberStrip pageRange={pageRangeMobile} fillWidth />
          </div>
          <NavButton direction="next" targetPage={nextPage} disabled={!nextPage} />
        </div>
      ) : null}

      <div className="flex min-h-8 items-center justify-between gap-3 sm:hidden">
        <p className="shrink-0 whitespace-nowrap tabular-nums text-muted-foreground">
          Page{" "}
          <span className="font-medium text-brand-navy">
            {currentPage}/{totalPages}
          </span>
        </p>
        <CategoryPerPageSelect value={perPage} onValueChange={(v) => onPerPageChange?.(v)} />
      </div>

      <div className="hidden min-h-8 items-center justify-between gap-4 sm:flex">
        <div className="flex min-w-0 items-center gap-3">
          <p className="shrink-0 whitespace-nowrap tabular-nums text-muted-foreground">
            <span className="font-medium text-brand-navy">
              {currentPage}/{totalPages}
            </span>
            <span>
              <span aria-hidden> · </span>
              {totalProducts.toLocaleString("fr-FR")} prod.
            </span>
          </p>
          <CategoryPerPageSelect value={perPage} onValueChange={(v) => onPerPageChange?.(v)} />
        </div>

        {totalPages > 1 ? (
          <div className="flex shrink-0 flex-nowrap items-center justify-end gap-1">
            <NavButton direction="prev" targetPage={prevPage} disabled={!prevPage} />
            <PageNumberStrip pageRange={pageRangeDesktop} />
            <NavButton direction="next" targetPage={nextPage} disabled={!nextPage} />
          </div>
        ) : null}
      </div>
    </nav>
  );
}
