# Cooking Recipe

Plateforme culinaire haut de gamme dédiée à l'équilibre alimentaire et aux patrimoines culinaires africains.

## Technologies

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth & Database)
- Lucide React (Icons)

## Installation

1. Installer les dépendances:
```bash
npm install
```

2. Configurer Supabase:
   - Créer un projet sur [supabase.com](https://supabase.com)
   - Copier les variables d'environnement dans `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
     ```

3. Exécuter le schéma de base de données:
   - Aller dans le dashboard Supabase
   - Ouvrir l'éditeur SQL
   - Exécuter le contenu de `supabase/schema.sql`

4. (Optionnel) Charger les données de démonstration:
   - Exécuter le contenu de `supabase/seed.sql` dans l'éditeur SQL Supabase

## Démarrage

```bash
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## Pages

- `/` - Page d'accueil avec recettes populaires
- `/recettes` - Catalogue avec filtres dynamiques
- `/recettes/[id]` - Fiche détail avec calcul nutritionnel
- `/recettes/creer` - Création de recette (protégé)
- `/auth` - Authentification (connexion/inscription)

## Fonctionnalités

- Catalogue de recettes avec recherche et filtres
- Calcul nutritionnel automatique basé sur les ingrédients
- Authentification utilisateur via Supabase
- Création de recettes avec ingrédients dynamiques
- Mise en valeur des plats africains (Amiwo, Thiéboudienne, Aloco, Tilapia, Garba)
- Interface épurée et professionnelle

## Structure de la base de données

- `profiles` - Profils utilisateurs
- `recipes` - Recettes
- `ingredients` - Ingrédients avec valeurs nutritionnelles
- `recipe_ingredients` - Table de liaison recette-ingrédient

## Design

- Palette de couleurs: Zinc (neutre), Emerald (action/santé), Amber (cuisine)
- Typographie: Inter (géométrique propre)
- Interface minimaliste et professionnelle
- Chargement avec skeletons et spinners
- Validation de formulaires avec feedback visuel
