# Naya Cuisine — Résumé de projet
> Document destiné à la rédaction du mémoire académique

---

## 1. Présentation générale

**Naya Cuisine** est une plateforme web culinaire centrée sur la mise en valeur des patrimoines gastronomiques africains et de la cuisine internationale. Elle s'adresse à un public jeune, connecté, soucieux de manger sainement tout en restant ancré dans ses traditions alimentaires.

Le projet conjugue trois axes complémentaires : la découverte de recettes, l'éducation nutritionnelle et la contribution communautaire.

---

## 2. Contexte et problématique

La cuisine africaine est largement sous-représentée sur les plateformes culinaires numériques mondiales (Marmiton, AllRecipes, etc.), qui valorisent majoritairement les cuisines occidentales. Parallèlement, la méconnaissance des propriétés nutritionnelles des ingrédients locaux africains contribue à des choix alimentaires parfois inadaptés.

**Problématique :** Comment concevoir une plateforme numérique qui valorise le patrimoine culinaire africain tout en accompagnant les utilisateurs dans une démarche nutritionnelle éclairée ?

---

## 3. Objectifs du projet

- Créer un catalogue de recettes africaines et internationales, accessibles sans inscription
- Fournir des informations nutritionnelles calculées automatiquement à partir des ingrédients
- Permettre aux utilisateurs de contribuer leurs propres recettes
- Éduquer sur les propriétés nutritionnelles des ingrédients locaux africains
- Offrir un espace personnel (dashboard) pour gérer ses recettes et favoris

---

## 4. Stack technique

| Couche | Technologie |
|---|---|
| Framework frontend | Next.js 14 (App Router) |
| Langage | TypeScript |
| Style | Tailwind CSS |
| Base de données | Supabase (PostgreSQL) |
| Authentification | Supabase Auth |
| Gestion d'état serveur | TanStack Query (React Query) |
| Polices | Inter + Fraunces (next/font/google) |
| Icônes | Lucide React |
| Hébergement | Compatible Vercel / Netlify |

---

## 5. Architecture des pages

| Route | Page | Accès |
|---|---|---|
| `/` | Accueil — hero éditorial, grille de recettes, newsletter, FAQ | Public |
| `/recettes` | Catalogue — toutes les recettes avec filtres par catégorie et recherche | Public |
| `/recettes/[id]` | Détail recette — ingrédients, instructions, nutrition, ajusteur de portions | Public |
| `/recettes/creer` | Formulaire de création de recette | Connecté |
| `/nutrition` | Calculateur calorique + superaliments africains + bibliothèque alimentaire + FAQ | Public |
| `/actualites` | Chroniques nutritionnelles et culinaires (8 articles éditoriaux) | Public |
| `/dashboard` | Espace personnel — mes recettes, mes favoris, profil | Connecté |
| `/auth` | Connexion / Inscription | Non connecté |
| `/auth/reset-password` | Demande de réinitialisation de mot de passe | Non connecté |
| `/auth/update-password` | Saisie du nouveau mot de passe | Via email |
| `/legal` | Mentions légales et CGU | Public |
| `/aide` | FAQ et contact | Public |

---

## 6. Fonctionnalités détaillées

### 6.1 Catalogue de recettes
- Affichage en grille 3 colonnes (desktop) avec effet décalé éditorial
- Filtrage par 4 catégories : Toutes, Afrique, Rapide, International
- Recherche textuelle en temps réel sur le titre
- Pagination infinie (chargement de 6 recettes supplémentaires)
- Chaque card affiche : image, badge de difficulté (Facile/Moyen/Difficile avec couleur), pays d'origine, titre, temps de préparation, calories calculées

### 6.2 Fiche recette détaillée
- Image pleine largeur avec overlay
- Titre, temps de préparation, niveau de difficulté
- Ajusteur de portions (1 à 20) — les quantités d'ingrédients se recalculent en temps réel
- Liste des ingrédients avec quantités en grammes
- Instructions numérotées (issues de la base de données)
- Profil nutritionnel calculé automatiquement : calories, protéines, lipides, glucides avec donut chart
- Description éditoriale du plat
- "Mode Cuisine" (interface guidage étape par étape)

### 6.3 Système de favoris
- Bouton cœur sur chaque card et fiche recette
- Persistance en base de données (table `favorites`)
- État réel chargé au montage du composant (cœur rouge si déjà favori)
- Accessible uniquement aux utilisateurs connectés (erreur silencieuse sinon)

### 6.4 Création de recette
- Formulaire complet : titre, description, catégorie, temps, difficulté, URL image, ingrédients, instructions
- Sélection des ingrédients depuis un dictionnaire local
- Calcul automatique des calories en temps réel pendant la saisie
- Valeurs nutritionnelles récupérées depuis la base de données ou le dictionnaire local si nouvel ingrédient
- Redirection automatique vers la fiche de la recette créée après soumission

