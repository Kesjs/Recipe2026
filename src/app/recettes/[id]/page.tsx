import { Suspense } from "react";
import { fetchRecipeById } from "../fetch-recipes";
import { extractRecipeIdFromUrl } from "@/lib/recipe-links";
import RecipeDetailClient, { RecipeDetailSkeleton } from "./RecipeDetailClient";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export const revalidate = 300;

async function RecipeContent({ id }: { id: string }) {
  const recipeId = extractRecipeIdFromUrl(id);
  const recipe = await fetchRecipeById(recipeId);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-[#18181b] mb-2">Recette non trouvée</h1>
          <p className="text-[#71717a] mb-6">Cette recette n&apos;existe pas ou a été supprimée.</p>
          <Link
            href="/recettes"
            className="inline-block bg-[#7D9D8A] hover:bg-[#6a8473] text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Retour aux recettes
          </Link>
        </div>
      </div>
    );
  }

  return <RecipeDetailClient initialRecipe={recipe} />;
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<RecipeDetailSkeleton />}>
      <RecipeContent id={params.id} />
    </Suspense>
  );
}
