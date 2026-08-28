# Contribuer

## Conventions

- **Routes et contenu UI** : français (URLs, libellés, metadata visibles).
- **Code** : anglais (noms de fichiers, variables, types, commentaires techniques).
- **Composants** : préférer les Server Components ; `"use client"` uniquement si interaction nécessaire.
- **Styles** : Tailwind + tokens charte (`brand-*`), pas de CSS ad hoc sauf exceptions documentées.

## Structure PR

1. Une PR = un objectif (refactor, feature, fix SEO…).
2. Vérifier avant merge :
   ```bash
   npm run lint
   npm run build
   ```
3. Ne pas committer `.env.local` ni secrets.

## Ajouter une page indexable

1. Route dans `app/`
2. `createPageMetadata` ou équivalent produit
3. Entrée dans `app/sitemap.ts`
4. JSON-LD si page catalogue / produit / destockage

## Hacks maquette

Toute déviation volontaire vs prod doit passer par `lib/maquette/` ou être commentée `@maquette-only`. Voir [maquette-limitations.md](./maquette-limitations.md).
