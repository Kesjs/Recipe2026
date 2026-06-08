"use client";

import { useState } from "react";
import { Clock, ArrowLeft, Flame, ChevronRight, Quote, Mic, ExternalLink, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { calculateNutrition } from "@/lib/nutrition";
import { Recipe, RecipeIngredient } from "@/lib/types";

interface RecipeDetailClientProps {
  initialRecipe: Recipe;
}

const NutritionDoughnut = ({ calories, protein, carbs, fat }: { calories: number; protein: number; carbs: number; fat: number }) => {
  // Simple SVG doughnut for macro profile
  const total = protein + carbs + fat;
  const proteinDash = (protein / total) * 100;
  const fatDash = (fat / total) * 100;
  
  return (
    <div className="relative w-48 h-48 mx-auto mb-12">
      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f4f4f5" strokeWidth="3" />
        {/* Protein segment */}
        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#7D9D8A" strokeWidth="3" strokeDasharray={`${proteinDash} ${100 - proteinDash}`} strokeDashoffset="0" />
        {/* Fat segment */}
        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="3" strokeDasharray={`${fatDash} ${100 - fatDash}`} strokeDashoffset={-proteinDash} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-5xl font-black text-[#18181b] tracking-tighter">{calories}</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-[#a1a1aa]">Calories</span>
      </div>
    </div>
  );
};

export default function RecipeDetailClient({ initialRecipe }: RecipeDetailClientProps) {
  const [servings, setServings] = useState(4);
  const recipe = initialRecipe;

  const nutrition = recipe.recipe_ingredients ? calculateNutrition(recipe.recipe_ingredients) : {
    calories: 684,
    proteins: 48,
    carbs: 14,
    lipids: 42,
  };

  const instructions = recipe.instructions.split('\n').filter((step: string) => step.trim());

  return (
    <div className="bg-[#fafafa] font-sans text-[#18181b] min-h-screen selection:bg-emerald-100 selection:text-emerald-900 paper-texture">
      <Navbar />

      <header className="relative w-full h-[650px] pt-20">
        {recipe.image_url ? (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-emerald-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#fafafa]" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-6 mb-[-120px] relative z-20">
            <div className="bg-white p-10 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-sm border-t-8 border-[#7D9D8A]">
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-5 py-2 bg-[#eaf1ec] text-[#576b5d] text-[10px] font-black tracking-[0.2em] uppercase rounded-full">Sans gluten</span>
                <span className="px-5 py-2 bg-[#eaf1ec] text-[#576b5d] text-[10px] font-black tracking-[0.2em] uppercase rounded-full">Riche en protéines</span>
                <span className="px-5 py-2 bg-[#eaf1ec] text-[#576b5d] text-[10px] font-black tracking-[0.2em] uppercase rounded-full">Sans lactose</span>
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
                <div className="max-w-3xl">
                  <h1 className="text-5xl md:text-7xl font-black text-[#18181b] tracking-tighter leading-[1] uppercase mb-6 font-serif italic title-shadow">
                    {recipe.title}
                  </h1>
                  <div className="flex gap-12 border-t border-[#e4e4e7] pt-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#a1a1aa] font-bold mb-2">Préparation</span>
                      <span className="text-2xl font-black text-[#18181b]">{recipe.prep_time}<span className="text-sm ml-1 text-[#71717a]">min</span></span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#a1a1aa] font-bold mb-2">Cuisson</span>
                      <span className="text-2xl font-black text-[#18181b]">4.5<span className="text-sm ml-1 text-[#71717a]">h</span></span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#a1a1aa] font-bold mb-2">Difficulté</span>
                      <span className="text-2xl font-black text-[#18181b]">{recipe.difficulty || "Moyen"}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-[#7D9D8A] hover:bg-[#6a8473] text-white px-12 py-6 rounded-full font-black tracking-[0.15em] uppercase transition-all shadow-xl hover:shadow-[#7D9D8A]/30 flex items-center gap-4 group">
                  Lancer la recette
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[150px]" />

      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Column: Ingredients and Prep */}
          <section className="lg:w-[62%]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b-2 border-[#18181b]">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#18181b] mb-2">Ingrédients</h2>
                <p className="text-[#71717a] font-medium tracking-wide">Ajustez les quantités selon vos convives.</p>
              </div>
              
              <div className="flex items-center gap-6 bg-white p-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#e4e4e7]">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#a1a1aa] pl-5">Portions</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-[#fef3c7] text-[#b45309] hover:bg-[#fde68a] transition-all border-2 border-white shadow-sm transform active:scale-90"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="bg-[#fafafa] px-5 py-2 rounded-full border border-[#e4e4e7]">
                    <span className="text-xl font-black tabular-nums">{servings.toString().padStart(2, '0')}</span>
                  </div>
                  <button 
                    onClick={() => setServings(servings + 1)}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-[#fef3c7] text-[#b45309] hover:bg-[#fde68a] transition-all border-2 border-white shadow-sm transform active:scale-90"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1 mb-20">
              {recipe.recipe_ingredients?.map((ri: RecipeIngredient) => (
                <div key={ri.ingredient_id} className="group flex items-center justify-between py-6 px-6 -mx-6 hover:bg-white hover:shadow-sm border-b border-[#e4e4e7] transition-all cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#7D9D8A] transition-colors" />
                    <span className="text-xl text-[#3f3f46] group-hover:text-[#18181b] font-medium transition-colors">{ri.ingredients.name}</span>
                  </div>
                  <span className="text-2xl font-black text-[#18181b] group-hover:text-[#7D9D8A] transition-colors tabular-nums">
                    {(ri.amount_grams * servings / 4).toFixed(0)} <span className="text-xs uppercase text-[#a1a1aa] font-bold">g</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="pb-8 border-b-2 border-[#18181b] mb-12">
              <h2 className="text-4xl font-black uppercase tracking-tight text-[#18181b]">Préparation</h2>
            </div>
            <ol className="space-y-10">
              {instructions.map((step, index) => (
                <li key={index} className="flex gap-8 group">
                  <span className="flex-shrink-0 w-12 h-12 bg-white border border-[#e4e4e7] text-zinc-900 rounded-full flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-[#7D9D8A] group-hover:text-white group-hover:border-[#7D9D8A] transition-all">
                    {index + 1}
                  </span>
                  <p className="text-xl text-[#3f3f46] leading-relaxed pt-2">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Sidebar */}
          <aside className="lg:w-[38%] space-y-12">
            {/* Macro Profile */}
            <div className="bg-white p-12 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.03)] border border-[#e4e4e7]">
              <div className="text-center mb-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a1a1aa] mb-2">Profil nutritionnel</h3>
                <p className="text-xs font-bold text-[#71717a]">Valeurs par portion</p>
              </div>
              
              <NutritionDoughnut 
                calories={nutrition.calories} 
                protein={nutrition.proteins} 
                carbs={nutrition.carbs} 
                fat={nutrition.lipids} 
              />

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <span className="block text-2xl font-black text-[#18181b]">{nutrition.proteins}g</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7D9D8A]">Protein</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-black text-[#18181b]">{nutrition.lipids}g</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#f59e0b]">Healthy Fats</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-black text-[#18181b]">{nutrition.carbs}g</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#71717a]">Net Carbs</span>
                </div>
              </div>
            </div>

            {/* Chef's Secret */}
            <div className="bg-[#eaf1ec] p-12 rounded-sm border-l-[12px] border-[#7D9D8A] relative overflow-hidden group">
              <Quote className="absolute -right-6 -top-6 w-32 h-32 text-[#7D9D8A]/10 transition-transform group-hover:rotate-12 duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-[#7D9D8A] rounded-full flex items-center justify-center text-white shadow-md">
                    <Quote className="w-5 h-5 fill-current" />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#576b5d]">Le secret du chef</h4>
                </div>
                
                <p className="text-[#313a31] text-2xl leading-relaxed font-serif italic font-semibold mb-10 tracking-tight">
                  &laquo;&nbsp;Le secret d&apos;une viande fondante à la fourchette n&apos;est pas seulement le temps, c&apos;est l&apos;étanchéité à l&apos;humidité. Assurez-vous que votre plat de cuisson est hermétiquement scellé.&nbsp;&raquo;
                </p>
                
                <div className="flex items-center gap-5 pt-8 border-t border-[#7D9D8A]/20">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <Image src="https://i.pravatar.cc/120?u=chef_marcus" alt="Chef" fill className="object-cover" />
                  </div>
                  <div>
                    <span className="block text-lg font-black text-[#18181b] tracking-tight">Marcus Thorne</span>
                    <span className="text-xs font-bold text-[#576b5d] uppercase tracking-widest">Executive Culinary Director</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Immersive Studio */}
            <div className="bg-[#18181b] p-10 rounded-sm shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7D9D8A]/30 to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                  <Mic className="w-8 h-8 text-[#f59e0b]" />
                </div>
                <h4 className="text-white text-xl font-black uppercase tracking-tight mb-2">Immersive Studio</h4>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed">Activez le guidage vocal étape par étape pour une expérience en cuisine mains libres.</p>
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 px-8 rounded-full transition-all uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-3 shadow-lg hover:shadow-emerald-500/20">
                  Start Cooking Session
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
