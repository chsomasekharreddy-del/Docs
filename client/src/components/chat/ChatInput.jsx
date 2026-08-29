import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Mic, Paperclip, AlertCircle, ArrowUp } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useNotification } from '../../context/NotificationContext';

export default function ChatInput({ onSendMessage, isThinking }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const { settings } = useChat();
  const { showToast } = useNotification();

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

  const handleVoiceMock = () => {
    showToast("Microphone triage speech recognition simulated.", "info");
    setText("I have had recurring headaches after long work shifts and slight neck stiffness.");
  };

  const handleAttachmentMock = () => {
    showToast("Lab test / blood panel PDF upload simulation attached.", "info");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 bg-white/90 dark:bg-[#090e1c]/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800/80">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col rounded-2xl border border-slate-300 dark:border-slate-700/80 bg-slate-50 dark:bg-[#0f172a] shadow-lg focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
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
          <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAttachmentMock}
                title="Attach lab report or symptom image (Mock)"
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleVoiceMock}
                title="Voice symptom dictation (Mock)"
                className="p-1.5 rounded-xl text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                {enterToSend ? "Enter to send • Shift+Enter for newline" : "Press send button"}
              </span>

              <button
                type="submit"
                disabled={!text.trim() || isThinking}
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-glow-teal hover:from-teal-400 hover:to-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
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
