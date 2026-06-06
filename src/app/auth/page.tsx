"use client";

import { useState } from "react";
import { ChefHat, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { supabase } = await import("@/lib/supabase");
      if (!supabase) {
        throw new Error("Supabase is not configured");
      }

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setSuccess("Connexion réussie! Redirection...");
        setTimeout(() => {
          router.push("/dashboard");
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden lg:block lg:w-1/2 bg-slate-100 relative">
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="text-slate-900 max-w-md">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-semibold tracking-tight">Cooking Recipe</span>
              </div>
              <h2 className="text-4xl font-semibold mb-4 tracking-tight">
                Prenez le contrôle de votre nutrition avec les saines saveurs de chez nous.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Suivez les calories des aliments locaux et découvrez des recettes équilibrées pour une vie saine.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="inline-flex bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                    setSuccess("");
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isLogin ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
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
                    !isLogin ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  Inscription
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-slate-900 mb-2 tracking-tight">
              {isLogin ? "Connexion" : "Créer un compte"}
            </h1>
            <p className="text-slate-500 mb-8">
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400"
                      placeholder="Votre nom"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                {isLogin && (
                  <div className="mt-2">
                    <Link
                      href="/auth/reset-password"
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
