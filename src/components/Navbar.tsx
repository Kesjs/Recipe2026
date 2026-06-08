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
      if (user) router.push("/recettes/creer");
      else router.push("/auth");
    } catch (error) {
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
    <nav className="fixed top-0 z-[100] w-full px-6 py-6 transition-all duration-300">
      <div className={`max-w-7xl mx-auto flex items-center justify-between glass rounded-[2.5rem] px-10 py-4 shadow-xl shadow-zinc-200/20 ring-1 ring-white/20 transition-all ${isScrolled ? 'py-3' : 'py-4'}`}>
        <Logo onLogoClick={handleLogoClick} />

        <NavLinks isScrolled={isScrolled} isSearchExpanded={isSearchExpanded} />

        <div className="flex items-center space-x-4">
          {!isSearchExpanded && (
            <button 
              onClick={() => setIsSearchExpanded(true)}
              className="p-2.5 rounded-full hover:bg-emerald-50 text-zinc-600 transition-colors"
            >
              <Search className="w-5 h-5" />
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

      <MorphingSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isScrolled={isScrolled}
        isSearchExpanded={isSearchExpanded}
        setIsSearchExpanded={setIsSearchExpanded}
      />
    </nav>
  );
}
