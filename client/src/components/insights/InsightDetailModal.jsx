import React from 'react';
import { X, Stethoscope, AlertCircle, Bookmark, Copy, Printer, Share2, ShieldAlert } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export default function InsightDetailModal({ insight, isOpen, onClose }) {
  const { showToast } = useNotification();

  if (!isOpen || !insight) return null;

  const handlePrint = () => {
    showToast("Print view prepared (Simulated)", "info");
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${insight.title}\n${insight.summary}\nNext step: ${insight.nextStep}`);
    showToast("Insight copied to clipboard!", "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                {insight.category || "Clinical Insight"}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                {insight.title}
              </h3>
              <span className="text-xs text-slate-400">
                Recorded on {insight.date}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <span>Informational clinical synthesis. Not a medical diagnosis. Share with a qualified physician for evaluation.</span>
        </div>

        {/* Summary Content */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Clinical Summary
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            {insight.summary}
          </p>
        </div>

        {/* Causes & Symptoms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {insight.causes && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Correlated Factors
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                {insight.causes.map((c, i) => (
                  <li key={i}>{typeof c === 'string' ? c : c.title}</li>
                ))}
              </ul>
            </div>
          )}

          {insight.symptoms && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Key Symptoms
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                {insight.symptoms.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Recommended Next Step */}
        <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
            <ShieldAlert className="w-4 h-4" />
            <span>Recommended Next Step</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            {insight.nextStep}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Brief</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold shadow-sm transition-colors"
          >
            Close Insight
          </button>
        </div>
      </div>
    </div>
  );
}
