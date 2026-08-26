---
title: Parcours personnalisation
description: Simplifier un parcours actuellement frustrant pour les clients
---

# Parcours personnalisation — audit UX

## Constats sur le site actuel

La personnalisation est **un argument commercial fort** (bannière hero *« Votre logo dès 1 pièce »*, passage M6 Capital) mais le **parcours d'achat ne l'accompagne pas**. Un visiteur ne comprend pas comment commander un produit personnalisé de bout en bout.

### Problèmes identifiés

| Problème | Impact |
|---------|--------|
| **Message contradictoire** | Hero « dès 1 pièce » vs minimum 250 pcs (carton) ou 500 pcs (sérigraphie) → méfiance |
| **Pas de page hub** | `/personnalisation` inexistante — parcours éparpillé entre fiches produits |
| **Prix opaque** | Affichage du lot (ex. 206 €) + mention « à partir de 0 € HT/pièce » sur la même fiche |
| **Upload invisible** | Aucune zone dépôt logo au moment de la commande |
| **BAT enfoui** | Bon à tirer mentionné en bas de description, pas dans le parcours |
| **Express = SKU séparé** | Option livraison rapide vendue comme produit à part (79–180 €) — incompréhensible |
| **Trop de variantes techniques** | Digital vs sérigraphie, 1 vs 4 couleurs, carton vs PP — le client doit deviner la bonne fiche |

### Exemple analysé

**Fiche** : [Gobelet carton personnalisé 6oz](https://www.ojetables.fr/gobelet-carton-personnalise-6-oz.html)

- Minimum 250 pcs, BAT obligatoire, livraison 2–3 semaines
- Dropdown « Conditionnement » obligatoire sans explication
- Produits « Personnalisation Express » en cross-sell, pas en option claire
- Marketing *« CREEZ VOTRE GOBELET ! »* sans configurateur réel

**Fiche** : [Gobelet réutilisable multicouleur](https://www.ojetables.fr/gobelet-reutilisable-personnalise-12440.html)

- Dès 1 unité (digital) — cohérent avec la bannière hero
- Choix couleur de fond : « préciser en commentaire de commande » — friction inutile
- Grille tarifaire longue en description, pas de calculateur

## Ce que le pré-audit recommandait déjà (partiellement)

- Item menu **Personnalisation** (niveau 1)
- Bloc homepage « Devis personnalisation »
- FAQ produit : délais, minimums
- SEO B2C : landing + guide gobelets personnalisés

**Manquait** : audit du parcours complet (wizard, upload, BAT, express) et critique des messages contradictoires.

## Parcours cible proposé (maquette Kaitos)

### Structure en 4 étapes

```
1. Choisissez QUOI     → Gobelet carton / réutilisable / sac / couvert
2. Indiquez COMBIEN  → Quantité → prix unitaire + MOQ affichés
3. Envoyez le VISUEL → Upload logo (PDF, AI, SVG) ou devis avec fichier
4. Validez le BAT    → Timeline : commande → BAT 48h → prod → livraison
```

### Composants UX

| Composant | Rôle |
|-----------|------|
| **Landing `#personnalisation`** | Hub avec les 4 étapes + grilles produits par gamme |
| **Assistant « Quel gobelet ? »** | 3 questions (événement, quantité, délai) → recommandation |
| **Encart fiche produit** | Rappel du parcours + lien vers le hub |
| **Express = toggle** | Option sur la fiche, pas un SKU caché |
| **Messages segmentés** | « Dès 1 pcs » (digital) · « Dès 250 pcs » (carton) · « Devis 24h » (autres) |

### Menu niveau 1

En plus de **Produits** (megamenu), deux boutons dédiés :

- **Personnalisation** → hub parcours guidé
- **Destockage** → promotions & fins de série (entrée directe, comme sur le site actuel)

## Impact business attendu

- **Baisse des abandons** sur fiches personnalisées (moins de confusion prix / minimum)
- **Hausse des devis qualifiés** (upload logo = intention forte)
- **Meilleure conversion B2C événementiel** (mariages, festivals — segment sensible au message « dès 1 pièce »)
- **Réduction charge SAV** (BAT et délais expliqués avant achat)

## Priorisation

| Priorité | Action |
|----------|--------|
| **P0** | Page hub personnalisation + parcours 4 étapes |
| **P0** | Messages honnêtes par gamme (MOQ, délais) |
| **P1** | Assistant recommandation produit |
| **P1** | Upload logo + workflow BAT visible |
| **P2** | Configurateur visuel (aperçu gobelet) — investissement plus lourd |

## Intégration technique (Codebox / Magento)

- Regrouper les fiches « Express » en **option configurable** sur la fiche parent
- Attributs produit clairs : `moq`, `technique_impression`, `delai_standard`, `delai_express`
- Extension upload fichier post-commande ou pré-devis
- Template email BAT automatisé

👉 **Maquette interactive** : section Personnalisation + encart fiche produit + menu dédié  
👉 **SEO B2C** : [Opportunité B2C](opportunite-b2c-seo.md) — guide gobelets personnalisés  
👉 **Fiches produits** : [Stratégie fiches produits](strategie-seo-fiches-produits.md)

***

**Valentin Loriot**  
[contact@kaitos.agency](mailto:contact@kaitos.agency)  
{% signature whatsapp="+33663553361" %}
