import React from 'react';
import { AlertCircle } from 'lucide-react';
import { suggestionPrompts } from '../../data/mockData';
import SuggestionCard from './SuggestionCard';
import { useAuth } from '../../context/AuthContext';

export default function WelcomeScreen({ onSelectPrompt }) {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  return (
    <div className="max-w-2xl mx-auto py-10 sm:py-16 px-4 space-y-7">
      {/* Header Welcome */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
          How can I help, {firstName}?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Describe what you are feeling or ask a health question.
        </p>
      </div>

      {/* Prominent Medical Disclaimer Banner */}
      <div className="flex gap-2 text-xs text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 px-3 py-2.5 rounded-lg">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>For emergencies or severe symptoms, contact local emergency services.</span>
      </div>

      {/* Suggestion Prompts Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <span>Try one of these</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestionPrompts.map((item) => (
            <SuggestionCard
              key={item.id}
              item={item}
              onSelect={onSelectPrompt}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
