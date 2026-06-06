"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">("recipes");

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
          return;
        }

        setUser(user);
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  async function handleLogout() {
    try {
      const { supabase } = await import("@/lib/supabase");
      if (!supabase) {
        router.push("/auth");
        return;
      }
      
      await supabase.auth.signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Mon Dashboard
            </h1>
            <p className="text-slate-600">
              Bienvenue, {user.user_metadata?.name || "Utilisateur"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Déconnexion
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("recipes")}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === "recipes"
                    ? "border-emerald-600 text-emerald-600"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                Mes Recettes
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === "favorites"
                    ? "border-emerald-600 text-emerald-600"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                Mes Favoris
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "recipes" && (
              <div className="text-center py-12">
                <p className="text-slate-600 mb-4">Vous n&apos;avez pas encore de recettes.</p>
                <button
                  onClick={() => router.push("/recettes/creer")}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Créer ma première recette
                </button>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="text-center py-12">
                <p className="text-slate-600 mb-4">Vous n&apos;avez pas encore de recettes favorites.</p>
                <button
                  onClick={() => router.push("/recettes")}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Découvrir des recettes
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
