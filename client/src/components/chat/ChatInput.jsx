import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export default function ChatInput({ onSendMessage, isThinking }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const { settings } = useChat();

  const enterToSend = settings?.enterToSend !== false;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!text.trim() || isThinking) return;

    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (enterToSend && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-3 sm:p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
          {/* Main Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
            placeholder={isThinking ? "Doc.ai is synthesizing medical knowledge..." : "Describe symptoms, duration, or health questions (e.g. 'I have a headache and eye strain')..."}
            className="w-full px-4 pt-3.5 pb-2 rounded-2xl bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none min-h-[44px] max-h-[160px]"
          />

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-end px-3 pb-2.5 pt-1">
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                {enterToSend ? "Enter to send • Shift+Enter for newline" : "Press send button"}
              </span>

              <button
                type="submit"
                disabled={!text.trim() || isThinking}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating safety notice */}
        <div className="mt-1.5 text-center text-[10px] text-slate-400 dark:text-slate-500">
          Doc.ai is an informational AI simulation • Always consult a physician for medical advice
        </div>
      </form>
    </div>
  );
}
