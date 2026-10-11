import React from 'react';
import { Sparkles, User } from 'lucide-react';
import MedicalInsightCard from './MedicalInsightCard';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { assetUrl } from '../../lib/api';

function formatInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index} className="font-bold text-slate-950 dark:text-white">{part.slice(2, -2)}</strong>
      : part
  );
}

function FormattedReply({ text }) {
  const lines = (text || '').split('\n');
  return (
    <div className="space-y-2.5">
      {lines.map((line, index) => {
        const heading = line.match(/^\s*\*\*(.+?)\*\*\s*(.*)$/);
        const bullet = line.match(/^\s*[-*]\s+(.+)$/);
        const numbered = line.match(/^\s*(\d+)\.\s+(.+)$/);

        if (!line.trim()) return <div key={index} className="h-1" />;
        if (heading) return <div key={index}><h3 className="font-bold text-slate-950 dark:text-white">{heading[1]}</h3>{heading[2] && <p>{formatInline(heading[2])}</p>}</div>;
        if (bullet) return <div key={index} className="flex gap-2"><span className="text-teal-500">•</span><span>{formatInline(bullet[1])}</span></div>;
        if (numbered) return <div key={index} className="flex gap-2"><span className="font-semibold text-teal-600 dark:text-teal-400">{numbered[1]}.</span><span>{formatInline(numbered[2])}</span></div>;
        return <p key={index}>{formatInline(line)}</p>;
      })}
    </div>
  );
}

export default function ChatMessage({ message }) {
  const { user } = useAuth();
  const { settings } = useChat();

  const isUser = message.sender === 'user';
  const showTimestamp = settings?.showTimestamps !== false;

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-3 my-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="flex flex-col items-end max-w-xl">
          <div className="px-4 sm:px-5 py-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md text-sm sm:text-base leading-relaxed break-words">
            <FormattedReply text={message.text} />
          </div>
          {showTimestamp && message.timestamp && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
              {message.timestamp}
            </span>
          )}
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 ring-2 ring-teal-500/30">
          {user?.avatar_url ? <img src={assetUrl(user.avatar_url)} alt="Your profile" className="h-full w-full object-cover" /> : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
              <User className="w-4 h-4" aria-label="Profile placeholder" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Assistant Message
  return (
    <div className="flex items-start gap-3 my-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Doc.ai Avatar */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-glow-teal shrink-0 mt-1">
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="flex-1 max-w-3xl overflow-hidden">
        {message.insight ? (
          <MedicalInsightCard insight={message.insight} timestamp={showTimestamp ? message.timestamp : null} />
        ) : (
          <div className="p-4 rounded-2xl rounded-tl-sm bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed shadow-sm">
            <FormattedReply text={message.text} />
            {showTimestamp && message.timestamp && (
              <span className="block text-[10px] text-slate-400 font-mono mt-2">
                {message.timestamp}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
