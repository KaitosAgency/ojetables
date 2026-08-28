export {
  featuredCategoryPath,
  featuredCategorySlug,
  featuredProductSlug,
  productPath,
} from "@/lib/routes";

export { maquetteProductHref } from "@/lib/maquette/overrides";

export {
  SHIPPING_FREE_FROM_HT,
  shippingDeliverySubtitle,
  shippingExtraOptions,
  shippingFreeFromLabel,
  shippingOptions,
  shippingRateTiers,
  shippingSummaryText,
  formatShippingCostLabel,
  getAmountUntilFreeShippingHt,
  getStandardShippingCostHt,
} from "@/lib/shipping";

export {
  site,
  avisGarantis,
  getSiteUrl,
  ojetablesLive,
  logos,
  favicon,
  tabTitleAnimation,
  partnerLogos,
  topBar,
  merchantReturnPolicy,
} from "./config";

export { routes } from "./routes";

export {
  nav,
  catalogNavCategories,
  catalogNavHotCategoryIds,
  headerActions,
  type NavHighlight,
  type NavLink,
  type CatalogNavCategory,
  type ProductNavGroup,
} from "./navigation";

export {
  catalogFamilies,
  catalogSeo,
  personalizationSteps,
  personalizationProductTypes,
  personalizationWizardOptions,
  type CatalogFamilyAccent,
  type CatalogFamily,
  type PersonalizationProductType,
} from "./catalog-data";

export {
  destockageItems,
  destockagePage,
  type DestockageProduct,
} from "./destockage-data";

export {
  sectors,
  bestSellers,
  type SectorProduct,
} from "./sectors-data";

export {
  homeFaq,
  trustPillars,
  ecoCommitments,
  ecoSeo,
  reviewsFallback,
  leadMagnet,
  pressTvFeature,
  pressMedia,
  clientLogos,
  type ReviewItem,
  type FaqItem,
} from "./homepage-content";

export {
  footerNav,
  footerCatalog,
  legalLinks,
  footerSeoLinks,
  type FooterLink,
} from "./footer-data";
