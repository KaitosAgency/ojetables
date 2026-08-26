---
title: GEO & AEO - Visibilité IA
description: Apparaître dans ChatGPT, Perplexity et les Aperçus IA Google
---

# GEO & AEO - Visibilité dans les LLM

## Contexte : une nouvelle porte d'entrée

En 2026, de plus en plus d'acheteurs professionnels commencent leur recherche **dans une IA** plutôt que sur Google :

> « Quel fournisseur de vaisselle jetable éco pour traiteur en France ? »  
> « Meilleur grossiste gobelets personnalisés pour événement ? »  
> « Vaisselle compostable pour cantine scolaire - qui recommander ? »

Optimiser votre site pour être **citée dans ces réponses**, c'est le **GEO** (Generative Engine Optimization) et l'**AEO** (Answer Engine Optimization).

**Pour Ojetables, c'est une opportunité majeure** : vous avez les atouts (9,5/10 sur 2 417 avis, clients prestigieux, +3 000 refs, passages TV) - mais les IA ne les voient pas encore, parce que votre site n'est pas structuré pour être lu par des machines.

## Le constat actuel

| Test | Résultat | Conséquence |
|------|----------|-------------|
| **Rich Results (homepage)** | Aucun élément détecté | Pas de signal Organization / Rating pour Google ni les IA |
| **Rich Results (fiche produit)** | 4 éléments valides | Product OK mais sans aggregateRating ni availability |
| **Navigation agentique (PageSpeed)** | 0/2 (HP + catalogue) · 1/2 (fiche produit) | Signal IA uniquement sur les fiches produits |
| **Contenu homepage** | H1 keyword-stuffé, blocs denses | Difficile à extraire et citer |
| **Pages secteur (footer)** | Existent mais invisibles | L'IA ne sait pas que vous ciblez traiteurs, CHR, collectivités |

**En pratique :** si un responsable achats demande aujourd'hui à ChatGPT « fournisseur vaisselle jetable pro France », Ojetables a **peu de chances d'être citée** - alors que vous devriez être dans le top 3.

## Pourquoi la technique compte autant que le contenu

Sur un site avec **+3 000 produits** et des **centaines de pages**, améliorer les performances PageSpeed est compliqué (voir [Audit technique](audit-technique.md)). Mais corriger la **lisibilité machine** est plus accessible et **plus impactant pour les LLM** :

| Levier | Effort | Impact IA |
|--------|--------|-----------|
| Données structurées JSON-LD | Faible | 🔴 Élevé |
| Fichier `llms.txt` | Faible | 🟡 Moyen |
| Sections BLUF (réponse en haut) | Moyen | 🔴 Élevé |
| FAQ structurées (schema FAQPage) | Faible | 🔴 Élevé |
| Performance 41 → 60+ (homepage) | Moyen | 🟡 Moyen |
| Performance 29 → 45+ (catalogue) | Moyen-Élevé | 🟡 Moyen |
| Performance 60 → 90+ | Élevé | 🟢 Faible |

**Notre recommandation :** ne pas attendre une refonte performance pour agir sur la visibilité IA. Commencez par les **signaux extractibles** (JSON-LD, structure, FAQ) - c'est ce qui fera la différence dans ChatGPT et Perplexity.

## Comment les IA choisissent quoi citer

Trois facteurs principaux (confirmés par les études AEO 2025-2026) :

| Facteur | Ce que ça signifie | État Ojetables |
|---------|-------------------|----------------|
| **Autorité** | Être déjà bien positionné sur Google + mentions tierces | SEO 100/100 mais peu de listicles / comparatifs |
| **Extractibilité** | Contenu structuré en blocs autonomes, faciles à citer | Homepage dense, H1 confus, pas de FAQ |
| **Consensus** | Être mentionné de façon cohérente sur le web (forums, annuaires, presse) | Avis Garantis + TV (M6, Capital) = atouts sous-exploités |

## Stratégie GEO pour Ojetables

### 1. Données structurées (P0 - technique)

Déployer du JSON-LD sur les pages clés :

**Homepage :**

```json
{
  "@type": "Organization",
  "name": "Ojetables",
  "description": "Fournisseur vaisselle jetable éco pour professionnels depuis 2011",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "9.5",
    "reviewCount": "2417"
  }
}
```

