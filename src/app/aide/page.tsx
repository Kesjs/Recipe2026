"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Playfair_Display } from "next/font/google";
import { Plus, ArrowRight, Mail, Instagram, Twitter } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"] });

const faqs = [
  {
    question: "Comment créer une recette ?",
    answer: "Pour créer une recette, connectez-vous à votre compte et cliquez sur le bouton \"+\" dans la barre de navigation, puis sélectionnez \"Créer une recette\". Vous pourrez alors renseigner le titre, les instructions et les ingrédients locaux nécessaires."
  },
  {
    question: "Comment ajouter une recette aux favoris ?",
    answer: "Sur chaque fiche recette, vous trouverez un bouton coeur (♥) pour ajouter la recette à vos favoris. Vous pouvez retrouver toutes vos recettes favorites dans votre dashboard personnel."
  },
  {
    question: "Comment modifier mon profil ?",
    answer: "Accédez à votre dashboard en cliquant sur votre profil dans le menu utilisateur de la barre de navigation. Vous pourrez y modifier vos informations personnelles, votre photo de profil et vos préférences alimentaires."
  },
  {
    question: "Besoin de plus d'aide ?",
    answer: "Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter directement. Notre équipe de nutritionnistes et passionnés de cuisine est à votre disposition."
  }
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border-b-[4px] border-zinc-950 py-14 lg:py-20 group animate-in fade-in slide-in-from-bottom-12 duration-1000"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group/btn"
      >
        <h3 className={`${playfair.className} text-2xl md:text-3xl lg:text-4xl text-zinc-950 group-hover:text-emerald-950 transition-all duration-700 leading-[1.2] tracking-tighter italic`}>
          {question}
        </h3>
        <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border-[3px] border-zinc-100 flex items-center justify-center shrink-0 ml-10 transition-all duration-700 ${isOpen ? 'bg-zinc-950 border-zinc-950 text-white rotate-[135deg]' : 'bg-white text-zinc-300 group-hover:border-emerald-600 group-hover:text-emerald-600 group-hover:scale-110'}`}>
          <Plus className="w-8 h-8 lg:w-10 lg:h-10" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-[600px] mt-12 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-zinc-500 text-2xl lg:text-3xl font-medium leading-relaxed max-w-4xl tracking-tight">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function AidePage() {
  return (
    <div className={`min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] paper-texture z-0" />
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24 relative z-10">
        
        <header className="mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-zinc-200 pb-16">
            <div className="max-w-5xl">
              <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl text-zinc-950 mb-12 leading-[1.1] tracking-tighter`}>
                Soutien <br /> <span className="italic font-normal text-emerald-900 underline decoration-emerald-500/10 decoration-[16px] underline-offset-[24px]">& Philosophie.</span>
              </h1>
              <p className="text-zinc-500 text-2xl lg:text-3xl font-medium leading-relaxed max-w-3xl">
                Nous sommes ici pour accompagner chaque étape de votre voyage culinaire. Explorez nos ressources ou contactez-nous.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-40 pb-40">
          
          {/* Editorial Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-40">
              <div className="w-24 h-[6px] bg-emerald-600 mb-12" />
              <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl text-zinc-950 italic leading-[1.1] mb-14 tracking-tighter`}>
                Questions <br /> Fréquentes.
              </h2>
              <p className="text-zinc-400 text-2xl font-medium leading-relaxed mb-16 max-w-[280px]">
                L&apos;essentiel pour naviguer dans l&apos;écosystème Naya avec aisance.
              </p>
              
              <div className="bg-white rounded-[4rem] p-8 lg:p-12 shadow-[0_64px_96px_-24px_rgba(0,0,0,0.1)] border border-zinc-100/50 ring-1 ring-zinc-50">
                <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center mb-10">
                  <Mail className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-zinc-950 font-black uppercase tracking-[0.4em] text-[11px] mb-6">Conciergerie Naya</h4>
                <p className="text-zinc-500 text-lg font-medium mb-10 leading-relaxed">Une interrogation spécifique ? Notre équipe de passionnés vous répond sous un cycle solaire.</p>
                <a 
                  href="mailto:support@cookingrecipe.com" 
                  className="flex items-center justify-between w-full p-6 bg-zinc-950 text-white rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-emerald-600 transition-all active:scale-[0.98]"
                >
                  <span>Nous contacter</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Staggered FAQ Content */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <FAQItem key={index} index={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
            
            {/* Editorial Call to Action */}
            <div className="mt-40 p-12 lg:p-20 bg-zinc-950 rounded-[6rem] text-center text-white relative overflow-hidden group shadow-[0_80px_120px_-32px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.2),transparent)] opacity-60 group-hover:opacity-100 transition-opacity duration-[2000ms]" />
              
              <div className="relative z-10">
                <h2 className={`${playfair.className} text-3xl md:text-4xl lg:text-5xl italic text-white mb-10 leading-[1.1] tracking-tighter`}>
                  Rédigez votre <br /> propre <span className="text-emerald-400">Histoire.</span>
                </h2>
                <p className="text-zinc-400 text-2xl lg:text-3xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
                  L&apos;art de la cuisine commence par une intention. Rejoignez-nous et créez vos premières recettes.
                </p>
                <Link 
                  href="/auth" 
                  className="inline-flex items-center space-x-8 px-16 py-8 bg-white text-zinc-950 font-black rounded-full uppercase tracking-[0.4em] text-xs hover:bg-emerald-500 hover:text-white transition-all shadow-[0_24px_48px_rgba(255,255,255,0.2)] active:scale-95 group/btn"
                >
                  <span>Devenir Membre</span>
                  <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-4 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-zinc-950 text-zinc-500 py-32 px-12 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-24">
          <div className="flex flex-col gap-6">
            <div className={`${playfair.className} text-5xl text-white italic`}>Naya Cooking</div>
            <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.5em] text-zinc-600">
              <Link href="/" className="hover:text-emerald-500 transition-colors">Explorer</Link>
              <Link href="/nutrition" className="hover:text-emerald-500 transition-colors">Nutrition</Link>
              <Link href="/actualites" className="hover:text-emerald-500 transition-colors">Chroniques</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-12">
            <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
