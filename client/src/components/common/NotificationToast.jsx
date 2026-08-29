import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Info, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

export default function NotificationToast() {
  const { toasts, removeToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-md w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClasses = "border-teal-500/40 bg-slate-900/95 text-slate-100 shadow-glow-teal";
        let iconClasses = "text-teal-400";

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderClasses = "border-emerald-500/40 bg-slate-900/95 text-slate-100 shadow-glow-emerald";
          iconClasses = "text-emerald-400";
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          borderClasses = "border-amber-500/40 bg-slate-900/95 text-slate-100";
          iconClasses = "text-amber-400";
        } else if (toast.type === 'ai') {
          Icon = Sparkles;
          borderClasses = "border-cyan-500/50 bg-slate-900/95 text-slate-100 shadow-glow-cyan";
          iconClasses = "text-cyan-400";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5 ${borderClasses}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconClasses}`} />
            <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded-lg"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
