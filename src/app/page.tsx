"use client";

import { useState, useEffect } from "react";
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
    description: "Découvrez les saveurs authentiques et diététiques du continent : Amiwo, Tilapia au four, Aloco et bien d'autres.",
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

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Tout");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const tabs = ["Tout", "Afrique", "Recettes Rapides", "Cuisine du Monde"];
  const PAGE_SIZE = 12;

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const { supabase } = await import("@/lib/supabase");
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
          .range(0, PAGE_SIZE - 1);

        if (error) throw error;
        setRecipes(data || []);
        setFilteredRecipes(data || []);
        setHasMore((data || []).length === PAGE_SIZE);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  useEffect(() => {
    let filtered = recipes;

    if (searchQuery) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab === "Afrique") {
      const africanRecipes = ["Amiwo", "Thiéboudienne", "Aloco", "Tilapia", "Garba", "Attieké"];
      filtered = filtered.filter((recipe) =>
        africanRecipes.some((keyword) =>
          recipe.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else if (activeTab === "Recettes Rapides") {
      filtered = filtered.filter((recipe) => recipe.prep_time <= 30);
    }

    setFilteredRecipes(filtered);
  }, [searchQuery, activeTab, recipes]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const { supabase } = await import("@/lib/supabase");
      const newOffset = offset + PAGE_SIZE;
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
        .range(newOffset, newOffset + PAGE_SIZE - 1);

      if (error) throw error;

      if (data && data.length > 0) {
        setRecipes((prev) => [...prev, ...data]);
        setOffset(newOffset);
        setHasMore(data.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more recipes:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const currentContent = categoryContent[activeTab];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white border border-zinc-200/80 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-emerald-600 text-white"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 transition-all duration-300">
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">{currentContent.title}</h2>
            <p className="text-zinc-600">{currentContent.description}</p>
          </div>
        </div>

        <div id="recettes-section" className="mb-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 text-lg">Aucune recette trouvée</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} category={currentContent.category} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-end mt-8">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="px-6 py-2 bg-white border border-zinc-200/80 rounded-full text-zinc-700 font-medium hover:border-emerald-600 hover:text-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? "Chargement..." : "Voir plus"}
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
