"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
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
  const [totalCalories, setTotalCalories] = useState(0);
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

  useEffect(() => {
    let total = 0;
    ingredients.forEach((ing) => {
      if (ing.name && ing.amount) {
        const food = localFoodDictionary.find((f) => f.name === ing.name);
        if (food) {
          total += (food.calories_per_100g * parseFloat(ing.amount)) / 100;
        }
      }
    });
    setTotalCalories(Math.round(total));
  }, [ingredients]);

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
          'africa': 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
          'world': 'dddddddd-dddd-dddd-dddd-dddddddddddd',
          'quick': 'cccccccc-cccc-cccc-cccc-cccccccccccc',
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
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900"
                >
                  <option value="">Sélectionner</option>
                  <option value="africa">Afrique</option>
                  <option value="world">Cuisine du Monde</option>
                  <option value="quick">Recettes Rapides</option>
                </select>
              </div>

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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Difficulté *
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900"
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="facile">Facile</option>
                  <option value="moyen">Moyen</option>
                  <option value="difficile">Difficile</option>
                </select>
              </div>
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
                {ingredients.map((ing) => (
                  <div key={ing.id} className="flex items-center space-x-3">
                    <select
                      value={ing.name}
                      onChange={(e) => updateIngredient(ing.id, "name", e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900"
                    >
                      <option value="">Sélectionner un aliment</option>
                      {localFoodDictionary.map((food) => (
                        <option key={food.name} value={food.name}>{food.name}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={ing.amount}
                      onChange={(e) => updateIngredient(ing.id, "amount", e.target.value)}
                      className="w-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400"
                      placeholder="100"
                      min="0"
                      step="0.1"
                    />
                    <span className="text-slate-500 text-sm">g</span>
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(ing.id)}
                        className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ajouter un ingrédient</span>
                </button>
              </div>

              {totalCalories > 0 && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Total estimé:</span> {totalCalories} kcal
                  </p>
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
