"use client";

import { Search, X } from "lucide-react";
import { useEffect } from "react";

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
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSearchExpanded, setIsSearchExpanded]);

  if (!isSearchExpanded) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 px-4 sm:px-6 pt-3 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Rechercher une recette..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400 text-lg shadow-xl"
            autoFocus
          />
          <button
            onClick={() => setIsSearchExpanded(false)}
            aria-label="Fermer la recherche"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
