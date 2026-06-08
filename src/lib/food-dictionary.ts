import { Ingredient } from './types'

export const localFoodDictionary: Ingredient[] = [
  { id: '', name: "Manioc", calories_per_100g: 160, proteins: 1.4, carbs: 38, lipids: 0.3 },
  { id: '', name: "Attiéké", calories_per_100g: 150, proteins: 2.0, carbs: 35, lipids: 0.5 },
  { id: '', name: "Yam", calories_per_100g: 118, proteins: 1.5, carbs: 28, lipids: 0.2 },
  { id: '', name: "Poisson Grillé", calories_per_100g: 140, proteins: 22, carbs: 0, lipids: 5 },
  { id: '', name: "Poulet", calories_per_100g: 165, proteins: 31, carbs: 0, lipids: 3.6 },
  { id: '', name: "Gombo", calories_per_100g: 33, proteins: 1.9, carbs: 7, lipids: 0.2 },
  { id: '', name: "Moringa", calories_per_100g: 64, proteins: 9.4, carbs: 8.3, lipids: 1.4 },
  { id: '', name: "Riz", calories_per_100g: 130, proteins: 2.7, carbs: 28, lipids: 0.3 },
  { id: '', name: "Tomate", calories_per_100g: 18, proteins: 0.9, carbs: 3.9, lipids: 0.2 },
  { id: '', name: "Oignon", calories_per_100g: 40, proteins: 1.1, carbs: 9.3, lipids: 0.1 },
];

export async function syncFoodDictionary() {
  const { supabase } = await import('./supabase')
  if (!supabase) return

  for (const food of localFoodDictionary) {
    const { data: existing } = await supabase
      .from('ingredients')
      .select('id')
      .ilike('name', food.name)
      .single()

    if (!existing) {
      await supabase.from('ingredients').insert({
        name: food.name,
        calories_per_100g: food.calories_per_100g,
        proteins: food.proteins,
        carbs: food.carbs,
        lipids: food.lipids,
      })
    }
  }
}
