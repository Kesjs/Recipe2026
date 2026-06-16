"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Instagram, Twitter, Sparkles, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail("");
    setMessage("");
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-24 px-6 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <div className="flex items-center space-x-2 mb-8 group cursor-pointer">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="font-bold text-3xl tracking-tighter text-white">Naya</span>
            </div>
            <p className="text-zinc-500 text-base leading-relaxed max-w-sm mb-10">
              Mangez mieux, vivez mieux. Découvrez, partagez et créez des recettes saines qui célèbrent les richesses culinaires africaines.
            </p>
            <div className="flex items-center space-x-5">
              <a href="#" className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.097.405-.312 1.266-.355 1.439-.058.229-.19.278-.44.161-1.64-.763-2.666-3.16-2.666-5.087 0-4.14 3.007-7.941 8.671-7.941 4.552 0 8.089 3.243 8.089 7.582 0 4.522-2.851 8.164-6.807 8.164-1.33 0-2.581-.691-3.008-1.503 0 0-.658 2.503-.818 3.118-.296 1.134-1.096 2.557-1.63 3.424 1.127.348 2.321.536 3.559.536 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637 0 12.017 0z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-zinc-300 text-sm">
              <li><Link href="/recettes" className="hover:text-emerald-400 transition-colors">Recettes</Link></li>
              <li><Link href="/nutrition" className="hover:text-emerald-500 transition-colors">Nutrition</Link></li>
              <li><Link href="/actualites" className="hover:text-emerald-500 transition-colors">Actualités</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Entreprise</h4>
            <ul className="space-y-4 text-zinc-300 text-sm">
              <li><Link href="/legal" className="hover:text-emerald-500 transition-colors">Confidentialité</Link></li>
              <li><Link href="/legal" className="hover:text-emerald-500 transition-colors">CGU</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Contact</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all text-sm"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre message"
                required
                rows={3}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all text-sm resize-none"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <span>{submitted ? "Envoyé !" : "Envoyer"}</span>
                {!submitted && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs uppercase tracking-widest">© 2026 Naya Cooking. Tous droits réservés.</p>
          <div className="flex items-center space-x-2 text-zinc-600 text-xs">
            <span>Inspiré par les saveurs</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>d'Afrique</span>
          </div>
        </div>
      </div>
    </footer>
  );
}