"use client";

import { User, Globe, Plus, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      {user && (
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
        >
          <User className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      )}

      <>
        <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
          <Globe className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            onClick={onCreateRecipe}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>

          {showTooltip && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-zinc-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 animate-in fade-in slide-in-from-top-2 duration-200">
              Publier une recette
            </div>
          )}
        </div>
      </>

      <div
        className="relative"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {user ? (
          <>
            <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
              <User className="w-4 h-4" />
              <span className="font-medium">{user.user_metadata?.name || "Mon compte"}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                <Link href="/recettes/creer" className="block px-4 py-2 text-slate-900 hover:bg-slate-50 font-medium">
                  Créer une recette
                </Link>
                <div className="border-t border-slate-200 my-2" />
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
              <User className="w-4 h-4" />
              <span className="font-medium">Se connecter</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                <Link href="/auth" className="block px-4 py-2 text-slate-900 hover:bg-slate-50 font-medium">
                  Inscription
                </Link>
                <div className="border-t border-slate-200 my-2" />
                <Link href="/aide" className="block px-4 py-2 text-slate-600 hover:bg-slate-50">
                  Centre d&apos;aide
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
