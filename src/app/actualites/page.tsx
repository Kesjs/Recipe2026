"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Playfair_Display } from "next/font/google";
import { Search, ArrowRight, Wheat, Fish, Leaf, Droplets, Utensils, Carrot, Sparkles } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"] });

const articles = [
  {
    id: 1,
    title: "Focus Nutrition: L'Amiwo au poulet",
    subtitle: "Énergie de la farine de maïs vs. bienfaits de la grillade",
    content: "L'Amiwo est un plat traditionnel béninois à base de farine de maïs et de poulet. La farine de maïs fournit des glucides complexes pour une énergie durable, tandis que le poulet grillé apporte des protéines maigres essentielles à la construction musculaire. Ce plat équilibré est riche en fibres et en nutriments, idéal pour un repas complet et sain.",
    accent: "emerald",
    icon: Wheat,
    category: "Recette",
    image: "https://images.unsplash.com/photo-1595786802424-d6efbc413db5?auto=format&w=1200&q=80"
  },
  {
    id: 2,
    title: "L'art d'équilibre son Garba",
    subtitle: "Gérer les portions d'Attiéké et contrôler l'huile",
    content: "Le Garba, composé d'Attiéké et de poisson frit, est un délice ivoirien. Pour en faire un repas sain, privilégiez des portions modérées d'Attiéké (environ 150g) et utilisez des méthodes de cuisson plus légères comme la cuisson au four.",
    accent: "amber",
    icon: Fish,
    category: "Recette",
    image: "https://images.unsplash.com/photo-1575250686903-c2f5edb52830?auto=format&w=800&q=80"
  },
  {
    id: 3,
    title: "Les super-aliments: Le Gombo et le Moringa",
    subtitle: "Fibres et antioxydants pour une santé optimale",
    content: "Le Gombo et le Moringa sont des trésors nutritionnels africains. Le Gombo est riche en fibres solubles qui aident à réguler la glycémie.",
    accent: "green",
    icon: Leaf,
    category: "Bien-être",
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&w=800&q=80"
  },
  {
    id: 4,
    title: "Hydratation et climat chaud",
    subtitle: "Promouvoir le Bissap sans sucre",
    content: "Dans les climats chauds, l'hydratation est essentielle. Remplacez les sodas sucrés par le Bissap naturel sans sucre ajouté.",
    accent: "red",
    icon: Droplets,
    category: "Astuce",
    image: "https://images.unsplash.com/photo-1638469546636-bc626ae59438?auto=format&w=800&q=80"
  },
  {
    id: 5,
    title: "Les bienfaits du Thiéboudienne",
    subtitle: "Un plat complet équilibré en protéines",
    content: "Le Thiéboudienne est le plat national sénégalais, combinant riz, poisson et légumes. Ce plat offre un excellent équilibre.",
    accent: "blue",
    icon: Utensils,
    category: "Recette",
    image: "https://images.unsplash.com/photo-1718939045423-01388713f520?auto=format&w=800&q=80"
  },
  {
    id: 6,
    title: "Aloco: Modération et plaisir",
    subtitle: "Profiter des bananes plantains sans excès",
    content: "L'Aloco, ces délicieuses bananes plantains frites, est un plat très apprécié. Pour une version saine, privilégiez le four.",
    accent: "yellow",
    icon: Carrot,
    category: "Recette",
    image: "https://images.unsplash.com/photo-1597786766080-3218bb7f951f?auto=format&w=800&q=80"
  },
  {
    id: 7,
    title: "Le Tilapia: Poisson maigre",
    subtitle: "Une source de protéines idéale",
    content: "Le Tilapia est un poisson populaire. C'est une excellente source de protéines maigres avec peu de calories.",
    accent: "cyan",
    icon: Fish,
    category: "Science",
    image: "https://images.unsplash.com/photo-1518027424558-4cf9fafe6150?auto=format&w=800&q=80"
  },
  {
    id: 8,
    title: "Épices et santé: Le gingembre",
    subtitle: "Propriétés anti-inflammatoires et digestives",
    content: "Le gingembre et l'ail sont des épices fondamentales de la cuisine africaine aux propriétés médicinales reconnues.",
    accent: "purple",
    icon: Sparkles,
    category: "Science",
    image: "https://images.unsplash.com/photo-1676686045790-05d7d604ccb9?auto=format&w=800&q=80"
  }
];

