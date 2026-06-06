"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import MorphingSearchBar from "./navbar/MorphingSearchBar";
import UserActions from "./navbar/UserActions";

interface NavbarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export default function Navbar({ searchQuery: externalSearchQuery = "", setSearchQuery: externalSetSearchQuery }: NavbarProps = {}) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);

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
        router.push("/");
        return;
      }
      
      await supabase.auth.signOut();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <nav className={`backdrop-blur-md bg-white/70 border-b border-slate-200 fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Logo onLogoClick={handleLogoClick} />

            <NavLinks isScrolled={isScrolled} isSearchExpanded={isSearchExpanded} />

            <div className="flex items-center space-x-4">
              {isScrolled && !isSearchExpanded && (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <Search className="w-4 h-4 text-slate-600" />
                  <span className="text-slate-600 text-sm">Rechercher...</span>
                </button>
              )}

              <UserActions
                user={user}
                isScrolled={isScrolled}
                isSearchExpanded={isSearchExpanded}
                onLogout={handleLogout}
                onCreateRecipe={handleCreateRecipe}
              />
            </div>
          </div>
        </div>

        <MorphingSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isScrolled={isScrolled}
          isSearchExpanded={isSearchExpanded}
          setIsSearchExpanded={setIsSearchExpanded}
        />
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
