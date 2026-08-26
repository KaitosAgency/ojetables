import Link from "next/link";
import {
  catalogNavCategories,
  nav,
  ojetablesLive,
  routes,
  type CatalogNavCategory,
  type NavLink,
  type ProductNavGroup,
} from "@/lib/site";

function getCategoryGroups(category: CatalogNavCategory): ProductNavGroup[] {
  return category.groups ?? [{ title: category.label, items: category.items ?? [] }];
}

function CrawlNavLink({ item }: { item: NavLink }) {
  return (
    <li>
      <Link href={item.href}>{item.label}</Link>
      {item.children?.length ? (
        <ul>
          {item.children.map((child) => (
            <CrawlNavLink key={`${item.label}-${child.label}`} item={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function CrawlCategoryTree({ category }: { category: CatalogNavCategory }) {
  const groups = getCategoryGroups(category);

  return (
    <li>
      <Link href={category.href}>{category.label}</Link>
      {groups.map((group) => (
        <ul key={`${category.id}-${group.title}`}>
          {group.items.map((item) => (
            <CrawlNavLink key={`${group.title}-${item.label}`} item={item} />
          ))}
        </ul>
      ))}
    </li>
  );
}

/**
 * Arborescence catalogue en HTML statique (sr-only) pour crawlers et lecteurs d'écran.
 * Complète le megamenu interactif (client) dont les panneaux ne sont montés qu'à l'ouverture.
 */
export function CatalogNavCrawl() {
  return (
    <nav aria-label="Plan du site et catalogue produits" className="sr-only">
      <p id="crawl-nav-heading">Navigation principale Ojetables</p>
      <ul aria-labelledby="crawl-nav-heading">
        <li>
          <Link href={routes.home}>Accueil</Link>
        </li>
        <li>
          <Link href={routes.category}>Catalogue vaisselle jetable</Link>
        </li>
        {nav.highlights.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
        {nav.main.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
        <li>
          <Link href={routes.account}>Mon compte</Link>
        </li>
        <li>
          <Link href={ojetablesLive.contact}>Contact</Link>
        </li>
      </ul>

      <p id="crawl-catalog-heading">Catalogue par famille</p>
      <ul aria-labelledby="crawl-catalog-heading">
        {catalogNavCategories.map((category) => (
          <CrawlCategoryTree key={category.id} category={category} />
        ))}
      </ul>
    </nav>
  );
}