**Fiches produits :** Product + Offer + AggregateRating  
**Pages catalogue :** ItemList + BreadcrumbList (ex. `/vaisselle-jetable-petit-prix` - 630 produits sans schema)  
**Pages secteur :** Service + FAQPage  
**Page Partenaire :** Organization + mentions clients

👉 Détail : [Audit technique](audit-technique.md)

### 2. Contenu extractible (P0 - éditorial)

Chaque page importante doit répondre à une question en **2-3 phrases dès le haut** (méthode BLUF) :

**Mauvais (actuel) :**
> *« L'art de la table biodégradable et compostable avec une vaisselle jetable Ecologique, couverts Bois, Pla, Cpla, assiette bio en pulpe… »*

**Bon (proposé) :**
> **Ojetables est le fournisseur français de vaisselle jetable éco-responsable pour traiteurs, CHR et collectivités.** +3 000 références en stock, livraison 24/48h, 9,5/10 sur 2 417 avis certifiés. Compte pro et devis volume en ligne.

Puis des **H2 autonomes** que l'IA peut citer séparément :

| H2 | Réponse directe (extractible) |
|----|-------------------------------|
| **Vaisselle jetable pour traiteurs** | Kits couverts, verrines, plateaux repas éco dès 50 unités, livraison 24/48h |
| **Tarifs professionnels** | Dégressifs par volume, paiement sous 30 jours, encours Allianz |
| **Conformité AGEC** | 100 % biodégradable, compostable ou recyclable, contact alimentaire certifié |
| **Personnalisation logo** | Gobelets, sacs, couverts imprimés - devis sous 24h, minimum 1 000 pcs |

### 3. FAQ structurées (P1)

Ajouter des blocs FAQ avec schema FAQPage sur :

- Homepage (5 questions : délais, minimum commande, paiement pro, éco, personnalisation)
- Pages secteur (5-8 questions métier)
- Fiches produits (3-5 questions produit)

**Exemple de questions que les IA reçoivent :**

- « Quel est le délai de livraison chez Ojetables ? » → 24/48h partout en France
- « Ojetables livre-t-il aux collectivités ? » → Oui, tarifs dégressifs, paiement 30 jours
- « Peut-on personnaliser des gobelets ? » → Oui, logo 1-4 couleurs, devis sous 24h

### 4. Fichier `llms.txt` (P1)

Créer un fichier `/llms.txt` à la racine du site (comme `robots.txt`, mais pour les LLM) :

```
# Ojetables - Fournisseur vaisselle jetable éco
> Spécialiste B2B depuis 2011. +3 000 références, livraison 24/48h.

## Pages clés
- /vaisselle-jetable-professionnel/ : Offre pro, tarifs dégressifs
- /partenaire-vaisselle-jetable/ : Références clients (Air France, Sodexo, CNES)
- /vaisselle-jetable-traiteur/ : Gamme traiteurs & événementiel
- /vaisselle-jetable-collectivite/ : Cantines, mairies, écoles

## Contact
- Tél : 09 74 06 00 74
- Compte pro : /customer/account/create/
```

Ce n'est **pas magique** - les IA ne vous recommanderont pas automatiquement. Mais ça facilite le crawl et réduit les erreurs d'interprétation.

### 5. Valoriser vos pages secteur (P1)

Vos 10 pages métier (footer) sont **exactement le type de contenu que les IA cherchent** : pages thématiques avec vocabulaire métier. Aujourd'hui elles sont invisibles.

**Action :** les remonter sur la homepage + mega-menu + enrichir avec FAQ. Quand un utilisateur demandera « vaisselle jetable traiteur éco », l'IA trouvera votre page dédiée.

👉 Détail : [Pages secteurs existantes](pages-secteurs-existantes.md)

### 6. Mentions tierces et consensus (P2)

Les IA citent ce qui est **déjà mentionné ailleurs**. Vos atouts :

- **2 417 avis Avis Garantis** (9,5/10) - à structurer en JSON-LD
- **Passages TV M6 et Capital** - à mentionner clairement sur le site
- **Clients prestigieux** (Air France, Sodexo, CNES) - page Partenaire à enrichir

