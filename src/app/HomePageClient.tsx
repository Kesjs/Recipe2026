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
  LucideIcon,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { calculateNutrition } from "@/lib/nutrition";
import { generateRecipeLink } from "@/lib/recipe-links";

interface Category {
  id: string;
  name: string;
  title: string;
  description: string;
}

interface HomePageClientProps {
  initialRecipes: Recipe[];
}

const faqs = [
  {
    question: "Comment créer une recette ?",
    answer: "Pour créer une recette, connectez-vous à votre compte et cliquez sur le bouton \"+\" dans la barre de navigation, puis sélectionnez \"Créer une recette\". Vous pourrez alors renseigner le titre, les instructions et les ingrédients locaux nécessaires."
  },
  {
    question: "Comment ajouter une recette aux favoris ?",
    answer: "Sur chaque fiche recette, vous trouverez un bouton coeur (♥) pour ajouter la recette à vos favoris. Vous pouvez retrouver toutes vos recettes favorites dans votre dashboard personnel."
  },
  {
    question: "Comment modifier mon profil ?",
    answer: "Accédez à votre dashboard en cliquant sur votre profil dans le menu utilisateur de la barre de navigation. Vous pourrez y modifier vos informations personnelles, votre photo de profil et vos préférences alimentaires."
  },
  {
    question: "Besoin de plus d'aide ?",
    answer: "Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter directement. Notre équipe de nutritionnistes et passionnés de cuisine est à votre disposition."
  }
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border-b border-zinc-200 py-8 group"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group/btn"
      >
        <h3 className="font-serif text-lg md:text-xl text-zinc-900 group-hover:text-emerald-900 transition-all duration-300 leading-[1.2]">
          {question}
        </h3>
        <div className={`w-12 h-12 rounded-full border-2 border-zinc-100 flex items-center justify-center shrink-0 ml-6 transition-all duration-300 ${isOpen ? 'bg-zinc-900 border-zinc-900 text-white rotate-[135deg]' : 'bg-white text-zinc-300 group-hover:border-emerald-600 group-hover:text-emerald-600'}`}>
          <Plus className="w-5 h-5" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-zinc-500 text-base leading-relaxed max-w-3xl">
          {answer}
        </p>
      </div>
    </div>
  );
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

