import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  LogOut, 
  Loader2, 
  Moon, 
  Sun,
  HeartPulse,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';

export default function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { confirmSignOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    // Short frontend simulation delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    confirmSignOut();
    showToast("You have been signed out safely. See you soon!", "info");
    navigate('/');
  };

  const handleStaySignedIn = () => {
    navigate('/chat');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#f8fafc] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 overflow-hidden px-4 py-6 sm:py-10 transition-colors duration-500 font-sans selection:bg-cyan-500/20 selection:text-cyan-400">
      
      {/* 1. Abstract AI-Healthcare Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Soft Radial Ambient Mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-violet-500/10 dark:from-cyan-500/15 dark:via-blue-500/15 dark:to-violet-500/15 rounded-full blur-3xl opacity-80" />
        
        {/* Floating Translucent Orbs */}
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 dark:from-cyan-400/15 dark:to-blue-600/15 rounded-full blur-2xl animate-float-slow-1" />
        <div className="absolute top-2/3 -right-20 w-96 h-96 bg-gradient-to-bl from-violet-500/20 to-indigo-500/20 dark:from-violet-500/15 dark:to-indigo-600/15 rounded-full blur-3xl animate-float-slow-2" />
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-gradient-to-tr from-teal-400/15 to-cyan-500/15 dark:from-teal-400/10 dark:to-cyan-600/10 rounded-full blur-2xl animate-float-slow-3" />

        {/* Ambient Glowing Particles */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-cyan-400/40 dark:bg-cyan-300/60 blur-[1px] animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-2.5 h-2.5 rounded-full bg-violet-400/40 dark:bg-violet-300/60 blur-[1px] animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-1/3 right-1/6 w-1.5 h-1.5 rounded-full bg-blue-400/40 dark:bg-blue-300/60 blur-[1px] animate-pulse" style={{ animationDelay: '2.4s' }} />

        {/* Subtle Medical Pulse / Wave Line */}
        <div className="absolute bottom-16 sm:bottom-24 left-0 right-0 h-28 flex items-center justify-center opacity-30 dark:opacity-40">
          <svg
            className="w-full max-w-5xl h-20 text-cyan-500/40 dark:text-cyan-400/30"
            viewBox="0 0 1000 100"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 L320,50 L340,48 L355,52 L370,50 L390,15 L405,88 L420,35 L435,60 L450,50 L470,50 L485,50 L1000,50"
              stroke="url(#pulse-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg"
            />
            <defs>
              <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Top Header / Subtle Controls */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
            Doc<span className="text-cyan-500 dark:text-cyan-400">.ai</span>
          </span>
        </Link>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors backdrop-blur-md"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </header>

      {/* 2. Main Glassmorphism Confirmation Card */}
      <main className="relative z-10 w-full max-w-lg mx-auto my-auto py-4">
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-2xl border border-white/60 dark:border-slate-800/80 shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)] dark:shadow-[0_20px_60px_rgba(0,_0,_0,_0.5)] p-6 sm:p-10 text-center space-y-6 sm:space-y-8 animate-in zoom-in-95 fade-in duration-300">
          
          {/* Top Brand Logo with Animated AI Pulse */}
          <div className="relative flex items-center justify-center pt-2">
            {/* Pulsing Ripple Rings */}
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-violet-500/20 animate-ai-ripple pointer-events-none" />
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-violet-500/20 animate-ai-ripple-delayed pointer-events-none" />

            {/* Glowing Logo Circle */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white dark:bg-[#090e1c] flex items-center justify-center text-cyan-500 dark:text-cyan-400 transition-colors">
                <div className="relative">
                  <Activity className="w-7 h-7 sm:w-8 sm:h-8" />
                  <Sparkles className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400 absolute -top-1.5 -right-1.5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Doc.ai Health Command Center</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              See you soon <span className="inline-block animate-bounce">👋</span>
            </h1>

            <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
              Are you sure you want to sign out of Doc.ai?
            </p>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              Your conversations, bookmarked insight cards, and personalized health telemetry will be waiting safely when you return.
            </p>
          </div>

          {/* Reassurance Badge */}
          <div className="py-2.5 px-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Local consultation history & preferences preserved</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-3 pt-2">
            {/* Primary Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="w-full sm:flex-1 relative group overflow-hidden inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 disabled:opacity-80 active:scale-[0.98]"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Signing you out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </>
              )}
            </button>

            {/* Secondary Stay Signed In Button */}
            <button
              onClick={handleStaySignedIn}
              disabled={isLoggingOut}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
            >
              <span>Stay Signed In</span>
            </button>
          </div>
        </div>
      </main>

      {/* 3. Subtle Futuristic Footer */}
      <footer className="relative z-10 w-full max-w-xl mx-auto text-center space-y-2 pt-4">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="font-bold">Doc.ai</span>
          <span>•</span>
          <span className="text-slate-500 dark:text-slate-400 font-normal">
            AI-powered health information, designed to help you understand better.
          </span>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed px-4">
          Doc.ai provides informational assistance and is not a substitute for professional medical advice.
        </p>
      </footer>
    </div>
  );
}
