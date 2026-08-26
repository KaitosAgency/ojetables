/** Valeur par défaut (grille 4 col × 6 lignes). */
export const DEFAULT_CATEGORY_PER_PAGE = 24;

export const CATEGORY_PER_PAGE_OPTIONS = [12, 24, 48, 96] as const;

/** @deprecated Utiliser DEFAULT_CATEGORY_PER_PAGE */
export const CATEGORY_PRODUCTS_PER_PAGE = DEFAULT_CATEGORY_PER_PAGE;

export function parseCategoryPage(value: string | string[] | null | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

export function parseCategoryPerPage(value: string | string[] | null | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? String(DEFAULT_CATEGORY_PER_PAGE), 10);
  if (CATEGORY_PER_PAGE_OPTIONS.includes(parsed as (typeof CATEGORY_PER_PAGE_OPTIONS)[number])) {
    return parsed;
  }
  return DEFAULT_CATEGORY_PER_PAGE;
}

export function getCategoryPageCount(
  totalProducts: number,
  perPage = DEFAULT_CATEGORY_PER_PAGE,
): number {
  if (totalProducts <= 0) return 1;
  return Math.ceil(totalProducts / perPage);
}

export function clampCategoryPage(page: number, totalPages: number): number {
  if (totalPages < 1) return 1;
  return Math.min(Math.max(1, page), totalPages);
}

export function sliceCategoryPage<T>(
  items: readonly T[],
  page: number,
  perPage = DEFAULT_CATEGORY_PER_PAGE,
): T[] {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * perPage;
  return items.slice(start, start + perPage);
}

/** Chemin maquette : `?page=N` et `?limit=N` (limit omis si valeur par défaut). */
export function categoryPagePath(
  basePath: string,
  page: number,
  perPage = DEFAULT_CATEGORY_PER_PAGE,
): string {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (perPage !== DEFAULT_CATEGORY_PER_PAGE) params.set("limit", String(perPage));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function getCategoryPageRange(
  current: number,
  total: number,
  maxVisible = 7,
): number[] {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function getCategoryPaginationMeta(
  basePath: string,
  page: number,
  totalPages: number,
  siteUrl: string,
  perPage = DEFAULT_CATEGORY_PER_PAGE,
) {
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return {
    canonicalPath: categoryPagePath(basePath, page, perPage),
    prevUrl: prevPage ? `${siteUrl}${categoryPagePath(basePath, prevPage, perPage)}` : null,
    nextUrl: nextPage ? `${siteUrl}${categoryPagePath(basePath, nextPage, perPage)}` : null,
  };
}
