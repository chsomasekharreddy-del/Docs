import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('docai_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('docai_auth');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('docai_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('docai_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const signIn = async (email, password) => {
    const form = new URLSearchParams({ username: email, password });
    const token = await apiFetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    });
    localStorage.setItem('docai_token', token.access_token);
    const profile = await apiFetch('/users/me', {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    setUser({ ...profile, name: profile.username });
    setIsAuthenticated(true);
    return true;
  };

  const signUp = async (name, email, password) => {
    const baseUsername = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'user';
    await apiFetch('/users', {
      method: 'POST',
      body: JSON.stringify({ username: `${baseUsername}_${Date.now().toString().slice(-6)}`, email, password }),
    });
    await signIn(email, password);
    return true;
  };

  const openSignOutModal = () => setIsSignOutModalOpen(true);
  const closeSignOutModal = () => setIsSignOutModalOpen(false);

  const confirmSignOut = () => {
    localStorage.removeItem('docai_token');
    localStorage.removeItem('docai_user');
    setIsAuthenticated(false);
    setUser(null);
    setIsSignOutModalOpen(false);
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signUp,
        signOut: openSignOutModal,
        isSignOutModalOpen,
        closeSignOutModal,
        confirmSignOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
