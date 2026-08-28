"use client";

import { PageContainer } from "@/components/layout/page-container";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { CategoryFiltersMobile } from "@/components/category/category-filters-mobile";
import { CategoryFiltersPanel } from "@/components/category/category-filters-panel";
import { CategoryPagination } from "@/components/category/category-pagination";
import { CategoryProductGrid } from "@/components/category/category-product-grid";
import { CategorySearchInput } from "@/components/category/category-search-input";
import { CategorySortSelect } from "@/components/category/category-sort-select";
import { FilterRobotsMeta } from "@/components/seo/filter-robots-meta";
import { useMaquetteShop } from "@/lib/maquette-shop-context";
import type { Category } from "@/lib/categories";
import { categoryPath } from "@/lib/categories";
import { vaisselleJetableFilterGroups } from "@/lib/category-filters";
import {
  getProductPriceBounds,
  isPriceRangeActive,
  type CategoryPriceRange,
} from "@/lib/category-price-filter";
import { countPromoProducts } from "@/lib/category-promo";
import {
  filterProductsByCategorySearch,
  isCategorySearchActive,
} from "@/lib/category-search";
import {
  clampCategoryPage,
  categoryPagePath,
  getCategoryPageCount,
  parseCategoryPage,
  parseCategoryPerPage,
  sliceCategoryPage,
} from "@/lib/category-pagination";
import {
  filterVaisselleProducts,
  type VaisselleJetableProduct,
} from "@/lib/vaisselle-jetable-data";
import {
  sortCategoryProducts,
  type CategorySortKey,
} from "@/lib/category-sort";

type CategoryCatalogProps = {
  category: Category;
  products: readonly VaisselleJetableProduct[];
};

