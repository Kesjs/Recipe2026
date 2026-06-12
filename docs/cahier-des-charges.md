# Cahier des charges — Naya Cuisine
> Plateforme culinaire dédiée au patrimoine gastronomique africain et à la nutrition saine

---

## 1. Présentation du projet

### 1.1 Intitulé
**Naya Cuisine** — Plateforme web culinaire et nutritionnelle

### 1.2 Commanditaire
Projet académique réalisé dans le cadre d'un mémoire de fin d'études.

### 1.3 Résumé
Naya Cuisine est une application web full-stack permettant de consulter, créer et partager des recettes de cuisine, avec un accent fort sur les cuisines africaines et les données nutritionnelles associées. La plateforme intègre un système d'authentification, une gestion des favoris, un calculateur de besoins caloriques personnalisés et des contenus éditoriaux sur la nutrition.

---

## 2. Contexte et enjeux

### 2.1 Contexte
Les plateformes culinaires numériques existantes (Marmiton, AllRecipes, Yummly) sont dominées par les cuisines européennes et nord-américaines. Les cuisines africaines y sont peu représentées, mal documentées sur le plan nutritionnel, et souvent stéréotypées.

Parallèlement, la transition nutritionnelle en Afrique subsaharienne — marquée par l'abandon progressif des aliments locaux au profit de produits industriels — représente un enjeu de santé publique documenté par l'OMS et la FAO.

### 2.2 Enjeux du projet
- **Culturel** : préserver et valoriser les recettes du patrimoine culinaire africain
- **Éducatif** : informer sur les propriétés nutritionnelles des ingrédients locaux
- **Technique** : concevoir une application web moderne, performante et accessible
- **Communautaire** : permettre la contribution des utilisateurs via la création de recettes

---

## 3. Cible utilisateur

### 3.1 Profil principal
- Âge : 18-40 ans
- Diaspora africaine et populations locales soucieuses de leur alimentation
- Intérêt pour la cuisine maison et la nutrition
- Maîtrise des outils numériques

### 3.2 Profil secondaire
- Nutritionnistes et professionnels de santé en Afrique
- Amateurs de cuisine internationale

### 3.3 Types d'utilisateurs dans l'application
| Type | Description | Droits |
|---|---|---|
| Visiteur | Non inscrit | Consultation des recettes, nutrition, actualités |
| Utilisateur connecté | Inscrit et authentifié | Favoris, création de recettes, dashboard |

---

## 4. Exigences fonctionnelles

### 4.1 Module Recettes (Priorité 1)

| ID | Fonctionnalité | Description |
|---|---|---|
| F01 | Catalogue de recettes | Affichage de toutes les recettes avec image, titre, difficulté, pays, calories |
| F02 | Filtrage par catégorie | 4 catégories : Tout, Afrique, Rapide, International |
| F03 | Recherche textuelle | Filtrage en temps réel sur le titre de la recette |
| F04 | Fiche recette | Détail complet : ingrédients, instructions, nutrition, description |
| F05 | Ajusteur de portions | Recalcul des quantités d'ingrédients selon le nombre de convives |
| F06 | Calcul nutritionnel | Calories, protéines, glucides, lipides calculés depuis les ingrédients réels |
| F07 | Pagination infinie | Chargement progressif des recettes (6 par lot) |

### 4.2 Module Authentification (Priorité 1)

| ID | Fonctionnalité | Description |
|---|---|---|
| A01 | Inscription | Email, nom, mot de passe (min 6 caractères) |
| A02 | Connexion | Email + mot de passe avec gestion des erreurs |
| A03 | Redirection post-login | Redirige vers la page d'origine après connexion |
| A04 | Réinitialisation mot de passe | Envoi de lien sécurisé par email (valable 24h) |
| A05 | Protection de routes | `/dashboard` et `/recettes/creer` accessibles uniquement si connecté |
| A06 | Déconnexion | Suppression de la session Supabase |
| A07 | Persistance de session | "Se souvenir de moi" (cookie longue durée) |

### 4.3 Module Utilisateur (Priorité 2)

| ID | Fonctionnalité | Description |
|---|---|---|
| U01 | Favoris | Ajouter/retirer une recette des favoris via le bouton cœur |
| U02 | Persistance des favoris | Stockage en base de données, état réel au chargement |
| U03 | Dashboard | Vue personnelle : recettes créées + favoris + compteurs |
| U04 | Création de recette | Formulaire complet avec calcul nutritionnel en direct |

### 4.4 Module Nutrition (Priorité 2)

| ID | Fonctionnalité | Description |
|---|---|---|
| N01 | Calculateur calorique | TDEE via formule Mifflin-St Jeor (âge, poids, taille, sexe, activité, objectif) |
| N02 | Affichage des macros | Objectifs protéines/glucides/lipides calculés depuis le TDEE |
| N03 | Superaliments africains | 6 fiches détaillées (Moringa, Gombo, Bissap, Manioc, Baobab, Fonio) |
| N04 | Bibliothèque alimentaire | 12 aliments locaux avec valeurs nutritionnelles, recherche filtrante |
| N05 | FAQ nutritionnelle | 10 questions-réponses en 2 groupes thématiques |

### 4.5 Module Actualités (Priorité 3)

| ID | Fonctionnalité | Description |
|---|---|---|
| C01 | Chroniques culinaires | 8 articles éditoriaux sur des plats africains avec données scientifiques |
| C02 | Filtrage par thème | 6 catégories : Nutrition, Équilibre, Bien-être, Astuce, Recette, Science |
| C03 | Recherche dans les articles | Filtrage temps réel sur titre et contenu |
| C04 | Article mis en avant | Premier article affiché en format featured (grande mise en page) |

