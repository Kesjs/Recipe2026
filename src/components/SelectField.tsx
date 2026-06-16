"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import type React from "react";

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export default function SelectField({
  value,
  onChange,
  options,
  placeholder = "Sélectionner",
  label,
  required = false,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-900 text-sm flex items-center justify-between hover:border-slate-400 transition-colors"
      >
        <span className="flex items-center gap-2">
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <span className={selectedOption.color}>{selectedOption.icon}</span>
              )}
              <span className="font-medium">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-slate-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm flex items-center justify-between transition-colors ${
                  value === option.value
                    ? "bg-emerald-100 text-emerald-900"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span className="flex items-center gap-3">
                  {option.icon && (
                    <span className={option.color}>{option.icon}</span>
                  )}
                  <span className="font-medium">{option.label}</span>
                </span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
