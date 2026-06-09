"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import MorphingSearchBar from "./navbar/MorphingSearchBar";
import UserActions from "./navbar/UserActions";

interface NavbarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export default function Navbar({
  searchQuery: externalSearchQuery = "",
  setSearchQuery: externalSetSearchQuery,
}: NavbarProps = {}) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);

  // ✅ Ref pour éviter les appels rAF en double
  const tickingRef = useRef(false);

  const searchQuery = externalSearchQuery || internalSearchQuery;
  const setSearchQuery = externalSetSearchQuery || setInternalSearchQuery;

  useEffect(() => {
    // ✅ Scroll listener optimisé : passive + requestAnimationFrame
    // Avant : synchrone → jank garanti à chaque pixel scrollé
    // Après : le navigateur gère le scroll indépendamment du JS (passive),
    //         et on ne lit scrollY qu'une fois par frame (rAF)
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 60);
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // ✅ Auth check déplacé après le premier paint via setTimeout 0
    // Cela évite de bloquer le thread principal pendant le chargement initial.
    // L'état user n'est pas critique pour le rendu du hero.
    const timer = setTimeout(async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    }, 0);

    return () => clearTimeout(timer);
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
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
    <nav
      className="fixed top-0 z-[100] w-full px-6 py-6 transition-all duration-300"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between glass rounded-[2.5rem] px-10 shadow-xl shadow-zinc-200/20 ring-1 ring-white/20 transition-all ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <Logo onLogoClick={handleLogoClick} />

        <NavLinks isScrolled={isScrolled} isSearchExpanded={isSearchExpanded} />

        <div className="flex items-center space-x-4">
          {!isSearchExpanded && (
            <button
              onClick={() => setIsSearchExpanded(true)}
              aria-label="Ouvrir la recherche"
              aria-expanded={isSearchExpanded}
              className="p-2.5 rounded-full hover:bg-emerald-50 text-zinc-600 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
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