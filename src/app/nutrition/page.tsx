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
  const [currentIntake, setCurrentIntake] = useState({ proteins: 0, carbs: 0, fats: 0 });
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


  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-12">
          <h1 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl text-zinc-900 mb-3 sm:mb-4 leading-tight`}>
            Intelligence <span className="italic text-emerald-600">Nutritive</span>
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base">
            Calculez vos besoins caloriques et optimisez votre alimentation
          </p>
        </header>

        <div className="space-y-8">
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

        <FoodDictionary searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </main>

      <Footer />
    </div>
  );
}
