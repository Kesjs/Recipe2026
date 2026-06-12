# Cahier des charges — Naya Cuisine
**Plateforme culinaire dédiée au patrimoine gastronomique africain et à la nutrition saine**

---

## 1. Présentation du projet
### 1.1 Intitulé
**Naya Cuisine** — Plateforme web culinaire et nutritionnelle.

### 1.2 Commanditaire
Projet académique réalisé dans le cadre d'un mémoire de fin d'études en Génie Logiciel.

### 1.3 Résumé
Naya Cuisine est une application web full-stack permettant de consulter, créer et partager des recettes de cuisine. Le projet se distingue par un focus sur les cuisines africaines et une intégration de données nutritionnelles précises. La plateforme inclut un système d'authentification, une gestion des favoris, un calculateur de besoins caloriques (TDEE) et des contenus éditoriaux experts.

---

## 2. Contexte et enjeux
### 2.1 Contexte
Les plateformes culinaires numériques dominantes sont centrées sur les gastronomies occidentales, laissant les cuisines africaines sous-représentées et souvent stéréotypées. Parallèlement, la transition nutritionnelle en Afrique subsaharienne souligne l'urgence de valoriser les aliments locaux face aux produits industriels, un enjeu de santé publique majeur documenté par l'OMS et la FAO.

### 2.2 Enjeux du projet
* **Culturel** : Préserver et valoriser le patrimoine culinaire africain.
* **Éducatif** : Informer sur les propriétés nutritionnelles des ingrédients locaux.
* **Technique** : Concevoir une application web moderne, performante et accessible.
* **Communautaire** : Faciliter la contribution des utilisateurs via le partage de recettes.

---

## 3. Cible utilisateur
### 3.1 Profils
* **Principal** : Diaspora africaine et populations locales (18-40 ans), soucieuses de leur alimentation et maîtrisant les outils numériques.
* **Secondaire** : Nutritionnistes, professionnels de santé et amateurs de cuisine internationale.

### 3.2 Droits d'accès
| Type | Droits |
| :--- | :--- |
| **Visiteur** | Consultation (Recettes, Nutrition, Actualités) |
| **Utilisateur connecté** | Favoris, Création de recettes, Accès au Dashboard |

---

## 4. Périmètre fonctionnel
*(Priorité 1 : Essentiel | Priorité 2 : Avancé | Priorité 3 : Évolutif)*

### 4.1 Module Recettes (Priorité 1)
* **F01** : Catalogue avec filtres (image, titre, difficulté, pays, calories).
* **F02-F03** : Filtrage par catégorie et recherche textuelle temps réel.
* **F04-F05** : Fiche recette détaillée et ajusteur de portions.
* **F06** : Calcul nutritionnel automatique basé sur les ingrédients.
* **F07** : Pagination infinie pour une navigation fluide.

### 4.2 Module Authentification (Priorité 1)
Gestion complète via Supabase (Inscription, Connexion, Réinitialisation, Persistance de session et protection des routes via middleware).

### 4.3 Module Utilisateur (Priorité 2)
Gestion des favoris persistants et Dashboard personnel (suivi des créations et favoris).

### 4.4 Module Nutrition (Priorité 2)
Calculateur TDEE (formule Mifflin-St Jeor), fiches sur les superaliments africains, bibliothèque d'aliments locaux et FAQ nutritionnelle.

### 4.5 Module Actualités (Priorité 3)
Chroniques culinaires éditoriales filtrables par thèmes scientifiques et bien-être.

---

## 5. Exigences non fonctionnelles
* **Performance** : Score Lighthouse ≥ 85, optimisation d'images (AVIF/WebP), SSR avec revalidation (5 min).
* **Accessibilité** : Conformité WCAG 2.1 niveau AA (navigation clavier, contrastes, balisage sémantique).
* **Sécurité** : RLS (Row Level Security) activé, protection des routes via Middleware Next.js, validation des données (Client & Serveur).
* **Responsive** : Approche Mobile-first (375px+).

---

## 6. Architecture et choix techniques
### 6.1 Pile technologique
* **Framework** : Next.js 14 (App Router).
* **Backend** : Supabase (PostgreSQL, Auth, RLS).
* **Style** : Tailwind CSS.
* **Langage** : TypeScript (Strict mode).

### 6.2 Justifications techniques
* **Supabase** est retenu pour sa solution tout-en-un (Auth + BDD + RLS), permettant une vélocité de développement élevée.
* **Next.js 14** permet une gestion optimisée du rendu (SSR) garantissant à la fois performance et bon référencement (SEO).
* **Architecture** : Le modèle de données est structuré en 3e forme normale pour garantir l'intégrité référentielle, notamment pour la gestion complexe des ingrédients par recette (Many-to-Many).

---

## 7. Gestion des risques
| Risque | Stratégie d'atténuation |
| :--- | :--- |
| Complexité calculs nutritionnels | Tests unitaires sur la logique de calcul `nutrition.ts`. |
| Délais de développement | Respect strict de la hiérarchie des priorités (1, 2, 3). |
| Performance BDD | Indexation des colonnes fréquemment recherchées (titres, catégories). |

---

## 8. Planning et critères d'acceptation
### 8.1 Planning (8 semaines)
1. **Conception** (Maquettes, Modèle de données) - S1
2. **Infrastructure** (Setup Next.js, Supabase) - S2
3. **Core features** (Recettes, Auth) - S3-S4
4. **Features secondaires** (Nutrition, Dashboard) - S5-S6
5. **Polish** (Accessibilité, SEO) - S7
6. **Documentation** (Mémoire, Soutenance) - S8

### 8.2 Checklist de validation (Critères d'acceptation)
* [ ] Navigation fluide (Visiteur/Connecté)
* [ ] Calculateur nutritionnel fonctionnel et cohérent
* [ ] Dashboard utilisateur opérationnel
* [ ] Conformité mobile et accessibilité AA
* [ ] Absence de lien mort

---
*Hors périmètre : Suppression de compte utilisateur, upload de fichiers images (URLs externes uniquement).*