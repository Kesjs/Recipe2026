import { useState, useEffect } from "react";
import { ChefHat, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { UserProfileSkeleton, RecipeCardSkeleton } from "@/components/Skeleton";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [view, setView] = useState<"auth" | "dashboard">("auth");
  const [dashboardTab, setDashboardTab] = useState<"recipes" | "favorites">("recipes");
  const [dashboardLoading, setDashboardLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          setView("dashboard");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    }
    checkAuth();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { supabase } = await import("@/lib/supabase");

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setUser(data.user);
        setSuccess("Connexion réussie! Redirection...");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (error) throw error;
        setSuccess("Compte créé avec succès! Veuillez vérifier votre email.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.auth.signOut();
      setUser(null);
      setView("auth");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  if (view === "dashboard" && user) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-zinc-900 mb-2 tracking-tight">Mon Dashboard</h1>
            <p className="text-zinc-600">Bienvenue, {user.user_metadata?.name || "Utilisateur"}</p>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setDashboardTab("recipes")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                dashboardTab === "recipes"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/80"
              }`}
            >
              Mes Recettes
            </button>
            <button
              onClick={() => setDashboardTab("favorites")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                dashboardTab === "favorites"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/80"
              }`}
            >
              Mes Favoris
            </button>
          </div>

          {dashboardTab === "recipes" && (
            <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-8">
              <h2 className="text-xl font-semibold text-zinc-900 mb-6 tracking-tight">Mes Recettes Créées</h2>
              <p className="text-zinc-600 mb-6">Gérez vos recettes personnelles.</p>
              {dashboardLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <RecipeCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-zinc-500">Vous n'avez pas encore créé de recettes.</p>
                  <Link
                    href="/recettes/creer"
                    className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Créer ma première recette
                  </Link>
                </div>
              )}
            </div>
          )}

          {dashboardTab === "favorites" && (
            <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-8">
              <h2 className="text-xl font-semibold text-zinc-900 mb-6 tracking-tight">Mes Recettes Favorites</h2>
              <p className="text-zinc-600 mb-6">Retrouvez vos recettes préférées.</p>
              {dashboardLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <RecipeCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-zinc-500">Vous n'avez pas encore de recettes favorites.</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden lg:block lg:w-1/2 bg-zinc-100 relative">
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="text-zinc-900 max-w-md">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-semibold tracking-tight">Cooking Recipe</span>
              </div>
              <h2 className="text-4xl font-semibold mb-4 tracking-tight">
                Prenez le contrôle de votre nutrition avec les saines saveurs de chez nous.
              </h2>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Suivez les calories des aliments locaux et découvrez des recettes équilibrées pour une vie saine.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="inline-flex bg-zinc-100 rounded-xl p-1">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                    setSuccess("");
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isLogin ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-600"
                  }`}
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                    setSuccess("");
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    !isLogin ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-600"
                  }`}
                >
                  Inscription
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-zinc-900 mb-2 tracking-tight">
              {isLogin ? "Connexion" : "Créer un compte"}
            </h1>
            <p className="text-zinc-500 mb-8">
              {isLogin ? "Accédez à votre espace personnel" : "Rejoignez notre communauté"}
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900 placeholder-zinc-400"
                      placeholder="Votre nom"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900 placeholder-zinc-400"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900 placeholder-zinc-400"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Chargement..." : isLogin ? "Se connecter" : "Créer un compte"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
