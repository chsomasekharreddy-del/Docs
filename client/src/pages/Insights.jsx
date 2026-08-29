import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Search, 
  Plus, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  Activity,
  ArrowLeft
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import Navbar from '../components/common/Navbar';
import BottomNavigation from '../components/common/BottomNavigation';
import InsightCard from '../components/insights/InsightCard';
import InsightDetailModal from '../components/insights/InsightDetailModal';
import ConfirmationModal from '../components/common/ConfirmationModal';

export default function Insights() {
  const { savedInsights, removeInsight } = useChat();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [insightToDelete, setInsightToDelete] = useState(null);

  const categories = ['All', 'Neurology', 'Physical Health', 'Immunology', 'Sleep Medicine', 'General Medicine'];

  const filtered = savedInsights.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = 
      selectedCategory === 'All' || 
      item.category === selectedCategory ||
      (selectedCategory === 'General Medicine' && !item.category);

    return matchesSearch && matchesCat;
  });

  const handleDeletePrompt = (id) => {
    setInsightToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (insightToDelete) {
      removeInsight(insightToDelete);
      setInsightToDelete(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080d1a] transition-colors pb-20 sm:pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#080d1a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/chat"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Return to Chat"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Bookmark className="w-4 h-4" />
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Saved Health Insights
              </h1>
            </div>
          </div>

          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white text-xs font-bold shadow-glow-teal transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Consultation</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Page Hero */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Medical Knowledge Repository
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Curated medical cards bookmarked from your previous symptom consultations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by keyword, topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-500 text-white shadow-glow-teal'
                  : 'bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-teal-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Insights Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <InsightCard
                key={item.id}
                insight={item}
                onView={(ins) => setSelectedInsight(ins)}
                onDelete={handleDeletePrompt}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No saved health insights found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              When triaging symptoms in the Command Center, click "Save to Insights" to store structured cards here for later reference.
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold transition-all"
            >
              <span>Go to Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      {/* Insight Detail Modal */}
      <InsightDetailModal
        insight={selectedInsight}
        isOpen={Boolean(selectedInsight)}
        onClose={() => setSelectedInsight(null)}
      />

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={Boolean(insightToDelete)}
        onClose={() => setInsightToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Saved Insight?"
        message="This medical insight card will be removed from your saved repository."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
