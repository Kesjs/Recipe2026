"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Chaque changement de route déclenche un cycle complet
    setLoading(true);
    setWidth(0);

    // Montée rapide à 80% pour simuler le chargement
    const t1 = setTimeout(() => setWidth(80), 50);
    // Puis à 95% pour l'effet "presque fini"
    const t2 = setTimeout(() => setWidth(95), 400);
    // Complétion et masquage
    const t3 = setTimeout(() => setWidth(100), 700);
    const t4 = setTimeout(() => setLoading(false), 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [pathname, searchParams]);

  if (!loading && width === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed top-0 left-0 z-[9998] h-[3px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all duration-300 ease-out ${
        !loading ? "opacity-0" : "opacity-100"
      }`}
      style={{ width: `${width}%` }}
    />
  );
}
