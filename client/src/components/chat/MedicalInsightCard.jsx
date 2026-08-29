import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  Share2, 
  ShieldAlert, 
  Activity, 
  Info, 
  ArrowRight,
  Zap,
  ListFilter
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useNotification } from '../../context/NotificationContext';

export default function MedicalInsightCard({ insight, timestamp }) {
  const { savedInsights, saveInsight } = useChat();
  const { showToast } = useNotification();
  const [copied, setCopied] = useState(false);

  if (!insight) return null;

  const isSaved = savedInsights.some(
    i => i.title === insight.topic || i.topic === insight.topic
  );

  const handleCopy = () => {
    const textContent = `
[DOC.AI MEDICAL INSIGHT REPORT]
Topic: ${insight.topic}
Urgency: ${insight.nextStep?.urgency || 'Informational'}

POSSIBLE CAUSES:
${insight.causes?.map(c => `• ${c.title} (${c.badge}): ${c.desc}`).join('\n')}

KEY SYMPTOMS:
${insight.symptoms?.map(s => `• ${s}`).join('\n')}

CLINICAL INFORMATION:
${insight.info?.map(inf => `• ${inf}`).join('\n')}

RECOMMENDED NEXT STEP:
${insight.nextStep?.action}
Specialist: ${insight.nextStep?.consultSpecialist || 'Primary Care'}

DISCLAIMER: AI-generated informational synthesis. Not a medical diagnosis.
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    showToast("Insight report copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    showToast("Shareable doctor report link generated!", "info");
  };

  return (
    <div className="w-full max-w-3xl my-3 rounded-2xl sm:rounded-3xl border border-teal-500/30 bg-white dark:bg-[#0f172a] shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Top Banner: Disclaimer & Badge */}
      <div className="px-4 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Stethoscope className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Medical Insight Card
          </span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-600">•</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            AI-generated information
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
            {insight.nextStep?.urgency || "Routine Review"}
          </span>
          {timestamp && (
            <span className="text-[11px] text-slate-400 font-mono">
              {timestamp}
            </span>
          )}
        </div>
      </div>

      {/* Main Title & Disclaimers */}
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
            {insight.topic}
          </h3>
          <p className="text-xs text-amber-600 dark:text-amber-400/90 font-medium flex items-center gap-1.5 mt-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Informational clinical synthesis only — does not constitute a formal diagnosis or medical advice.</span>
          </p>
        </div>

        {/* Section 1: Possible Causes */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <Zap className="w-4 h-4" />
            <span>1. Possible Causes & Physiological Factors</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {insight.causes?.map((cause, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {cause.title}
                  </h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cause.desc}
                  </p>
                </div>
                <span className="mt-2.5 text-[10px] font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 w-fit">
                  {cause.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 & 3: Key Symptoms and Important Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Symptoms */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <ListFilter className="w-4 h-4" />
              <span>2. Associated Key Symptoms</span>
            </div>
            <ul className="space-y-2 text-xs">
              {insight.symptoms?.map((symptom, idx) => (
                <li 
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Info className="w-4 h-4" />
              <span>3. Important Clinical Information</span>
            </div>
            <div className="space-y-2 text-xs">
              {insight.info?.map((fact, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 leading-relaxed"
                >
                  {fact}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Recommended Next Step */}
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-500/10 dark:bg-teal-950/30 border border-teal-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
              <ShieldAlert className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>4. Recommended Next Step</span>
            </div>
            {insight.nextStep?.consultSpecialist && (
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Recommended Consult: <strong className="text-teal-600 dark:text-teal-400">{insight.nextStep.consultSpecialist}</strong>
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {insight.nextStep?.action}
          </p>
        </div>

        {/* Action Toolbars */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => saveInsight(insight)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isSaved
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Saved in Insights</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save to Insights</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Summary"}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <span className="text-[10px] text-slate-400 italic">
            Doc.ai Knowledge Engine v2.4
          </span>
        </div>
      </div>
    </div>
  );
}
