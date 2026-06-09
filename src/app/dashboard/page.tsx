"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Leaf, 
  LayoutDashboard, 
  ChefHat, 
  ShoppingCart, 
  BarChart2, 
  Settings, 
  Calendar, 
  Plus, 
  Flame, 
  Beef, 
  Wheat, 
  Droplets,
  Star,
  Clock,
  MoreVertical,
  MoreHorizontal
} from "lucide-react";
import Image from "next/image";
import { generateRecipeLink } from "@/lib/recipe-links";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userRecipes, setUserRecipes] = useState<any[]>([]);
  const [userFavorites, setUserFavorites] = useState<any[]>([]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) {
          router.push("/auth");
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/auth");
          return;
        }

        setUser(user);

        // Fetch user recipes
        const { data: recipes } = await supabase
          .from("recipes")
          .select(`
            *,
            recipe_ingredients (
              ingredient_id,
              amount_grams,
              ingredients (
                id, name, calories_per_100g, proteins, carbs, lipids
              )
            )
          `)
          .eq("created_by", user.id)
          .order("created_at", { ascending: false });

        setUserRecipes(recipes || []);

        // Fetch user favorites
        const { data: favorites } = await supabase
          .from("favorites")
          .select(`
            *,
            recipes (
              *,
              recipe_ingredients (
                ingredient_id,
                amount_grams,
                ingredients (
                  id, name, calories_per_100g, proteins, carbs, lipids
                )
              )
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setUserFavorites(favorites?.map((f: any) => f.recipes) || []);
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  if (!user) return null;

  const days = [
    { name: "Monday", date: "12", plan: "Active Plan" },
    { name: "Tuesday", date: "13", plan: "Balanced Day" },
    { name: "Wednesday", date: "14", plan: "Veggie Focus" },
    { name: "Thursday", date: "15", plan: "Morning Energy" },
    { name: "Friday", date: "16", plan: "Weekend Prep" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] font-sans text-[#0f172a] selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-zinc-200 p-8 shrink-0">
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-zinc-900 uppercase">Naya</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="flex items-center gap-4 w-full px-5 py-4 bg-[#f0f5f2] text-[#7D9D8A] rounded-2xl font-bold transition-all border border-[#7D9D8A]/10">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button onClick={() => router.push('/recettes')} className="flex items-center gap-4 w-full px-5 py-4 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 rounded-2xl transition-all font-medium">
            <ChefHat className="w-5 h-5" />
            Recettes
          </button>
          <button className="flex items-center gap-4 w-full px-5 py-4 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 rounded-2xl transition-all font-medium">
            <ShoppingCart className="w-5 h-5" />
            Courses
          </button>
          <button className="flex items-center gap-4 w-full px-5 py-4 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 rounded-2xl transition-all font-medium">
            <BarChart2 className="w-5 h-5" />
            Analytiques
          </button>
          <button className="flex items-center gap-4 w-full px-5 py-4 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 rounded-2xl transition-all font-medium">
            <Settings className="w-5 h-5" />
            Paramètres
          </button>
        </nav>

        <div className="mt-auto pt-10 border-t border-zinc-100">
          <div className="bg-[#f5f8f6] p-6 rounded-3xl mb-8 border border-[#d5e3d9]/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-[#576b5d] uppercase tracking-wider">Objectif Hebdo</span>
              <span className="text-xs font-black text-amber-500 tracking-widest">4 / 7</span>
            </div>
            <div className="h-2 w-full bg-zinc-200/50 rounded-full overflow-hidden" />
            <p className="text-[10px] text-zinc-500 mt-3 font-medium leading-relaxed italic text-balance">Plus que 3 jours pour atteindre votre objectif santé !</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <Image src="https://i.pravatar.cc/150?u=chef_eliza" alt="Profile" fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-zinc-900 truncate leading-tight">{user.user_metadata?.name || "Utilisateur"}</p>
              <p className="text-xs text-zinc-400 truncate uppercase tracking-tighter">Plan Standard</p>
            </div>
            <button className="w-10 h-10 rounded-xl hover:bg-zinc-100 flex items-center justify-center text-zinc-400 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen flex flex-col paper-texture">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 md:px-10 py-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-1 font-serif italic">Bonjour, {user.user_metadata?.name?.split(' ')[0] || "Chef"} !</h1>
            <p className="text-zinc-400 font-medium tracking-tight">Planifiez vos repas pour <span className="text-zinc-900 font-bold">12 Oct - 18 Oct</span></p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-2xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all shadow-sm">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Cette Semaine
            </button>
            <button 
              onClick={() => router.push('/recettes/creer')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-5 h-5" />
              Ajouter Recette
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-6 md:px-10 mb-8 shrink-0">
          <div className="bg-white p-7 rounded-[32px] border border-zinc-200/50 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Calories</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-zinc-900 tracking-tighter">12,450</span>
                  <span className="text-xs font-bold text-zinc-400 uppercase">kcal</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center shadow-inner">
                <Flame className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-zinc-500 uppercase tracking-tighter">Objectif Quotidien</span>
                <span className="text-zinc-900">88%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: "88%" }} />
              </div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-[32px] border border-zinc-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Protéines</p>
                <span className="text-3xl font-black text-zinc-900 tracking-tighter">450g</span>
              </div>
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-inner">
                <Beef className="w-6 h-6" />
              </div>
            </div>
            <p className="text-[11px] font-bold text-red-600/70 tracking-tight">+12% depuis la semaine dernière</p>
          </div>

          <div className="bg-white p-7 rounded-[32px] border border-zinc-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Glucides</p>
                <span className="text-3xl font-black text-zinc-900 tracking-tighter">820g</span>
              </div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                <Wheat className="w-6 h-6" />
              </div>
            </div>
            <p className="text-[11px] font-bold text-emerald-600/70 tracking-tight">Dans la zone cible</p>
          </div>

          <div className="bg-white p-7 rounded-[32px] border border-zinc-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Lipides</p>
                <span className="text-3xl font-black text-zinc-900 tracking-tighter">310g</span>
              </div>
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner">
                <Droplets className="w-6 h-6" />
              </div>
            </div>
            <p className="text-[11px] font-bold text-blue-600/70 tracking-tight">Apport modéré</p>
          </div>
        </section>

        {/* Day Planner */}
        <section className="flex-1 overflow-x-auto px-6 md:px-10 pb-12 no-scrollbar">
          <div className="flex gap-8 min-w-max h-full">
            {days.map((day, idx) => (
              <div key={day.name} className="w-[320px] flex flex-col gap-6">
                <div className="relative py-6 px-1 mb-2">
                  <span className="absolute top-0 right-0 text-[100px] font-black text-zinc-200/20 pointer-events-none select-none leading-none">{day.date}</span>
                  <h3 className="relative text-2xl font-black text-zinc-900 tracking-tight">{day.name}</h3>
                  <p className="relative text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">{day.plan}</p>
                </div>

                <div className="flex flex-col gap-5">
                  <button className="group h-20 rounded-3xl border-2 border-dashed border-zinc-100 bg-zinc-50/30 flex items-center gap-4 px-6 hover:bg-emerald-50/50 hover:border-emerald-600/20 transition-all cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400 group-hover:text-emerald-700">Add Breakfast</span>
                  </button>

                  {idx < 2 && userRecipes[idx] ? (
                    <div className="group bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="h-44 relative">
                        {userRecipes[idx].image_url && (
                          <Image src={userRecipes[idx].image_url} alt={userRecipes[idx].title} fill className="object-cover" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 left-4 flex gap-2 z-10">
                           <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[10px] font-black text-emerald-600 shadow-sm uppercase">Lunch</span>
                        </div>
                        <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-amber-500 shadow-sm z-10">
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <div className="p-6">
                        <h4 className="text-md font-bold text-zinc-900 mb-3 group-hover:text-emerald-700 transition-colors leading-snug truncate">{userRecipes[idx].title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-[11px] font-bold text-zinc-400">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-600" /> {userRecipes[idx].prep_time}m</span>
                            <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-amber-500" /> 450kcal</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 hover:bg-zinc-100 transition-colors cursor-pointer">
                            <MoreHorizontal className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button className="group h-20 rounded-3xl border-2 border-dashed border-zinc-100 bg-zinc-50/30 flex items-center gap-4 px-6 hover:bg-emerald-50/50 hover:border-emerald-600/20 transition-all cursor-pointer">
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-zinc-400 group-hover:text-emerald-700">Plan Next Meal</span>
                    </button>
                  )}

                  <button className="group h-20 rounded-3xl border-2 border-dashed border-zinc-100 bg-zinc-50/30 flex items-center gap-4 px-6 hover:bg-emerald-50/50 hover:border-emerald-600/20 transition-all cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400 group-hover:text-emerald-700">Add Dinner</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Suggestions Sidebar */}
      <aside className="hidden xl:flex w-80 bg-white border-l border-zinc-200 shrink-0 flex flex-col p-8 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-lg font-black text-zinc-900 tracking-tight uppercase">Suggestions</h2>
          <button onClick={() => router.push('/recettes')} className="text-emerald-600 text-[10px] font-black uppercase tracking-widest hover:underline transition-all">Tout Voir</button>
        </div>

        <div className="flex-1 space-y-4">
          {userFavorites.length > 0 ? userFavorites.slice(0, 5).map((recipe) => (
            <div key={recipe.id} className="group flex items-center gap-4 p-3 rounded-3xl border border-zinc-50 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all cursor-pointer" onClick={() => router.push(generateRecipeLink(recipe))}>
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-xs">
                {recipe.image_url ? (
                  <Image src={recipe.image_url} alt={recipe.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-100 flex items-center justify-center">🥗</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-[13px] font-bold text-zinc-900 group-hover:text-emerald-700 truncate leading-tight mb-1">{recipe.title}</h5>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">{recipe.prep_time}m • 310 kcal</p>
                <div className="flex gap-1 mt-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="w-1 h-1 rounded-full bg-zinc-200" />
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shrink-0">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )) : (
             <div className="text-center py-10 bg-zinc-50 rounded-[32px] border border-dashed border-zinc-200">
               <p className="text-xs text-zinc-400 italic font-medium">Ajoutez des favoris pour voir des suggestions !</p>
             </div>
          )}
        </div>

        <div className="mt-10 bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 rounded-[40px] text-white relative overflow-hidden shadow-xl shadow-emerald-900/10 shrink-0">
          <div className="relative z-10">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 opacity-80">Pro Feature</p>
            <h3 className="text-xl font-black mb-4 leading-tight">Unlock AI Meal Planner</h3>
            <p className="text-xs text-white/70 font-medium leading-relaxed mb-6 text-balance">Laissez notre IA concevoir votre mois complet basé sur vos données santé.</p>
            <button className="w-full py-4 bg-white text-emerald-800 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/5 hover:bg-emerald-50 transition-all font-bold">Upgrade Now</button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-50" />
        </div>
      </aside>
    </div>
  );
}