---

## 5. Exigences non fonctionnelles

### 5.1 Performance
- Score Lighthouse Performance ≥ 85 sur mobile
- Images servies en AVIF/WebP via Next.js Image Optimization
- Revalidation des pages SSR toutes les 5 minutes (`revalidate: 300`)
- Données client mises en cache 5 minutes (`staleTime: 5 * 60 * 1000`)
- Fonts hébergées localement (pas de requête Google Fonts en production)

### 5.2 Accessibilité
- Conformité WCAG 2.1 niveau AA
- Tous les boutons interactifs ont un `aria-label` explicite
- Navigation clavier complète (`focus-visible` sur tous les éléments interactifs)
- Contrastes de couleurs conformes (ratio minimum 4.5:1 pour le texte)
- `aria-live` sur les toasts de notification
- `aria-pressed` sur les boutons toggle (favoris)
- Balises sémantiques (`<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<aside>`)

### 5.3 Sécurité
- Authentification via Supabase Auth (JWT)
- Row Level Security (RLS) activé sur toutes les tables
- Les recettes du seed ont `created_by = NULL` pour contourner la RLS à l'insertion
- Middleware Next.js pour protéger les routes sensibles côté serveur
- Variables d'environnement pour les clés Supabase (jamais en clair dans le code)
- Validation de formulaire côté client et côté serveur

### 5.4 Responsive Design
- Mobile-first : toutes les pages fonctionnelles à partir de 375px
- Breakpoints principaux : `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Navigation mobile via drawer latéral
- Grilles adaptatives (1 colonne mobile → 2-3 colonnes desktop)

### 5.5 Compatibilité navigateurs
- Chrome, Firefox, Safari, Edge (2 dernières versions majeures)
- iOS Safari 15+, Android Chrome

---

## 6. Contraintes techniques

### 6.1 Contraintes imposées
- Next.js 14 avec App Router (pas de Pages Router)
- Supabase comme backend unique (auth + base de données)
- Tailwind CSS pour le style (pas de CSS-in-JS)
- TypeScript strict

### 6.2 Contraintes métier
- Les recettes du catalogue de base ne sont pas modifiables par les utilisateurs
- La suppression de compte n'est pas implémentée (hors périmètre)
- Les images de recettes sont des URLs externes (pas d'upload de fichier)

---

## 7. Architecture technique

```
src/
├── app/                    # Pages (App Router Next.js)
│   ├── page.tsx            # Accueil
│   ├── recettes/           # Catalogue + Détail + Création
│   ├── nutrition/          # Page nutrition
│   ├── actualites/         # Chroniques
│   ├── dashboard/          # Espace utilisateur
│   ├── auth/               # Authentification
│   ├── aide/               # FAQ et contact
│   └── legal/              # Mentions légales
├── components/             # Composants réutilisables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── RecipeCard.tsx
│   └── nutrition/          # Composants nutrition
├── lib/                    # Utilitaires
│   ├── supabase.ts         # Client Supabase côté client
│   ├── supabase-server.ts  # Client Supabase côté serveur
│   ├── types.ts            # Types TypeScript
│   ├── nutrition.ts        # Calcul nutritionnel
│   └── actions/            # Server Actions
│       └── favorites.ts
├── hooks/
│   └── useAuth.ts
└── middleware.ts           # Protection des routes
```

---

## 8. Modèle de données

```sql
profiles          (id, name, email, created_at)
categories        (id, name, title, description, created_at)
recipes           (id, title, description, instructions, prep_time,
                   difficulty, country, image_url, category_id,
                   created_by, created_at)
ingredients       (id, name, calories_per_100g, proteins, carbs, lipids)
recipe_ingredients(recipe_id, ingredient_id, amount_grams)  -- PK composée
favorites         (id, user_id, recipe_id, created_at)
```

---

## 9. Livrables

| Livrable | Description |
|---|---|
| Code source complet | Repository Next.js avec toutes les pages et composants |
| Base de données | Schéma SQL (`schema.sql`) + données initiales (`seed.sql`) |
| Documentation projet | Ce cahier des charges + résumé de projet |
| Application déployée | URL de démonstration (Vercel) |

---

## 10. Planning prévisionnel

| Phase | Contenu | Durée estimée |
|---|---|---|
| 1 — Conception | Maquettes, modèle de données, choix techniques | 1 semaine |
| 2 — Infrastructure | Setup Next.js, Supabase, authentification | 1 semaine |
| 3 — Core features | Catalogue, fiche recette, création | 2 semaines |
| 4 — Features secondaires | Nutrition, actualités, dashboard | 2 semaines |
| 5 — Polish | Accessibilité, performance, responsive | 1 semaine |
| 6 — Documentation | Mémoire, soutenance | 1 semaine |

---

## 11. Critères d'acceptation

Le projet est considéré comme livrable si :

- [ ] Un visiteur peut consulter toutes les recettes sans inscription
- [ ] Un visiteur peut filtrer les recettes par catégorie et faire une recherche
- [ ] Un visiteur peut consulter le détail d'une recette avec ses valeurs nutritionnelles
- [ ] Un utilisateur peut s'inscrire, se connecter et se déconnecter
- [ ] Un utilisateur connecté peut ajouter/retirer des favoris
- [ ] Un utilisateur connecté peut créer une recette qui apparaît dans le catalogue
- [ ] Le dashboard affiche les vraies recettes créées et les vrais favoris
- [ ] Les routes protégées redirigent vers `/auth` si non connecté
- [ ] Le calculateur nutritionnel produit un résultat cohérent
- [ ] L'application est utilisable sur mobile (375px minimum)
- [ ] Aucun lien mort dans la navigation
