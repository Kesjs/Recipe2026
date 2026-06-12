"use client";

import { Search, Flame, Dumbbell, Wheat, Droplet } from "lucide-react";

const foods = [
  { name: "Manioc", kcal: 160, prot: "1.4g", carb: "38g", fat: "0.3g" },
  { name: "Attiéké", kcal: 150, prot: "2g", carb: "35g", fat: "0.5g" },
  { name: "Igname", kcal: 118, prot: "1.5g", carb: "28g", fat: "0.2g" },
  { name: "Poisson grillé", kcal: 140, prot: "22g", carb: "0g", fat: "5g" },
  { name: "Poulet", kcal: 165, prot: "31g", carb: "0g", fat: "3.6g" },
  { name: "Gombo", kcal: 33, prot: "1.9g", carb: "7g", fat: "0.2g" },
  { name: "Moringa", kcal: 64, prot: "9.4g", carb: "8.3g", fat: "1.4g" },
  { name: "Bissap (sans sucre)", kcal: 37, prot: "0.3g", carb: "8.5g", fat: "0.1g" },
  { name: "Plantain mûr", kcal: 122, prot: "1.3g", carb: "32g", fat: "0.4g" },
  { name: "Arachides", kcal: 567, prot: "26g", carb: "16g", fat: "49g" },
  { name: "Sorgho", kcal: 329, prot: "11g", carb: "72g", fat: "3.5g" },
  { name: "Haricots noirs", kcal: 132, prot: "8.9g", carb: "24g", fat: "0.5g" },
];

export default function FoodDictionary({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}) {
  const filtered = foods.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mt-16">
      <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-6">
        Bibliothèque des aliments
      </p>

      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4"
          strokeWidth={1.5}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un aliment local..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center py-8">
           {"Aucun aliment trouvé pour \""}{searchTerm}{"\""}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((food) => (
            <div
              key={food.name}
              className="bg-white border border-zinc-100 rounded-xl p-4 flex flex-col gap-3"
            >
              <p className="text-sm font-medium text-zinc-900">{food.name}</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">
                  <Flame className="w-3 h-3" strokeWidth={1.5} />
                  {food.kcal} kcal
                </span>
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                  <Dumbbell className="w-3 h-3" strokeWidth={1.5} />
                  P {food.prot}
                </span>
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                  <Wheat className="w-3 h-3" strokeWidth={1.5} />
                  G {food.carb}
                </span>
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-medium">
                  <Droplet className="w-3 h-3" strokeWidth={1.5} />
                  L {food.fat}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}