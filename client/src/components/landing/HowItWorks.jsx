import React from 'react';
import { MessageSquareText, Cpu, LayoutGrid, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: "01",
    icon: MessageSquareText,
    title: "Input Your Health Query",
    description: "Enter your symptoms, onset timeline, and context naturally. Whether it's a headache, muscle ache, or fatigue pattern.",
    highlight: "Natural symptom description"
  },
  {
    step: "02",
    icon: Cpu,
    title: "3-Stage Medical Synthesis",
    description: "Doc.ai parses clinical correlations, reviews evidence-based literature, and filters out non-relevant noise in 1.5 seconds.",
    highlight: "Real-time AI thinking steps"
  },
  {
    step: "03",
    icon: LayoutGrid,
    title: "Review Structured Insight Cards",
    description: "Explore possible causes with relevance ratings, key symptoms, lifestyle facts, and actionable next steps ready for your doctor.",
    highlight: "Actionable next steps"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070b16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Intuitive Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How The Command Center Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            From initial symptom input to structured clinical preparation in three clear steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl p-8 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-teal-500/40 dark:text-teal-400/40">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-sm font-semibold transition-all"
          >
            <span>Try an interactive consultation in the Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
