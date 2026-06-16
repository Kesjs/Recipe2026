"use client";

import { useState, useMemo } from "react";
import { Clock, ArrowLeft, Flame, ChevronRight, Quote, Mic, Minus, Plus, AlertCircle, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
import Navbar from "@/components/Navbar";
import { calculateNutrition } from "@/lib/nutrition";
import { Recipe, RecipeIngredient } from "@/lib/types";
import CookingMode from "@/components/CookingMode";

interface RecipeDetailClientProps {
  initialRecipe: Recipe;
}

// ── Skeleton ────────────────────────────────────────────────────────────────
export function RecipeDetailSkeleton() {
  return (
    <div className="bg-[#fafafa] min-h-screen animate-pulse">
      <Navbar />
      {/* Image placeholder */}
      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-zinc-200" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pb-24">
        {/* Title card */}
        <div className="bg-white rounded-lg p-8 shadow-sm -mt-20 relative z-10 mb-16">
          <div className="h-4 bg-zinc-200 rounded w-24 mb-6" />
          <div className="h-10 bg-zinc-200 rounded w-3/4 mb-4" />
          <div className="h-6 bg-zinc-200 rounded w-1/4" />
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left */}
          <div className="lg:w-[60%] space-y-4">
            <div className="h-6 bg-zinc-200 rounded w-40 mb-8" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between py-4 border-b border-zinc-100">
                <div className="h-5 bg-zinc-200 rounded w-32" />
                <div className="h-5 bg-zinc-200 rounded w-16" />
              </div>
            ))}
            <div className="h-6 bg-zinc-200 rounded w-40 mt-10 mb-6" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-zinc-200 rounded-full shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-4 bg-zinc-200 rounded w-full" />
                  <div className="h-4 bg-zinc-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
          {/* Sidebar */}
          <div className="lg:w-[40%] space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-40 h-40 bg-zinc-200 rounded-full mx-auto mb-6" />
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2 text-center">
                    <div className="h-6 bg-zinc-200 rounded mx-auto w-12" />
                    <div className="h-3 bg-zinc-200 rounded mx-auto w-16" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-100 rounded-lg h-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface RecipeDetailClientProps {
  initialRecipe: Recipe;
}

