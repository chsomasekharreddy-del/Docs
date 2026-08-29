import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Bookmark, Stethoscope, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';
import { mockMedicalKnowledge } from '../../data/mockData';

export default function LiveDemoSection() {
  const [selectedKey, setSelectedKey] = useState('headache');
  const activeInsight = mockMedicalKnowledge[selectedKey] || mockMedicalKnowledge.headache;

  const demoOptions = [
    { key: 'headache', label: 'Tension Headache', desc: 'Screen fatigue & temple pain' },
    { key: 'sleep', label: 'Sleep Latency', desc: 'Melatonin & circadian disruption' },
    { key: 'fatigue', label: 'Chronic Fatigue', desc: 'Energy dips & metabolic factors' },
    { key: 'cough', label: 'Upper Airway Cough', desc: 'Post-nasal drip & irritation' },
    { key: 'backpain', label: 'Mechanical Back Pain', desc: 'Lumbar posture & ergonomics' },
  ];

  return (
    <section id="demo" className="py-20 md:py-32 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0a0f1d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Interactive Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore Medical Insight Cards
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Select a sample clinical symptom below to preview how Doc.ai structures findings into actionable intelligence.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {demoOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelectedKey(opt.key)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                selectedKey === opt.key
                  ? 'bg-teal-500 text-white border-teal-500 shadow-glow-teal scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Live Card Container */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-teal-500/30 bg-white dark:bg-[#0f172a] shadow-2xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300">
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {activeInsight.topic}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                  AI-generated informational synthesis • Not a diagnosis
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                {activeInsight.nextStep?.urgency || "Routine Review"}
              </span>
            </div>
          </div>

          {/* Section 1: Possible Causes */}
          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>Possible Causes & Clinical Correlations</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeInsight.causes.map((cause, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">{cause.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {cause.desc}
                    </p>
                  </div>
                  <span className="mt-3 text-[10px] font-medium px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 w-fit">
                    {cause.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Key Symptoms & Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Associated Key Symptoms</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {activeInsight.symptoms.map((sym, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4" />
                <span>Clinical Notes & Facts</span>
              </h4>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {activeInsight.info.map((inf, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
                    {inf}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Recommended Next Step */}
          <div className="mt-6 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <strong className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Recommended Action & Next Step</span>
              </strong>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeInsight.nextStep.action}
              </p>
            </div>
            <Link
              to="/chat"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>Open in Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
