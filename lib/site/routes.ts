import {
  featuredCategoryPath,
  featuredProductSlug,
  productPath,
} from "@/lib/routes";
import { ojetablesLive } from "./config";

export const routes = {
  home: "/",
  product: productPath(featuredProductSlug),
  account: ojetablesLive.account,
  quote: ojetablesLive.quote,
  mariage: ojetablesLive.mariage,
  /** Page personnalisation prod. */
  personalization: "https://www.ojetables.fr/vaisselle-jetable-personnalisable/",
  /** Page catégorie maquette — toutes les familles catalogue y convergent. */
  category: featuredCategoryPath,
  /** Ancre homepage sections catalogue. */
  catalog: "/#catalogue",
  /** Panier Magento prod — maquette sans checkout interne. */
  cart: "https://www.ojetables.fr/checkout/cart/",
  destockage: "/destockage",
} as const;
