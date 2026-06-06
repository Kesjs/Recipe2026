import { fetchRecipeById } from "../fetch-recipes";
import RecipeDetailClient from "./RecipeDetailClient";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipe = await fetchRecipeById(params.id);

  if (!recipe) {
    return <div>Recette non trouvée</div>;
  }

  return <RecipeDetailClient initialRecipe={recipe} />;
}
