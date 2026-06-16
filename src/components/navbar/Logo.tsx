"use client";

import Image from "next/image";

interface LogoProps {
  onLogoClick: () => void;
}

export default function Logo({ onLogoClick }: LogoProps) {
  return (
    <button
      onClick={onLogoClick}
      className="flex items-center space-x-3 group cursor-pointer hover:opacity-80 transition-all"
      aria-label="Retour à l'accueil"
    >
      <Image
        src="/Naya_cuisine.png"
        alt="Naya Cuisine logo"
        width={48}
        height={48}
        className="w-12 h-12 group-hover:rotate-3 transition-transform"
        priority
      />
      <span className="font-bold text-2xl tracking-tighter text-emerald-900">Naya Cuisine</span>
    </button>
  );
}
