import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Lock, Award, Stethoscope } from 'lucide-react';

const testimonials = [
  {
    name: "Dr. Marcus Vance, MD",
    role: "Internal Medicine Specialist",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
    content: "The Medical Insight Card structure represents how clinical triage should be presented to patients. It frames symptoms clearly and helps patients come to appointments with organized context.",
    badge: "Verified Clinician"
  },
  {
    name: "Dr. Sarah Lin, PhD",
    role: "Clinical Bioinformatician",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150",
    content: "Having real-time transparent reasoning states and clear safety disclaimers elevates Doc.ai far above standard LLM conversational wrappers.",
    badge: "Health Tech Researcher"
  },
  {
    name: "David Chen",
    role: "Software Architect & Patient",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    content: "I use Doc.ai whenever I get persistent tension headaches or exercise soreness. The structured next steps and longitudinal factor tracking give me actionable clarity.",
    badge: "Pro Member"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="trust" className="py-20 md:py-32 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070b16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Clinical Rigor & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted By Clinicians & Users
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Designed with physician-approved structure, transparent confidence indicators, and strict informational disclaimers.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-7 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-teal-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    {item.role}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Protocol Trust Badges */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2 p-4">
            <Lock className="w-6 h-6 text-teal-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Client-Side Privacy</span>
            <span className="text-[11px] text-slate-500">Zero unencrypted data transmission</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Safety Protocols</span>
            <span className="text-[11px] text-slate-500">Emergency red-flag symptom warnings</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <Award className="w-6 h-6 text-cyan-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Evidence-Based</span>
            <span className="text-[11px] text-slate-500">Peer-reviewed literature references</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <Stethoscope className="w-6 h-6 text-indigo-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Doctor-Ready</span>
            <span className="text-[11px] text-slate-500">Structured for concise clinical intake</span>
          </div>
        </div>
      </div>
    </section>
  );
}
