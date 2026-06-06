import { supabase } from "@/lib/supabase";

export const revalidate = 300; // Revalidate every 5 minutes

export async function fetchRecipes() {
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      *,
      recipe_ingredients (
        ingredient_id,
        amount_grams,
        ingredients (
          id,
          name,
          calories_per_100g,
          proteins,
          carbs,
          lipids
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchRecipeById(id: string) {
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      *,
      recipe_ingredients (
        ingredient_id,
        amount_grams,
        ingredients (
          id,
          name,
          calories_per_100g,
          proteins,
          carbs,
          lipids
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
