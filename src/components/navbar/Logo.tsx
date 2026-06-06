"use client";

import { ChefHat } from "lucide-react";

interface LogoProps {
  onLogoClick: () => void;
}

export default function Logo({ onLogoClick }: LogoProps) {
  return (
    <button onClick={onLogoClick} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
      <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
        <ChefHat className="w-5 h-5 text-white" />
      </div>
      <span className="font-semibold text-zinc-900 text-lg">Naya : Mangez mieux, vivez mieux.</span>
    </button>
  );
}
