import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Naya : Mangez mieux, vivez mieux.",
  description: "Plateforme culinaire haut de gamme dédiée à l&apos;équilibre alimentaire et aux patrimoines culinaires africains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="h-20" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
