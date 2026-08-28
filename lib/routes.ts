export const featuredProductSlug = "gobelet-carton-24cl-kraft-individuel";
export const featuredCategorySlug = "vaisselle-jetable";
export const featuredCategoryPath = `/${featuredCategorySlug}`;

export function productPath(slug: string): string {
  return `/produit/${slug}`;
}

export function categoryPath(slug: string): string {
  return `/${slug}`;
}

export const routes = {
  home: "/",
  product: productPath(featuredProductSlug),
  category: featuredCategoryPath,
  catalog: "/#catalogue",
  destockage: "/destockage",
} as const;
