import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Sparkles, ShieldCheck } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-slate-900 text-white">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 via-cyan-900/30 to-slate-900 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Experience Intelligent Medical AI Today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Ready For A Smarter, More Structured <br />
          Health Conversation?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Access the Doc.ai Medical AI Command Center to simulate clinical symptom triage, save health insights, and track longitudinal wellness factors.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-base shadow-glow-teal hover:shadow-teal-500/50 transition-all duration-200"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/chat"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-base transition-all duration-200"
          >
            <Activity className="w-5 h-5 text-teal-400" />
            <span>Explore Doc.ai</span>
          </Link>
        </div>

        <div className="pt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>No credit card or personal health info required • Instant access prototype</span>
        </div>
      </div>
    </section>
  );
}
