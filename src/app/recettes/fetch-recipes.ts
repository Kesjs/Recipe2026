import { createClient } from "@/lib/supabase-server";

export const revalidate = 300;

export async function fetchRecipes() {
  try {
    const supabase = await createClient();

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
  } catch {
    return [];
  }
}

export async function fetchRecipeById(id: string) {
  try {
    const supabase = await createClient();

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
  } catch {
    return null;
  }
}
