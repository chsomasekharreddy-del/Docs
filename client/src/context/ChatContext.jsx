import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialConversations, initialSavedInsights } from '../data/mockData';
import { useNotification } from './NotificationContext';
import { apiFetch } from '../lib/api';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { showToast } = useNotification();

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('docai_conversations');
    return saved ? JSON.parse(saved) : initialConversations;
  });

  const [savedInsights, setSavedInsights] = useState(() => {
    const saved = localStorage.getItem('docai_saved_insights');
    return saved ? JSON.parse(saved) : initialSavedInsights;
  });

  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [thinkingStage, setThinkingStage] = useState(1); // 1: Analyzing, 2: Retrieving, 3: Preparing
  const [searchQuery, setSearchQuery] = useState('');
  const [isHealthPanelOpen, setIsHealthPanelOpen] = useState(true);

  // Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('docai_settings');
    return saved ? JSON.parse(saved) : {
      enterToSend: true,
      showTimestamps: true,
      soundEffects: false,
      conversationHistory: true,
      notifications: true,
      healthAlerts: true,
    };
  });

  useEffect(() => {
    localStorage.setItem('docai_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('docai_saved_insights', JSON.stringify(savedInsights));
  }, [savedInsights]);

  useEffect(() => {
    localStorage.setItem('docai_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    showToast(`Setting '${key}' updated`, 'info', 2000);
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  const sendMessage = async (text, overrideConvoId = null) => {
    if (!text.trim()) return;

    let targetId = overrideConvoId || activeConversationId;
    if (!targetId || !conversations.find(c => c.id === targetId)) {
      targetId = Date.now().toString();
      const newTitle = text.length > 28 ? text.slice(0, 28) + "..." : text;
      
      const newConvo = {
        id: targetId,
        title: newTitle,
        lastMessage: text,
        timestamp: "Just now",
        symptoms: ["Initial Assessment"],
        keywords: ["Clinical Query", "Triage"],
        metrics: {
          factorScores: [
            { name: "Symptom Correlation", value: 65, color: "#14b8a6" },
            { name: "Clinical Knowledge Match", value: 78, color: "#06b6d4" },
          ]
        },
        messages: [
          {
            id: `msg-${Date.now()}-user`,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: text,
          }
        ]
      };

      setConversations(prev => [newConvo, ...prev]);
      setActiveConversationId(targetId);
    } else {
      // Append user message to existing conversation
      const userMsg = {
        id: `msg-${Date.now()}-user`,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: text,
      };

      setConversations(prev => prev.map(c => {
        if (c.id === targetId) {
          return {
            ...c,
            lastMessage: text,
            timestamp: "Just now",
            messages: [...c.messages, userMsg],
          };
        }
        return c;
      }));
    }

    // Start the UI thinking state while the medical API answers.
    setIsAiThinking(true);
    setThinkingStage(1);

    try {
      await new Promise(r => setTimeout(r, 250));
      setThinkingStage(2);
      const currentConversation = conversations.find(c => c.id === targetId);
      const history = (currentConversation?.messages || [])
        .filter(message => message.sender === 'user' || message.sender === 'assistant')
        .map(message => ({ role: message.sender === 'user' ? 'user' : 'assistant', content: message.text || '' }))
        .filter(message => message.content);
      setThinkingStage(3);
      const result = await apiFetch('/chat', {
        method: 'POST',
        body: JSON.stringify({ message: text, history }),
      });

      const assistantMsg = {
        id: `msg-${Date.now()}-assistant`,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: result.reply,
      };

      setConversations(prev => prev.map(c => c.id === targetId ? { ...c, messages: [...c.messages, assistantMsg] } : c));
    } catch (error) {
      showToast(error.message || 'Could not reach the medical AI service.', 'warning');
      setConversations(prev => prev.map(c => c.id === targetId ? {
        ...c,
        messages: [...c.messages, { id: `msg-${Date.now()}-error`, sender: 'assistant', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: error.message || 'Could not reach the medical AI service.' }],
      } : c));
    }

    setIsAiThinking(false);
    setThinkingStage(1);
    return targetId;
  };

  const saveInsight = (insightData) => {
    const existingIndex = savedInsights.findIndex(
      i => i.title === insightData.title || i.topic === insightData.topic
    );

    if (existingIndex > -1) {
      setSavedInsights(prev => prev.filter((_, idx) => idx !== existingIndex));
      showToast("Removed from Saved Insights", "info");
    } else {
      const newInsight = {
        id: `ins-${Date.now()}`,
        title: insightData.topic || insightData.title || "Clinical Health Insight",
        topic: insightData.topic || "Symptom Analysis",
        category: "General Medicine",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        summary: insightData.info?.[0] || "Structured medical knowledge card generated by Doc.ai.",
        tags: insightData.causes?.map(c => c.title) || ["Health Insight", "AI Triage"],
        causes: insightData.causes?.map(c => c.title) || [],
        symptoms: insightData.symptoms || [],
        nextStep: insightData.nextStep?.action || "Consult a healthcare professional.",
      };
      setSavedInsights(prev => [newInsight, ...prev]);
      showToast("Saved to Health Insights!", "success");
    }
  };

  const removeInsight = (id) => {
    setSavedInsights(prev => prev.filter(i => i.id !== id));
    showToast("Insight deleted", "info");
  };

  const deleteConversation = (id) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
    showToast("Conversation deleted", "info");
  };

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ChatContext.Provider
      value={{
        conversations,
        filteredConversations,
        activeConversationId,
        setActiveConversationId,
        activeConversation,
        savedInsights,
        isAiThinking,
        thinkingStage,
        searchQuery,
        setSearchQuery,
        sendMessage,
        saveInsight,
        removeInsight,
        deleteConversation,
        isHealthPanelOpen,
        setIsHealthPanelOpen,
        settings,
        updateSetting,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};
