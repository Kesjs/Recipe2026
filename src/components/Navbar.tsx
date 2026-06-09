"use client";

import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import MorphingSearchBar from "./navbar/MorphingSearchBar";
import UserActions from "./navbar/UserActions";
import Link from "next/link";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);

  const tickingRef = useRef(false);

  const searchQuery = externalSearchQuery || internalSearchQuery;
  const setSearchQuery = externalSetSearchQuery || setInternalSearchQuery;

  useEffect(() => {
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
    const timer = setTimeout(async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Bloquer le scroll body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const handleLogoClick = () => {
    setSearchQuery("");
    setIsSearchExpanded(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateRecipe = async () => {
    setIsMobileMenuOpen(false);
    try {
      const { supabase } = await import("@/lib/supabase");
      if (!supabase) { router.push("/auth"); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (user) router.push("/recettes/creer");
      else router.push("/auth");
    } catch (error) {
      router.push("/auth");
    }
  };

  const handleLogout = async () => {
    setIsMobileMenuOpen(false);
    try {
      const { supabase } = await import("@/lib/supabase");
      if (!supabase) { setUser(null); router.push("/"); return; }
      await supabase.auth.signOut();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const mobileLinks = [
    { name: "Recettes", href: "/recettes" },
    { name: "Nutrition", href: "/nutrition" },
    { name: "Actualités", href: "/actualites" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 z-[100] w-full px-4 sm:px-6 py-4 sm:py-6 transition-all duration-300"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between glass rounded-[2rem] sm:rounded-[2.5rem] px-5 sm:px-10 shadow-xl shadow-zinc-200/20 ring-1 ring-white/20 transition-all ${
            isScrolled ? "py-3" : "py-3 sm:py-4"
          }`}
        >
          <Logo onLogoClick={handleLogoClick} />

          {/* Nav links — desktop uniquement */}
          <NavLinks isScrolled={isScrolled} isSearchExpanded={isSearchExpanded} />

          {/* Actions droite */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Bouton search */}
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

            {/* UserActions — desktop uniquement */}
            <div className="hidden md:block">
              <UserActions
                user={user}
                isScrolled={isScrolled}
                isSearchExpanded={isSearchExpanded}
                onLogout={handleLogout}
                onCreateRecipe={handleCreateRecipe}
              />
            </div>

            {/* Hamburger — mobile uniquement */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2.5 rounded-full hover:bg-emerald-50 text-zinc-700 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              {isMobileMenuOpen
                ? <X className="w-5 h-5" aria-hidden="true" />
                : <Menu className="w-5 h-5" aria-hidden="true" />
              }
            </button>
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

      {/* Menu mobile — drawer depuis la droite */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[99] md:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Menu de navigation"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <span className="font-bold text-lg text-emerald-900">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fermer le menu"
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Liens */}
            <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Navigation mobile">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3.5 rounded-2xl text-zinc-700 font-semibold hover:bg-emerald-50 hover:text-emerald-900 transition-colors text-base"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Auth */}
            <div className="px-4 py-6 border-t border-zinc-100 space-y-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-900 font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleCreateRecipe}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Créer une recette
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-2xl text-zinc-500 hover:text-red-600 hover:bg-red-50 font-semibold transition-colors"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-2xl bg-zinc-900 text-white font-bold hover:bg-emerald-900 transition-colors"
                >
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
