import { RecipeIngredient } from "./types";

export function calculateNutrition(recipeIngredients: RecipeIngredient[]) {
  let totalCalories = 0;
  let totalProteins = 0;
  let totalCarbs = 0;
  let totalLipids = 0;

  recipeIngredients.forEach((ri) => {
    const factor = ri.amount_grams / 100;
    totalCalories += ri.ingredients.calories_per_100g * factor;
    totalProteins += ri.ingredients.proteins * factor;
    totalCarbs += ri.ingredients.carbs * factor;
    totalLipids += ri.ingredients.lipids * factor;
  });

  return {
    calories: Math.round(totalCalories),
    proteins: Math.round(totalProteins * 10) / 10,
    carbs: Math.round(totalCarbs * 10) / 10,
    lipids: Math.round(totalLipids * 10) / 10,
  };
}
