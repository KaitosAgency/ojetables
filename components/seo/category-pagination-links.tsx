import { getSiteUrl } from "@/lib/site";
import { categoryPagePath } from "@/lib/category-pagination";

type CategoryPaginationLinksProps = {
  basePath: string;
  page: number;
  totalPages: number;
  perPage?: number;
};

/** rel prev/next pour crawlers (injecté au niveau page). */
export function CategoryPaginationLinks({
  basePath,
  page,
  totalPages,
  perPage,
}: CategoryPaginationLinksProps) {
  const siteUrl = getSiteUrl();
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return (
    <>
      {prevPage ? (
        <link
          rel="prev"
          href={`${siteUrl}${categoryPagePath(basePath, prevPage, perPage)}`}
        />
      ) : null}
      {nextPage ? (
        <link
          rel="next"
          href={`${siteUrl}${categoryPagePath(basePath, nextPage, perPage)}`}
        />
      ) : null}
    </>
  );
}
