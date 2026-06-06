import { fetchRecipes } from "./fetch-recipes";
import CatalogPageClient from "./CatalogPageClient";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function CatalogPage() {
  const initialRecipes = await fetchRecipes();

  return <CatalogPageClient initialRecipes={initialRecipes} />;
}
