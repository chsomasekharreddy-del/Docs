import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Activity, 
  Bookmark, 
  Settings, 
  Sparkles, 
  Phone, 
  ArrowLeft,
  Flame,
  FileHeart,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import BottomNavigation from '../components/common/BottomNavigation';
import { useNotification } from '../context/NotificationContext';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { savedInsights, conversations } = useChat();
  const { showToast } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "Alex Taylor");
  const [email, setEmail] = useState(user?.email || "alex.taylor@doc.ai");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({ name, email });
    setIsEditing(false);
    showToast("Profile details updated successfully!", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080d1a] transition-colors pb-24 sm:pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#080d1a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/chat"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Back to Chat"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Patient Health Profile
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            <Link
              to="/logout"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold hover:bg-rose-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Profile Card Header */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                  alt={user?.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-teal-500/20 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {user?.name || "Alex Taylor"}
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    {user?.tier || "Doc.ai Pro"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user?.email || "alex.taylor@doc.ai"}</span>
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  Member since {user?.memberSince || "January 2024"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          {/* Edit Form Drawer */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Statistics 4-Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Consultations</span>
              <Activity className="w-4 h-4 text-teal-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {conversations.length}
            </p>
            <span className="text-[10px] text-teal-500 font-semibold block">
              +3 this week
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Saved Insights</span>
              <Bookmark className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {savedInsights.length}
            </p>
            <span className="text-[10px] text-cyan-500 font-semibold block">
              Medical cards
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Health Streak</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              14
            </p>
            <span className="text-[10px] text-amber-500 font-semibold block">
              Consecutive days logged
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Topics Explored</span>
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              12
            </p>
            <span className="text-[10px] text-indigo-500 font-semibold block">
              Specialties mapped
            </span>
          </div>
        </div>

        {/* Clinical Telemetry & Vitals Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl p-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileHeart className="w-5 h-5 text-rose-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Baseline Clinical Telemetry
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                Normal Range
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <span className="text-slate-400 block text-[11px]">Blood Type</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{user?.vitals?.bloodGroup || 'O+'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <span className="text-slate-400 block text-[11px]">Resting BP</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{user?.vitals?.bloodPressure || '118/76 mmHg'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <span className="text-slate-400 block text-[11px]">Heart Rate</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{user?.vitals?.restingHeartRate || '68 bpm'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <span className="text-slate-400 block text-[11px]">Oxygen (SpO2)</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{user?.vitals?.oxygenSaturation || '99%'}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Registered Allergies & Sensitivities:
              </span>
              <div className="flex flex-wrap gap-2">
                {user?.vitals?.allergies?.map((allergy, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-medium"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Contacts & Settings Shortcut */}
          <div className="space-y-6">
            <div className="rounded-3xl p-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <Phone className="w-5 h-5 text-teal-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Emergency Medical Contact
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact Person:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{user?.emergencyContact?.name || "Elena Taylor"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Relationship:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{user?.emergencyContact?.relationship || "Spouse"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Emergency Phone:</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{user?.emergencyContact?.phone || "+1 (555) 234-8901"}</span>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-3xl p-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  System Preferences
                </h4>
                <p className="text-xs text-slate-400">
                  Configure appearance, chat keybindings, and privacy.
                </p>
              </div>

              <Link
                to="/settings"
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>Open Settings</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
