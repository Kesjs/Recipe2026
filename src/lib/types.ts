export interface Profile {
  id: string;
  name: string;
  email: string;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  title: string;
  description?: string;
  created_at?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  calories_per_100g: number;
  proteins: number;
  carbs: number;
  lipids: number;
}

export interface RecipeIngredient {
  id?: string;
  recipe_id: string;
  ingredient_id: string;
  amount_grams: number;
  ingredients: Ingredient;
}

export interface Recipe {
  id: string;
  title: string;
  instructions: string;
  prep_time: number;
  image_url?: string;
  category_id?: string;
  created_by?: string;
  country?: string;
  description?: string;
  difficulty?: string;
  created_at?: string;
  recipe_ingredients?: RecipeIngredient[];
  categories?: Category;
}

export interface Favorite {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at?: string;
  recipes?: Recipe;
}

export interface NutritionInfo {
  calories: number;
  proteins: number;
  carbs: number;
  lipids: number;
}

export interface UserMetadata {
  name?: string;
  avatar_url?: string;
}

export interface User {
  id: string;
  email?: string;
  user_metadata?: UserMetadata;
}
