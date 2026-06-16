"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Flame } from "lucide-react";
import { Ingredient } from "@/lib/types";

interface IngredientSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: Ingredient[];
  placeholder?: string;
}

export default function IngredientSelector({
  value,
  onChange,
  options,
  placeholder = "Sélectionner un aliment",
}: IngredientSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filtrer les options en fonction du terme de recherche
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fermer le dropdown si clic en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gestion des touches clavier
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex].name);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions]);

  // Scroll vers l'élément surligner
  useEffect(() => {
    if (listRef.current && isOpen) {
      const highlighted = listRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      );
      if (highlighted) {
        highlighted.scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (ingredientName: string) => {
    onChange(ingredientName);
    setSearchTerm("");
    setIsOpen(false);
    setHighlightedIndex(0);
  };

  const selectedOption = options.find((opt) => opt.name === value);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input / Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) inputRef.current?.focus();
        }}
        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:border-transparent text-slate-900 text-sm flex items-center justify-between hover:border-slate-400 transition-colors"
      >
        <span className="flex items-center gap-2 flex-1 text-left">
          {selectedOption ? (
            <>
              <span className="font-medium text-slate-900">{selectedOption.name}</span>
              <span className="flex items-center gap-1 ml-auto text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                <Flame className="w-3 h-3 text-orange-400" />
                {selectedOption.calories_per_100g} kcal
              </span>
            </>
          ) : (
            <span className="text-slate-400">← {placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Search input */}
          <div className="sticky top-0 bg-white border-b border-slate-200 p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder="Chercher un aliment..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Options list */}
          <div
            ref={listRef}
            className="max-h-64 overflow-y-auto"
            role="listbox"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={option.name}
                  type="button"
                  data-index={index}
                  onClick={() => handleSelect(option.name)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  role="option"
                  aria-selected={value === option.name}
                  className={`w-full px-4 py-3 text-left text-sm flex items-center justify-between transition-colors ${
                    highlightedIndex === index
                      ? "bg-emerald-100 text-emerald-900"
                      : value === option.name
                      ? "bg-emerald-50 text-emerald-700"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex-1">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      P: {option.proteins}g • C: {option.carbs}g • L:{" "}
                      {option.lipids}g
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2 text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded">
                    <Flame className="w-3 h-3" />
                    {option.calories_per_100g}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-slate-500 text-sm">
                <p className="font-medium">Aucun aliment trouvé</p>
                <p className="text-xs mt-1">Essayez une autre recherche</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
