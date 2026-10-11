import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatHeader from '../components/chat/ChatHeader';
import WelcomeScreen from '../components/chat/WelcomeScreen';
import ChatMessage from '../components/chat/ChatMessage';
import AIThinkingAnimation from '../components/chat/AIThinkingAnimation';
import ChatInput from '../components/chat/ChatInput';
import BottomNavigation from '../components/common/BottomNavigation';

export default function Chat() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    activeConversation, 
    sendMessage, 
    isAiThinking, 
    thinkingStage
  } = useChat();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Sync route param with ChatContext
  useEffect(() => {
    if (conversationId && conversationId !== activeConversationId) {
      const exists = conversations.some(c => c.id === conversationId);
      if (exists) {
        setActiveConversationId(conversationId);
      }
    } else if (!conversationId && activeConversationId) {
      // on /chat with an active ID, sync or keep
    }
  }, [conversationId, conversations, activeConversationId, setActiveConversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isAiThinking, thinkingStage]);

  const handleSendMessage = async (text) => {
    const targetId = await sendMessage(text);
    if (targetId && targetId !== conversationId) {
      navigate(`/chat/${targetId}`);
    }
  };

  const handleSelectSuggestion = (query) => {
    handleSendMessage(query);
  };

  const messages = activeConversation?.messages || [];
  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Center Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <ChatHeader onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 pb-28 sm:pb-32">
          {!hasMessages ? (
            <WelcomeScreen onSelectPrompt={handleSelectSuggestion} />
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {isAiThinking && (
                <AIThinkingAnimation stage={thinkingStage} />
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Fixed Chat Input Area at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-14 sm:pb-0">
          <ChatInput
            onSendMessage={handleSendMessage}
            isThinking={isAiThinking}
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavigation />
    </div>
  );
}
