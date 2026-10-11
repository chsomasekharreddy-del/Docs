import React from 'react';
export default function SuggestionCard({ item, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item.query)}
      className="text-left px-3.5 py-3 rounded-lg border border-slate-200 bg-white hover:border-teal-500 hover:bg-teal-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-teal-950/20 transition-colors"
    >
      <span className="block text-sm font-medium text-slate-900 dark:text-white">{item.title}</span>
      <span className="block mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.subtitle}</span>
    </button>
  );
}
