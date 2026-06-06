"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChefHat, User, Globe, Search, X, Plus, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export default function Navbar({ searchQuery: externalSearchQuery = "", setSearchQuery: externalSetSearchQuery }: NavbarProps = {}) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const searchQuery = externalSearchQuery || internalSearchQuery;
  const setSearchQuery = externalSetSearchQuery || setInternalSearchQuery;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;
        
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    }
    checkAuth();
  }, []);

  const handleLogoClick = () => {
    setSearchQuery("");
    setIsSearchExpanded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCreateRecipe = async () => {
    try {
      const { supabase } = await import("@/lib/supabase");
      if (!supabase) {
        router.push("/auth");
        return;
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        router.push("/recettes/creer");
      } else {
        router.push("/auth");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      router.push("/auth");
    }
  };

  const handleLogout = async () => {
    try {
      const { supabase } = await import("@/lib/supabase");
      if (!supabase) {
        setUser(null);
        setShowUserDropdown(false);
        router.push("/");
        return;
      }
      
      await supabase.auth.signOut();
      setUser(null);
      setShowUserDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <nav className="backdrop-blur-md bg-white/70 border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={handleLogoClick} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-zinc-900 text-lg">Cooking Recipe</span>
            </button>

            <div className="hidden md:flex items-center space-x-8 transition-opacity duration-300" style={{ opacity: isScrolled && !isSearchExpanded ? 0 : 1 }}>
              <Link href="/recettes" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Recettes
              </Link>
              <Link href="/nutrition" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Nutrition
              </Link>
              <Link href="/actualites" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Actualités
              </Link>
            </div>

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

              {isScrolled && !isSearchExpanded ? (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <Search className="w-4 h-4 text-slate-600" />
                  <span className="text-slate-600 text-sm">Rechercher...</span>
                </button>
              ) : (
                <>
                  <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
                    <Globe className="w-5 h-5" />
                  </button>

                  <div className="relative">
                    <button
                      onClick={handleCreateRecipe}
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
              )}

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
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2">
                        <Link href="/recettes/creer" className="block px-4 py-2 text-slate-900 hover:bg-slate-50 font-medium">
                          Créer une recette
                        </Link>
                        <div className="border-t border-slate-200 my-2" />
                        <button
                          onClick={handleLogout}
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
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2">
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
          </div>
        </div>

        {isSearchExpanded && (
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
        )}
      </nav>

      {!isScrolled && !isSearchExpanded && (
        <div className="bg-slate-50 border-b border-slate-200 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Rechercher une recette..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 placeholder-slate-400 text-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
