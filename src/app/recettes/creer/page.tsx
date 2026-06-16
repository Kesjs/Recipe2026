"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Globe, Zap, Flame } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import IngredientSelector from "@/components/IngredientSelector";
import SelectField from "@/components/SelectField";
import { localFoodDictionary } from "@/lib/food-dictionary";
import { generateRecipeLink } from "@/lib/recipe-links";

interface IngredientRow {
  id: string;
  name: string;
  amount: string;
}

export default function CreateRecipePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    { id: "1", name: "", amount: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) {
          router.push("/auth");
          return;
        }
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/auth");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/auth");
      }
    }
    checkAuth();
  }, [router]);

  function addIngredient() {
    setIngredients([
      ...ingredients,
      { id: Date.now().toString(), name: "", amount: "" },
    ]);
  }

  function removeIngredient(id: string) {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ing) => ing.id !== id));
    }
  }

  function updateIngredient(id: string, field: "name" | "amount", value: string) {
    setIngredients(
      ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!title || !description || !prepTime || !difficulty || !instructions) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      const validIngredients = ingredients.filter((ing) => ing.name && ing.amount);
      if (validIngredients.length < 1) {
        throw new Error("Veuillez ajouter au moins un ingrédient");
      }

      const { supabase } = await import("@/lib/supabase");
      if (!supabase) {
        throw new Error("Supabase is not configured");
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Vous devez être connecté pour créer une recette");
      }

      // Récupérer ou créer l'ID de catégorie
      let categoryId = null;
      if (category) {
        const categoryMap: Record<string, string> = {
          'africa': 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',      // Afrique
          'world': 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',      // International (Cuisine du Monde)
          'quick': 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',      // Rapide (Recettes Rapides)
        };
        categoryId = categoryMap[category] || null;
      }

      const { data: recipe, error: recipeError } = await supabase
        .from("recipes")
        .insert({
          title,
          instructions,
          prep_time: parseInt(prepTime),
          image_url: imageUrl || null,
          created_by: user.id,
          category_id: categoryId,
          description,
          difficulty,
          country: 'Bénin',
        })
        .select()
        .single();

      if (recipeError) throw recipeError;

      for (const ing of validIngredients) {
        const { data: existingIngredient } = await supabase
          .from("ingredients")
          .select("id")
          .ilike("name", ing.name)
          .single();

        let ingredientId: string;

        if (existingIngredient) {
          ingredientId = existingIngredient.id;
        } else {
          const food = localFoodDictionary.find((f) => f.name === ing.name);
          const { data: newIngredient, error: ingError } = await supabase
            .from("ingredients")
            .insert({
              name: ing.name,
              calories_per_100g: food?.calories_per_100g || 100,
              proteins: food?.proteins || 10,
              carbs: food?.carbs || 20,
              lipids: food?.lipids || 5,
            })
            .select()
            .single();

          if (ingError) throw ingError;
          ingredientId = newIngredient.id;
        }

        const { error: linkError } = await supabase
          .from("recipe_ingredients")
          .insert({
            recipe_id: recipe.id,
            ingredient_id: ingredientId,
            amount_grams: parseFloat(ing.amount),
          });

        if (linkError) throw linkError;
      }

      setSuccess("Recette créée avec succès!");
      setTitle("");
      setDescription("");
      setCategory("");
      setPrepTime("");
      setDifficulty("");
      setImageUrl("");
      setInstructions("");
      setIngredients([{ id: "1", name: "", amount: "" }]);

      setTimeout(() => {
        router.push(generateRecipeLink(recipe));
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2 tracking-tight">Créer une nouvelle recette</h1>
          <p className="text-slate-500 mb-8">Partagez votre création avec la communauté</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <div>
                  <p className="text-red-700 font-medium">Erreur</p>
                  <p className="text-red-600 text-sm mt-1">
                    {error.includes('duplicate')
                      ? 'Cette recette existe déjà'
                      : error.includes('auth')
                      ? 'Erreur d\'authentification'
                      : error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Titre de la recette *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400"
                placeholder="Ex: Amiwo au Poulet"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900 placeholder-zinc-400 resize-none"
                placeholder="Décrivez votre recette en quelques mots..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectField
                value={category}
                onChange={setCategory}
                label="Catégorie"
                placeholder="Sélectionner"
                options={[
                  { value: "africa", label: "Afrique", icon: <Globe className="w-4 h-4" />, color: "text-yellow-600" },
                  { value: "world", label: "Cuisine du Monde", icon: <Globe className="w-4 h-4" />, color: "text-blue-600" },
                  { value: "quick", label: "Recettes Rapides", icon: <Zap className="w-4 h-4" />, color: "text-orange-600" },
                ]}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Temps (min) *
                </label>
                <input
                  type="number"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400"
                  placeholder="30"
                  required
                  min="1"
                />
              </div>

              <SelectField
                value={difficulty}
                onChange={setDifficulty}
                label="Difficulté *"
                placeholder="Sélectionner"
                required
                options={[
                  { value: "Facile", label: "Facile", icon: <Flame className="w-4 h-4" />, color: "text-emerald-600" },
                  { value: "Moyen", label: "Moyen", icon: <Flame className="w-4 h-4" />, color: "text-amber-600" },
                  { value: "Difficile", label: "Difficile", icon: <Flame className="w-4 h-4" />, color: "text-red-600" },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                URL de l&apos;image (optionnel)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ingrédients *
              </label>
              <div className="space-y-3">
                {ingredients.map((ing, index) => (
                  <div key={ing.id} className="flex flex-col gap-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    {/* Row 1: Ingredient selector */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-slate-500 font-medium mb-1 block">Aliment</label>
                        <IngredientSelector
                          value={ing.name}
                          onChange={(value) => updateIngredient(ing.id, "name", value)}
                          options={localFoodDictionary}
                          placeholder="Sélectionner un aliment..."
                        />
                      </div>
                      
                      {/* Amount input */}
                      <div className="flex items-end gap-2 flex-shrink-0">
                        <div>
                          <label className="text-xs text-slate-500 font-medium mb-1 block">Quantité</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={ing.amount}
                              onChange={(e) => updateIngredient(ing.id, "amount", e.target.value)}
                              className="w-20 px-2.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 text-sm font-medium"
                              placeholder="100"
                              min="0"
                              step="10"
                            />
                            <span className="text-slate-500 text-sm font-medium">g</span>
                          </div>
                        </div>
                        
                        {/* Delete button */}
                        {ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(ing.id)}
                            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer cet ingrédient"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Nutritional info preview */}
                    {ing.name && ing.amount && (
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                        {(() => {
                          const food = localFoodDictionary.find((f) => f.name === ing.name);
                          if (!food) return null;
                          const factor = parseFloat(ing.amount) / 100;
                          const calories = Math.round(food.calories_per_100g * factor);
                          const proteins = Math.round(food.proteins * factor * 10) / 10;
                          const carbs = Math.round(food.carbs * factor * 10) / 10;
                          const lipids = Math.round(food.lipids * factor * 10) / 10;
                          
                          return (
                            <>
                              <div className="text-xs flex-1">
                                <div className="font-semibold text-emerald-700">{calories} kcal</div>
                                <div className="text-slate-500 text-[11px]">
                                  P:{proteins}g C:{carbs}g L:{lipids}g
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                ))}

                {/* Add ingredient button */}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-emerald-300 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-400 font-semibold rounded-xl transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ajouter un ingrédient</span>
                </button>
              </div>

              {/* Total nutrition summary */}
              {ingredients.some(ing => ing.name && ing.amount) && (
                <div className="mt-5 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(() => {
                      let totals = { calories: 0, proteins: 0, carbs: 0, lipids: 0 };
                      ingredients.forEach((ing) => {
                        if (ing.name && ing.amount) {
                          const food = localFoodDictionary.find((f) => f.name === ing.name);
                          if (food) {
                            const factor = parseFloat(ing.amount) / 100;
                            totals.calories += food.calories_per_100g * factor;
                            totals.proteins += food.proteins * factor;
                            totals.carbs += food.carbs * factor;
                            totals.lipids += food.lipids * factor;
                          }
                        }
                      });
                      
                      return (
                        <>
                          <div>
                            <div className="text-xs text-slate-600 font-medium">Calories</div>
                            <div className="text-xl font-black text-emerald-700">{Math.round(totals.calories)}</div>
                            <div className="text-[10px] text-slate-500">kcal</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 font-medium">Protéines</div>
                            <div className="text-xl font-black text-blue-600">{(Math.round(totals.proteins * 10) / 10).toFixed(1)}</div>
                            <div className="text-[10px] text-slate-500">g</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 font-medium">Glucides</div>
                            <div className="text-xl font-black text-amber-600">{(Math.round(totals.carbs * 10) / 10).toFixed(1)}</div>
                            <div className="text-[10px] text-slate-500">g</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 font-medium">Lipides</div>
                            <div className="text-xl font-black text-orange-600">{(Math.round(totals.lipids * 10) / 10).toFixed(1)}</div>
                            <div className="text-[10px] text-slate-500">g</div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Instructions de préparation *
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900 placeholder-zinc-400 resize-none"
                placeholder="1. Première étape&#10;2. Deuxième étape&#10;3. Troisième étape"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Création en cours..." : "Publier la recette"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
