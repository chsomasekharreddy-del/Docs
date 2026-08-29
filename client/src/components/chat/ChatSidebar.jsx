import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Plus, 
  Search, 
  MessageSquare, 
  Bookmark, 
  Settings, 
  User, 
  LogOut, 
  Trash2, 
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import ConfirmationModal from '../common/ConfirmationModal';

export default function ChatSidebar({ isMobileOpen, onCloseMobile }) {
  const { 
    filteredConversations, 
    activeConversationId, 
    setActiveConversationId,
    searchQuery, 
    setSearchQuery,
    deleteConversation 
  } = useChat();

  const { user, signOut, isSignOutModalOpen, closeSignOutModal, confirmSignOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNewConsultation = () => {
    setActiveConversationId(null);
    navigate('/chat');
    if (onCloseMobile) onCloseMobile();
  };

  const handleSelectConvo = (id) => {
    setActiveConversationId(id);
    navigate(`/chat/${id}`);
    if (onCloseMobile) onCloseMobile();
  };

  const handleConfirmedSignOut = () => {
    confirmSignOut();
    navigate('/');
  };

  const isCurrentActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 lg:w-80 shrink-0 h-full bg-white dark:bg-[#070c18] border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-glow-teal group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 dark:text-white leading-none">
                  Doc<span className="text-teal-500">.ai</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
                  Command Center
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Consultation CTA */}
          <div className="p-4 pb-2">
            <button
              onClick={handleNewConsultation}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white text-sm font-bold shadow-glow-teal hover:shadow-teal-500/40 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Consultation</span>
            </button>
          </div>

          {/* Search Conversations Input */}
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search consultations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Recent Consultations List */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            <div className="px-2 py-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span>Recent Consultations</span>
              <span>{filteredConversations.length}</span>
            </div>

            {filteredConversations.length > 0 ? (
              filteredConversations.map((convo) => {
                const isActive = activeConversationId === convo.id;
                return (
                  <div
                    key={convo.id}
                    className={`group relative flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-teal-500/10 dark:bg-teal-950/40 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 border border-transparent'
                    }`}
                    onClick={() => handleSelectConvo(convo.id)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                      <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-500' : 'text-slate-400'}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs truncate">{convo.title}</p>
                        <span className="text-[10px] text-slate-400 block font-normal truncate">
                          {convo.timestamp}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(convo.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                      title="Delete consultation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No consultations found.
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
            <Link
              to="/insights"
              onClick={onCloseMobile}
              className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isCurrentActive('/insights')
                  ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-teal-500" />
                <span>Saved Insights</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </Link>

            <Link
              to="/settings"
              onClick={onCloseMobile}
              className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isCurrentActive('/settings')
                  ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Settings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </Link>

            <Link
              to="/profile"
              onClick={onCloseMobile}
              className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isCurrentActive('/profile')
                  ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-cyan-500" />
                <span>Profile</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </Link>
          </div>

          {/* User Profile Mini Badge & Sign Out Button */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
            <Link 
              to="/profile" 
              onClick={onCloseMobile}
              className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 ring-2 ring-teal-500/30 shrink-0 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <User className="w-4 h-4" aria-label="Profile placeholder" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {user?.name || "Alex Taylor"}
                </h4>
                <span className="text-[10px] text-slate-400 truncate block">
                  {user?.tier || "Pro Member"}
                </span>
              </div>
            </Link>

            <button
              onClick={() => {
                if (onCloseMobile) onCloseMobile();
                navigate('/logout');
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Global Sign Out Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSignOutModalOpen}
        onClose={closeSignOutModal}
        onConfirm={handleConfirmedSignOut}
        title="Sign out of Doc.ai?"
        message="You can sign back in anytime. Your locally saved insights and consultation history will remain available in this browser."
        confirmText="Sign Out"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
}
