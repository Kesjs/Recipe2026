"use client";

import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Leaf, Home, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors: { email?: string; password?: string; name?: string } = {};

    if (!email) {
      errors.email = "L'email est requis";
    } else if (!validateEmail(email)) {
      errors.email = "Format d'email invalide";
    }

    if (!password) {
      errors.password = "Le mot de passe est requis";
    } else if (password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!isLogin && !name) {
      errors.name = "Le nom est requis";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFieldErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { supabase } = await import("@/lib/supabase");
      if (!supabase) {
        throw new Error("Service indisponible. Réessayez plus tard.");
      }

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            throw new Error("Email ou mot de passe incorrect");
          }
          throw error;
        }
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

        if (error) {
          if (error.message.includes("already registered")) {
            throw new Error("Cet email est déjà utilisé");
          }
          throw error;
        }
        setSuccess("Compte créé avec succès! Veuillez vérifier votre email.");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2o-5iT-Rh04BqnHzs1hpvxK9yBis84_UPfcvC41j77Q&s=10"
          alt="Culinary background"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-zinc-950/70 to-emerald-950/80" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className={`${playfair.className} text-2xl font-bold tracking-tight`}>Naya</span>
            </div>
            <Link 
              href="/"
              className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
          </div>

          {/* Glassmorphism Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <header className="mb-8 text-center">
              <h1 className={`${playfair.className} text-3xl md:text-4xl text-white mb-4 leading-tight`}>
                {isLogin ? "Bienvenue" : "Rejoignez-nous"}
              </h1>
              <p className="text-zinc-300 text-base">
                {isLogin 
                  ? "Connectez-vous pour accéder à vos recettes" 
                  : "Créez votre compte et commencez à cuisiner"}
              </p>
            </header>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm font-medium animate-in fade-in flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-200 text-sm font-medium animate-in fade-in">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                      }}
                      placeholder="Votre nom"
                      className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${fieldErrors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-emerald-500'}`}
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{fieldErrors.name}</span>
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    placeholder="votre@email.com"
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${fieldErrors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-emerald-500'}`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{fieldErrors.email}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${fieldErrors.password ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-emerald-500'}`}
                  />
                </div>
                {fieldErrors.password && (
                  <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{fieldErrors.password}</span>
                  </p>
                )}
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-zinc-500 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 bg-transparent" />
                    <span className="text-zinc-400">Se souvenir</span>
                  </label>
                  <Link href="/auth/reset-password" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Oublié ?
                  </Link>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center space-x-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Chargement..." : isLogin ? "Se connecter" : "Créer un compte"}</span>
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-zinc-400 text-sm mb-2">
                {isLogin ? "Pas encore de compte ?" : "Déjà membre ?"}
              </p>
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                {isLogin ? "Créer un compte" : "Se connecter"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
