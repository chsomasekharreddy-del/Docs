import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, HeartPulse, Sparkles, Stethoscope } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function AuthLayout({ children, title, subtitle }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-[#080d1a] transition-colors">
      {/* Left Column: Clinical Hero & Testimonial Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 dark:bg-[#060a14] border-r border-slate-800 p-12 flex-col justify-between overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-glow-teal">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">
              Doc<span className="text-teal-400">.ai</span>
            </span>
          </Link>
        </div>

        {/* Center Preview / Features */}
        <div className="relative z-10 space-y-6 max-w-md my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Medical Command Center</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Synthesized Clinical Intelligence at your Fingertips.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Gain immediate clarity on symptoms with structured Medical Insight Cards, longitudinal health telemetry, and actionable triage recommendations.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="p-1 rounded-lg bg-teal-500/20 text-teal-400">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span>Evidence-based clinical symptom correlation</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span>Transparent 3-stage AI reasoning sequence</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Patient privacy & clear non-diagnostic boundaries</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="relative z-10 pt-8 border-t border-slate-800 text-[11px] text-slate-400">
          Doc.ai is an informational AI simulation tool and does not provide formal medical diagnosis or clinical treatment.
        </div>
      </div>

      {/* Right Column: Auth Form Box */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Top bar with back to home and theme toggle */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <span>← Back to Home</span>
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </div>

        {/* Center Form Container */}
        <div className="max-w-md w-full mx-auto my-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          </div>

          {children}
        </div>

        {/* Bottom helper */}
        <div className="mt-8 text-center text-xs text-slate-400">
          Frontend Prototype • No real credentials stored
        </div>
      </div>
    </div>
  );
}
