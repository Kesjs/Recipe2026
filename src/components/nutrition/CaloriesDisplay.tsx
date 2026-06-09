"use client";

import { Flame } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface CaloriesDisplayProps {
  calories: number;
}

export default function CaloriesDisplay({ calories }: CaloriesDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
      <div className="relative z-10">
        <div className={`${playfair.className} text-2xl md:text-3xl text-emerald-400 mb-6 flex items-center justify-center gap-3`}>
          <Flame className="w-6 h-6" />
          Besoins Quotidiens
        </div>
        <div className="flex items-baseline justify-center gap-2 mb-4">
          <p className="text-5xl md:text-7xl font-black tracking-tighter">{calories}</p>
          <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-zinc-400">kcal</span>
        </div>
        <p className="text-zinc-400 text-sm md:text-base font-medium">
          Calories recommandées pour atteindre votre objectif
        </p>
      </div>
    </div>
  );
}
