'use server'

import { createClient } from '@/lib/supabase-server'

export async function toggleFavorite(recipeId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }

  // Vérifier si déjà favori
  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('recipe_id', recipeId)
    .single()

  if (existing) {
    // Supprimer
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('recipe_id', recipeId)
    return { favorited: false }
  } else {
    // Ajouter
    await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        recipe_id: recipeId,
      })
    return { favorited: true }
  }
}

export async function getUserFavorites() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from('favorites')
    .select(`
      *,
      recipes (
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
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function isRecipeFavorited(recipeId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return false
  }

  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('recipe_id', recipeId)
    .single()

  return !!data
}
