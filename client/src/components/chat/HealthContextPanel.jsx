import React from 'react';
import { 
  Activity, 
  X, 
  Heart, 
  Zap, 
  Tag, 
  Key, 
  AlertCircle, 
  FileHeart, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';

export default function HealthContextPanel({ isOpen, onClose }) {
  const { activeConversation } = useChat();
  const { user } = useAuth();

  if (!isOpen) return null;

  const symptoms = activeConversation?.symptoms || ["General Health Inquiry", "Symptom Review"];
  const keywords = activeConversation?.keywords || ["Triage", "Wellness", "Clinical Consultation"];
  const factorScores = activeConversation?.metrics?.factorScores || [
    { name: "Visual Strain Factor", value: 85, color: "#06b6d4" },
    { name: "Hydration Adequacy", value: 48, color: "#f59e0b" },
    { name: "Cervical Tension", value: 72, color: "#14b8a6" },
    { name: "Stress Correlation", value: 58, color: "#8b5cf6" },
  ];

  return (
    <aside 
      className="w-full lg:w-80 shrink-0 h-full border-l border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#090e1c]/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto transition-all duration-300 z-30"
      aria-label="Health Context Telemetry"
    >
      <div className="p-4 sm:p-5 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Health Telemetry
              </h3>
              <span className="text-[10px] text-slate-500">Live Context Matrix</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Collapse context panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Conversation Meta */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-500 dark:text-slate-400">Current Session</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
              Active Triage
            </span>
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
            {activeConversation?.title || "New Consultation Session"}
          </h4>
          <span className="text-[10px] text-slate-400 block font-mono">
            Updated {activeConversation?.timestamp || "Just now"}
          </span>
        </div>

        {/* AI Analysis Visualization */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-teal-500" />
              <span>AI Factor Analysis</span>
            </span>
            <span className="text-[10px] text-teal-500 font-mono">Simulated</span>
          </div>

          <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            {factorScores.map((factor, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {factor.name}
                  </span>
                  <span className="font-mono font-bold" style={{ color: factor.color }}>
                    {factor.value}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${factor.value}%`, backgroundColor: factor.color }}
                  />
                </div>
              </div>
            ))}

            {/* Crucial Required Label */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[10px] text-slate-400 dark:text-slate-500 italic text-center leading-relaxed">
              UI visualization only — not a medical confidence score.
            </div>
          </div>
        </div>

        {/* Symptoms Discussed Tag Cloud */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-cyan-500" />
            <span>Symptoms Discussed</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {symptoms.map((sym, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-medium"
              >
                {sym}
              </span>
            ))}
          </div>
        </div>

        {/* Important Keywords */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-indigo-500" />
            <span>Important Keywords</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Patient Vitals Quick Snapshot */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <FileHeart className="w-3.5 h-3.5 text-rose-500" />
            <span>Patient Telemetry Record</span>
          </span>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Blood Group:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{user?.vitals?.bloodGroup || 'O+'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Resting BP:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{user?.vitals?.bloodPressure || '118/76 mmHg'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Heart Rate:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{user?.vitals?.restingHeartRate || '68 bpm'}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800/80">
              <span className="text-[10px] text-slate-400 block mb-1">Known Allergies:</span>
              <div className="flex flex-wrap gap-1">
                {user?.vitals?.allergies?.map((all, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    {all}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Bottom Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] text-slate-400 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
        <span>Telemetry synchronization active</span>
      </div>
    </aside>
  );
}
