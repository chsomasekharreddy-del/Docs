import React from 'react';
import { Layers, Activity, ShieldCheck, HeartPulse, FileText, Cpu, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: "Structured Medical Insight Cards",
    description: "No wall of unformatted text. Responses are neatly organized into Possible Causes, Key Symptoms, Important Information, and Recommended Next Steps.",
    color: "from-teal-500 to-cyan-500",
    badge: "Signature Design"
  },
  {
    icon: Activity,
    title: "Longitudinal Health Telemetry",
    description: "Dynamic visualizers track factors, correlation metrics, and lifestyle triggers across conversations to identify recurring health patterns.",
    color: "from-cyan-500 to-blue-500",
    badge: "Live Telemetry"
  },
  {
    icon: ShieldCheck,
    title: "Clinical Safety & Guardrails",
    description: "Built-in safety protocols clearly distinguish informative triages from clinical diagnoses with strict emergency red-flag triggers.",
    color: "from-emerald-500 to-teal-500",
    badge: "Safety First"
  },
  {
    icon: FileText,
    title: "Saved Health Insights Repository",
    description: "Bookmark crucial consultations, filter by medical specialty, and access structured summaries whenever you need to revisit them.",
    color: "from-indigo-500 to-violet-500",
    badge: "One-Click Save"
  },
  {
    icon: Cpu,
    title: "3-Stage Transparent Reasoning",
    description: "Observe the AI actively analyzing symptoms, querying medical databases, and synthesizing structured outputs in real-time.",
    color: "from-teal-500 to-emerald-500",
    badge: "Real-Time AI"
  },
  {
    icon: HeartPulse,
    title: "Doctor-Ready Summaries",
    description: "Export clean, structured briefing sheets of your symptoms, onset timelines, and discussed factors to share directly with your physician.",
    color: "from-rose-500 to-amber-500",
    badge: "Physician Ready"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#090e1c]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Engineered For Clinical Clarity
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Next-Generation Medical Command Center
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            A comprehensive suite of tools built specifically for patient triage, health literacy, and clinical preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-7 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-2.5 text-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
