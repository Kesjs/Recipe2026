"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Leaf, Home, AlertCircle, KeyRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { supabase } = await import("@/lib/supabase");
      if (!supabase) {
        throw new Error("Service indisponible. Réessayez plus tard.");
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) throw error;
      setSuccess(true);
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
        {/* Accueil Link */}
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium z-20"
        >
          <Home className="w-4 h-4" />
          <span>Accueil</span>
        </Link>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left column */}
          <div className="hidden lg:flex flex-col justify-center space-y-8 pr-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Leaf className="w-6 h-6 text-emerald-400" />
                <span className="text-emerald-400 font-semibold tracking-wide text-sm uppercase">Cuisinez mieux</span>
              </div>
              <h1 className={`${playfair.className} text-5xl xl:text-6xl text-white leading-tight mb-6`}>
                Mot de passe<br /><span className="text-emerald-400">oublié ?</span>
              </h1>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Pas de panique. Entrez votre adresse email et nous vous enverrons un lien pour créer un nouveau mot de passe.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: "🔒", text: "Lien sécurisé et unique" },
                { icon: "⚡", text: "Reçu en quelques secondes" },
                { icon: "✅", text: "Valable pendant 24 heures" },
              ].map((item) => (
                <div key={item.text} className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-zinc-300 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="w-16 h-1 bg-emerald-500/50 rounded-full" />
          </div>

          {/* Right column — formulaire */}
          <div className="w-full">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">

              {/* Retour */}
              <Link
                href="/auth"
                className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-sm mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour à la connexion</span>
              </Link>

              <header className="mb-8">
                {/* Titre visible uniquement sur mobile */}
                <h1 className={`${playfair.className} text-3xl md:text-4xl text-white mb-3 leading-tight lg:hidden`}>
                  Mot de passe oublié ?
                </h1>
                <p className="text-zinc-300 text-base">
                  Entrez votre email pour recevoir un lien de réinitialisation.
                </p>
              </header>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm font-medium animate-in fade-in flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success ? (
                <div className="flex flex-col items-center text-center space-y-5 py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg mb-2">Email envoyé !</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Vérifiez votre boîte mail. Le lien est valable 24 heures.
                    </p>
                  </div>
                  <Link
                    href="/auth"
                    className="mt-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors text-sm"
                  >
                    Retour à la connexion
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Adresse email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center space-x-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <KeyRound className="w-5 h-5" />
                    <span>{loading ? "Envoi en cours..." : "Envoyer le lien"}</span>
                  </button>
                </form>
              )}

              {!success && (
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-zinc-400 text-sm mb-2">Vous vous souvenez de votre mot de passe ?</p>
                  <Link
                    href="/auth"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                  >
                    Se connecter
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
