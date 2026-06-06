"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";

interface MorphingSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isScrolled: boolean;
  isSearchExpanded: boolean;
  setIsSearchExpanded: (expanded: boolean) => void;
}

export default function MorphingSearchBar({
  searchQuery,
  setSearchQuery,
  isScrolled,
  isSearchExpanded,
  setIsSearchExpanded,
}: MorphingSearchBarProps) {
  // Airbnb-style centered morphing search bar when scrolled and expanded
  if (isScrolled && isSearchExpanded) {
    return (
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 transition-all duration-300">
        <div className="relative w-64 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400 text-sm"
            autoFocus
          />
          <button
            onClick={() => setIsSearchExpanded(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Expanded search bar (full width when not scrolled)
  if (isSearchExpanded) {
    return (
      <div className="border-t border-slate-200 bg-white transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4 mb-4 transition-opacity duration-300" style={{ opacity: isScrolled ? 1 : 0 }}>
            <Link href="/recettes" onClick={() => setIsSearchExpanded(false)} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Recettes
            </Link>
            <Link href="/nutrition" onClick={() => setIsSearchExpanded(false)} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Nutrition
            </Link>
            <Link href="/actualites" onClick={() => setIsSearchExpanded(false)} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Actualités
            </Link>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Rechercher une recette..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400 text-lg"
            />
            <button
              onClick={() => setIsSearchExpanded(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Hero search bar (shown when not scrolled and not expanded)
  return null;
}
