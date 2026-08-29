import React from 'react';
import { Brain, Moon, Activity, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

const iconMap = {
  Brain,
  Moon,
  Activity,
  ShieldAlert,
};

export default function SuggestionCard({ item, onSelect }) {
  const IconComponent = iconMap[item.icon] || Sparkles;

  return (
    <button
      onClick={() => onSelect(item.query)}
      className="group text-left p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {item.tag}
          </span>
        </div>

        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-teal-500 transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {item.subtitle}
        </p>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-teal-600 dark:text-teal-400">
        <span>Simulate triage</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}
