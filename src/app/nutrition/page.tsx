"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

interface MacroGaugeProps {
  label: string;
  value: number;
  target: number;
  color: string;
}

function MacroGauge({ label, value, target, color }: MacroGaugeProps) {
  const percentage = Math.min((value / target) * 100, 100);
  
  return (
    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-zinc-700">{label}</span>
        <span className="text-sm font-semibold text-zinc-900">{value}g / {target}g</span>
      </div>
      <div className="w-full bg-zinc-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

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

export default function NutritionPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [calculated, setCalculated] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [macros, setMacros] = useState({ proteins: 0, carbs: 0, fats: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const calculateCalories = () => {
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!ageNum || !weightNum || !heightNum) return;

    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    let targetCalories = tdee;
    if (goal === "lose") targetCalories = tdee - 500;
    if (goal === "gain") targetCalories = tdee + 500;

    setDailyCalories(Math.round(targetCalories));

    const proteinTarget = Math.round((targetCalories * 0.3) / 4);
    const carbTarget = Math.round((targetCalories * 0.4) / 4);
    const fatTarget = Math.round((targetCalories * 0.3) / 9);

    setMacros({ proteins: proteinTarget, carbs: carbTarget, fats: fatTarget });
    setCalculated(true);
  };

  const filteredDictionary = localFoodDictionary.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-zinc-900 mb-2 tracking-tight">Calculateur Nutritionnel</h1>
          <p className="text-zinc-600">Calculez vos besoins caloriques quotidiens avec la formule Mifflin-St Jeor</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-zinc-900 mb-6 tracking-tight">Vos Paramètres</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Âge</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900 placeholder-zinc-400"
                  placeholder="25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Sexe</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setGender("male")}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      gender === "male"
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    Homme
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      gender === "female"
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    Femme
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Poids (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900 placeholder-zinc-400"
                    placeholder="70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Taille (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900 placeholder-zinc-400"
                    placeholder="175"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Niveau d'activité</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900"
                >
                  <option value="sedentary">Sédentaire (peu ou pas d'exercice)</option>
                  <option value="light">Légèrement actif (1-3 jours/semaine)</option>
                  <option value="moderate">Modérément actif (3-5 jours/semaine)</option>
                  <option value="active">Très actif (6-7 jours/semaine)</option>
                  <option value="veryActive">Extrêmement actif (physique/sportif)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Objectif</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setGoal("lose")}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      goal === "lose"
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    Perdre
                  </button>
                  <button
                    onClick={() => setGoal("maintain")}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      goal === "maintain"
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    Maintenir
                  </button>
                  <button
                    onClick={() => setGoal("gain")}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      goal === "gain"
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    Prendre
                  </button>
                </div>
              </div>

              <button
                onClick={calculateCalories}
                className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Calculer
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {calculated && (
              <>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">Vos Besoins Quotidiens</h3>
                  <p className="text-5xl font-bold text-emerald-600 mb-2">{dailyCalories}</p>
                  <p className="text-zinc-600">calories par jour</p>
                </div>

                <MacroGauge label="Protéines" value={macros.proteins} target={macros.proteins} color="bg-emerald-600" />
                <MacroGauge label="Glucides" value={macros.carbs} target={macros.carbs} color="bg-amber-500" />
                <MacroGauge label="Lipides" value={macros.fats} target={macros.fats} color="bg-blue-500" />
              </>
            )}

            {!calculated && (
              <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-8 flex items-center justify-center h-full">
                <p className="text-zinc-500 text-center">Remplissez vos paramètres et cliquez sur "Calculer" pour voir vos besoins nutritionnels.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6 tracking-tight">Dictionnaire des Aliments Locaux</h2>
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Rechercher un aliment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 bg-white border border-zinc-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-zinc-900 placeholder-zinc-400"
            />
          </div>

          <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200/80">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">Aliment</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-900">Calories</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-900">Protéines</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-900">Glucides</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-900">Lipides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredDictionary.map((food, index) => (
                  <tr key={index} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">{food.name}</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 text-right">{food.calories} kcal</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 text-right">{food.proteins}g</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 text-right">{food.carbs}g</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 text-right">{food.lipids}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
