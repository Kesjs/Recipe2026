"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Playfair_Display } from "next/font/google";
import { Search, ArrowRight, Wheat, Fish, Leaf, Droplets, Utensils, Banana, Flame, Sprout } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"] });

const articles = [
  {
    id: 1,
    title: "L'Amiwo, le plat béninois qui nourrit autant le corps que l'âme",
    subtitle: "Glucides complexes du maïs et protéines maigres du poulet grillé",
    content:
      "Préparée à base de farine de maïs fermentée et mijotée dans une sauce tomate relevée, l'Amiwo est bien plus qu'un plat de réconfort. Les glucides complexes du maïs libèrent l'énergie lentement, évitant les pics de glycémie — un avantage que peu de céréales raffinées peuvent offrir. Associée à du poulet grillé, cette combinaison couvre environ 35 % des besoins journaliers en protéines pour un adulte actif de 70 kg. La farine de maïs apporte également du magnésium, essentiel à la contraction musculaire et souvent déficitaire dans les régimes modernes. Un plat patrimonial qui mériterait sa place dans n'importe quel guide nutritionnel sérieux.",
    accent: "emerald",
    icon: Wheat,
    category: "Nutrition",
    readTime: "5 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREEX7LWnKI--AEWg7e7UV4STpnDwf_Cmmc-7f0QGDHdrSk5dVYzLChpDc&s=10",
  },
  {
    id: 2,
    title: "Garba : l'attiéké et le poisson, un duo plus intelligent qu'on ne croit",
    subtitle: "Index glycémique bas, oméga-3 élevés — le fast-food africain qui tient ses promesses",
    content:
      "Le Garba, composé d'attiéké et de thon frit, est souvent mal jugé pour sa cuisson à l'huile. Pourtant, l'attiéké fermenté affiche un index glycémique inférieur au riz blanc (IG 50 contre 72), ce qui en fait un glucide de choix pour les personnes attentives à leur glycémie. Le thon entier fournit des oméga-3 à longues chaînes (EPA et DHA), essentiels à la santé cardiovasculaire. Pour une version équilibrée : limiter la quantité d'huile de friture, ajouter du piment frais et des tomates. Même la sauce gnangnan à base de graines de courge enrichit le plat en zinc et en acides gras insaturés.",
    accent: "amber",
    icon: Fish,
    category: "Équilibre",
    readTime: "4 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cbJ46WBcHmxDYNahz60yvdyN9n1wyveqaVAe8Sy2xQ&s=10",
  },
  {
    id: 3,
    title: "Gombo et moringa : deux trésors africains que vous sous-estimez",
    subtitle: "Plus de folates que les épinards, plus de calcium que le lait",
    content:
      "Le gombo contient 60 µg de folates pour 100 g — soit plus que les épinards souvent vantés en Occident. Ses fibres solubles (mucilage) forment un gel dans l'intestin qui ralentit l'absorption du glucose, précieux pour les personnes à risque de diabète de type 2. Le moringa, lui, est une source exceptionnelle de calcium (185 mg/100g de feuilles fraîches, contre 120 mg pour le lait) et contient sept fois plus de vitamine C que l'orange. Ces deux plantes poussent facilement en Afrique de l'Ouest, coûtent peu et devraient figurer dans l'alimentation quotidienne de chaque famille.",
    accent: "green",
    icon: Leaf,
    category: "Bien-être",
    readTime: "3 min",
    image: "https://www.kingnature.ch/content/uploads/Moringa--e1592383316787-600x449.jpg",
  },
  {
    id: 4,
    title: "Pourquoi le bissap sans sucre est la meilleure boisson que vous ignorez",
    subtitle: "37 kcal, des anthocyanines et une tension artérielle régulée naturellement",
    content:
      "Le bissap — infusion de fleurs d'hibiscus séchées — est une des boissons les plus riches en antioxydants de type anthocyanines, responsables de sa couleur rouge vif. Des études publiées dans le Journal of Nutrition montrent qu'une consommation régulière de 240 ml/jour réduit la tension artérielle systolique de 7 à 13 mmHg chez les adultes hypertendus. Sans sucre ajouté, il n'apporte que 37 kcal pour 100 ml, soit dix fois moins qu'un jus industriel. Servi frais avec quelques feuilles de menthe, il remplace avantageusement sodas et jus sucrés en toutes saisons.",
    accent: "red",
    icon: Droplets,
    category: "Astuce",
    readTime: "3 min",
    image: "https://tarasmulticulturaltable.com/wp-content/uploads/2022/10/Bissap-2-of-3.jpg",
  },
  {
    id: 5,
    title: "Thiéboudienne : le plat sénégalais classé patrimoine immatériel de l'Unesco",
    subtitle: "Riz, poisson et légumes racines — une leçon d'équilibre involontaire",
    content:
      "Inscrit au patrimoine culturel immatériel de l'humanité par l'Unesco en 2021, le Thiéboudienne est une combinaison nutritionnellement remarquable : le riz brisé apporte les glucides, le poisson de mer couvre les besoins en protéines complètes (tous les acides aminés essentiels), et les légumes — manioc, carotte, aubergine africaine — enrichissent le plat en fibres, bêta-carotène et potassium. Une portion de 400g couvre les apports journaliers en iode et en sélénium, deux minéraux souvent oubliés mais essentiels au bon fonctionnement thyroïdien.",
    accent: "blue",
    icon: Utensils,
    category: "Recette",
    readTime: "6 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQba-oY3HQLxZGnw1pYeLXZa2S67Sbov8_cy7E2gdXEjOj31TVak40JgOk&s=10",
  },
  {
    id: 6,
    title: "Aloco : comment savourer la banane plantain sans sacrifier l'équilibre",
    subtitle: "Deux fois plus de potassium que la banane douce, grillée plutôt que frite",
    content:
      "La banane plantain mûre est une source remarquable de potassium (499 mg/100g), dépassant même la banane douce classique. Elle contient aussi de la vitamine B6, indispensable à la synthèse de la sérotonine, le neurotransmetteur du bien-être. La version traditionnelle frite dans l'huile de palme ajoute des calories significatives. Une alternative simple : la cuisson au four à 200°C pendant 20 minutes après avoir incisé la peau. Le résultat est moelleux, naturellement sucré, et conserve tous les nutriments sans l'excès lipidique.",
    accent: "yellow",
    icon: Banana,
    category: "Recette",
    readTime: "4 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKivBOygf3_24NWWc9Bz7NGGgMc9l3G6DfT0CG-FbyFw&s=10",
  },
  {
    id: 7,
    title: "Tilapia et capitaine : quand les poissons d'eau douce africains rivalisent avec le saumon",
    subtitle: "Protéines maigres complètes, faible teneur en mercure, prix accessible",
    content:
      "Le tilapia et le capitaine (Nile perch) sont des poissons d'eau douce africains aux atouts nutritionnels souvent sous-estimés. Le tilapia grillé apporte 26 g de protéines pour 100 g avec seulement 3 g de lipides — un ratio protéines/calories parmi les meilleurs du règne animal. Contrairement aux poissons gras de mer, sa teneur en mercure est très faible, ce qui le rend sûr pour une consommation fréquente, y compris chez les femmes enceintes. Il est aussi riche en phosphore et en vitamine D, deux nutriments dont les carences sont fréquentes en Afrique sub-saharienne.",
    accent: "cyan",
    icon: Fish,
    category: "Science",
    readTime: "5 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxu36pZrK6oWhpjra5Cc6F1bWNLe0o2iF8pEjGfQaSg&s=10",
  },
  {
    id: 8,
    title: "Gingembre, ail, piment : pourquoi nos épices sont des médicaments naturels",
    subtitle: "Ginégrol, allicine, capsaïcine — trois molécules aux effets documentés",
    content:
      "Le gingembre frais contient du ginégrol, une molécule aux puissantes propriétés anti-inflammatoires comparables à l'ibuprofène dans certaines études. L'ail cru libère de l'allicine lors de la coupe — un composé soufré aux effets antibactériens et hypotenseurs prouvés. La capsaïcine du piment rouge active les thermorecepteurs TRPV1 et augmente la dépense énergétique de 4 à 5 % pendant plusieurs heures après ingestion. Ces trois épices fondamentales de la cuisine ouest-africaine agissent en synergie dans les plats mijotés — une pharmacopée naturelle dissimulée dans chaque marmite.",
    accent: "purple",
    icon: Flame,
    category: "Science",
    readTime: "5 min",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx12Lism0nsqJazCIPsj0WqUckPhneQgKVJtBcSXzQsA&s=10",
  },
];

