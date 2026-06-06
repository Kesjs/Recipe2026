"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import NutritionCard from "@/components/NutritionCard";
import { RecipeDetailSkeleton, NutritionCardSkeleton, Skeleton } from "@/components/Skeleton";
import { calculateNutrition } from "@/lib/nutrition";
import { Recipe, RecipeIngredient } from "@/lib/types";

interface RecipeDetailClientProps {
  initialRecipe: Recipe;
}

export default function RecipeDetailClient({ initialRecipe }: RecipeDetailClientProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(initialRecipe);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <RecipeDetailSkeleton />
              <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-8">
                <Skeleton className="w-48 h-6 mb-6" />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-100">
                      <Skeleton className="w-32 h-4" />
                      <Skeleton className="w-16 h-4" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-8">
                <Skeleton className="w-48 h-6 mb-6" />
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                      <Skeleton className="flex-1 h-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <NutritionCardSkeleton />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <p className="text-zinc-500 text-lg">{error || "Recette non trouvée"}</p>
          </div>
        </main>
      </div>
    );
  }

  const nutrition = recipe.recipe_ingredients ? calculateNutrition(recipe.recipe_ingredients) : {
    calories: 0,
    proteins: 0,
    carbs: 0,
    lipids: 0,
  };

  const instructions = recipe.instructions.split('\n').filter((step: string) => step.trim());

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-zinc-600 hover:text-zinc-950 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
              <div className="relative aspect-[16/9] bg-zinc-100">
                {recipe.image_url ? (
                  <Image
                    src={recipe.image_url}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-100">
                    <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center">
                      <span className="text-zinc-400 text-3xl">🍽️</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8">
                <h1 className="text-3xl font-semibold text-zinc-900 mb-4 tracking-tight">{recipe.title}</h1>
                
                <div className="flex items-center space-x-4 text-zinc-500">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{recipe.prep_time} minutes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-8">
              <h2 className="text-xl font-semibold text-zinc-900 mb-6 tracking-tight">Ingrédients</h2>
              <ul className="space-y-4">
                {recipe.recipe_ingredients?.map((ri: RecipeIngredient) => (
                  <li key={ri.ingredient_id} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
                    <span className="text-zinc-700 font-normal">{ri.ingredients.name}</span>
                    <span className="text-zinc-500 font-medium">{ri.amount_grams}g</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-8">
              <h2 className="text-xl font-semibold text-zinc-900 mb-6 tracking-tight">Préparation</h2>
              <ol className="space-y-6">
                {instructions.map((step: string, index: number) => (
                  <li key={index} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-zinc-700 pt-1 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <NutritionCard nutrition={nutrition} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
