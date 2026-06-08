"use client";

import { Leaf } from "lucide-react";

interface LogoProps {
  onLogoClick: () => void;
}

export default function Logo({ onLogoClick }: LogoProps) {
  return (
    <button onClick={onLogoClick} className="flex items-center space-x-2 group cursor-pointer hover:opacity-80 transition-all">
      <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
        <Leaf className="w-6 h-6" />
      </div>
      <span className="font-bold text-2xl tracking-tighter text-emerald-900">Naya</span>
    </button>
  );
}
