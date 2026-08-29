import React from 'react';
import { Stethoscope, Calendar, Trash2, ExternalLink, Bookmark, Tag, ArrowRight } from 'lucide-react';

export default function InsightCard({ insight, onView, onDelete }) {
  return (
    <div className="group rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 hover:-translate-y-0.5">
      <div className="space-y-3">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {insight.category || "General Health"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{insight.date}</span>
          </div>
        </div>

        {/* Topic Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors line-clamp-1">
          {insight.title || insight.topic}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {insight.summary}
        </p>

        {/* Tags */}
        {insight.tags && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {insight.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-lg bg-teal-500/5 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border border-teal-500/15 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onDelete(insight.id)}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors text-xs font-semibold flex items-center gap-1.5"
          title="Delete insight"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Delete</span>
        </button>

        <button
          onClick={() => onView(insight)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold shadow-sm transition-all"
        >
          <span>View Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
