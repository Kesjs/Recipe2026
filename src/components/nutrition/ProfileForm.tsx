"use client";

import { Target } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface ProfileFormProps {
  age: string;
  setAge: (value: string) => void;
  gender: "male" | "female";
  setGender: (value: "male" | "female") => void;
  weight: string;
  setWeight: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  activityLevel: string;
  setActivityLevel: (value: string) => void;
  goal: "lose" | "maintain" | "gain";
  setGoal: (value: "lose" | "maintain" | "gain") => void;
  onCalculate: () => void;
}

export default function ProfileForm({
  age,
  setAge,
  gender,
  setGender,
  weight,
  setWeight,
  height,
  setHeight,
  activityLevel,
  setActivityLevel,
  goal,
  setGoal,
  onCalculate,
}: ProfileFormProps) {
  return (
    <div className="bg-gradient-to-br from-white to-zinc-50 rounded-3xl p-6 md:p-8 shadow-xl border border-zinc-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
          <Target className="w-5 h-5" />
        </div>
        <h2 className={`${playfair.className} text-xl md:text-2xl text-zinc-900 italic`}>Votre Profil</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Âge</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-zinc-900 font-bold transition-all"
            placeholder="25"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Sexe</label>
          <div className="flex bg-white border border-zinc-200 rounded-2xl p-1">
            <button
              onClick={() => setGender("male")}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${gender === "male" ? "bg-emerald-500 text-white shadow-md" : "text-zinc-400 hover:text-zinc-600"}`}
            >
              H
            </button>
            <button
              onClick={() => setGender("female")}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${gender === "female" ? "bg-emerald-500 text-white shadow-md" : "text-zinc-400 hover:text-zinc-600"}`}
            >
              F
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Poids (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-zinc-900 font-bold transition-all"
            placeholder="70"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Taille (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-zinc-900 font-bold transition-all"
            placeholder="175"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Activité</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-zinc-900 font-bold transition-all appearance-none cursor-pointer"
          >
            <option value="sedentary">Sédentaire</option>
            <option value="light">Légèrement actif (1-3 j/sem)</option>
            <option value="moderate">Modérément actif (3-5 j/sem)</option>
            <option value="active">Très actif (6-7 j/sem)</option>
            <option value="veryActive">Extrêmement actif</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Objectif</label>
          <div className="flex bg-white border border-zinc-200 rounded-2xl p-1">
            {(['lose', 'maintain', 'gain'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all ${goal === g ? "bg-zinc-900 text-white shadow-md" : "text-zinc-400 hover:text-zinc-600"}`}
              >
                {g === 'lose' ? 'Perdre' : g === 'gain' ? 'Prendre' : 'Garder'}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <button
        onClick={onCalculate}
        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
      >
        Calculer mes besoins
      </button>
    </div>
  );
}
