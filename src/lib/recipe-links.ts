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
 * Extrait l'ID UUID depuis une URL hybride [uuid]-[slug]
 * Un UUID v4 fait exactement 36 caractères (32 hex + 4 tirets)
 * Exemple: "f47ac10b-58cc-4372-a567-0e02b2c3d479-thieboudienne" -> "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 */
export function extractRecipeIdFromUrl(urlSegment: string): string {
  // UUID v4 : 8-4-4-4-12 caractères hex séparés par des tirets = 36 caractères au total
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const match = urlSegment.match(uuidRegex);
  if (match) return match[0];
  // Fallback : ancienne logique si l'ID n'est pas un UUID (ex: ID court)
  return urlSegment.split("-")[0];
}