const categoryColors: Record<string, string> = {
  Nutrition: "bg-emerald-50 text-emerald-700",
  Équilibre: "bg-amber-50 text-amber-700",
  "Bien-être": "bg-lime-50 text-lime-700",
  Astuce: "bg-rose-50 text-rose-700",
  Recette: "bg-blue-50 text-blue-700",
  Science: "bg-violet-50 text-violet-700",
};

export default function ActualitesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const categories = ["Tous", "Nutrition", "Équilibre", "Bien-être", "Astuce", "Recette", "Science"];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "Tous" || article.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Header */}
        <header className="mb-12 sm:mb-16 border-b border-zinc-200 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-600 font-medium mb-4">
                Chroniques culinaires
              </p>
              <h1
                className={`${playfair.className} text-4xl sm:text-5xl lg:text-6xl text-zinc-950 leading-[1.08] tracking-tight mb-5`}
              >
                Chroniques <br />
                <span className="italic font-normal text-emerald-700">
                  Culinaires.
                </span>
              </h1>
              <p className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-xl">
                {"L'actualité de la nutrition saine et des saveurs locales africaines, racontée avec rigueur et appétit."}
              </p>
            </div>

            <div className="relative w-full lg:w-96 flex-shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Rechercher une chronique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-300 transition-all"
              />
            </div>
          </div>

          {/* Filtres */}
          <div className="mt-8 flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border transition-all ${
                  activeFilter === cat
                    ? "bg-zinc-950 text-white border-zinc-950"
                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {filteredArticles.length === 0 && (
          <div className="text-center py-24">
            <Sprout className="w-8 h-8 text-zinc-300 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-zinc-400 text-sm">{'Aucune chronique trouvée pour "'}{searchQuery}{'"'}</p>
          </div>
        )}

        {/* Article à la une */}
        {featured && (
          <section className="mb-16">
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-5">
              À la une
            </p>
            <Link href={`/actualites/${featured.id}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-zinc-100 rounded-3xl overflow-hidden hover:shadow-md transition-shadow duration-500">
                <div className="relative h-64 lg:h-auto min-h-[320px]">
                  <OptimizedImage
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    loading="eager"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        categoryColors[featured.category] ?? "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {featured.category}
                    </span>
                    <span className="text-xs text-zinc-400">{featured.readTime} de lecture</span>
                  </div>
                  <h2
                    className={`${playfair.className} text-2xl sm:text-3xl text-zinc-950 leading-snug mb-4 italic`}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-4">
                    {featured.content}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                    Lire la chronique
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Grille des articles */}
        {rest.length > 0 && (
          <section>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-6">
              Toutes les chroniques
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => {
                const Icon = article.icon;
                return (
                  <Link
                    href={`/actualites/${article.id}`}
                    key={article.id}
                    className="group block bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <div className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon
                            className="w-4 h-4 text-zinc-800"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            categoryColors[article.category] ??
                            "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {article.category}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {article.readTime}
                        </span>
                      </div>

                      <h3
                        className={`${playfair.className} text-lg text-zinc-950 leading-snug mb-2 italic group-hover:text-emerald-800 transition-colors`}
                      >
                        {article.title}
                      </h3>

                      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-4">
                        {article.subtitle}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                        Lire
                        <ArrowRight
                          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}