"use client";

import Image from "next/image";

interface LogoProps {
  onLogoClick: () => void;
}

export default function Logo({ onLogoClick }: LogoProps) {
  return (
    <button
      onClick={onLogoClick}
      className="flex items-center space-x-2 group cursor-pointer hover:opacity-80 transition-all"
      aria-label="Retour à l'accueil"
    >
      <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:rotate-3 transition-transform">
        <Image
          src="/icon.png"
          alt="Naya logo"
          width={40}
          height={40}
          className="object-cover w-full h-full"
          priority
        />
      </div>
      <span className="font-bold text-2xl tracking-tighter text-emerald-900">Naya</span>
    </button>
  );
}
