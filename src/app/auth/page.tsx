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
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&w=1920&q=80"
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
        {/* Accueil Link - Positionné en haut à gauche */}
        <Link 
          href="/"
          className="absolute top-6 left-6 flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium z-20"
        >
          <Home className="w-4 h-4" />
          <span>Accueil</span>
        </Link>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left column — texte de bienvenue */}
          <div className="hidden lg:flex flex-col justify-center space-y-8 pr-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Leaf className="w-6 h-6 text-emerald-400" />
                <span className="text-emerald-400 font-semibold tracking-wide text-sm uppercase">Cuisinez mieux</span>
              </div>
              <h1 className={`${playfair.className} text-5xl xl:text-6xl text-white leading-tight mb-6`}>
                {isLogin ? (
                  <>Bienvenue<br /><span className="text-emerald-400">de retour</span></>
                ) : (
                  <>Rejoignez-<br /><span className="text-emerald-400">nous</span></>
                )}
              </h1>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {isLogin
                  ? "Connectez-vous pour retrouver vos recettes favorites et continuer votre aventure culinaire."
                  : "Créez votre compte et commencez à cuisiner. Découvrez des centaines de recettes, gérez vos favoris et bien plus encore."}
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                { icon: "🍽️", text: "Des centaines de recettes à explorer" },
                { icon: "❤️", text: "Sauvegardez vos plats favoris" },
                { icon: "📊", text: "Suivez vos apports nutritionnels" },
              ].map((item) => (
                <div key={item.text} className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-zinc-300 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Decorative divider */}
            <div className="w-16 h-1 bg-emerald-500/50 rounded-full" />
          </div>

          {/* Right column — formulaire */}
          <div className="w-full">
          {/* Glassmorphism Card */}
          <div className={`bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl ${isLogin ? 'p-8' : 'p-6'}`}>
            <header className={`${isLogin ? 'mb-8' : 'mb-5'} text-center lg:text-left`}>
              {/* Titre visible uniquement sur mobile */}
              <h1 className={`${playfair.className} text-3xl md:text-4xl text-white mb-3 leading-tight lg:hidden`}>
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

            <form onSubmit={handleSubmit} className={`${isLogin ? 'space-y-5' : 'space-y-3'}`}>
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
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <span className="relative inline-flex items-center">
                      <input type="checkbox" className="sr-only peer" />
                      <span className="w-9 h-5 rounded-full bg-white/10 border border-white/20 peer-checked:bg-emerald-600/70 peer-checked:border-emerald-500 transition-all duration-200 group-hover:border-white/40" />
                      <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-zinc-400 peer-checked:bg-white peer-checked:translate-x-4 transition-all duration-200 shadow-sm" />
                    </span>
                    <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">Se souvenir</span>
                  </label>
                  <Link href="/auth/reset-password" className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm">
                    Mot de passe oublié ?
                  </Link>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center space-x-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Chargement..." : isLogin ? "Se connecter" : "Créer un compte"}</span>
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <div className={`${isLogin ? 'mt-8 pt-6' : 'mt-4 pt-4'} border-t border-white/10 text-center`}>
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
        </div>
      </main>
    </div>
  );
}
