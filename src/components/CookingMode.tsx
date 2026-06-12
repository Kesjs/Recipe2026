"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, CheckCircle2, UtensilsCrossed } from "lucide-react";

interface CookingModeProps {
  title: string;
  steps: string[];
  onClose: () => void;
}

export default function CookingMode({ title, steps, onClose }: CookingModeProps) {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const isFirst = current === 0;
  const isLast = current === steps.length - 1;
  const isDone = completed.size === steps.length;

  const prev = useCallback(() => {
    if (!isFirst) setCurrent((c) => c - 1);
  }, [isFirst]);

  const next = useCallback(() => {
    if (!isLast) {
      setCompleted((prev) => new Set(prev).add(current));
      setCurrent((c) => c + 1);
    } else {
      setCompleted((prev) => new Set(prev).add(current));
    }
  }, [isLast, current]);

  // Navigation clavier
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, onClose]);

  // Bloquer le scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mode cuisine"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <UtensilsCrossed className="w-5 h-5 text-emerald-400" aria-hidden="true" />
          <span className="text-white font-bold text-sm tracking-wide truncate max-w-[200px] sm:max-w-xs">
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Quitter le mode cuisine"
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/10 shrink-0">
        <div
          className="h-full bg-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${((current + 1) / steps.length) * 100}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-10 overflow-hidden">

        {/* Écran de fin */}
        {isDone && isLast && completed.has(current) ? (
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-white font-serif text-3xl sm:text-4xl italic">
              Recette terminée !
            </h2>
            <p className="text-zinc-400 text-base max-w-sm mx-auto">
              Vous avez suivi toutes les étapes. Bon appétit !
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all active:scale-95"
            >
              Fermer
            </button>
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            {/* Numéro d'étape */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-emerald-400 font-black text-sm uppercase tracking-[0.2em]">
                Étape {current + 1}
              </span>
              <span className="text-zinc-600 text-sm">/ {steps.length}</span>

              {/* Indicateurs dots */}
              <div className="flex items-center gap-1.5 ml-auto">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Aller à l'étape ${i + 1}`}
                    className={`rounded-full transition-all ${
                      i === current
                        ? "w-6 h-2 bg-emerald-500"
                        : completed.has(i)
                        ? "w-2 h-2 bg-emerald-500/40"
                        : "w-2 h-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Texte de l'étape */}
            <p
              key={current}
              className="text-white text-2xl sm:text-3xl md:text-4xl leading-relaxed font-light animate-in fade-in slide-in-from-right-4 duration-300"
            >
              {/* Retire le "1. " ou "2. " en début d'étape si présent */}
              {steps[current].replace(/^\d+\.\s*/, "")}
            </p>
          </div>
        )}
      </div>

      {/* Boutons navigation — bas de page */}
      {!(isDone && isLast && completed.has(current)) && (
        <div className="shrink-0 px-6 pb-8 pt-4 border-t border-white/10">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">

            <button
              onClick={prev}
              disabled={isFirst}
              aria-label="Étape précédente"
              className="flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed min-w-[130px] justify-center"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              Précédent
            </button>

            <span className="text-zinc-500 text-sm font-medium hidden sm:block">
              ← → pour naviguer
            </span>

            <button
              onClick={next}
              aria-label={isLast ? "Terminer la recette" : "Étape suivante"}
              className="flex items-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all active:scale-95 min-w-[130px] justify-center shadow-lg shadow-emerald-900/30"
            >
              {isLast ? "Terminer" : "Suivant"}
              {!isLast && <ChevronRight className="w-5 h-5" aria-hidden="true" />}
              {isLast && <CheckCircle2 className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
