import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";
import PageLoader from "@/components/PageLoader";
import NavigationProgress from "@/components/NavigationProgress";
import { Suspense } from "react";

// ✅ next/font/google gère le chargement optimisé (pas d'@import dans globals.css)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // ✅ évite le FOIT (flash de texte invisible)
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naya : Mangez mieux, vivez mieux.",
  description:
    "Plateforme culinaire haut de gamme dédiée à l'équilibre alimentaire et aux patrimoines culinaires africains",
  icons: {
    icon: "/Naya_cuisine.png",
    apple: "/Naya_cuisine.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* ✅ meta viewport explicite — WCAG 1.4.4 + SEO mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ preconnect vers domaines externes pour réduire la latence */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.prod.website-files.com" />

        {/* ✅ preload des images hero pour optimiser le LCP */}
        <link rel="preload" as="image" href="https://cdn.prod.website-files.com/6879fb8cc5b3443d06f6e153/687a6f680f3897c2b21beea0_hero-bg-overlay-p-1600.webp" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&w=1920&q=80" />

        {/*
          ✅ Note : pas besoin de preconnect fonts.googleapis.com
          car next/font/google auto-héberge les polices en production.
          Elles sont servies depuis ton propre domaine sans requête externe.
        */}
      </head>
      <body className="font-sans">
        <PageLoader />
        {/* Barre de progression verte en haut à chaque navigation */}
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
