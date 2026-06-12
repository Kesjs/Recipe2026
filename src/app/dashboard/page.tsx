"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChefHat,
  Heart,
  LogOut,
  Plus,
  Clock,
  Flame,
  ArrowRight,
  User,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calculateNutrition } from "@/lib/nutrition";
import { generateRecipeLink } from "@/lib/recipe-links";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface Recipe {
  id: string;
  title: string;
  image_url?: string;
  prep_time: number;
  difficulty?: string;
  country?: string;
  created_at?: string;
  recipe_ingredients?: any[];
}

function RecipeMiniCard({ recipe, onNavigate }: { recipe: Recipe; onNavigate: (href: string) => void }) {
  const nutrition = recipe.recipe_ingredients
    ? calculateNutrition(recipe.recipe_ingredients)
    : null;

  const href = generateRecipeLink(recipe);

  return (
    <article
      onClick={() => onNavigate(href)}
      className="group flex items-center gap-4 p-3 bg-white border border-zinc-100 rounded-2xl hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-100">
        {recipe.image_url ? (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Utensils className="w-6 h-6 text-zinc-300" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors truncate leading-tight mb-1">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {recipe.prep_time} min
          </span>
          {nutrition && (
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" aria-hidden="true" />
              {nutrition.calories} kcal
            </span>
          )}
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-500 transition-colors shrink-0" aria-hidden="true" />
    </article>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [userFavorites, setUserFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) { router.push("/auth"); return; }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push("/auth"); return; }
        setUser(user);

        const selectIngredients = `
          *,
          recipe_ingredients (
            ingredient_id, amount_grams,
            ingredients ( id, name, calories_per_100g, proteins, carbs, lipids )
          )
        `;

        const [{ data: recipes }, { data: favorites }] = await Promise.all([
          supabase
            .from("recipes")
            .select(selectIngredients)
            .eq("created_by", user.id)
            .order("created_at", { ascending: false }),
          supabase
            .from("favorites")
            .select(`*, recipes ( ${selectIngredients} )`)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false }),
        ]);

        setUserRecipes(recipes || []);
        setUserFavorites(favorites?.map((f: any) => f.recipes).filter(Boolean) || []);
      } catch {
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  const handleLogout = async () => {
    try {
      const { supabase } = await import("@/lib/supabase");
      if (supabase) await supabase.auth.signOut();
    } finally {
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!user) return null;

  const displayName = user.user_metadata?.name || user.email?.split("@")[0] || "Chef";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-28 sm:pt-32 pb-16">

        {/* ── En-tête profil ────────────────────────────────────────── */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-10 border-b border-zinc-200">
          <div className="flex items-center gap-5">
            {/* Avatar initiales */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-emerald-500/20 shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-1">
                Mon espace
              </p>
              <h1 className={`${playfair.className} text-2xl sm:text-3xl text-zinc-900 leading-tight`}>
                Bonjour, <span className="italic">{displayName.split(" ")[0]}</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/recettes/creer"
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-emerald-500/20 active:scale-95"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Nouvelle recette
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 text-zinc-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-sm font-bold rounded-xl transition-all active:scale-95"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </section>

        {/* ── Stats rapides ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Mes recettes</span>
            </div>
            <p className="text-3xl font-black text-zinc-900 tracking-tight">{userRecipes.length}</p>
            <p className="text-xs text-zinc-400 mt-1">recette{userRecipes.length !== 1 ? "s" : ""} publiée{userRecipes.length !== 1 ? "s" : ""}</p>
          </div>

          <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Favoris</span>
            </div>
            <p className="text-3xl font-black text-zinc-900 tracking-tight">{userFavorites.length}</p>
            <p className="text-xs text-zinc-400 mt-1">recette{userFavorites.length !== 1 ? "s" : ""} sauvegardée{userFavorites.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* ── Mes recettes ──────────────────────────────────────────── */}
        <section className="mb-12" aria-labelledby="my-recipes-title">
          <div className="flex items-center justify-between mb-6">
            <h2
              id="my-recipes-title"
              className={`${playfair.className} text-xl sm:text-2xl text-zinc-900`}
            >
              Mes recettes
            </h2>
            <Link
              href="/recettes/creer"
              className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Créer
            </Link>
          </div>

          {userRecipes.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-zinc-200 rounded-2xl p-10 text-center">
              <ChefHat className="w-10 h-10 text-zinc-200 mx-auto mb-3" aria-hidden="true" />
              <p className="text-zinc-400 font-medium text-sm mb-4">
                Vous n&apos;avez pas encore publié de recette.
              </p>
              <Link
                href="/recettes/creer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Publier ma première recette
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userRecipes.map((recipe) => (
                <RecipeMiniCard
                  key={recipe.id}
                  recipe={recipe}
                  onNavigate={(href) => router.push(href)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Mes favoris ───────────────────────────────────────────── */}
        <section aria-labelledby="favorites-title">
          <div className="flex items-center justify-between mb-6">
            <h2
              id="favorites-title"
              className={`${playfair.className} text-xl sm:text-2xl text-zinc-900`}
            >
              Mes favoris
            </h2>
            <Link
              href="/recettes"
              className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Explorer
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {userFavorites.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-zinc-200 rounded-2xl p-10 text-center">
              <Heart className="w-10 h-10 text-zinc-200 mx-auto mb-3" aria-hidden="true" />
              <p className="text-zinc-400 font-medium text-sm mb-4">
                Aucune recette sauvegardée pour l&apos;instant.
              </p>
              <Link
                href="/recettes"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-bold rounded-xl hover:bg-emerald-900 transition-all"
              >
                Parcourir les recettes
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userFavorites.map((recipe) => (
                <RecipeMiniCard
                  key={recipe.id}
                  recipe={recipe}
                  onNavigate={(href) => router.push(href)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