async function fetchRecipes({
  pageParam,
  categoryId,
}: {
  pageParam: number;
  categoryId?: string;
}) {
  const { supabase } = await import("@/lib/supabase");
  if (!supabase) return [];

  const PAGE_SIZE = 6;
  const offset = (pageParam - 1) * PAGE_SIZE;

  let query = supabase.from("recipes").select(`
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

  const tabs = ["Tout Voir", ...(categories?.map((c) => c.name) || [])];
  const activeCategory = categories?.find((c) => c.name === activeTab);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipes", "home", activeCategory?.id],
    queryFn: ({ pageParam }) =>
      fetchRecipes({ pageParam, categoryId: activeCategory?.id }),
    initialPageParam: 1,
    initialData: {
      pages: [initialRecipes],
      pageParams: [1],
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0 || lastPage.length < 6) return undefined;
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

      <main className="flex-grow" role="main">

        {/* ─── Hero Section ─────────────────────────────────────────────── */}
        {/*
          ✅ <header> → <section> : le <header> global est dans layout.tsx.
             Ici c'est une section de contenu, pas un bandeau de page.
          ✅ pt-20 garde l'espacement sous la navbar fixe (remplace la div h-20
             supprimée dans layout.tsx).
        */}
        <section
          aria-label="Recette mise en avant"
          className="relative w-full px-4 sm:px-6 pt-24 sm:pt-28"
        >
          {/*
            ✅ Hauteur hero corrigée :
               - Avant : min-h-[480px] md:min-h-[560px] lg:h-[640px]
                 → sur petits mobiles (667px), le contenu pouvait être coupé
               - Après : h-[75vh] avec min/max pour rester dans le viewport
                 Garantit que le titre + CTA sont visibles sans scroll
                 sur 375×667 px (iPhone SE).
          */}
          <div className="relative w-full h-[75vh] min-h-[420px] max-h-[680px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
            {heroRecipe?.image_url ? (
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF7K6bOuWC6MLLY9F9KBVP86cN8NmJRvhAPR08iecSWrL6nFylPR5k8Mc&s=10"
                alt={heroRecipe.title}
                fill
                className="object-cover object-center"
                priority
                fetchPriority="high"
                sizes="100vw"
              />
            ) : (
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF7K6bOuWC6MLLY9F9KBVP86cN8NmJRvhAPR08iecSWrL6nFylPR5k8Mc&s=10"
                alt="Plat africain — recette du jour"
                fill
                className="object-cover object-center"
                priority
                fetchPriority="high"
                sizes="100vw"
              />
            )}

            {/* Overlay lisibilité — décoratif */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"
              aria-hidden="true"
            />

            <div className="relative h-full max-w-7xl mx-auto px-6 md:px-16 py-10 md:py-0 flex items-center">
              <div className="glass max-w-xl p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl animate-slide-in-left bg-black/30 backdrop-blur-sm border border-white/10">

                <div className="flex items-center space-x-2 mb-6">
                  <span className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full">
                    Recette du jour
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8 max-w-2xl drop-shadow-md">
                  {heroRecipe?.title
                    .split(" ")
                    .map((word: string, i: number, arr: string[]) => {
                      const shouldItalicize = i === arr.length - 1;
                      return (
                        <span key={i}>
                          {shouldItalicize ? (
                            <span className="italic font-normal">{word}</span>
                          ) : (
                            word
                          )}
                          {" "}
                          {i === 1 && i < arr.length - 1 && <br />}
                        </span>
                      );
                    }) || "Naya Cuisine"}
                </h1>

                <div className="flex items-center space-x-8 text-white/80 mb-10">
                  <div className="flex items-center space-x-2.5">
                    <Clock className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                    <span className="text-sm font-bold tracking-tight uppercase">
                      {heroRecipe?.prep_time ?? "—"} min
                    </span>
                  </div>
                  {heroNutrition && (
                    <div className="flex items-center space-x-2.5">
                      <Flame className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                      <span className="text-sm font-bold tracking-tight uppercase">
                        {heroNutrition.calories} kcal
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/*
                    ✅ py-3 → py-3.5 : hauteur ~48px (44px minimum respecté)
                    ✅ will-change: transform sur boutons avec active:scale-95
                  */}
                  <Link
                    href={heroRecipe ? generateRecipeLink(heroRecipe) : "/recettes"}
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-emerald-200/50 flex items-center justify-center space-x-2 group focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 [will-change:transform] active:scale-95"
                  >
                    <span>Voir la recette</span>
                    <ArrowRight
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>

                  <button
                    type="button"
                    aria-label="Enregistrer cette recette"
                    className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl border border-white/30 transition-all flex items-center justify-center space-x-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 [will-change:transform] active:scale-95"
                  >
                    <Bookmark className="w-5 h-5" aria-hidden="true" />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ─────────────────────────────────────────────────────────────── */}

        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* Filtres de catégories */}
          {/*
            ✅ space-x-6 → space-x-8 : espacement entre éléments tactiles
               porté à 32px (WCAG 2.5.5 recommande 8px min, on dépasse
               confortablement).
          */}
          <div
            className="flex items-center space-x-8 overflow-x-auto pb-16 no-scrollbar snap-x"
            role="tablist"
            aria-label="Filtrer par catégorie"
          >
            {tabs.map((tab) => {
              const Icon = categoryIcons[tab] || CookingPot;
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`h-16 shrink-0 flex items-center space-x-4 px-12 transition-all rounded-[2rem] snap-start focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 [will-change:transform] active:scale-95 ${
                    isActive
                      ? "bg-zinc-900 text-white shadow-2xl shadow-zinc-400/20 ring-4 ring-zinc-900/10"
                      : "border-2 border-zinc-100 bg-white text-zinc-500 hover:border-emerald-200 hover:text-emerald-900 shadow-sm hover:shadow-md"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${isActive ? "text-emerald-400" : "text-emerald-600"}`}
                    aria-hidden="true"
                  />
                  <span className="font-bold text-base">{tab}</span>
                </button>
              );
            })}
          </div>

          {/* Titre de section */}
          <div className="mt-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-10">
            <div className="max-w-2xl">
              {/*
                ✅ h2 (pas h1) — la hiérarchie est : h1 hero → h2 sections
              */}
              <h2 className="font-serif text-4xl md:text-5xl text-zinc-900 mb-4">
                Tendances de la semaine
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed">
                Les recettes les plus populaires de la communauté, sélectionnées
                par nos nutritionnistes pour un quotidien équilibré.
              </p>
            </div>
            <Link
              href="/recettes"
              className="text-emerald-700 font-bold flex items-center space-x-2 group focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 rounded-full"
            >
              <span>Explorer toutes les recettes</span>
              <ArrowRight
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Grille de recettes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 pb-24">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col space-y-4"
                  aria-hidden="true"
                >
                  {/*
                    ✅ aspect-[4/5] avec w-full suffit — pas besoin de width/height
                       explicites sur les skeletons car ils n'ont pas de CLS (pas d'image)
                  */}
                  <div className="aspect-[4/5] w-full bg-zinc-200 rounded-[2rem]" />
                  <div className="h-6 bg-zinc-200 rounded w-3/4" />
                  <div className="h-4 bg-zinc-200 rounded w-1/2" />
                </div>
              ))
            ) : filteredTrendingRecipes.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-zinc-400 text-lg font-serif italic">
                  Aucune recette trouvée.
                </p>
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

        {/* ─── Newsletter ───────────────────────────────────────────────── */}
        <section
          className="max-w-7xl mx-auto px-6 py-16"
          aria-labelledby="newsletter-title"
        >
          <div className="flex flex-col lg:flex-row rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white">

            <div className="lg:w-1/2 bg-emerald-100 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
              <div
                className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-200/50 rounded-full blur-3xl"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <h2
                  id="newsletter-title"
                  className="font-serif text-4xl md:text-5xl lg:text-6xl text-emerald-950 leading-tight mb-8"
                >
                  Composez vos repas de la{" "}
                  <span className="italic font-normal">semaine.</span>
                </h2>
                <p className="text-emerald-900/70 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                  Inscrivez-vous à notre lettre d&apos;information et recevez chaque
                  dimanche une sélection de recettes saines et de conseils
                  nutritionnels.
                </p>

                <form
                  className="relative flex flex-col sm:flex-row items-center gap-4 max-w-xl"
                  onSubmit={(e) => e.preventDefault()}
                  aria-label="Formulaire d'inscription à la newsletter"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Adresse e-mail
                  </label>
                  <div className="relative flex-grow w-full">
                    <Mail
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-700/50 w-5 h-5"
                      aria-hidden="true"
                    />
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
                    className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-emerald-900 transition-all shadow-lg [will-change:transform] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    S&apos;abonner
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:w-1/2 h-[320px] lg:h-auto relative min-h-[320px]">
              {/*
                ✅ loading="lazy" ajouté : cette image est hors viewport au premier
                   chargement sur tous les écrans → ne doit pas bloquer le LCP.
                ✅ sizes précis : 100vw sur mobile, 50vw sur desktop.
              */}
              <Image
                src="https://images.unsplash.com/photo-1600790194169-d3affafaf726?auto=format&w=1000&q=80&fit=crop"
                alt="Ingrédients frais disposés sur un plan de travail en bois"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-emerald-950/10 mix-blend-multiply"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>
        {/* ─────────────────────────────────────────────────────────────── */}

        {/* ─── FAQ Section ───────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-zinc-500 text-base max-w-2xl mx-auto">
              L&apos;essentiel pour naviguer dans l&apos;écosystème Naya avec aisance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem key={index} index={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
        {/* ─────────────────────────────────────────────────────────────── */}

      </main>

      <Footer />
    </div>
  );
}
