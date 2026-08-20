# Ojetables — Maquette interactive

Preview Next.js de la refonte Ojetables.fr, réalisée par [Kaitos Agency](https://kaitos.agency) suite au [pré-audit Ojetables](https://kaitos.agency/p/preaudit-ojetables).

> **Maquette preview — non contractuelle.** Placeholders visuels, pas de panier ni compte pro fonctionnel.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Infra SEO reprise du projet Proxi-it (meta, OG, JSON-LD, FAQ)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero pro, logos clients, secteurs, réassurance, FAQ |
| `/produit/assiette-biodegradable-15cm` | Fiche produit exemple — galerie, prix, tabs, JSON-LD Product |

## Démarrage local

```bash
cd Maquette_interactive
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run lint
npm run build
```

## Déploiement Vercel

1. Importer le dossier `Maquette_interactive` comme root du projet
2. Définir `NEXT_PUBLIC_SITE_URL` = URL de production Vercel (ex. `https://ojetables-maquette.vercel.app`)
3. Deploy

Sans cette variable, les URLs canoniques, OG et JSON-LD pointeront vers `ojetables.fr`.

## SEO inclus

- Metadata + canonical par page
- Images OG/Twitter dynamiques (`opengraph-image.tsx`)
- JSON-LD : Organization, WebSite, FAQPage, Product + Offer + shippingDetails
- `robots.ts` + `sitemap.ts` (2 pages indexables)
- `public/llms.txt`

## Structure

```
app/              Routes Next.js
components/       UI, sections homepage, composants produit
lib/site.ts       Constantes marque (nav, FAQ, stats, secteurs)
lib/products.ts   Données mock fiche produit
```
