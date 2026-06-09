"use client";

import { Activity, Zap, Droplets, LucideIcon } from "lucide-react";

interface MacroCardProps {
  label: string;
  value: number;
  target: number;
  color: string;
  icon: LucideIcon;
  unit?: string;
}

export default function MacroCard({ label, value, target, color, icon: Icon, unit = "g" }: MacroCardProps) {
  const percentage = Math.min((value / target) * 100, 100);
  const textColor = color.replace('bg-', 'text-');
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-zinc-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${textColor}`} />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{label}</span>
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-zinc-900">{value}</span>
          <span className="text-sm font-bold text-zinc-400">{unit}</span>
        </div>
        <span className="text-xs text-zinc-400">/ {target}{unit}</span>
      </div>
      
      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
