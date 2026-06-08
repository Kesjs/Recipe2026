"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Playfair_Display } from "next/font/google";
import { Search, Flame, Zap, ArrowRight, Activity, Ruler, Target, Droplets } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface MacroGaugeProps {
  label: string;
  value: number;
  target: number;
  color: string;
  unit?: string;
  icon: any;
}

function MacroGauge({ label, value, target, color, unit = "g", icon: Icon }: MacroGaugeProps) {
  const percentage = Math.min((value / target) * 100, 100);
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-12 flex flex-col items-center justify-center border border-white/50 shadow-[0_48px_80px_-24px_rgba(0,0,0,0.06)] ring-1 ring-zinc-100 transition-all hover:translate-y-[-8px] duration-700 group">
      <div className="relative w-44 h-44 mb-10">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="88"
            cy="88"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-zinc-50"
          />
          <circle
            cx="88"
            cy="88"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className={`${color} transition-all duration-1000 ease-in-out drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline space-x-1">
            <span className="text-4xl font-black text-zinc-950 tracking-tighter">{value}</span>
            <span className="text-sm font-bold text-zinc-400">{unit}</span>
          </div>
          <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mt-1">/ {target}{unit}</span>
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-zinc-50 group-hover:scale-110 transition-transform duration-500">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      <span className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 group-hover:text-emerald-900 transition-colors">{label}</span>
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
    <div className={`min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] paper-texture z-0" />
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24 relative z-10">
        
        <header className="mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-zinc-200 pb-16">
            <div className="max-w-4xl">
              <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl text-zinc-950 mb-10 leading-[1.1] tracking-tighter`}>
                L&apos;Intelligence <br /> <span className="italic font-normal text-emerald-900 underline decoration-emerald-500/10 decoration-[16px] underline-offset-[20px]">Nutritive.</span>
              </h1>
              <p className="text-zinc-500 text-2xl lg:text-3xl font-medium leading-relaxed max-w-2xl">
                Décryptez les besoins de votre corps et transformez votre alimentation en un art de vivre.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-48">
          
          {/* Scientific Parameters Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.1)] p-8 lg:p-12 border border-zinc-100/50 sticky top-32 ring-1 ring-zinc-100">
              <div className="flex items-center space-x-3 mb-12">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className={`${playfair.className} text-4xl text-zinc-950 italic`}>Votre Profil</h2>
              </div>
              
              <div className="space-y-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 px-2 flex items-center gap-2">Âge</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-8 py-4 bg-zinc-50 border-none rounded-[2rem] focus:ring-4 focus:ring-emerald-50 text-zinc-950 font-black text-lg transition-all placeholder:text-zinc-200"
                      placeholder="25"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 px-2">Sexe</label>
                    <div className="flex bg-zinc-50 rounded-[2rem] p-2">
                      <button
                        onClick={() => setGender("male")}
                        className={`flex-1 py-4 rounded-[1.5rem] font-black text-sm transition-all ${gender === "male" ? "bg-white shadow-xl text-emerald-700" : "text-zinc-400 hover:text-zinc-600"}`}
                      >
                        HOMME
                      </button>
                      <button
                        onClick={() => setGender("female")}
                        className={`flex-1 py-4 rounded-[1.5rem] font-black text-sm transition-all ${gender === "female" ? "bg-white shadow-xl text-emerald-700" : "text-zinc-400 hover:text-zinc-600"}`}
                      >
                        FEMME
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 px-2">Poids (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-8 py-4 bg-zinc-50 border-none rounded-[2rem] focus:ring-4 focus:ring-emerald-50 text-zinc-950 font-black text-lg transition-all placeholder:text-zinc-200"
                      placeholder="70"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 px-2">Taille (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-8 py-4 bg-zinc-50 border-none rounded-[2rem] focus:ring-4 focus:ring-emerald-50 text-zinc-950 font-black text-lg transition-all placeholder:text-zinc-200"
                      placeholder="175"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 px-2 flex items-center gap-2">Activité Physique</label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full px-8 py-4 bg-zinc-50 border-none rounded-[2rem] focus:ring-4 focus:ring-emerald-50 text-zinc-950 font-black text-base transition-all appearance-none cursor-pointer"
                  >
                    <option value="sedentary">Sédentaire</option>
                    <option value="light">Légèrement actif (1-3 j/sem)</option>
                    <option value="moderate">Modérément actif (3-5 j/sem)</option>
                    <option value="active">Très actif (6-7 j/sem)</option>
                    <option value="veryActive">Extrêmement actif</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 px-2">Objectif de Santé</label>
                  <div className="flex bg-zinc-50 rounded-[2.5rem] p-2 overflow-hidden">
                    {(['lose', 'maintain', 'gain'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGoal(g)}
                        className={`flex-1 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all ${goal === g ? "bg-zinc-950 text-white shadow-2xl scale-[1.02] z-10" : "text-zinc-400 hover:text-zinc-600"}`}
                      >
                        {g === 'lose' ? 'Perdre' : g === 'gain' ? 'Prendre' : 'Gérer'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={calculateCalories}
                  className="w-full py-5 bg-zinc-950 hover:bg-emerald-600 text-white font-black rounded-[2.5rem] transition-all shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] hover:shadow-emerald-200/50 flex items-center justify-center space-x-4 group active:scale-[0.98]"
                >
                  <span className="uppercase tracking-[0.3em] text-sm">Analyser mes besoins</span>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7">
            {calculated ? (
              <div className="animate-in fade-in slide-in-from-right-16 duration-1000 space-y-12">
                <div className="bg-zinc-950 rounded-[4.5rem] p-12 lg:p-16 text-center text-white shadow-[0_80px_120px_-32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5,150,105,0.15),transparent)] opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className={`${playfair.className} text-3xl italic text-emerald-400 mb-10 flex items-center justify-center gap-4`}>
                    <div className="h-[1px] w-12 bg-emerald-400/30" />
                    Besoins Quotidiens
                    <div className="h-[1px] w-12 bg-emerald-400/30" />
                  </div>
                  <div className="flex items-baseline justify-center space-x-6 mb-8">
                    <p className="text-6xl lg:text-8xl font-black tracking-tighter leading-none">{dailyCalories}</p>
                    <span className="text-3xl font-black uppercase tracking-[0.3em] text-zinc-500">kcal</span>
                  </div>
                  <p className="text-zinc-400 text-2xl font-medium tracking-tight max-w-lg mx-auto">Calories quotidiennes recommandées pour atteindre votre objectif de santé.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <MacroGauge label="Protéines" value={macros.proteins} target={macros.proteins} color="text-emerald-500" icon={Activity} />
                  <MacroGauge label="Glucides" value={macros.carbs} target={macros.carbs} color="text-amber-500" icon={Zap} />
                  <MacroGauge label="Lipides" value={macros.fats} target={macros.fats} color="text-blue-500" icon={Droplets} />
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[700px] bg-white/40 rounded-[4.5rem] border-[6px] border-dashed border-zinc-100/50 flex flex-col items-center justify-center p-20 text-center animate-pulse-slow">
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
                  <Activity className="w-16 h-16 text-zinc-100" />
                </div>
                <h3 className={`${playfair.className} text-2xl md:text-3xl text-zinc-300 italic mb-6`}>Prêt pour la révélation ?</h3>
                <p className="text-zinc-400 font-black uppercase tracking-[0.4em] text-[10px] max-w-sm leading-[2.5]">
                  Configurez votre profil à gauche pour générer votre cartographie nutritionnelle de précision.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Local Food Dictionary Spread */}
        <section className="mb-48">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-24 border-b border-zinc-200 pb-16">
            <div className="max-w-3xl">
              <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl text-zinc-950 mb-8 italic tracking-tighter`}>La Bibliothèque <br /> <span className="text-emerald-900 not-italic">des Aliments.</span></h2>
              <p className="text-zinc-400 text-xl font-medium max-w-xl leading-relaxed">
                Une exploration encyclopédique des nutriments contenus dans nos trésors culinaires locaux.
              </p>
            </div>
            
            <div className="relative w-full lg:w-[480px] group">
              <input
                type="text"
                placeholder="Rechercher un ingrédient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-10 py-7 bg-white border border-zinc-200 rounded-[2.5rem] shadow-sm hover:shadow-xl focus:outline-none focus:ring-8 focus:ring-emerald-50 focus:border-emerald-200 transition-all text-zinc-950 font-bold text-xl placeholder:text-zinc-200"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-zinc-200 group-focus-within:text-emerald-600 transition-all" />
            </div>
          </header>

          <div className="bg-white/70 backdrop-blur-3xl rounded-[4.5rem] border border-white/50 shadow-[0_96px_128px_-48px_rgba(0,0,0,0.1)] overflow-hidden ring-1 ring-zinc-100">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="px-16 py-12 text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300">Ingrédient Principal</th>
                  <th className="px-10 py-12 text-right text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300">Énergie</th>
                  <th className="px-10 py-12 text-right text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300">Protéines</th>
                  <th className="px-10 py-12 text-right text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300">Glucides</th>
                  <th className="px-16 py-12 text-right text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300">Lipides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredDictionary.map((food, index) => (
                  <tr key={index} className="hover:bg-zinc-50/70 transition-all duration-500 group">
                    <td className="px-16 py-10">
                      <span className={`${playfair.className} text-3xl lg:text-4xl text-zinc-950 italic group-hover:text-emerald-950 group-hover:pl-4 transition-all duration-700`}>{food.name}</span>
                    </td>
                    <td className="px-10 py-10 text-right">
                      <div className="flex flex-col items-end group-hover:scale-110 transition-transform duration-500">
                        <span className="text-3xl font-black text-zinc-950 tracking-tighter leading-none">{food.calories}</span>
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">kcal</span>
                      </div>
                    </td>
                    <td className="px-10 py-10 text-right">
                      <span className="text-xl font-bold text-zinc-400 group-hover:text-emerald-600 transition-colors tracking-tighter">{food.proteins}g</span>
                    </td>
                    <td className="px-10 py-10 text-right">
                      <span className="text-xl font-bold text-zinc-400 group-hover:text-amber-600 transition-colors tracking-tighter">{food.carbs}g</span>
                    </td>
                    <td className="px-16 py-10 text-right">
                      <span className="text-xl font-bold text-zinc-400 group-hover:text-blue-600 transition-colors tracking-tighter">{food.lipids}g</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 text-zinc-500 py-32 px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 border-t border-white/5 pt-24">
          <div className="flex flex-col gap-4">
            <div className={`${playfair.className} text-4xl text-white italic`}>Naya Cooking</div>
            <p className="text-zinc-600 font-bold uppercase tracking-[0.4em] text-[10px]">L&apos;excellence culinaire africaine</p>
          </div>
          <div className="flex items-center space-x-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl text-white font-black">2024</span>
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.6em] mt-2">© Copyright</span>
            </div>
            <div className="h-16 w-[1px] bg-white/10" />
            <div className="flex flex-col items-end text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 gap-2">
              <a href="#" className="hover:text-emerald-500 transition-colors">Instagram</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Pinterest</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
