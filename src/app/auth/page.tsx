"use client";

import { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";

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
    <div className={`min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden`}>
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] paper-texture" />
      
      <Navbar />

      <main className="relative max-w-7xl mx-auto px-6 py-12 lg:py-24 z-10">
        <div className="relative flex flex-col lg:flex-row items-center">
          
          {/* Left Side: High-Impact Vertical Editorial Image */}
          <div className="relative w-full lg:w-[68%] h-[400px] lg:h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl z-0 bg-zinc-100 ring-1 ring-zinc-200">
            <Image 
              src="https://images.pexels.com/photos/6107724/pexels-photo-6107724.jpeg" 
              alt="Editorial Food Detail" 
              fill
              className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent mix-blend-multiply" />
          </div>

          {/* Right Side: Sophisticated Auth Card (Overlapping with Negative Margin/Absolute Position) */}
          <div className="w-full lg:w-[560px] mt-[-100px] lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 bg-white rounded-[3.5rem] shadow-[0_64px_96px_-24px_rgba(0,0,0,0.15)] p-8 lg:p-14 z-20 border border-white ring-1 ring-zinc-100/50 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            
            <header className="mb-14">
              <h1 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl text-zinc-950 leading-[1.1] mb-6 tracking-tight`}>
                {isLogin ? (
                  <>Access your <br /> <span className="italic font-normal inline-block border-b-[8px] border-emerald-500/10 leading-none">Cookbook.</span></>
                ) : (
                  <>Join the <br /> <span className="italic font-normal inline-block border-b-[8px] border-emerald-500/10 leading-none">Community.</span></>
                )}
              </h1>
              <p className="text-zinc-500 text-lg lg:text-xl font-medium leading-relaxed max-w-[360px]">
                {isLogin 
                  ? "Bienvenue dans votre nouvel espace culinaire personnel." 
                  : "Commencez votre voyage vers une nutrition locale et saine."}
              </p>
            </header>

            {error && (
              <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-[2rem] text-red-800 text-sm font-semibold animate-in fade-in duration-500">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-8 p-5 bg-emerald-50 border border-emerald-100 rounded-[2rem] text-emerald-800 text-sm font-semibold animate-in fade-in duration-500">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-zinc-50/50 ring-1 ring-zinc-200/50">
                
                {!isLogin && (
                  <div className="relative flex flex-col focus-within:bg-white transition-all duration-300 border-b border-zinc-100 group">
                    <label className="px-8 pt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-emerald-600 transition-colors">Nom Complet</label>
                    <div className="flex items-center px-8 pb-4">
                      <User className="w-5 h-5 text-emerald-600/30 group-focus-within:text-emerald-600 mr-5 transition-colors" />
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom" 
                        required={!isLogin}
                        className="w-full bg-transparent border-none focus:ring-0 p-0 text-zinc-950 font-bold placeholder:text-zinc-300 text-base" 
                      />
                    </div>
                  </div>
                )}

                <div className="relative flex flex-col focus-within:bg-white transition-all duration-300 border-b border-zinc-100 group">
                  <label className="px-8 pt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-emerald-600 transition-colors">Email Address</label>
                  <div className="flex items-center px-8 pb-4">
                    <Mail className="w-5 h-5 text-emerald-600/30 group-focus-within:text-emerald-600 mr-5 transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com" 
                      required
                      className="w-full bg-transparent border-none focus:ring-0 p-0 text-zinc-950 font-bold placeholder:text-zinc-300 text-base" 
                    />
                  </div>
                </div>
                
                <div className="relative flex flex-col focus-within:bg-white transition-all duration-300 group">
                  <label className="px-8 pt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-emerald-600 transition-colors">Security Key</label>
                  <div className="flex items-center px-8 pb-4">
                    <Lock className="w-5 h-5 text-emerald-600/30 group-focus-within:text-emerald-600 mr-5 transition-colors" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      required
                      minLength={6}
                      className="w-full bg-transparent border-none focus:ring-0 p-0 text-zinc-950 font-bold placeholder:text-zinc-300 text-base" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer w-5 h-5 rounded-lg border-zinc-200 text-emerald-600 focus:ring-emerald-500/20 focus:ring-offset-0 transition-all cursor-pointer" />
                  </div>
                  <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-900 transition-colors uppercase tracking-wider">Se souvenir de moi</span>
                </label>
                {isLogin && (
                  <Link href="/auth/reset-password" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors uppercase tracking-wider">
                    Mot de passe oublié ?
                  </Link>
                )}
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-zinc-950 hover:bg-emerald-700 text-white font-bold rounded-[2rem] transition-all shadow-2xl hover:shadow-emerald-200/50 flex items-center justify-center space-x-3 group active:scale-[0.98] disabled:opacity-50"
              >
                <span className="text-lg">{loading ? "Chargement..." : isLogin ? "Se connecter" : "Créer un compte"}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </form>

            <div className="mt-16 pt-12 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3 shrink-0">
                  <Image src="https://i.pravatar.cc/100?u=sarah" alt="User" width={48} height={48} className="rounded-full border-[3px] border-white object-cover shadow-lg" />
                  <Image src="https://i.pravatar.cc/100?u=marc" alt="User" width={48} height={48} className="rounded-full border-[3px] border-white object-cover shadow-lg" />
                  <Image src="https://i.pravatar.cc/100?u=elise" alt="User" width={48} height={48} className="rounded-full border-[3px] border-white object-cover shadow-lg" />
                  <div className="w-12 h-12 rounded-full border-[3px] border-white bg-emerald-50 flex items-center justify-center text-xs font-black text-emerald-700 shadow-lg">
                    +10k
                  </div>
                </div>
                <p className="text-sm font-bold text-zinc-400 leading-tight uppercase tracking-tight">
                  Rejoignez <span className="text-emerald-950">10,000+ passionnés</span> <br />qui cuisinent avec nous.
                </p>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">
                  {isLogin ? "Nouveau ici ?" : "Déjà un compte ?"}
                </p>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-700 font-black hover:text-emerald-900 transition-colors text-base"
                >
                  {isLogin ? "Créer un compte" : "Se connecter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-10 py-16 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-zinc-200/50 mt-12 relative z-10">
        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">© 2024 Naya Cooking. Tous droits réservés.</p>
        <div className="flex items-center space-x-12 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
          <Link href="/legal" className="hover:text-emerald-600 transition-colors">Confidentialité</Link>
          <Link href="/legal" className="hover:text-emerald-600 transition-colors">Conditions</Link>
          <Link href="/aide" className="hover:text-emerald-600 transition-colors">Contact</Link>
        </div>
      </footer>

      <style jsx global>{`
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
