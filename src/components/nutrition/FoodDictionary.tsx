"use client";

import { Search } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const localFoodDictionary = [
  { name: "Manioc", calories: 160, proteins: 1.4, carbs: 38, lipids: 0.3 },
  { name: "Attiéké", calories: 150, proteins: 2.0, carbs: 35, lipids: 0.5 },
  { name: "Yam", calories: 118, proteins: 1.5, carbs: 28, lipids: 0.2 },
  { name: "Poisson Grillé", calories: 140, proteins: 22, carbs: 0, lipids: 5 },
  { name: "Poulet", calories: 165, proteins: 31, carbs: 0, lipids: 3.6 },
  { name: "Gombo", calories: 33, proteins: 1.9, carbs: 7, lipids: 0.2 },
  { name: "Moringa", calories: 64, proteins: 9.4, carbs: 8.3, lipids: 1.4 },
  { name: "Bissap (sans sucre)", calories: 37, proteins: 0.3, carbs: 8.5, lipids: 0.1 },
];

interface FoodDictionaryProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function FoodDictionary({ searchTerm, setSearchTerm }: FoodDictionaryProps) {
  const filteredDictionary = localFoodDictionary.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mt-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 border-b border-zinc-200 pb-8">
        <div>
          <h2 className={`${playfair.className} text-2xl md:text-3xl text-zinc-900 mb-2 italic`}>
            Bibliothèque des Aliments
          </h2>
          <p className="text-zinc-500 text-sm md:text-base">
            Nutriments des ingrédients locaux
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-zinc-900 font-bold transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Ingrédient</th>
                <th className="px-4 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-400">Énergie</th>
                <th className="px-4 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-400">Protéines</th>
                <th className="px-4 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-400">Glucides</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-400">Lipides</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredDictionary.map((food, index) => (
                <tr key={index} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`${playfair.className} text-base md:text-lg text-zinc-900 italic`}>{food.name}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-lg font-black text-zinc-900">{food.calories}</span>
                    <span className="text-[10px] font-bold text-zinc-400 ml-1">kcal</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-bold text-emerald-600">{food.proteins}g</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-bold text-amber-600">{food.carbs}g</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-blue-600">{food.lipids}g</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
