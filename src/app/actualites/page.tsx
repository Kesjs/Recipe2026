"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Wheat, Fish, Leaf, Droplets, Utensils, Carrot, Flame, Sparkles, Search } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Focus Nutrition: L&apos;Amiwo au poulet",
    subtitle: "Énergie de la farine de maïs vs. bienfaits de la grillade",
    content: "L&apos;Amiwo est un plat traditionnel béninois à base de farine de maïs et de poulet. La farine de maïs fournit des glucides complexes pour une énergie durable, tandis que le poulet grillé apporte des protéines maigres essentielles à la construction musculaire. Ce plat équilibré est riche en fibres et en nutriments, idéal pour un repas complet et sain.",
    accent: "emerald",
    icon: Wheat,
    category: "Recette"
  },
  {
    id: 2,
    title: "L&apos;art d&apos;équilibre son Garba",
    subtitle: "Gérer les portions d&apos;Attiéké et contrôler l&apos;huile de friture",
    content: "Le Garba, composé d&apos;Attiéké et de poisson frit, est un délice ivoirien. Pour en faire un repas sain, privilégiez des portions modérées d&apos;Attiéké (environ 150g) et utilisez des méthodes de cuisson plus légères comme la cuisson au four ou à la vapeur pour le poisson. Réduisez la quantité d&apos;huile de palme et ajoutez plus de légumes frais pour un équilibre nutritionnel optimal.",
    accent: "amber",
    icon: Fish,
    category: "Recette"
  },
  {
    id: 3,
    title: "Les super-aliments de chez nous: Le Gombo et le Moringa",
    subtitle: "Fibres et antioxydants pour une santé optimale",
    content: "Le Gombo et le Moringa sont des trésors nutritionnels africains. Le Gombo est riche en fibres solubles qui aident à réguler la glycémie et le cholestérol. Le Moringa, surnommé l&apos;arbre miracle, contient plus de vitamines et minéraux que la plupart des légumes, avec des propriétés antioxydantes puissantes. Intégrez ces super-aliments dans votre alimentation quotidienne pour booster votre immunité.",
    accent: "green",
    icon: Leaf,
    category: "Bien-être"
  },
  {
    id: 4,
    title: "Hydratation et climat chaud",
    subtitle: "Promouvoir le Bissap sans sucre et les infusions de citronnelle",
    content: "Dans les climats chauds, l&apos;hydratation est essentielle. Remplacez les sodas sucrés par le Bissap (jus d&apos;hibiscus) naturel sans sucre ajouté, riche en antioxydants et en vitamine C. Les infusions de citronnelle sont également excellentes pour la digestion et le rafraîchissement naturel. Ces boissons locales sont non seulement délicieuses mais aussi bénéfiques pour votre santé, sans les calories vides des boissons industrielles.",
    accent: "red",
    icon: Droplets,
    category: "Astuce"
  },
  {
    id: 5,
    title: "Les bienfaits du Thiéboudienne",
    subtitle: "Un plat complet équilibré en protéines et légumes",
    content: "Le Thiéboudienne est le plat national sénégalais, combinant riz, poisson et légumes. Ce plat offre un excellent équilibre nutritionnel avec des protéines de haute qualité du poisson, des glucides complexes du riz et une grande variété de vitamines et minéraux des légumes comme les carottes, le chou et l&apos;aubergine. C&apos;est un repas complet qui nourrit le corps et l&apos;esprit.",
    accent: "blue",
    icon: Utensils,
    category: "Recette"
  },
  {
    id: 6,
    title: "Aloco: Modération et plaisir",
    subtitle: "Profiter des bananes plantains sans excès",
    content: "L&apos;Aloco, ces délicieuses bananes plantains frites, est un plat très apprécié en Afrique de l&apos;Ouest. Bien que riche en glucides, les bananes plantains contiennent également du potassium et des fibres. Pour une version plus saine, réduisez la quantité d&apos;huile de friture et privilégiez une cuisson au four. Accompagnez-les de légumes frais pour un repas plus équilibré.",
    accent: "yellow",
    icon: Carrot,
    category: "Recette"
  },
  {
    id: 7,
    title: "Le Tilapia: Poisson maigre et nutritif",
    subtitle: "Une source de protéines idéale pour une alimentation saine",
    content: "Le Tilapia est un poisson d&apos;eau douce très populaire en Afrique. C&apos;est une excellente source de protéines maigres avec peu de calories et de graisses. Riche en vitamines B12 et en phosphore, le Tilapia contribue à la santé des os et au métabolisme énergétique. Privilégiez la cuisson au four ou au grill pour conserver tous ses bienfaits nutritionnels.",
    accent: "cyan",
    icon: Fish,
    category: "Science"
  },
  {
    id: 8,
    title: "Épices et santé: Le gingembre et l&apos;ail",
    subtitle: "Propriétés anti-inflammatoires et digestives",
    content: "Le gingembre et l&apos;ail sont des épices fondamentales de la cuisine africaine aux propriétés médicinales reconnues. Le gingembre aide à la digestion et réduit les inflammations, tandis que l&apos;ail renforce le système immunitaire et améliore la santé cardiovasculaire. Utilisez-les généreusement dans vos recettes pour ajouter de la saveur et des bienfaits santé.",
    accent: "purple",
    icon: Sparkles,
    category: "Science"
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

  const getExcerpt = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Actualités Nutritionnelles</h1>
          <p className="text-slate-600 text-lg">Découvrez nos conseils et articles sur la nutrition saine et les saveurs locales</p>
        </div>

        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un conseil nutritionnel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors min-w-[100px] ${
                  activeFilter === category
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArticles.map((article, index) => {
            const isHero = article.id === 1;
            const isFeatured = article.id === 2 || article.id === 3;
            
            return (
              <article
                key={article.id}
                className={`
                  bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden
                  hover:transform hover:scale-[1.02] hover:shadow-lg transition-all duration-500
                  ${isHero ? 'md:col-span-2 lg:col-span-3' : ''}
                  ${isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
              >
                <div className={`p-10 bg-${article.accent}-50`}>
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                    <article.icon className="w-8 h-8 text-slate-700" />
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-emerald-600 rounded-full mb-4">
                    {article.category}
                  </span>
                  <h2 className={`
                    font-semibold text-slate-900 mb-3 tracking-tight
                    ${isHero ? 'text-3xl' : 'text-2xl'}
                  `}>
                    {article.title}
                  </h2>
                  <p className="text-slate-600 font-medium mb-4">{article.subtitle}</p>
                </div>
                <div className="p-10">
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {getExcerpt(article.content, isHero ? 300 : 150)}
                  </p>
                  <button className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                    Lire la suite
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
