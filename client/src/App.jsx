import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import Chat from './pages/Chat';
import Insights from './pages/Insights';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotificationToast from './components/common/NotificationToast';

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <ChatProvider>
            <BrowserRouter>
              <Routes>
                {/* Public & Authentication Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />

                {/* Application Routes */}
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:conversationId" element={<Chat />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              {/* Global Toast Container */}
              <NotificationToast />
            </BrowserRouter>
          </ChatProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
