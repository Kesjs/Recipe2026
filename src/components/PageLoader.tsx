"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Démarre le fade-out après 1.6s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    // Retire du DOM après la fin de l'animation (300ms de transition)
    const removeTimer = setTimeout(() => setVisible(false), 1900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo animé */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Halo pulsant derrière le logo */}
        <div className="absolute w-32 h-32 rounded-full bg-emerald-500/10 animate-ping" />

        {/* Logo */}
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/40 animate-[logoScale_1.6s_ease-in-out_infinite]">
          <Image
            src="/icon.png"
            alt="Naya Cuisine"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Nom */}
        <p className="text-white font-bold text-lg tracking-[0.3em] uppercase opacity-0 animate-[fadeUp_0.6s_ease-out_0.4s_forwards]">
          Naya
        </p>

        {/* Barre de chargement */}
        <div className="w-24 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full animate-[loadBar_1.4s_ease-in-out_forwards]" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes logoScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
