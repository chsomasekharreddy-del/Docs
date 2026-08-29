import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Bell, 
  Trash2, 
  Download, 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';
import { useNotification } from '../context/NotificationContext';
import BottomNavigation from '../components/common/BottomNavigation';
import ConfirmationModal from '../components/common/ConfirmationModal';

export default function Settings() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const { settings, updateSetting, conversations } = useChat();
  const { showToast } = useNotification();

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleToggle = (key) => {
    updateSetting(key, !settings[key]);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        exportDate: new Date().toISOString(),
        settings,
        conversationsCount: conversations.length,
        system: "Doc.ai Medical Command Center Prototype",
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `docai_telemetry_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Telemetry data package exported!", "success");
  };

  const handleClearHistory = () => {
    localStorage.removeItem('docai_conversations');
    showToast("Local conversation logs cleared.", "info");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080d1a] transition-colors pb-24 sm:pb-12">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#080d1a]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/chat"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Return to Chat"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <SettingsIcon className="w-4 h-4" />
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Command Center Settings
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            System Preferences
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Control visual appearance, keyboard shortcuts, notification alerts, and data privacy.
          </p>
        </div>

        {/* Section 1: Appearance */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Moon className="w-5 h-5 text-teal-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Visual Appearance
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                theme === 'dark'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-400 shadow-glow-teal'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:border-slate-300'
              }`}
            >
              <Moon className="w-6 h-6" />
              <div className="text-center">
                <span className="text-xs font-bold block text-slate-900 dark:text-white">Dark Mode</span>
                <span className="text-[10px] text-slate-400">Medical Obsidian</span>
              </div>
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                theme === 'light'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-600 shadow-glow-teal'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:border-slate-300'
              }`}
            >
              <Sun className="w-6 h-6" />
              <div className="text-center">
                <span className="text-xs font-bold block text-slate-900 dark:text-white">Light Mode</span>
                <span className="text-[10px] text-slate-400">Clinical Clean</span>
              </div>
            </button>
          </div>
        </div>

        {/* Section 2: Chat Preferences */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
            <MessageSquare className="w-5 h-5 text-cyan-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Chat & Consultation Behavior
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Enter to Send Message
                </h4>
                <p className="text-[11px] text-slate-500">
                  Pressing Enter will send message immediately, Shift+Enter for newlines.
                </p>
              </div>
              <button
                onClick={() => handleToggle('enterToSend')}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  settings.enterToSend !== false ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.enterToSend !== false ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Display Message Timestamps
                </h4>
                <p className="text-[11px] text-slate-500">
                  Show minute-by-minute timeline stamps on consultation cards.
                </p>
              </div>
              <button
                onClick={() => handleToggle('showTimestamps')}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  settings.showTimestamps !== false ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.showTimestamps !== false ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Privacy & Notifications */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Privacy & Notifications
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Local Conversation History
                </h4>
                <p className="text-[11px] text-slate-500">
                  Keep consultation threads stored in browser localStorage.
                </p>
              </div>
              <button
                onClick={() => handleToggle('conversationHistory')}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  settings.conversationHistory !== false ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.conversationHistory !== false ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Triage Toast Notifications
                </h4>
                <p className="text-[11px] text-slate-500">
                  Display floating feedback alerts for actions and saved items.
                </p>
              </div>
              <button
                onClick={() => handleToggle('notifications')}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  settings.notifications !== false ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.notifications !== false ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Data Management */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Download className="w-5 h-5 text-indigo-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Data Management
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <button
              onClick={handleExportData}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Telemetry (JSON)</span>
            </button>

            <button
              onClick={() => setIsClearModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-bold transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Local History</span>
            </button>
          </div>
        </div>
      </main>

      {/* Confirmation Modal for Clearing History */}
      <ConfirmationModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearHistory}
        title="Clear All Local History?"
        message="This will permanently delete all active consultation threads and reset local prototype data."
        confirmText="Clear Everything"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