### 6.5 Page Nutrition
- **Calculateur calorique personnalisé** : formule de Mifflin-St Jeor, prend en compte âge, poids, taille, sexe, niveau d'activité et objectif (perdre/maintenir/prendre). Affiche le TDEE et la répartition en macros (30% protéines / 40% glucides / 30% lipides)
- **Section superaliments africains** : 6 fiches (Moringa, Gombo, Bissap, Manioc, Baobab, Fonio) avec description, bénéfices et icônes Lucide
- **Bibliothèque des aliments** : 12 aliments locaux avec leurs valeurs nutritionnelles par 100g, filtrables par recherche
- **FAQ nutritionnelle** : 2 groupes de 5 questions (Nutrition & Aliments / Recettes & Plateforme)

### 6.6 Chroniques culinaires (Actualités)
- 8 articles éditoriaux rédigés sur des plats africains spécifiques (Amiwo, Garba, Thiéboudienne, Bissap, etc.)
- Chaque article contient des données nutritionnelles scientifiques vérifiées (références FAO, études publiées)
- Filtrage par 6 catégories : Nutrition, Équilibre, Bien-être, Astuce, Recette, Science
- Recherche textuelle dans titre et contenu
- Mise en avant de l'article principal (featured article)

### 6.7 Authentification
- Inscription avec email/nom/mot de passe
- Connexion avec redirection vers la page d'origine (`?redirect` param)
- Gestion des deux cas à l'inscription : confirmation email activée ou non
- Réinitialisation de mot de passe par email (lien sécurisé 24h)
- Mise à jour du mot de passe via lien email
- Protection des routes `/dashboard` et `/recettes/creer` par middleware Next.js (côté serveur)
- Redirection automatique des utilisateurs connectés hors de `/auth`

### 6.8 Dashboard utilisateur
- Avatar avec initiales (nom/email)
- Compteurs réels : nombre de recettes publiées, nombre de favoris
- Liste des recettes créées par l'utilisateur avec navigation directe
- Liste des recettes mises en favoris avec navigation directe
- États vides avec CTA explicites si aucune recette / aucun favori
- Déconnexion

---

## 7. Modèle de données (Supabase)

### Tables principales

**`profiles`** — Profil utilisateur lié à `auth.users`
- `id`, `name`, `email`, `created_at`

**`categories`** — 4 catégories fixes
- `id`, `name`, `title`, `description`, `created_at`

**`recipes`** — Recettes
- `id`, `title`, `description`, `instructions`, `prep_time`, `difficulty`, `country`, `image_url`, `category_id`, `created_by`, `created_at`

**`ingredients`** — Dictionnaire d'ingrédients avec valeurs nutritionnelles
- `id`, `name`, `calories_per_100g`, `proteins`, `carbs`, `lipids`

**`recipe_ingredients`** — Liaison recette ↔ ingrédient (table de jonction)
- `recipe_id`, `ingredient_id`, `amount_grams`

**`favorites`** — Favoris utilisateur
- `id`, `user_id`, `recipe_id`, `created_at`

### Sécurité (RLS)
- Les recettes, catégories et ingrédients sont lisibles par tous (public)
- La création de recette nécessite d'être authentifié et que `created_by = auth.uid()`
- Les favoris ne sont visibles que par leur propriétaire (`user_id = auth.uid()`)

---

## 8. Données initiales (Seed)

Le fichier `supabase/seed.sql` contient :
- 4 catégories avec UUIDs fixes
- 33 ingrédients avec valeurs nutritionnelles réelles (source FAO/USDA)
- 12 recettes — 3 par catégorie :
  - **Afrique** : Thiéboudienne (Sénégal), Jollof Rice au Poulet (Nigeria), Aloco (Côte d'Ivoire)
  - **Rapide** : Omelette aux Poivrons, Pancakes Moelleux, Salade César au Poulet
  - **International** : Pasta Carbonara (Italie), Moussaka (Grèce), Pad Thai aux Crevettes (Thaïlande)

---

## 9. Points forts du projet

- **Pertinence culturelle** : focus explicite sur les cuisines africaines, souvent absentes des plateformes mainstream
- **Calcul nutritionnel automatique** : les calories et macros sont calculées depuis les ingrédients réels en base, pas des valeurs hardcodées
- **Accessibilité** : aria-labels, aria-live, focus-visible, contrastes conformes WCAG, navigation clavier
- **Performance** : images Next.js optimisées (AVIF/WebP), lazy loading, `revalidate: 300` sur les pages SSR, `staleTime` sur React Query
- **Honnêteté fonctionnelle** : aucune fonctionnalité "déco" — tout ce qui est affiché est connecté à la vraie data

---

## 10. Limites actuelles et pistes d'évolution

| Limite | Évolution possible |
|---|---|
| Pas de modification/suppression de recette depuis le dashboard | Ajouter des actions CRUD complètes |
| Le suivi de macros dans la page Nutrition ne se connecte pas aux recettes | Lier le calculateur au catalogue pour proposer des repas adaptés au profil |
| Les favoris ne savent pas s'ils sont déjà actifs à l'hydratation SSR | Passer `initialFavorited` en prop depuis le serveur |
| Pas de pagination dans le dashboard | Ajouter pagination si beaucoup de recettes/favoris |
| Les articles d'actualités sont statiques | Connecter à une table CMS en base de données |
| Pas de gestion de photo de profil | Upload d'image via Supabase Storage |
