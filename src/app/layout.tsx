import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";

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
    icon: "/icon.png",
    apple: "/icon.png",
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

        {/*
          ✅ Note : pas besoin de preconnect fonts.googleapis.com
          car next/font/google auto-héberge les polices en production.
          Elles sont servies depuis ton propre domaine sans requête externe.
        */}
      </head>
      <body className="font-sans">
        {/*
          ✅ div h-20 supprimée d'ici — elle créait un CLS et bloquait
          le contenu au chargement. Le padding-top est géré directement
          dans HomePageClient (pt-20 sm:pt-24) en dessous de la navbar fixe.
        */}
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
