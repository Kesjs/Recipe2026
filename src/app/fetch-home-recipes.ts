import { supabase } from "@/lib/supabase";

export const revalidate = 300; // Revalidate every 5 minutes

export async function fetchHomeRecipes(page: number = 1, pageSize: number = 12) {
  if (!supabase) return [];
  
  const offset = (page - 1) * pageSize;
  
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
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (error) throw error;
  return data || [];
}
