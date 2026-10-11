import React from 'react';
import { 
  Menu, 
  Trash2, 
  Moon,
  Sun
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';

export default function ChatHeader({ onOpenMobileSidebar }) {
  const { 
    activeConversation, 
    activeConversationId, 
    setActiveConversationId,
    deleteConversation
  } = useChat();

  const { theme, toggleTheme } = useTheme();

  const handleClear = () => {
    if (activeConversationId) {
      deleteConversation(activeConversationId);
      setActiveConversationId(null);
    }
  };

  return (
    <header className="h-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between shrink-0">
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
            <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate">
              {activeConversation?.title || "New conversation"}
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 block truncate">
            Health information, not a diagnosis
          </span>
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {activeConversation && (
          <button
            onClick={handleClear}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
            title="Delete consultation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

      </div>
    </header>
  );
}
