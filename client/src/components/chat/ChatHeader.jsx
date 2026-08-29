import React from 'react';
import { 
  Menu, 
  Activity, 
  PanelRightClose, 
  PanelRightOpen, 
  Share2, 
  Download, 
  Trash2, 
  Sparkles, 
  ShieldCheck,
  Moon,
  Sun
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';

export default function ChatHeader({ onOpenMobileSidebar }) {
  const { 
    activeConversation, 
    activeConversationId, 
    setActiveConversationId,
    isHealthPanelOpen, 
    setIsHealthPanelOpen,
    deleteConversation
  } = useChat();

  const { theme, toggleTheme } = useTheme();
  const { showToast } = useNotification();

  const handleExport = () => {
    showToast("Consultation clinical PDF export prepared!", "success");
  };

  const handleClear = () => {
    if (activeConversationId) {
      deleteConversation(activeConversationId);
      setActiveConversationId(null);
    } else {
      showToast("Chat cleared.", "info");
    }
  };

  return (
    <header className="h-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#080d1a]/80 backdrop-blur-xl flex items-center justify-between z-20 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Menu Button */}
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
              {activeConversation?.title || "New Health Consultation"}
            </h2>
            <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              ✦ AI Triage
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block truncate">
            {activeConversation?.symptoms?.[0] ? `Context: ${activeConversation.symptoms.slice(0, 2).join(', ')}` : "Doc.ai Medical Command Center • Ready for input"}
          </span>
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        <button
          onClick={handleExport}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          title="Export Doctor Brief"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>

        {activeConversation && (
          <button
            onClick={handleClear}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
            title="Delete consultation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {/* Toggle Health Context Panel */}
        <button
          onClick={() => setIsHealthPanelOpen(!isHealthPanelOpen)}
          className={`p-2 rounded-xl transition-all ${
            isHealthPanelOpen
              ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title={isHealthPanelOpen ? "Collapse telemetry panel" : "Expand telemetry panel"}
          aria-label="Toggle telemetry panel"
        >
          {isHealthPanelOpen ? (
            <PanelRightClose className="w-4 h-4" />
          ) : (
            <PanelRightOpen className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}
