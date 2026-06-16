"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Playfair_Display } from "next/font/google";
import { Activity, Zap, Droplets } from "lucide-react";
import ProfileForm from "@/components/nutrition/ProfileForm";
import MacroCard from "@/components/nutrition/MacroCard";
import CaloriesDisplay from "@/components/nutrition/CaloriesDisplay";
import FoodDictionary from "@/components/nutrition/FoodDictionary";
import SuperfoodsSection from "@/components/nutrition/SuperfoodsSection";
import FAQ from "@/components/nutrition/FAQ";

const playfair = Playfair_Display({ subsets: ["latin"] });

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
  const [currentIntake] = useState({ proteins: 0, carbs: 0, fats: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const calculateCalories = () => {
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    if (!ageNum || !weightNum || !heightNum) return;

    let bmr =
      gender === "male"
        ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
        : 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;

    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdee = bmr * multipliers[activityLevel];
    let target = tdee;
    if (goal === "lose") target = tdee - 500;
    if (goal === "gain") target = tdee + 500;

    setDailyCalories(Math.round(target));
    setMacros({
      proteins: Math.round((target * 0.3) / 4),
      carbs: Math.round((target * 0.4) / 4),
      fats: Math.round((target * 0.3) / 9),
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 md:pb-20">

        {/* Hero */}
        <header className="mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-widest text-emerald-600 font-medium mb-3">
            Nutrition & bien-être
          </p>
          <h1
            className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl text-zinc-900 mb-3 leading-tight`}
          >
            La nutrition africaine,{" "}
            <span className="italic text-emerald-600">enfin décryptée</span>
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base max-w-lg leading-relaxed">
            Calculez vos besoins, découvrez ce que vos ingrédients locaux vous
            apportent, et trouvez toutes vos réponses.
          </p>
        </header>

        {/* Séparateur */}
        <div className="h-px bg-zinc-200 mb-10" />

        {/* Calculateur */}
        <div className="space-y-8">
          <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
            Calculateur personnalisé
          </p>
          <ProfileForm
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            weight={weight}
            setWeight={setWeight}
            height={height}
            setHeight={setHeight}
            activityLevel={activityLevel}
            setActivityLevel={setActivityLevel}
            goal={goal}
            setGoal={setGoal}
            onCalculate={calculateCalories}
          />

          {calculated && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CaloriesDisplay calories={dailyCalories} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <MacroCard
                  label="Protéines"
                  value={currentIntake.proteins}
                  target={macros.proteins}
                  color="bg-emerald-500"
                  icon={Activity}
                />
                <MacroCard
                  label="Glucides"
                  value={currentIntake.carbs}
                  target={macros.carbs}
                  color="bg-amber-500"
                  icon={Zap}
                />
                <MacroCard
                  label="Lipides"
                  value={currentIntake.fats}
                  target={macros.fats}
                  color="bg-blue-500"
                  icon={Droplets}
                />
              </div>
            </div>
          )}
        </div>

        {/* Séparateur */}
        <div className="h-px bg-zinc-200 mt-14" />

        {/* Superaliments */}
        <SuperfoodsSection />

        {/* Séparateur */}
        <div className="h-px bg-zinc-200 mt-14" />

        {/* Bibliothèque */}
        <FoodDictionary searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Séparateur */}
        <div className="h-px bg-zinc-200 mt-14" />

        {/* FAQ */}
        <FAQ />

      </main>

      <Footer />
    </div>
  );
}