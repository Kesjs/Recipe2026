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
}

export default function RecipeCard({ recipe, category = "Recette", priority = false }: RecipeCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const nutrition = recipe.recipe_ingredients ? calculateNutrition(recipe.recipe_ingredients) : null;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link href={`/recettes/${recipe.id}`}>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
          {recipe.image_url ? (
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-slate-400 text-2xl">🍽️</span>
              </div>
            </div>
          )}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-md rounded-xl shadow-sm hover:bg-white transition-colors"
          >
            <Heart 
              className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-slate-400"}`} 
            />
          </button>
          {nutrition && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-semibold text-slate-900">{nutrition.calories} kcal</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-slate-900 mb-2 line-clamp-1">{recipe.title}</h3>
          
          <div className="flex items-center space-x-4 text-sm text-slate-500 font-normal">
            <span className="text-slate-600">{category}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{recipe.prep_time} min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
