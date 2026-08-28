import { merchantReturnPolicy, getSiteUrl } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/types/breadcrumb";

export function breadcrumbItemUrl(path: string): string {
  return path.startsWith("http") ? path : `${getSiteUrl()}${path}`;
}

export function breadcrumbEntity(path: string, breadcrumbs: readonly BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${getSiteUrl()}${path}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: breadcrumbItemUrl(item.path) } : {}),
    })),
  };
}

export function breadcrumbJsonLd(path: string, breadcrumbs: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    ...breadcrumbEntity(path, breadcrumbs),
  };
}

export function merchantReturnPolicyEntity() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: merchantReturnPolicy.applicableCountry,
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: merchantReturnPolicy.returnDays,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
    returnPolicyUrl: merchantReturnPolicy.url,
  };
}

export function absoluteNavUrl(href: string, base: string): string {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }
  if (href.startsWith("/#")) {
    return `${base}${href}`;
  }
  if (href.startsWith("#")) {
    return `${base}/${href}`;
  }
  if (href.startsWith("/")) {
    return `${base}${href}`;
  }
  return `${base}/${href}`;
}