export function CategoryCatalog({ category, products }: CategoryCatalogProps) {
  const basePath = categoryPath(category.slug);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeFilterKeysByGroup, setActiveFilterKeysByGroup] = useState<
    Record<string, string[]>
  >({});
  const [priceRange, setPriceRange] = useState<CategoryPriceRange | null>(null);
  const [destockageOnly, setDestockageOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPage, setFilterPage] = useState(1);
  const [filterPerPage, setFilterPerPage] = useState(() =>
    parseCategoryPerPage(searchParams.get("limit")),
  );
  const [sortKey, setSortKey] = useState<CategorySortKey>("default");

  const { favoriteKeys } = useMaquetteShop();

  const priceBounds = useMemo(() => getProductPriceBounds(products), [products]);
  const promoCount = useMemo(() => countPromoProducts(products), [products]);
  const favoriteCountInCategory = useMemo(
    () => products.filter((product) => favoriteKeys.has(product.id)).length,
    [products, favoriteKeys],
  );

  const filteredProducts = useMemo(() => {
    let result = filterVaisselleProducts(
      products,
      activeFilterKeysByGroup,
      priceRange,
      priceBounds,
      destockageOnly,
    );
    result = filterProductsByCategorySearch(result, searchQuery);
    if (favoritesOnly) {
      result = result.filter((product) => favoriteKeys.has(product.id));
    }
    return result;
  }, [
    products,
    activeFilterKeysByGroup,
    priceRange,
    priceBounds,
    destockageOnly,
    searchQuery,
    favoritesOnly,
    favoriteKeys,
  ]);

  const sortedProducts = useMemo(
    () => sortCategoryProducts(filteredProducts, sortKey),
    [filteredProducts, sortKey],
  );

  const checkboxFilterCount = Object.values(activeFilterKeysByGroup).reduce(
    (sum, keys) => sum + keys.length,
    0,
  );
  const isPriceFilterActive = isPriceRangeActive(priceRange, priceBounds);
  const isSearchActive = isCategorySearchActive(searchQuery);
  const activeFilterCount =
    checkboxFilterCount +
    (isPriceFilterActive ? 1 : 0) +
    (destockageOnly ? 1 : 0) +
    (favoritesOnly ? 1 : 0) +
    (isSearchActive ? 1 : 0);
  const hasFilters = activeFilterCount > 0;

  const urlPage = parseCategoryPage(searchParams.get("page"));
  const urlPerPage = parseCategoryPerPage(searchParams.get("limit"));
  const perPage = hasFilters ? filterPerPage : urlPerPage;
  const totalPages = getCategoryPageCount(sortedProducts.length, perPage);

  const currentPage = hasFilters
    ? clampCategoryPage(filterPage, totalPages)
    : clampCategoryPage(urlPage, totalPages);

  const paginatedProducts = useMemo(
    () => sliceCategoryPage(sortedProducts, currentPage, perPage),
    [sortedProducts, currentPage, perPage],
  );

  useEffect(() => {
    if (hasFilters) return;
    if (urlPage !== currentPage && searchParams.get("page")) {
      router.replace(categoryPagePath(basePath, currentPage, urlPerPage), { scroll: false });
    }
  }, [hasFilters, urlPage, currentPage, searchParams, router, basePath, urlPerPage]);

  function handleFilterChange(active: Record<string, string[]>) {
    setActiveFilterKeysByGroup(active);
    resetFilterPagination();
  }

  function handlePriceRangeChange(range: CategoryPriceRange | null) {
    setPriceRange(range);
    resetFilterPagination();
  }

  function handleDestockageChange(active: boolean) {
    setDestockageOnly(active);
    resetFilterPagination();
  }

  function handleFavoritesChange(active: boolean) {
    setFavoritesOnly(active);
    resetFilterPagination();
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query);
    resetFilterPagination();
  }

  function clearSearch() {
    setSearchQuery("");
    resetFilterPagination();
  }

  function resetFilterPagination() {
    setFilterPage(1);
    setFilterPerPage(urlPerPage);
    if (searchParams.get("page") || searchParams.get("limit")) {
      router.replace(categoryPagePath(basePath, 1, urlPerPage), { scroll: false });
    }
  }

  function handlePageChange(page: number) {
    if (hasFilters) {
      setFilterPage(page);
      document.getElementById("produits")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push(categoryPagePath(basePath, page, perPage), { scroll: false });
    document.getElementById("produits")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSortChange(nextSort: CategorySortKey) {
    setSortKey(nextSort);
    setFilterPage(1);
    if (!hasFilters && searchParams.get("page")) {
      router.replace(categoryPagePath(basePath, 1, perPage), { scroll: false });
    }
  }

  function handlePerPageChange(newPerPage: number) {
    if (hasFilters) {
      setFilterPerPage(newPerPage);
      setFilterPage(1);
      document.getElementById("produits")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push(categoryPagePath(basePath, 1, newPerPage), { scroll: false });
    document.getElementById("produits")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const displayCategory: Category = {
    ...category,
    products: paginatedProducts,
  };

  const resultSummary = (
    <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
      <span className="font-semibold text-brand-navy">
        {paginatedProducts.length.toLocaleString("fr-FR")} produit
        {paginatedProducts.length > 1 ? "s" : ""} sur cette page
      </span>
      <span aria-hidden> · </span>
      {sortedProducts.length.toLocaleString("fr-FR")} au total
      {isSearchActive ? (
        <>
          <span aria-hidden> · </span>
          <span>recherche « {searchQuery.trim()} »</span>
        </>
      ) : null}
    </p>
  );

  return (
    <>
      <FilterRobotsMeta active={hasFilters || sortKey !== "default"} />
      <section id="produits" className="scroll-mt-36 bg-white pb-16 pt-8 md:pb-24 md:pt-10">
        <PageContainer>
          <div className="border-b border-border/60 pb-4">
            <h2 className="sr-only">Résultats {category.label.toLowerCase()}</h2>

            <div className="flex flex-col gap-2.5 sm:hidden">
              {resultSummary}
              <div className="flex items-center gap-2">
                <CategorySortSelect
                  value={sortKey}
                  onValueChange={handleSortChange}
                  className="min-w-0 flex-1"
                />
                <CategoryFiltersMobile
                  groups={vaisselleJetableFilterGroups}
                  activeFilterKeysByGroup={activeFilterKeysByGroup}
                  onFilterChange={handleFilterChange}
                  priceBounds={priceBounds}
                  priceRange={priceRange}
                  onPriceRangeChange={handlePriceRangeChange}
                  destockageOnly={destockageOnly}
                  promoCount={promoCount}
                  onDestockageChange={handleDestockageChange}
                  favoritesOnly={favoritesOnly}
                  favoriteCount={favoriteCountInCategory}
                  onFavoritesChange={handleFavoritesChange}
                  onSearchClear={clearSearch}
                  activeFilterCount={activeFilterCount}
                />
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">{resultSummary}</div>
              <div className="flex w-full min-w-0 items-center justify-end gap-2 sm:w-auto sm:max-w-xl">
                <CategorySearchInput
                  value={searchQuery}
                  onChange={handleSearchChange}
                  categoryLabel={category.label}
                  className="hidden h-9 min-w-[9.5rem] flex-1 sm:block md:min-w-[12rem]"
                />
                <CategorySortSelect value={sortKey} onValueChange={handleSortChange} />
                <CategoryFiltersMobile
                  groups={vaisselleJetableFilterGroups}
                  activeFilterKeysByGroup={activeFilterKeysByGroup}
                  onFilterChange={handleFilterChange}
                  priceBounds={priceBounds}
                  priceRange={priceRange}
                  onPriceRangeChange={handlePriceRangeChange}
                  destockageOnly={destockageOnly}
                  promoCount={promoCount}
                  onDestockageChange={handleDestockageChange}
                  favoritesOnly={favoritesOnly}
                  favoriteCount={favoriteCountInCategory}
                  onFavoritesChange={handleFavoritesChange}
                  onSearchClear={clearSearch}
                  activeFilterCount={activeFilterCount}
                />
              </div>
            </div>
          </div>

          <CategorySearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            categoryLabel={category.label}
            className="mt-3 sm:hidden"
          />

          <div className="mt-6 flex items-start gap-8 lg:gap-10">
            <aside className="hidden w-60 shrink-0 lg:block xl:w-64">
              <div className="sticky top-[calc(var(--site-header-height)+var(--site-header-gap))]">
                <CategoryFiltersPanel
                  groups={vaisselleJetableFilterGroups}
                  activeFilterKeysByGroup={activeFilterKeysByGroup}
                  onFilterChange={handleFilterChange}
                  priceBounds={priceBounds}
                  priceRange={priceRange}
                  onPriceRangeChange={handlePriceRangeChange}
                  destockageOnly={destockageOnly}
                  promoCount={promoCount}
                  onDestockageChange={handleDestockageChange}
                  favoritesOnly={favoritesOnly}
                  favoriteCount={favoriteCountInCategory}
                  onFavoritesChange={handleFavoritesChange}
                  onSearchClear={clearSearch}
                />
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <CategoryProductGrid category={displayCategory} embedded />
              <CategoryPagination
                className="mt-8 border-t border-border/60 pt-6"
                basePath={basePath}
                currentPage={currentPage}
                totalPages={totalPages}
                totalProducts={sortedProducts.length}
                perPage={perPage}
                disableLinks={hasFilters}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
              />
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
