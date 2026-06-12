"use client";

import { User, Plus, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface UserActionsProps {
  user: any;
  isScrolled: boolean;
  isSearchExpanded: boolean;
  onLogout: () => void;
  onCreateRecipe: () => void;
}

export default function UserActions({
  user,
  isScrolled,
  isSearchExpanded,
  onLogout,
  onCreateRecipe,
}: UserActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 px-6 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
            aria-expanded={showDropdown}
            aria-haspopup="true"
          >
            <User className="w-4 h-4" />
            <span>{user.user_metadata?.name || "Compte"}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-1 w-48 bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl py-2 z-50 overflow-hidden ring-1 ring-black/5">
              <Link
                href="/dashboard"
                onClick={() => setShowDropdown(false)}
                className="flex items-center space-x-2 px-4 py-2 text-zinc-900 hover:bg-emerald-50 transition-colors font-medium"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => { setShowDropdown(false); onCreateRecipe(); }}
                className="flex items-center space-x-2 w-full text-left px-4 py-2 text-zinc-900 hover:bg-emerald-50 transition-colors font-medium"
              >
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Créer une recette</span>
              </button>
              <div className="border-t border-zinc-100 my-1" />
              <button
                onClick={() => { setShowDropdown(false); onLogout(); }}
                className="flex items-center space-x-2 w-full text-left px-4 py-2 text-zinc-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/auth" className="hidden sm:flex items-center space-x-2 px-6 py-2.5 bg-zinc-900 text-white rounded-full text-sm font-bold hover:bg-emerald-900 transition-all shadow-md active:scale-95">
          <span>Se connecter</span>
        </Link>
      )}
    </div>
  );
}