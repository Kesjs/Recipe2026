"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Heart } from "lucide-react";
import { Recipe } from "@/lib/types";
import { calculateNutrition } from "@/lib/nutrition";
import { useState } from "react";

interface RecipeCardProps {
  recipe: Recipe;
  category?: string;
  priority?: boolean;
  variant?: "default" | "editorial";
  className?: string;
}

export default function RecipeCard({ 
  recipe, 
  category = "Recette", 
  priority = false, 
  variant = "default",
  className = "" 
}: RecipeCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const nutrition = recipe.recipe_ingredients ? calculateNutrition(recipe.recipe_ingredients) : null;

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { toggleFavorite: toggleFavoriteAction } = await import('@/lib/actions/favorites');
      const result = await toggleFavoriteAction(recipe.id);
      setIsFavorited(result.favorited);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (variant === "editorial") {
    return (
      <article className={`group cursor-pointer ${className}`}>
        <Link href={`/recettes/${recipe.id}`}>
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-sm">
            {recipe.image_url ? (
              <Image 
                src={recipe.image_url} 
                alt={recipe.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={priority}
              />
            ) : (
              <div className="w-full h-full bg-zinc-200" />
            )}
            <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/20 transition-all duration-500 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-white text-emerald-950 px-8 py-3 rounded-2xl font-bold shadow-2xl transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                Aperçu
              </span>
            </div>
            <button
              onClick={toggleFavorite}
              className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-sm hover:bg-white transition-colors z-10"
            >
              <Heart 
                className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-zinc-400"}`} 
              />
            </button>
          </div>
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">{category}</span>
          <h3 className="font-serif text-3xl text-zinc-950 mt-2 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
            {recipe.title}
          </h3>
          <div className="flex items-center space-x-4 mt-4 text-zinc-400 font-medium">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4" />
              <span>{recipe.prep_time} min</span>
            </div>
            {nutrition && (
              <div className="flex items-center space-x-1.5">
                <Flame className="w-4 h-4" />
                <span>{nutrition.calories} kcal</span>
              </div>
            )}
          </div>
        </Link>
        {showToast && (
          <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {isFavorited ? 'Ajouté aux favoris' : 'Retiré des favoris'}
          </div>
        )}
      </article>
    );
  }

  return (
    <>
      <article className={`group cursor-pointer ${className}`}>
        <Link href={`/recettes/${recipe.id}`} className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 rounded-[2rem]">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-5 bg-zinc-100 shadow-sm">
            {recipe.image_url ? (
              <Image
                src={recipe.image_url}
                alt={recipe.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={priority}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-100">
                <span className="text-zinc-300 text-4xl">🍽️</span>
              </div>
            )}
            <button
              type="button"
              onClick={toggleFavorite}
              aria-label={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
              aria-pressed={isFavorited}
              className="absolute top-4 right-4 p-2.5 bg-white/85 backdrop-blur-md rounded-xl shadow-sm hover:bg-white transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-zinc-500"}`} />
            </button>
            {nutrition && (
              <div className="absolute bottom-4 left-4 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-zinc-900">{nutrition.calories} kcal</span>
              </div>
            )}
          </div>
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">{category}</span>
          <h3 className="font-serif text-2xl text-zinc-950 mt-2 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
            {recipe.title}
          </h3>
          <div className="flex items-center space-x-4 mt-3 text-zinc-400 text-sm font-medium">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4" />
              <span>{recipe.prep_time} min</span>
            </div>
          </div>
        </Link>
      </article>
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {isFavorited ? 'Ajouté aux favoris' : 'Retiré des favoris'}
        </div>
      )}
    </>
  );
}