export default function ActualitesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const categories = ["Tous", "Recette", "Bien-être", "Astuce", "Science"];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "Tous" || article.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] paper-texture z-0" />
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24 relative z-10">
        
        <header className="mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-zinc-200 pb-16">
            <div className="max-w-4xl">
              <h1 className={`${playfair.className} text-3xl md:text-4xl lg:text-5xl text-zinc-950 mb-12 leading-[1.1] tracking-tighter`}>
                Chroniques <br /> <span className="italic font-normal text-emerald-900 underline decoration-emerald-500/10 decoration-[16px] underline-offset-[24px]">Culinaire.</span>
              </h1>
              <p className="text-zinc-500 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
                L&apos;actualité de la nutrition saine et des saveurs locales, racontée avec l&apos;élégance d&apos;un magazine de cuisine.
              </p>
            </div>
            
            <div className="relative w-full lg:w-[480px] group">
              <input
                type="text"
                placeholder="Rechercher une chronique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-10 py-4 bg-white border border-zinc-200 rounded-[2rem] shadow-sm hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all text-zinc-950 font-bold text-base placeholder:text-zinc-200"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-200 group-focus-within:text-emerald-600 transition-all" />
            </div>
          </div>

          <div className="mt-14 flex items-center space-x-6 overflow-x-auto pb-6 no-scrollbar snap-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all border-[3px] snap-start shrink-0 ${
                  activeFilter === cat 
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-2xl scale-105 z-10" 
                    : "bg-white text-zinc-400 border-zinc-50 hover:border-zinc-200 hover:text-zinc-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-48">
          {/* Featured Hero Spread */}
          {filteredArticles[0] && (
            <section className="relative group">
              <Link href={`/actualites/${filteredArticles[0].id}`}>
                <div className="relative w-full h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-[0_80px_120px_-32px_rgba(0,0,0,0.3)] ring-1 ring-zinc-200/50">
                  <Image 
                    src={filteredArticles[0].image} 
                    alt={filteredArticles[0].title} 
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
                    <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-6 lg:p-10 rounded-[3rem] max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000 relative overflow-hidden group/card">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-10">
                          <span className="inline-block px-6 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
                            FEATURED STORY
                          </span>
                          <div className="h-[1px] w-12 bg-white/30" />
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{filteredArticles[0].category}</span>
                        </div>
                        
                        <h2 className={`${playfair.className} text-xl md:text-2xl lg:text-3xl text-white mb-6 leading-[1.1] tracking-tight`}>
                          {filteredArticles[0].title}
                        </h2>
                        <p className="text-zinc-300 text-lg font-medium mb-8 line-clamp-2 max-w-2xl leading-relaxed">{filteredArticles[0].subtitle}</p>
                        
                        <div className="flex items-center space-x-6 text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] group-hover:gap-8 transition-all">
                          <span>Commencer la lecture</span>
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Asymmetric Magazine Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 pb-40">
            {filteredArticles.slice(1).map((article, index) => {
              const isWide = index % 3 === 0;
              return (
                <div key={article.id} className={isWide ? "lg:col-span-12 xl:col-span-8 lg:mx-auto" : "lg:col-span-6"}>
                  <Link href={`/actualites/${article.id}`} className="group block">
                    <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden mb-8 shadow-2xl ring-1 ring-zinc-100 transition-all duration-700 group-hover:translate-y-[-8px]">
                      <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
                      <div className="absolute top-6 left-6">
                        <div className="w-16 h-16 bg-white/95 backdrop-blur-2xl rounded-2xl flex items-center justify-center shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] ring-1 ring-white/50 group-hover:rotate-6 transition-all duration-500">
                          <article.icon className="w-6 h-6 text-zinc-950" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                    
                    <div className="px-4">
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px]">{article.category}</span>
                        <div className="h-[1px] w-8 bg-zinc-200" />
                      </div>
                      
                      <h3 className={`${playfair.className} text-xl md:text-2xl lg:text-3xl text-zinc-950 mb-4 group-hover:text-emerald-950 transition-colors leading-[1.2] tracking-tight italic`}>
                        {article.title}
                      </h3>
                      
                      <p className="text-zinc-500 text-base font-medium leading-relaxed line-clamp-3 mb-8 max-w-2xl">
                        {article.subtitle}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-zinc-950 font-black uppercase tracking-[0.4em] text-[9px] group-hover:gap-10 transition-all duration-700">
                        <span>L&apos;histoire complète</span>
                        <div className="h-[2px] w-12 bg-zinc-950 transition-all duration-700 group-hover:w-24 group-hover:bg-emerald-600" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="bg-zinc-950 text-zinc-500 py-32 px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-24">
          <div className="flex flex-col gap-6">
            <div className={`${playfair.className} text-2xl text-white italic`}>Naya Cooking</div>
            <p className="text-zinc-600 font-bold uppercase tracking-[0.5em] text-[9px]">L&apos;excellence & Chroniques culinaires africaines</p>
          </div>
          <div className="flex items-center space-x-16">
            <div className="flex flex-col items-center">
              <span className="text-xl text-white font-black tracking-tighter italic">2024</span>
              <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em] mt-3">EDITION PREMIÈRE</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
