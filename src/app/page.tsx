import { fetchHomeRecipes } from "./fetch-home-recipes";
import HomePageClient from "./HomePageClient";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
  const initialRecipes = await fetchHomeRecipes(1, 12);

  return <HomePageClient initialRecipes={initialRecipes} />;
}
