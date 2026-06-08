import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "Naya : Mangez mieux, vivez mieux.",
  description: "Plateforme culinaire haut de gamme dédiée à l'équilibre alimentaire et aux patrimoines culinaires africains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <div className="h-20" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
