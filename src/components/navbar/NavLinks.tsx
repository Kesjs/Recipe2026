"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  isScrolled: boolean;
  isSearchExpanded: boolean;
}

export default function NavLinks({ isScrolled, isSearchExpanded }: NavLinksProps) {
  const pathname = usePathname();

  const links = [
    { name: "Recettes", href: "/recettes" },
    { name: "Nutrition", href: "/nutrition" },
    { name: "Actualités", href: "/actualites" },
    { name: "À Propos", href: "/aide" },
  ];

  return (
    <div className={`hidden md:flex items-center space-x-10 transition-all duration-300 ${isSearchExpanded ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
      {links.map((link) => (
        <Link 
          key={link.href}
          href={link.href} 
          className={`text-sm font-semibold transition-colors pb-0.5 ${
            pathname === link.href 
              ? "text-emerald-900 border-b-2 border-emerald-600" 
              : "text-zinc-500 hover:text-emerald-900"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