const NutritionDoughnut = ({ calories, protein, carbs, fat }: { calories: number; protein: number; carbs: number; fat: number }) => {
  const total = protein + carbs + fat;
  const proteinDash = total > 0 ? (protein / total) * 100 : 0;
  const fatDash = total > 0 ? (fat / total) * 100 : 0;
  
  return (
    <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-8">
      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f4f4f5" strokeWidth="3" />
        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#7D9D8A" strokeWidth="3" strokeDasharray={`${proteinDash} ${100 - proteinDash}`} strokeDashoffset="0" />
        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="3" strokeDasharray={`${fatDash} ${100 - fatDash}`} strokeDashoffset={-proteinDash} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl sm:text-4xl font-black text-[#18181b] tracking-tighter">{calories}</span>
        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#a1a1aa]">Calories</span>
      </div>
    </div>
  );
};

export default function RecipeDetailClient({ initialRecipe }: RecipeDetailClientProps) {
  const [servings, setServings] = useState(4);
  const [cookingMode, setCookingMode] = useState(false);
  const recipe = initialRecipe;

  const nutrition = useMemo(() => {
    if (!recipe.recipe_ingredients || recipe.recipe_ingredients.length === 0) {
      return null;
    }
    return calculateNutrition(recipe.recipe_ingredients);
  }, [recipe.recipe_ingredients]);

  const instructions = useMemo(() => {
    if (!recipe.instructions) return [];
    return recipe.instructions.split('\n').filter((step: string) => step.trim());
  }, [recipe.instructions]);

  const baseServings = 4; // Base servings for calculation

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#18181b] mb-2">Recette non trouvée</h1>
          <p className="text-[#71717a] mb-6">Cette recette n&apos;existe pas ou a été supprimée.</p>
          <Link 
            href="/recettes" 
            className="inline-block bg-[#7D9D8A] hover:bg-[#6a8473] text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Retour aux recettes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] font-sans text-[#18181b] min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* Mode Cuisine — plein écran */}
      {cookingMode && (
        <CookingMode
          title={recipe.title}
          steps={instructions}
          onClose={() => setCookingMode(false)}
        />
      )}
      <main id="main-content">
        <header className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] pt-16 sm:pt-20">
          {recipe.image_url ? (
            <OptimizedImage
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
              loading="eager"
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#fafafa]" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-[-80px] sm:mb-[-100px] relative z-20">
            <div className="bg-white p-6 sm:p-8 md:p-12 shadow-lg rounded-lg border-t-4 border-[#7D9D8A]">
              {recipe.categories && (
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  <span className="px-3 py-1.5 bg-[#eaf1ec] text-[#576b5d] text-[10px] sm:text-xs font-black tracking-[0.15em] uppercase rounded-full">
                    {recipe.categories.name}
                  </span>
                </div>
              )}
              
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#18181b] tracking-tight leading-tight uppercase mb-4 sm:mb-6 font-serif">
                    {recipe.title}
                  </h1>
                  <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 border-t border-[#e4e4e7] pt-4 sm:pt-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#71717a] font-bold mb-1">Préparation</span>
                      <span className="text-xl sm:text-2xl font-black text-[#18181b]">{recipe.prep_time}<span className="text-sm ml-1 text-[#71717a]">min</span></span>
                    </div>
                    {recipe.difficulty && (
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#71717a] font-bold mb-1">Difficulté</span>
                        <span className="text-xl sm:text-2xl font-black text-[#18181b]">{recipe.difficulty}</span>
                      </div>
                    )}
                    {recipe.country && (
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#71717a] font-bold mb-1">Origine</span>
                        <span className="flex items-center gap-1.5 text-xl sm:text-2xl font-black text-[#18181b]">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                          {recipe.country}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  className="bg-[#7D9D8A] hover:bg-[#6a8473] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-black tracking-[0.1em] uppercase text-sm sm:text-base transition-all shadow-lg hover:shadow-[#7D9D8A]/30 flex items-center gap-2 sm:gap-3 group"
                  aria-label="Commencer la préparation de cette recette"
                >
                  Lancer la recette
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[100px] sm:h-[120px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column: Ingredients and Prep */}
          <section className="lg:w-[60%]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4 pb-4 sm:pb-6 border-b-2 border-[#18181b]">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#18181b] mb-2">Ingrédients</h2>
                <p className="text-sm sm:text-base text-[#71717a] font-medium">Ajustez les quantités selon vos convives.</p>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 bg-white p-2 rounded-full shadow-sm border border-[#e4e4e7]">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#71717a] pl-3 sm:pl-4">Portions</span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button 
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    aria-label="Réduire le nombre de portions"
                    className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#fef3c7] text-[#b45309] hover:bg-[#fde68a] transition-all border-2 border-white shadow-sm active:scale-95"
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <div className="bg-[#fafafa] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#e4e4e7] min-w-[3rem] sm:min-w-[3.5rem] text-center">
                    <span className="text-lg sm:text-xl font-black tabular-nums">{servings}</span>
                  </div>
                  <button 
                    onClick={() => setServings(Math.min(20, servings + 1))}
                    aria-label="Augmenter le nombre de portions"
                    className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#fef3c7] text-[#b45309] hover:bg-[#fde68a] transition-all border-2 border-white shadow-sm active:scale-95"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-0 mb-12 sm:mb-16">
              {recipe.recipe_ingredients && recipe.recipe_ingredients.length > 0 ? (
                recipe.recipe_ingredients.map((ri: RecipeIngredient) => (
                  <div key={ri.ingredient_id} className="group flex items-center justify-between py-4 sm:py-5 px-4 -mx-4 sm:px-6 sm:-mx-6 hover:bg-white hover:shadow-sm border-b border-[#e4e4e7] transition-all">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-transparent group-hover:bg-[#7D9D8A] transition-colors" />
                      <span className="text-base sm:text-lg md:text-xl text-[#3f3f46] group-hover:text-[#18181b] font-medium transition-colors">{ri.ingredients.name}</span>
                    </div>
                    <span className="text-lg sm:text-xl md:text-2xl font-black text-[#18181b] group-hover:text-[#7D9D8A] transition-colors tabular-nums">
                      {Math.round(ri.amount_grams * servings / baseServings)} <span className="text-xs uppercase text-[#71717a] font-bold ml-1">g</span>
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[#71717a]">
                  Aucun ingrédient disponible
                </div>
              )}
            </div>

            <div className="pb-4 sm:pb-6 border-b-2 border-[#18181b] mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#18181b]">Préparation</h2>
            </div>
            <ol className="space-y-6 sm:space-y-8">
              {instructions.length > 0 ? (
                instructions.map((step, index) => (
                  <li key={index} className="flex gap-4 sm:gap-6 group">
                    <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#e4e4e7] text-zinc-900 rounded-full flex items-center justify-center font-black text-base sm:text-lg shadow-sm group-hover:bg-[#7D9D8A] group-hover:text-white group-hover:border-[#7D9D8A] transition-all">
                      {index + 1}
                    </span>
                    <p className="text-base sm:text-lg md:text-xl text-[#3f3f46] leading-relaxed pt-1.5 sm:pt-2">{step}</p>
                  </li>
                ))
              ) : (
                <div className="text-center py-8 text-[#71717a]">
                  Aucune instruction disponible
                </div>
              )}
            </ol>
          </section>

          {/* Sidebar */}
          <aside className="lg:w-[40%] space-y-6 sm:space-y-8">
            {/* Macro Profile */}
            {nutrition && (
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-[#e4e4e7]">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#71717a] mb-2">Profil nutritionnel</h3>
                  <p className="text-xs sm:text-sm font-bold text-[#71717a]">Valeurs par portion</p>
                </div>
                
                <NutritionDoughnut 
                  calories={nutrition.calories} 
                  protein={nutrition.proteins} 
                  carbs={nutrition.carbs} 
                  fat={nutrition.lipids} 
                />

                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <span className="block text-lg sm:text-xl md:text-2xl font-black text-[#18181b]">{nutrition.proteins}g</span>
                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-[#7D9D8A]">Protéines</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg sm:text-xl md:text-2xl font-black text-[#18181b]">{nutrition.lipids}g</span>
                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-[#f59e0b]">Lipides</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg sm:text-xl md:text-2xl font-black text-[#18181b]">{nutrition.carbs}g</span>
                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-[#71717a]">Glucides</span>
                  </div>
                </div>
              </div>
            )}

            {recipe.description && (
              <div className="bg-[#eaf1ec] p-6 sm:p-8 rounded-lg border-l-4 sm:border-l-[12px] border-[#7D9D8A] relative overflow-hidden">
                <Quote className="absolute -right-4 -top-4 sm:-right-6 sm:-top-6 w-20 h-20 sm:w-32 sm:h-32 text-[#7D9D8A]/10" aria-hidden="true" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#7D9D8A] rounded-full flex items-center justify-center text-white shadow-md">
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    </div>
                    <h4 className="text-xs sm:text-xs font-black uppercase tracking-[0.15em] text-[#576b5d]">À propos</h4>
                  </div>
                  
                  <p className="text-[#313a31] text-base sm:text-lg md:text-xl leading-relaxed font-serif">
                    {recipe.description}
                  </p>
                </div>
              </div>
            )}

            {/* Immersive Studio */}
            <div className="bg-[#18181b] p-6 sm:p-8 rounded-lg shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7D9D8A]/30 to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-white/10">
                  <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-[#f59e0b]" aria-hidden="true" />
                </div>
                <h4 className="text-white text-lg sm:text-xl font-black uppercase tracking-tight mb-2">Mode Cuisine</h4>
                <p className="text-zinc-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed max-w-xs">Activez le guidage étape par étape pour cuisiner mains libres.</p>
                <button 
                  onClick={() => setCookingMode(true)}
                  disabled={instructions.length === 0}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all uppercase tracking-[0.1em] text-[10px] sm:text-xs flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                  aria-label="Démarrer le mode cuisine étape par étape"
                >
                  Démarrer le mode cuisine
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      </main>
    </div>
  );
}