**Actions complémentaires :**

- Présence sur annuaires pro (CCI, annuaires CHR, marketplaces B2B)
- Articles comparatifs sur votre blog (« Top 5 fournisseurs vaisselle éco traiteur 2026 »)
- Témoignages clients structurés (nom, entreprise, métier)

## Requêtes pilotes à monitorer

Testez mensuellement dans ChatGPT, Perplexity et Google AI Overviews :

| Requête | Intention | Ojetables citée ? |
|---------|-----------|-------------------|
| « Fournisseur vaisselle jetable pro France » | B2B généraliste | À tester |
| « Vaisselle jetable éco traiteur » | B2B secteur | À tester |
| « Gobelets personnalisés événement » | B2B + B2C | À tester |
| « Vaisselle compostable cantine scolaire » | B2B collectivités | À tester |
| « Vaisselle jetable mariage écologique » | B2C événement | À tester |

**Objectif 6 mois :** apparaître dans au moins 2-3 de ces requêtes sur Perplexity ou ChatGPT.

## 5 leviers AEO à renforcer (méthode Ahrefs)

> Source : *AEO Course by Ahrefs* (transcripts kaitos-memory) - synthèse appliquée à Ojetables.

Les données Ahrefs confirment et précisent plusieurs axes déjà mentionnés dans ce pré-audit. Voici **5 actions concrètes** à ajouter à votre feuille de route, spécifiques à votre situation.

### 1. **Penser « fan-out » : une question = des dizaines de sous-requêtes**

Quand un acheteur demande à ChatGPT *« fournisseur vaisselle jetable éco pour traiteur »*, l'IA ne cherche pas une seule requête. Elle décompose en : *« assiette compostable traiteur »*, *« gobelet éco événement »*, *« livraison 24h vaisselle pro »*, *« tarif dégressif CHR »*…

**Pour Ojetables :** vos **10 pages secteur** (footer) répondent déjà à cette logique - c'est exactement le bon format. Il faut les **remonter**, les **enrichir** et les **rafraîchir** régulièrement. Chaque page = une porte d'entrée sur un micro-intention.

### 2. **Fraîcheur : 76 % des pages citées par ChatGPT ont moins de 30 jours**

L'IA favorise le contenu **récemment mis à jour** - pas juste une date modifiée, mais du contenu réellement enrichi.

**Actions Ojetables :**

- Ajouter une mention « Mis à jour [mois/année] » sur vos pages secteur (Traiteur, CHR, Collectivités…)
- Planifier un **cycle de refresh trimestriel** : prix, nouveautés catalogue, FAQ
- Capitaliser sur vos **passages TV récents** (M6, Capital) dans le contenu mis à jour

### 3. **Format listicle : 44 % des citations ChatGPT viennent de listes et comparatifs**

Les IA citent massivement les pages *« Top 5… »*, *« Meilleur… vs… »*, *« Comparatif… »*.

**Opportunité Ojetables (blog ou pages guides) :**

- « Top 5 vaisselle jetable éco pour traiteurs en 2026 »
- « Assiette palmier vs bagasse : laquelle choisir pour un événement ? »
- « Comparatif gobelets carton vs réutilisables pour CHR »

**Important (Ahrefs) :** la longueur compte peu - **53 % des pages citées font moins de 1 000 mots**. Mieux vaut 800 mots bien structurés (BLUF + FAQ) qu'un pavé de 3 000 mots.

### 4. **Mentions de marque hors site : plus corrélées que les backlinks**

Ahrefs mesure une corrélation **0,7** entre mentions sur des pages très linkées et apparition dans les Aperçus IA Google - **plus fort que le Domain Rating**.

**Atouts Ojetables déjà là :**

- Passages **M6 et Capital** (mentions média tier 1)
- **2 417 avis Avis Garantis** (consensus)
- Clients **Air France, Sodexo, CNES** (preuve sociale externe si cités)

**Actions complémentaires :**

- **Tier 1** : être listé dans des comparatifs secteur (annuaires CHR, blogs événementiel)
- **Tier 2** : répondre sur Reddit/forum mariage (*« vaisselle éco mariage budget »*) avec expertise réelle - pas de spam
- **Tier 3** : vos propres listicles sur le blog Ojetables (mention contrôlée)

