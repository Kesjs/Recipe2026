"use client";

import { useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { RecipeCardSkeleton } from "@/components/Skeleton";
import Footer from "@/components/Footer";
import { Recipe } from "@/lib/types";

interface Category {
  id: string;
  name: string;
  title: string;
  description: string;
}

interface HomePageClientProps {
  initialRecipes: Recipe[];
}

async function fetchCategories(): Promise<Category[]> {
  const { supabase } = await import("@/lib/supabase");
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data || [];
}

async function fetchRecipes({ pageParam, categoryId }: { pageParam: number; categoryId?: string }) {
  const { supabase } = await import("@/lib/supabase");
  if (!supabase) return [];
  
  const PAGE_SIZE = 12;
  const offset = (pageParam - 1) * PAGE_SIZE;
  
  let query = supabase
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
    `);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  if (error) throw error;
  return data || [];
}

export default function HomePageClient({ initialRecipes }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Tout");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const tabs = categories?.map(c => c.name) || ["Tout"];

  const activeCategory = categories?.find(c => c.name === activeTab);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipes", "home", activeCategory?.id],
    queryFn: ({ pageParam }) => fetchRecipes({ pageParam, categoryId: activeCategory?.id }),
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
                className={`px-6 py-2 rounded-lg font-medium transition-colors min-w-[100px] ${
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
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{activeCategory?.title || "Toutes les Recettes"}</h2>
            <p className="text-slate-600">{activeCategory?.description || "Explorez notre collection complète de recettes saines et nutritives du monde entier."}</p>
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
                  <RecipeCard key={recipe.id} recipe={recipe} category={activeCategory?.name || "Recette"} priority={index < 4} />
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
      <Footer />
    </div>
  );
}
