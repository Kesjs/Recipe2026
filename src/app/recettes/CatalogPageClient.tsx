"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import CardSkeleton from "@/components/CardSkeleton";
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

const CATEGORY_EMOJIS: Record<string, string> = {
  "Tout": "https://cdn.jsdelivr.net/npm/openmoji-named-svgs@latest/color/green-salad.svg",
  "Petit-déjeuner": "https://cdn.jsdelivr.net/npm/openmoji-named-svgs@latest/color/pancakes.svg",
  "Déjeuner": "https://cdn.jsdelivr.net/npm/openmoji-named-svgs@latest/color/green-salad.svg",
  "Dîner": "https://cdn.jsdelivr.net/npm/openmoji-named-svgs@latest/color/pot-of-food.svg",
  "Goûter": "https://cdn.jsdelivr.net/npm/openmoji-named-svgs@latest/color/shortcake.svg",
};

export default function CatalogPageClient({ initialRecipes }: CatalogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Tout");
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
          setCategories([{ id: "all", name: "all", title: "Tout" }, ...data]);
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

  if (activeTab !== "Tout") {
    const category = categories.find(cat => cat.title === activeTab);
    if (category && category.id !== "all") {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.category_id === category.id
      );
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden">
      {/* Editorial Canvas Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] paper-texture z-0" />
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24 relative z-10">
        
        {/* Editorial Section Header */}
        <header className="mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-zinc-200 pb-16">
            <div className="max-w-3xl">
              <h1 className={`${playfair.className} text-6xl lg:text-8xl text-zinc-950 mb-8 leading-[0.9] tracking-tighter`}>
                Catalogue de <br /> <span className="italic font-normal text-emerald-900 underline decoration-emerald-500/10 decoration-[12px] underline-offset-[12px]">Recettes.</span>
              </h1>
              <p className="text-zinc-500 text-xl lg:text-2xl font-medium leading-relaxed max-w-xl">
                Un voyage sensoriel à travers les saveurs authentiques, réinventées pour votre bien-être quotidien.
              </p>
            </div>
            
            <div className="relative w-full lg:w-96 group">
              <input
                type="text"
                placeholder="Rechercher une saveur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-8 py-5 bg-white border border-zinc-200 rounded-[2rem] shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all text-zinc-950 placeholder-zinc-300 font-bold text-lg"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-200 group-focus-within:text-emerald-600 transition-colors" />
            </div>
          </div>

          {/* Staggered Filter Pills */}
          <div className="mt-12 flex items-center space-x-6 overflow-x-auto pb-8 no-scrollbar snap-x">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.title)}
                className={`h-16 shrink-0 flex items-center space-x-5 px-12 rounded-[2.5rem] transition-all duration-500 active:scale-95 snap-start border-[3px] ${
                  activeTab === cat.title
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] ring-8 ring-zinc-900/5"
                    : "bg-white text-zinc-400 border-zinc-100 hover:border-emerald-200 hover:text-emerald-950 shadow-sm"
                }`}
              >
                {CATEGORY_EMOJIS[cat.title] && (
                  <Image 
                    src={CATEGORY_EMOJIS[cat.title]} 
                    alt={cat.title} 
                    width={activeTab === cat.title ? 36 : 28}
                    height={activeTab === cat.title ? 36 : 28}
                    className={`transition-all duration-500 ${activeTab === cat.title ? 'w-9 h-9' : 'w-7 h-7 opacity-40'}`} 
                  />
                )}
                <span className={`font-black uppercase tracking-tight ${activeTab === cat.title ? 'text-xl' : 'text-lg'}`}>
                  {cat.title === 'Tout' ? 'Tout Voir' : cat.title}
                </span>
              </button>
            ))}
          </div>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-24">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-48 bg-white/40 rounded-[4rem] border-4 border-dashed border-zinc-100 animate-in fade-in zoom-in duration-1000">
            <div className="text-8xl mb-8 opacity-20">🥘</div>
            <p className={`${playfair.className} text-4xl text-zinc-300 italic`}>L&apos;étagère est vide...</p>
            <p className="mt-4 text-zinc-400 font-bold uppercase tracking-widest text-sm">Essayez un autre mot-clé ou filtre.</p>
          </div>
        ) : (
          /* Editorial Masonry Spread */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-32 pb-40">
            {filteredRecipes.map((recipe, index) => {
              // Create staggered effect (0, +120px, 0) for the 3 columns
              const isMiddleColumn = (index % 3 === 1);
              return (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  priority={index < 6} 
                  variant="editorial"
                  className={isMiddleColumn ? "md:translate-y-24" : ""}
                  category={categories.find(c => c.id === recipe.category_id)?.title}
                />
              );
            })}
          </div>
        )}
      </main>

      <footer className="bg-zinc-950 text-zinc-500 py-24 px-8 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className={`${playfair.className} text-3xl text-white italic`}>Naya Cooking</div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold">© 2024 Équilibre & Saveurs locales</p>
        </div>
      </footer>

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
