import React from 'react';
import { Sparkles, Activity, Database, CheckCircle2 } from 'lucide-react';

export default function AIThinkingAnimation({ stage = 1 }) {
  const steps = [
    { id: 1, label: "Analyzing your question...", icon: Activity },
    { id: 2, label: "Retrieving medical knowledge...", icon: Database },
    { id: 3, label: "Preparing your response...", icon: Sparkles },
  ];

  return (
    <div className="flex items-start gap-3 my-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Brand Icon Badge */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-glow-teal shrink-0 animate-pulse">
        <Sparkles className="w-4 h-4" />
      </div>

      {/* Main Thinking Box */}
      <div className="rounded-2xl rounded-tl-sm p-4 bg-white dark:bg-[#0f172a] border border-teal-500/30 shadow-glow-teal max-w-md w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs text-teal-600 dark:text-teal-400">
              Doc.ai ✦
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Medical Knowledge Synthesis
            </span>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-teal-500 to-cyan-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${(stage / 3) * 100}%` }}
          />
        </div>

        {/* Step Items */}
        <div className="space-y-1.5 pt-1">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCurrent = stage === step.id;
            const isCompleted = stage > step.id;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-2.5 text-xs transition-colors duration-200 ${
                  isCurrent
                    ? 'text-teal-600 dark:text-teal-300 font-semibold'
                    : isCompleted
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-400 dark:text-slate-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'animate-spin' : ''}`} />
                )}
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
