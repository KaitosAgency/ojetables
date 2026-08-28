# Limitations maquette preview

Ce document recense les écarts volontaires entre la maquette interactive et le site Magento production.

## Comportements simulés

| Zone | Maquette | Production cible |
|------|----------|----------------|
| Fiches produit | Une seule URL (`gobelet-carton-24cl-kraft-individuel`) | Slugs catalogue complets |
| Liens catalogue / cross-sell | Redirigés via `lib/maquette/overrides.ts` | URLs Magento réelles |
| Panier / checkout | `MaquetteShopProvider` (localStorage) | Checkout Magento |
| Compte client | Liens externes `ojetables.fr` | Auth Magento |
| Catégorie | `/vaisselle-jetable` uniquement | Toutes les catégories |

## Fichiers marqués `@maquette-only`

- `lib/maquette/overrides.ts` — mapping href navigation
- `lib/vaisselle-jetable-data.ts` — `href: maquetteProductHref` sur le catalogue scrapé
- `components/product/product-cross-sell.tsx` — liens similaires
- `app/produit/[slug]/page.tsx` — `generateStaticParams` statique

## Checklist migration production

1. **Supprimer `lib/maquette/`** — remplacer par vrais slugs catalogue (helpers `productPath`, `categoryPath`).
2. **Généraliser `generateStaticParams`** — depuis le record `products` ou une API Magento.
3. **Brancher le checkout** — retirer `MaquetteShopProvider`, connecter le panier Magento.
4. **Facettes URL catégorie** — retirer `FilterRobotsMeta` ou remplacer par canonicals indexables par facette.
5. **Données catalogue** — remplacer `vaisselle-jetable.json` scrapé par source Magento / PIM.
6. **Teasers produits** — `lib/site/product-teasers.ts` peut rester comme couche d’agrégation ou migrer vers l’API.

## Scripts scrape (données catégorie)

```bash
node scripts/scrape-vaisselle-jetable.mjs   # si présent
node scripts/parse-nav.mjs                  # → lib/catalog-nav-data.json
```

## Variables d’environnement

| Variable | Rôle |
|----------|------|
| `NEXT_PUBLIC_SITE_URL` | Canonical, OG, JSON-LD (obligatoire en preview Vercel) |

Sans `NEXT_PUBLIC_SITE_URL`, les URLs SEO pointent vers `https://www.ojetables.fr`.
