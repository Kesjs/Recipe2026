"use client";

import { useState, useEffect } from "react";
import { Search, Globe, Utensils, ChefHat, BookOpen } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import CardSkeleton from "@/components/CardSkeleton";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface Recipe {
  id: string;
  title: string;
  instructions: string;
  prep_time: number;
  image_url: string;
  created_by: string;
  category_id?: string;
  recipe_ingredients?: any[];
}

interface Category {
  id: string;
  name: string;
  title: string;
  description?: string;
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

const CATEGORY_ICONS: Record<string, any> = {
  "Tout":          BookOpen,
  "Afrique":       Globe,
  "Bénin":         Globe,
  "Rapide":        Utensils,
  "International": ChefHat,
};

export default function CatalogPageClient({ initialRecipes }: CatalogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;

        const { data } = await supabase
          .from("categories")
          .select("*")
          .order("name");

        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const { data: recipes = initialRecipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
    initialData: initialRecipes,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  let filteredRecipes = recipes;

  if (searchQuery) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Priorité: Bénin, Afrique, puis le reste
  const categoryOrder = ["Bénin", "Afrique", "Rapide", "International"];
  const sortedCategories = categories
    .filter(c => c.name !== "Tout")
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.name);
      const indexB = categoryOrder.indexOf(b.name);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden">
      {/* Editorial Canvas Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] paper-texture z-0" />
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 lg:pb-24 relative z-10">
        
        {/* Editorial Section Header */}
        <header className="mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12 border-b border-zinc-200 pb-10 sm:pb-14">
            <div className="max-w-3xl">
              <h1 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-zinc-950 mb-4 sm:mb-6 leading-[0.95] tracking-tight`}>
                Catalogue de <br /> <span className="italic font-normal text-emerald-900 underline decoration-emerald-500/10 decoration-[8px] sm:decoration-[12px] underline-offset-[8px] sm:underline-offset-[12px]">Recettes.</span>
              </h1>
              <p className="text-zinc-500 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
                Un voyage sensoriel à travers les saveurs authentiques, réinventées pour votre bien-être quotidien.
              </p>
            </div>
            
            <div className="relative w-full lg:w-80 group">
              <input
                type="text"
                placeholder="Rechercher une saveur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 sm:pl-14 pr-6 sm:pr-8 py-3 sm:py-4 bg-white border border-zinc-200 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all text-zinc-950 placeholder-zinc-300 font-semibold text-sm sm:text-base"
              />
              <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-zinc-200 group-focus-within:text-emerald-600 transition-colors" />
            </div>
          </div>

          {/* Catégories affichées sans onglets - sections séparées */}
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-16 sm:gap-y-20">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-24 sm:py-32 bg-white/40 rounded-[2rem] sm:rounded-[3rem] border-2 sm:border-4 border-dashed border-zinc-100 animate-in fade-in zoom-in duration-1000">
            <div className="text-5xl sm:text-6xl mb-6 sm:mb-8 opacity-20">🥘</div>
            <p className={`${playfair.className} text-2xl sm:text-3xl text-zinc-300 italic`}>L&apos;étagère est vide...</p>
            <p className="mt-4 text-zinc-400 font-bold uppercase tracking-widest text-xs sm:text-sm">Essayez un autre mot-clé.</p>
          </div>
        ) : (
          /* Sections par catégorie */
          <div className="space-y-20 sm:space-y-24 pb-20 sm:pb-32">
            {sortedCategories.map((category) => {
              const categoryRecipes = filteredRecipes.filter(
                (recipe) => recipe.category_id === category.id
              );

              if (categoryRecipes.length === 0) return null;

              const Icon = CATEGORY_ICONS[category.name] || BookOpen;

              return (
                <section key={category.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {/* En-tête de catégorie */}
                  <div className="flex items-center gap-4 mb-8 sm:mb-12">
                    <div className="p-3 bg-emerald-100 rounded-2xl">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-700" />
                    </div>
                    <div>
                      <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl text-zinc-950`}>
                        {category.title}
                      </h2>
                      {category.description && (
                        <p className="text-zinc-500 text-sm sm:text-base mt-2">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Grille de recettes pour cette catégorie */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-16 sm:gap-y-20">
                    {categoryRecipes.map((recipe, index) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        priority={index < 3}
                        variant="editorial"
                        className=""
                        category={category.title}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      <style jsx global>{`
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
