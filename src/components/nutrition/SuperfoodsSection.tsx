"use client";

import { Playfair_Display } from "next/font/google";
import {
  Leaf,
  Sprout,
  FlowerIcon,
  Layers,
  Sun,
  Wheat,
  LucideIcon,
} from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface Superfood {
  name: string;
  origin: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  color: string;
  badge: string;
  benefits: string[];
  description: string;
  calories: number;
  proteins: number;
}

const superfoods: Superfood[] = [
  {
    name: "Moringa",
    origin: "Afrique de l'Ouest",
    icon: Leaf,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    color: "bg-emerald-50 border-emerald-100",
    badge: "bg-emerald-100 text-emerald-700",
    benefits: ["Riche en fer", "Antioxydant puissant", "Source de vitamine C"],
    description:
      "Surnommé \"l'arbre miracle\", le moringa contient plus de calcium que le lait, plus de fer que les épinards et plus de vitamine C que l'orange.",
    calories: 64,
    proteins: 9.4,
  },
  {
    name: "Gombo",
    origin: "Afrique tropicale",
    icon: Sprout,
    iconColor: "text-lime-600",
    iconBg: "bg-lime-100",
    color: "bg-lime-50 border-lime-100",
    badge: "bg-lime-100 text-lime-700",
    benefits: ["Fibres solubles", "Contrôle glycémique", "Riche en folates"],
    description:
      "Le mucilage du gombo ralentit l'absorption des sucres et aide à stabiliser la glycémie. Idéal pour les diabétiques et les sportifs.",
    calories: 33,
    proteins: 1.9,
  },
  {
    name: "Bissap",
    origin: "Sénégal / Mali",
    icon: FlowerIcon,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100",
    color: "bg-rose-50 border-rose-100",
    badge: "bg-rose-100 text-rose-700",
    benefits: ["Riche en anthocyanes", "Anti-inflammatoire", "Régule la tension"],
    description:
      "La fleur d'hibiscus est l'une des sources végétales les plus riches en anthocyanes. Des études montrent son effet positif sur la pression artérielle.",
    calories: 37,
    proteins: 0.3,
  },
  {
    name: "Manioc",
    origin: "Afrique centrale",
    icon: Layers,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    color: "bg-amber-50 border-amber-100",
    badge: "bg-amber-100 text-amber-700",
    benefits: ["Énergie longue durée", "Sans gluten", "Riche en amidon résistant"],
    description:
      "Base calorique de millions d'Africains, le manioc est une excellente source d'énergie sans gluten. Son amidon résistant nourrit le microbiote intestinal.",
    calories: 160,
    proteins: 1.4,
  },
  {
    name: "Baobab",
    origin: "Savane africaine",
    icon: Sun,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    color: "bg-orange-50 border-orange-100",
    badge: "bg-orange-100 text-orange-700",
    benefits: ["6× plus de vitamine C", "Prébiotique naturel", "Riche en calcium"],
    description:
      "La pulpe du fruit de baobab contient jusqu'à 500 mg de vitamine C pour 100 g. C'est aussi un prébiotique naturel qui favorise la santé intestinale.",
    calories: 227,
    proteins: 3.1,
  },
  {
    name: "Fonio",
    origin: "Afrique de l'Ouest",
    icon: Wheat,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
    color: "bg-yellow-50 border-yellow-100",
    badge: "bg-yellow-100 text-yellow-700",
    benefits: ["Index glycémique bas", "Sans gluten", "Riche en acides aminés"],
    description:
      "La plus ancienne céréale africaine, riche en méthionine et cystéine — deux acides aminés rares dans les céréales. Digestion facile et IG très bas.",
    calories: 342,
    proteins: 9,
  },
];

export default function SuperfoodsSection() {
  return (
    <section className="mt-14" aria-labelledby="superfoods-title">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-emerald-600 font-medium mb-3">
          Ingrédients stars
        </p>
        <h2
          id="superfoods-title"
          className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl text-zinc-900 mb-3 leading-tight`}
        >
          Les superaliments{" "}
          <span className="italic font-normal">africains</span>
        </h2>
        <p className="text-zinc-500 text-sm sm:text-base max-w-lg leading-relaxed">
          Des ingrédients du quotidien aux propriétés nutritionnelles
          exceptionnelles, souvent sous-estimés.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {superfoods.map((food) => (
          <article
            key={food.name}
            className={`${food.color} border rounded-3xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${food.iconBg} flex items-center justify-center shrink-0`}
                  aria-hidden="true"
                >
                  <food.icon className={`w-5 h-5 ${food.iconColor}`} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className={`${playfair.className} text-lg text-zinc-900 italic`}>
                    {food.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">{food.origin}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs font-bold text-zinc-400">
                  {food.calories} kcal
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-600 text-sm leading-relaxed">{food.description}</p>

            {/* Badges bénéfices */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {food.benefits.map((b) => (
                <span
                  key={b}
                  className={`${food.badge} text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full`}
                >
                  {b}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
