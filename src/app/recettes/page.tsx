import { fetchRecipes } from "./fetch-recipes";
import CatalogPageClient from "./CatalogPageClient";

export default async function CatalogPage() {
  const initialRecipes = await fetchRecipes();

  return <CatalogPageClient initialRecipes={initialRecipes} />;
}