### 5. **Vérifier que les crawlers IA ne sont pas bloqués**

~6 % des sites bloquent **GPTBot** dans leur `robots.txt` sans le savoir (templates Magento, Cloudflare par défaut).

**Check rapide avec Codebox :** ouvrir [ojetables.fr/robots.txt](https://www.ojetables.fr/robots.txt) et vérifier qu'il n'y a **pas** de `Disallow` pour :

- `GPTBot` (ChatGPT)
- `Google-Extended` (Gemini / AI Overviews)
- `ClaudeBot` (Claude)

Si bloqués, vos 3 000 fiches produits sont **invisibles** pour ces IA - même avec un JSON-LD parfait.

### Bonus : 3 moteurs IA, 3 stratégies différentes

| Plateforme | Ce qu'elle favorise | Levier Ojetables |
|------------|---------------------|------------------|
| **Google AI Overviews** | Sites autoritaires + **YouTube** (5,6 % des citations) | SEO classique (déjà 100/100) + vidéos produit/démo |
| **ChatGPT** | **Listicles**, Reddit, médias (DR médian 90) | Guides comparatifs + présence forums mariage/CHR |
| **Perplexity** | Pages déjà dans le **top 10 Google** | Vos pages secteur bien positionnées = gain rapide |

**Insight commercial (Ahrefs) :** le trafic IA convertit jusqu'à **23× mieux** que l'organique classique - les visiteurs arrivent **pré-qualifiés** par la recommandation de l'IA. Sur votre cible B2B (devis volume), même un faible volume IA peut peser lourd.

## Feuille de route GEO/AEO (90 jours)

| Semaine | Action | Livrable |
|---------|--------|----------|
| **S1-S2** | JSON-LD Organization + Rating homepage | Rich Results homepage OK |
| **S2-S3** | JSON-LD **ItemList + BreadcrumbList** sur pages catalogue | Listing compréhensible par IA |
| **S2-S3** | JSON-LD Product sur top 50 fiches | Étoiles produits Google |
| **S3-S4** | Réécriture homepage BLUF + FAQ schema | Contenu extractible |
| **S4-S6** | Enrichir 3 pages secteur + FAQ | Pages traiteur, CHR, collectivités |
| **S6-S8** | Créer `llms.txt` + vérifier **robots.txt** (GPTBot non bloqué) | Crawl IA débloqué |
| **S8-S10** | 1-2 **listicles comparatifs** (800-1 000 mots) | Format le plus cité par ChatGPT |
| **S8-S12** | Refresh trimestriel pages secteur + date « Mis à jour » | Fraîcheur IA (76 % citations < 30 jours) |
| **Mensuel** | Test 5 requêtes pilotes dans 3 IA | Suivi présence |

## Ce qu'il ne faut pas faire

| Mythe | Réalité |
|-------|---------|
| « Un fichier llms.txt suffit à être cité » | Non - c'est un aide au crawl, pas une garantie |
| « Gaver de JSON-LD manipule les IA » | Non - mais c'est vital pour Google et l'extraction |
| « Demander 100 fois à ChatGPT de citer Ojetables » | Inefficace - les IA ne se laissent pas manipuler |
| « Il faut d'abord 90/100 PageSpeed » | Faux - l'extractibilité compte plus que la vitesse pour les LLM |
| « Le SEO classique suffit » | Insuffisant - il faut structurer pour l'extraction IA |

## Lien avec le reste du pré-audit

| Sujet | Page |
|-------|------|
| Scores PageSpeed et Rich Results | [Audit technique](audit-technique.md) |
| Homepage restructurée | [Page d'accueil SEO & CRO](strategie-seo-page-accueil.md) |
| Pages secteur à valoriser | [Pages secteurs (footer)](pages-secteurs-existantes.md) |
| JSON-LD fiches produits | [Fiches produits](strategie-seo-fiches-produits.md) |

***

**Valentin Loriot**  
Kaitos Agency - Stratégie digitale, SEO & GEO pour catalogues B2B  
[contact@kaitos.agency](mailto:contact@kaitos.agency)  
{% signature whatsapp="+33663553361" %}
