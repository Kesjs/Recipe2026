import { NutritionInfo } from "@/lib/types";

interface NutritionCardProps {
  nutrition: NutritionInfo;
}

export default function NutritionCard({ nutrition }: NutritionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-6 sticky top-24">
      <h3 className="font-semibold text-zinc-900 mb-4 text-lg">Fiche Nutritionnelle</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-zinc-100">
          <span className="text-zinc-600 font-medium">Calories</span>
          <span className="text-zinc-900 font-bold text-xl">{nutrition.calories}</span>
          <span className="text-zinc-500 text-sm">kcal</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-zinc-100">
          <span className="text-zinc-600 font-medium">Protéines</span>
          <span className="text-zinc-900 font-bold text-xl">{nutrition.proteins}</span>
          <span className="text-zinc-500 text-sm">g</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-zinc-100">
          <span className="text-zinc-600 font-medium">Glucides</span>
          <span className="text-zinc-900 font-bold text-xl">{nutrition.carbs}</span>
          <span className="text-zinc-500 text-sm">g</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-zinc-600 font-medium">Lipides</span>
          <span className="text-zinc-900 font-bold text-xl">{nutrition.lipids}</span>
          <span className="text-zinc-500 text-sm">g</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-200">
        <p className="text-xs text-zinc-500 text-center">
          Valeurs nutritionnelles calculées selon les quantités spécifiées
        </p>
      </div>
    </div>
  );
}
