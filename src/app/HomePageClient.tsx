"use client";

import { useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import Footer from "@/components/Footer";
import { Recipe } from "@/lib/types";
import { 
  Clock, 
  Flame, 
  ArrowRight, 
  Mail, 
  Bookmark,
  LayoutGrid,
  Egg,
  Salad,
  CookingPot,
  Cookie,
  LucideIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { calculateNutrition } from "@/lib/nutrition";

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
  
  const PAGE_SIZE = 13; // 1 for hero + 12 for grid
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
  const [activeTab, setActiveTab] = useState("Tout Voir");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categoryIcons: Record<string, LucideIcon> = {
    "Petit-déjeuner": Egg,
    "Déjeuner": Salad,
    "Dîner": CookingPot,
    "Snack": Cookie,
    "Tout Voir": LayoutGrid,
  };

  const tabs = ["Tout Voir", ...(categories?.map(c => c.name) || [])];
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
  const heroRecipe = recipes[0];
  const trendingRecipes = recipes.slice(1);
  const heroNutrition = heroRecipe?.recipe_ingredients
    ? calculateNutrition(heroRecipe.recipe_ingredients)
    : null;

  const filteredTrendingRecipes = trendingRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 paper-texture min-h-screen flex flex-col">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-grow">
        {/* Header/Hero Section */}
        <header className="relative w-full px-4 sm:px-6 pt-20 sm:pt-24">
          <div className="relative w-full min-h-[560px] md:min-h-[640px] lg:h-[720px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
            {heroRecipe?.image_url ? (
              <Image 
                src={heroRecipe.image_url} 
                alt={heroRecipe.title} 
                fill 
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-emerald-100" />
            )}
            {/* Overlay pour garantir la lisibilité quel que soit le visuel */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent md:from-white/30 md:via-transparent" />
            
            <div className="relative h-full max-w-7xl mx-auto px-6 md:px-16 py-10 md:py-0 flex items-center">
              <div className="glass max-w-xl p-8 sm:p-10 md:p-14 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl animate-fade-in animate-slide-in-left">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="px-4 py-1.5 bg-emerald-600 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">Recette du jour</span>
                </div>
                
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-emerald-950 leading-[1.1] mb-8 max-w-2xl">
                  {heroRecipe?.title.split(' ').map((word: string, i: number, arr: string[]) => {
                    const shouldItalicize = i === arr.length - 1;
                    return (
                      <span key={i}>
                        {shouldItalicize ? <span className="italic font-normal">{word}</span> : word}
                        {' '}
                        {i === 1 && i < arr.length - 1 && <br />}
                      </span>
                    );
                  }) || "Naya Cuisine"}
                </h1>
                
                <div className="flex items-center space-x-8 text-emerald-900/80 mb-10">
                  <div className="flex items-center space-x-2.5">
                    <Clock className="w-6 h-6 text-emerald-600" />
                    <span className="text-sm font-bold tracking-tight uppercase">{heroRecipe?.prep_time ?? "\u2014"} min</span>
                  </div>
                  {heroNutrition && (
                    <div className="flex items-center space-x-2.5">
                      <Flame className="w-6 h-6 text-emerald-600" />
                      <span className="text-sm font-bold tracking-tight uppercase">{heroNutrition.calories} kcal</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link
                    href={heroRecipe ? `/recettes/${heroRecipe.id}` : "/recettes"}
                    className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-emerald-200/50 flex items-center justify-center space-x-2 group focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    <span>Voir la recette</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    type="button"
                    className="px-10 py-4 bg-white/60 hover:bg-white text-emerald-950 font-bold rounded-2xl border border-white/50 transition-all flex items-center justify-center space-x-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    <Bookmark className="w-5 h-5" />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Category Filters */}
          <div className="flex items-center space-x-6 overflow-x-auto pb-16 no-scrollbar snap-x">
            {tabs.map((tab) => {
              const Icon = categoryIcons[tab] || CookingPot;
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`h-20 shrink-0 flex items-center space-x-4 px-12 transition-all rounded-[2rem] active:scale-95 snap-start focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 ${
                    isActive
                      ? "bg-zinc-900 text-white shadow-2xl shadow-zinc-400/20 ring-4 ring-zinc-900/10"
                      : "border-2 border-zinc-100 bg-white text-zinc-500 hover:border-emerald-200 hover:text-emerald-900 shadow-sm hover:shadow-md"
                  }`}
                >
                  <Icon className={`w-8 h-8 ${isActive ? "text-emerald-400" : "text-emerald-600"}`} />
                  <span className="font-bold text-lg">{tab}</span>
                </button>
              );
            })}
          </div>

          {/* Section Title */}
          <div className="mt-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-10">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl text-zinc-900 mb-4">Tendances de la semaine</h2>
              <p className="text-zinc-500 text-lg leading-relaxed">
                Les recettes les plus populaires de la communauté, sélectionnées par nos nutritionnistes pour un quotidien équilibré.
              </p>
            </div>
            <Link href="/recettes" className="text-emerald-700 font-bold flex items-center space-x-2 group focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 rounded-full">
              <span>Explorer toutes les recettes</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 pb-24">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col space-y-4">
                  <div className="aspect-[4/5] bg-zinc-200 rounded-[2rem]" />
                  <div className="h-6 bg-zinc-200 rounded w-3/4" />
                  <div className="h-4 bg-zinc-200 rounded w-1/2" />
                </div>
              ))
            ) : filteredTrendingRecipes.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-zinc-400 text-lg font-serif italic">Aucune recette trouvée.</p>
              </div>
            ) : (
              filteredTrendingRecipes.map((recipe, index) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  category={activeCategory?.name || "Recette"}
                  className={index % 3 === 1 ? "md:translate-y-16" : ""}
                  variant="editorial"
                />
              ))
            )}
          </div>

          {hasNextPage && !isLoading && !searchQuery && (
            <div className="flex justify-center mt-24">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-10 py-4 bg-white border border-zinc-200 rounded-full text-zinc-900 font-bold hover:border-emerald-600 hover:text-emerald-600 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                {isFetchingNextPage ? "Chargement…" : "Voir plus de recettes"}
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white">
            <div className="lg:w-1/2 bg-emerald-100 p-10 md:p-16 lg:p-20 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-200/50 rounded-full blur-3xl" aria-hidden="true"></div>
              <div className="relative z-10">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-emerald-950 leading-tight mb-8">
                  Composez vos repas de la <span className="italic font-normal">semaine.</span>
                </h2>
                <p className="text-emerald-900/70 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                  Inscrivez-vous à notre lettre d&apos;information et recevez chaque dimanche une sélection de recettes saines et de conseils nutritionnels.
                </p>

                <form
                  className="relative flex flex-col sm:flex-row items-center gap-4 max-w-xl"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label htmlFor="newsletter-email" className="sr-only">Adresse e-mail</label>
                  <div className="relative flex-grow w-full">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-700/50 w-5 h-5" aria-hidden="true" />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="Votre adresse e-mail"
                      className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl text-zinc-900 focus:outline-none focus:ring-4 focus:ring-emerald-200 transition-all shadow-sm border border-emerald-200/50 text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-emerald-900 transition-all shadow-lg active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    S&apos;abonner
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:w-1/2 h-[320px] lg:h-auto relative min-h-[320px]">
              <Image
                src="https://images.unsplash.com/photo-1600790194169-d3affafaf726?auto=format&w=1000&q=80&fit=crop"
                alt="Ingrédients frais sur un plan de travail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-emerald-950/10 mix-blend-multiply" aria-hidden="true"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
