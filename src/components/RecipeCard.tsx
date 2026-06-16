"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Heart, MapPin, ChefHat } from "lucide-react";
import { Recipe } from "@/lib/types";
import { calculateNutrition } from "@/lib/nutrition";
import { generateRecipeLink } from "@/lib/recipe-links";
import { useState, useEffect } from "react";

interface RecipeCardProps {
  recipe: Recipe;
  category?: string;
  priority?: boolean;
  variant?: "default" | "editorial";
  className?: string;
}

const DIFFICULTY_STYLES: Record<string, { bg: string; text: string }> = {
  Facile:   { bg: "bg-emerald-500/90", text: "text-white" },
  Moyen:    { bg: "bg-amber-500/90",   text: "text-white" },
  Difficile:{ bg: "bg-red-500/90",     text: "text-white" },
};

export default function RecipeCard({
  recipe,
  category = "Recette",
  priority = false,
  variant = "default",
  className = "",
}: RecipeCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const nutrition = recipe.recipe_ingredients
    ? calculateNutrition(recipe.recipe_ingredients)
    : null;

  const difficulty = recipe.difficulty;
  const diffStyle = difficulty ? DIFFICULTY_STYLES[difficulty] : null;

  // Charger l'état favori réel depuis Supabase
  useEffect(() => {
    let cancelled = false;
    async function checkFavorite() {
      try {
        const { isRecipeFavorited } = await import("@/lib/actions/favorites");
        const result = await isRecipeFavorited(recipe.id);
        if (!cancelled) setIsFavorited(result);
      } catch {
        // non connecté — on laisse false
      }
    }
    checkFavorite();
    return () => { cancelled = true; };
  }, [recipe.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { toggleFavorite: toggleFavoriteAction } = await import(
        "@/lib/actions/favorites"
      );
      const result = await toggleFavoriteAction(recipe.id);
      setIsFavorited(result.favorited);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const favoriteLabel = isFavorited ? "Retirer des favoris" : "Ajouter aux favoris";

  return (
    <>
      <article className={`group flex flex-col ${className}`}>
        <Link
          href={generateRecipeLink(recipe)}
          className="flex flex-col h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 rounded-[1.75rem]"
        >
          {/* Image container — hauteur fixe pour uniformité */}
          <div className="relative w-full h-56 rounded-[1.75rem] overflow-hidden bg-zinc-100 shrink-0">
            {/* Skeleton pendant le chargement */}
            {isImageLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-100 animate-pulse z-10" aria-hidden="true" />
            )}

            {recipe.image_url ? (
              <Image
                src={recipe.image_url}
                alt={recipe.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={priority}
                onLoadingComplete={() => setIsImageLoading(false)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-200">
                <ChefHat className="w-10 h-10 text-zinc-300" aria-hidden="true" />
              </div>
            )}

            {/* Overlay hover */}
            <div
              className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/25 transition-all duration-300 flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="opacity-0 group-hover:opacity-100 bg-white text-zinc-900 px-5 py-2 rounded-xl font-bold text-sm shadow-xl transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                Voir la recette
              </span>
            </div>

            {/* Badge difficulté — haut gauche */}
            {diffStyle && difficulty && (
              <span
                className={`absolute top-3 left-3 ${diffStyle.bg} ${diffStyle.text} text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm`}
              >
                {difficulty}
              </span>
            )}

            {/* Bouton favori — haut droite */}
            <button
              type="button"
              onClick={toggleFavorite}
              aria-label={favoriteLabel}
              aria-pressed={isFavorited}
              className="absolute top-3 right-3 p-2.5 bg-white/85 backdrop-blur-sm rounded-xl shadow-sm hover:bg-white transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Heart
                className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-zinc-400"}`}
                aria-hidden="true"
              />
            </button>

            {/* Badge calories — bas gauche */}
            {nutrition && (
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
                <span className="text-xs font-bold text-white">
                  {nutrition.calories} kcal
                </span>
              </div>
            )}
          </div>

          {/* Contenu texte — hauteur fixe pour aligner toutes les cards */}
          <div className="flex flex-col pt-4 pb-1 h-28">
            {/* Catégorie + pays */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
                {category}
              </span>
              {recipe.country && (
                <span className="flex items-center space-x-1 text-zinc-400 text-[10px] font-medium">
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  <span>{recipe.country}</span>
                </span>
              )}
            </div>

            {/* Titre — 2 lignes max, occupe l'espace disponible */}
            <h3 className="font-serif text-xl text-zinc-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 flex-1">
              {recipe.title}
            </h3>

            {/* Méta — temps, toujours en bas */}
            <div className="flex items-center space-x-1.5 mt-auto pt-2 text-zinc-400 text-sm font-medium">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{recipe.prep_time} min</span>
            </div>
          </div>
        </Link>
      </article>

      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium"
        >
          {isFavorited ? "Ajouté aux favoris ❤" : "Retiré des favoris"}
        </div>
      )}
    </>
  );
}
