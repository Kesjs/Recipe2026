"use client";

import Link from "next/link";

interface NavLinksProps {
  isScrolled: boolean;
  isSearchExpanded: boolean;
}

export default function NavLinks({ isScrolled, isSearchExpanded }: NavLinksProps) {
  return (
    <div className={`hidden md:flex items-center space-x-8 transition-all duration-300 opacity-100 visible`}>
      <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
        Accueil
      </Link>
      <Link href="/nutrition" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
        Nutrition
      </Link>
      <Link href="/actualites" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
        Actualités
      </Link>
    </div>
  );
}
