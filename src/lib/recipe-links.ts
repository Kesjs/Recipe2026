import { Recipe } from "./types";

/**
 * Génère un slug URL-friendly à partir du titre de la recette
 * Exemple: "Poulet Yassa" -> "poulet-yassa"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD") // Normalise les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
    .replace(/[^a-z0-9\s-]/g, "") // Supprime les caractères spéciaux
    .trim()
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/-+/g, "-"); // Supprime les tirets multiples
}

/**
 * Génère un lien de recette au format [id]-[slug]
 * Exemple: { id: "a1b2c3d4", title: "Poulet Yassa" } -> "/recettes/a1b2c3d4-poulet-yassa"
 */
export function generateRecipeLink(recipe: Pick<Recipe, "id" | "title">): string {
  const slug = generateSlug(recipe.title);
  return `/recettes/${recipe.id}-${slug}`;
}

/**
 * Extrait l'ID depuis une URL hybride [id]-[slug]
 * Exemple: "a1b2c3d4-poulet-yassa" -> "a1b2c3d4"
 */
export function extractRecipeIdFromUrl(urlSegment: string): string {
  return urlSegment.split("-")[0];
}
