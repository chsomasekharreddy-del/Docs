import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Activity, HeartPulse, Stethoscope, ChevronRight, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-grid-pattern bg-radial-gradient">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-medium animate-in fade-in zoom-in-95 duration-500">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping" />
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span>Doc.ai Command Center 2.0 is Live</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-70" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Medical AI Intelligence <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-400 to-cyan-400">
              Without The Guesswork
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Move beyond generic chatbots. Doc.ai provides a specialized{' '}
            <strong className="font-semibold text-slate-800 dark:text-slate-100">Medical AI Command Center</strong>{' '}
            with structured insight cards, longitudinal health telemetry, and actionable clinical triage.
          </p>

          {/* Navigation CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold text-base shadow-glow-teal hover:shadow-teal-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-slate-800 dark:text-slate-100 font-semibold text-base hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              <Activity className="w-5 h-5 text-teal-500" />
              <span>Explore Doc.ai</span>
            </Link>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Safety-First Verification</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-500" />
              <span>Structured Insight Cards</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span>Zero Clinical Guesswork</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Command Center Preview */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 lg:p-8 overflow-hidden">
            {/* Window control dots */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-slate-400 dark:text-slate-500">
                  doc-ai-command-center.v2
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-medium">
                  ✦ Active Triage Session
                </span>
              </div>
            </div>

            {/* Mock Layout Grid inside Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Left Column: Simulated User Query + AI Structured Card */}
              <div className="lg:col-span-8 space-y-4">
                {/* User Bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                    AT
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-xl">
                    "I have a band-like headache across my forehead and stiff neck after 9 hours of coding."
                  </div>
                </div>

                {/* Structured Medical Insight Card Mock */}
                <div className="rounded-2xl border border-teal-500/30 bg-white dark:bg-[#0f172a] shadow-glow-teal p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-500">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Tension Cephalea & Digital Asthenopia
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          AI-generated information • Not a formal diagnosis
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      High Confidence Pattern
                    </span>
                  </div>

                  {/* 2-col mini grid inside card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60">
                      <strong className="block font-semibold text-teal-600 dark:text-teal-400 mb-1">
                        Possible Causes
                      </strong>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside text-[11px]">
                        <li>Ciliary muscle visual strain (68%)</li>
                        <li>Suboccipital neck contraction</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60">
                      <strong className="block font-semibold text-cyan-600 dark:text-cyan-400 mb-1">
                        Recommended Next Step
                      </strong>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        Apply the 20-20-20 rule, drink 500ml water, and dim monitor glare.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Mini Telemetry Panel */}
              <div className="lg:col-span-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Telemetry Stream
                  </span>
                  <Activity className="w-4 h-4 text-teal-500 animate-pulse" />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1 text-slate-600 dark:text-slate-400">
                      <span>Screen Strain Index</span>
                      <span className="font-mono text-cyan-500">88%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1 text-slate-600 dark:text-slate-400">
                      <span>Hydration Adequacy</span>
                      <span className="font-mono text-amber-500">45%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1 text-slate-600 dark:text-slate-400">
                      <span>Postural Alignment</span>
                      <span className="font-mono text-teal-500">72%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 text-center italic">
                  UI visualization only — not a medical confidence score.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
