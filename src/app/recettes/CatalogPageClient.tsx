"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import CardSkeleton from "@/components/CardSkeleton";
import { useQuery } from "@tanstack/react-query";

interface Recipe {
  id: string;
  title: string;
  instructions: string;
  prep_time: number;
  image_url: string;
  created_by: string;
  recipe_ingredients?: any[];
}

interface CatalogPageClientProps {
  initialRecipes: Recipe[];
}

async function fetchRecipes() {
  const { supabase } = await import("@/lib/supabase");
  if (!supabase) return [];
  
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
}

export default function CatalogPageClient({ initialRecipes }: CatalogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Tout");

  const tabs = ["Tout", "Cuisine du Monde", "Recettes Rapides", "Petit-Déjeuner", "Afrique"];

  const { data: recipes = initialRecipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
    initialData: initialRecipes,
  });

  let filteredRecipes = recipes;

  if (searchQuery) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (activeTab === "Afrique") {
    const africanRecipes = [
      "Amiwo",
      "Thiéboudienne",
      "Aloco",
      "Tilapia",
      "Garba",
      "Attieké",
    ];
    filteredRecipes = filteredRecipes.filter((recipe) =>
      africanRecipes.some((keyword) =>
        recipe.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  } else if (activeTab === "Recettes Rapides") {
    filteredRecipes = filteredRecipes.filter((recipe) => recipe.prep_time <= 30);
  } else if (activeTab === "Petit-Déjeuner") {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes("petit") ||
      recipe.title.toLowerCase().includes("breakfast")
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Catalogue des Recettes</h1>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une recette..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Aucune recette trouvée</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} priority={index < 6} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
