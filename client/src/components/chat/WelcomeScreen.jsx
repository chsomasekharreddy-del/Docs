import React from 'react';
import { Sparkles, AlertCircle, Stethoscope, ShieldCheck, HeartPulse } from 'lucide-react';
import { suggestionPrompts } from '../../data/mockData';
import SuggestionCard from './SuggestionCard';
import { useAuth } from '../../context/AuthContext';

export default function WelcomeScreen({ onSelectPrompt }) {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Header Welcome */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-teal-500" />
          <span>Doc.ai Medical AI Assistant</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Hello {firstName}, how are you feeling today?
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          Describe any symptoms or health questions to receive structured Medical Insight Cards, longitudinal context, and actionable clinical next steps.
        </p>
      </div>

      {/* Prominent Medical Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-800 dark:text-amber-300">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold">Informational Simulation Notice: </strong>
          Doc.ai is an artificial intelligence clinical support prototype. All responses are simulated for education and physician appointment preparation. Not a medical diagnosis. If you have an emergency, please call your local emergency number immediately.
        </div>
      </div>

      {/* Suggestion Prompts Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <span>Common Consultation Topics</span>
          <span>Click to Triage</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestionPrompts.map((item) => (
            <SuggestionCard
              key={item.id}
              item={item}
              onSelect={onSelectPrompt}
            />
          ))}
        </div>
      </div>

      {/* Features summary pills */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Stethoscope className="w-4 h-4 text-teal-500" />
          <span>Structured Medical Insight Cards</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HeartPulse className="w-4 h-4 text-rose-500" />
          <span>Longitudinal Health Telemetry</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Client-Side Mock Intelligence</span>
        </div>
      </div>
    </div>
  );
}
