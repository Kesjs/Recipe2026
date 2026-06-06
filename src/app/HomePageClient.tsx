"use client";

import { useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { RecipeCardSkeleton } from "@/components/Skeleton";
import { Recipe } from "@/lib/types";

const categoryContent: Record<string, { title: string; description: string; category: string }> = {
  "Tout": {
    title: "Toutes les Recettes",
    description: "Explorez notre collection complète de recettes saines et nutritives du monde entier.",
    category: "Recette"
  },
  "Afrique": {
    title: "Patrimoine Culinaires Africains",
    description: "Découvrez les saveurs authentiques et diététiques du continent : Amiwo, Tilapia au four, Aloco et bien d&apos;autres.",
    category: "Afrique"
  },
  "Recettes Rapides": {
    title: "Recettes Rapides",
    description: "Des plats prêts en moins de 30 minutes pour les journées chargées.",
    category: "Rapide"
  },
  "Cuisine du Monde": {
    title: "Cuisine du Monde",
    description: "Voyagez à travers les saveurs internationales avec nos recettes du monde entier.",
    category: "International"
  }
};

interface HomePageClientProps {
  initialRecipes: Recipe[];
}

async function fetchRecipes({ pageParam }: { pageParam: number }) {
  const { supabase } = await import("@/lib/supabase");
  if (!supabase) return [];
  
  const PAGE_SIZE = 12;
  const offset = (pageParam - 1) * PAGE_SIZE;
  
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
    .range(offset, offset + PAGE_SIZE - 1);

  if (error) throw error;
  return data || [];
}

export default function HomePageClient({ initialRecipes }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Tout");

  const tabs = ["Tout", "Afrique", "Recettes Rapides", "Cuisine du Monde"];

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipes", "home"],
    queryFn: fetchRecipes,
    initialPageParam: 1,
    initialData: {
      pages: [initialRecipes],
      pageParams: [1],
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });

  const recipes = data?.pages.flat() || [];

  let filteredRecipes = recipes;

  if (searchQuery) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (activeTab === "Afrique") {
    const africanRecipes = ["Amiwo", "Thiéboudienne", "Aloco", "Tilapia", "Garba", "Attieké"];
    filteredRecipes = filteredRecipes.filter((recipe) =>
      africanRecipes.some((keyword) =>
        recipe.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  } else if (activeTab === "Recettes Rapides") {
    filteredRecipes = filteredRecipes.filter((recipe) => recipe.prep_time <= 30);
  }

  const currentContent = categoryContent[activeTab];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 transition-all duration-300">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{currentContent.title}</h2>
            <p className="text-slate-600">{currentContent.description}</p>
          </div>
        </div>

        <div id="recettes-section" className="mb-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(12)].map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">Aucune recette trouvée</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredRecipes.map((recipe, index) => (
                  <RecipeCard key={recipe.id} recipe={recipe} category={currentContent.category} priority={index < 4} />
                ))}
              </div>

              {hasNextPage && (
                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-6 py-2 bg-white border border-slate-200 rounded-full text-slate-700 font-medium hover:border-emerald-600 hover:text-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isFetchingNextPage ? "Chargement..." : "Voir plus"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
