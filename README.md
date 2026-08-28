# Ojetables - Maquette interactive

Preview Next.js de la refonte Ojetables.fr, réalisée par [Kaitos Agency](https://kaitos.agency) suite au [pré-audit Ojetables](https://kaitos.agency/p/preaudit-ojetables).

> **Maquette preview — non contractuelle.** Placeholders visuels, panier simulé, une fiche produit fonctionnelle. Voir [docs/maquette-limitations.md](./docs/maquette-limitations.md).

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Infra SEO : meta, OG, JSON-LD, FAQ, sitemap

## Pages indexables (4)

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, catalogue, secteurs, avis, FAQ |
| `/vaisselle-jetable` | Catégorie exemple — filtres, pagination, JSON-LD CollectionPage |
| `/produit/gobelet-carton-24cl-kraft-individuel` | Fiche produit — galerie, prix, tabs, JSON-LD Product |
| `/destockage` | Promotions — grille + JSON-LD CollectionPage |

## Démarrage local

```bash
cd Maquette_interactive
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run lint
npm run build
node scripts/parse-nav.mjs    # Régénère lib/catalog-nav-data.json
```

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL canonique preview (ex. `https://ojetables-maquette.vercel.app`) |

Sans cette variable, canonical / OG / JSON-LD utilisent `https://www.ojetables.fr`.

## Déploiement Vercel

1. Root du projet = dossier `Maquette_interactive`
2. Définir `NEXT_PUBLIC_SITE_URL`
3. Deploy

## Documentation équipe

- [Architecture](./docs/architecture.md)
- [Limitations maquette](./docs/maquette-limitations.md)
- [Contribuer](./CONTRIBUTING.md)

## Structure (après refactor)

```
app/                  Routes Next.js
components/           UI, sections, SEO
lib/site/             Données marque (barrel @/lib/site)
lib/products/         Fiche produit exemple
lib/maquette/         Overrides preview (retirer en prod)
lib/types/            Types partagés
```
