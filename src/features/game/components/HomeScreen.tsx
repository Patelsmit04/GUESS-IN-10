'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { Play, Sparkles, BookOpen, Layers, Settings, Users, Award, Compass } from 'lucide-react';
import { CATEGORIES } from '@/features/cards/data/categories';
import { StorageManager } from '@/lib/storage/localStorage';
import { CARDS_DATA } from '@/features/cards/data/cards';

interface HomeScreenProps {
  onOpenRules: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenRules }) => {
  const { startSetup, setPhase, selectCategory } = useGameStore();
  const stats = StorageManager.getStats();
  const totalCards = CARDS_DATA.length;
  const unlockedCount = stats.cardsCollected.length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-card-lg p-6 sm:p-10 text-white overflow-hidden shadow-float bg-gradient-to-br from-brand-purple via-indigo-600 to-brand-blue flex flex-col items-center text-center"
      >
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/15 rounded-full blur-2xl pointer-events-none" />

        {/* Official Logo Banner */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-xl mb-4 border-2 border-white/40 bg-white/10 backdrop-blur-md p-1">
          <img
            src="/logo.png"
            alt="GUESS 10 Official Logo"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" /> Family Trivia Card Game
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-5xl tracking-tight leading-tight max-w-xl">
          Can you guess the secret card in <span className="text-brand-yellow underline decoration-wavy decoration-2">10 questions</span>?
        </h1>

        <p className="mt-3 text-white/80 text-sm sm:text-base max-w-md font-medium">
          Ask smart Yes/No questions, unlock clues, and outsmart your friends and family!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full max-w-md justify-center">
          <button
            onClick={startSetup}
            className="w-full sm:w-auto px-8 py-4 rounded-card font-heading font-black text-lg text-brand-purple bg-brand-yellow hover:bg-amber-300 btn-tactile-coral flex items-center justify-center gap-2.5 transition-transform"
          >
            <Play className="w-6 h-6 fill-current" />
            Play Now
          </button>

          <button
            onClick={onOpenRules}
            className="w-full sm:w-auto px-6 py-4 rounded-card font-bold text-base text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center gap-2 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            How to Play
          </button>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-4 mt-6 text-xs text-white/80 font-medium">
          <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full">
            <Award className="w-4 h-4 text-brand-yellow" />
            <span>Cards Collected: <strong>{unlockedCount} / {totalCards}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full">
            <Users className="w-4 h-4 text-brand-blue" />
            <span>1v1 & Team Mode</span>
          </div>
        </div>
      </motion.div>

      {/* Category Highlights */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-black text-xl sm:text-2xl text-brand-text flex items-center gap-2">
            <Compass className="w-6 h-6 text-brand-purple" /> Explore Categories
          </h2>
          <button
            onClick={() => setPhase('category-selection')}
            className="text-xs sm:text-sm font-bold text-brand-purple hover:underline"
          >
            View All ({CATEGORIES.length})
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              onClick={() => {
                selectCategory(cat.id);
                startSetup();
              }}
              className="bg-white rounded-card p-4 sm:p-5 border border-brand-border shadow-sm hover:shadow-card-hover hover:border-brand-purple cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: cat.accentBg }}>
                  {cat.icon}
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-brand-text group-hover:text-brand-purple transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-brand-text-muted mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-brand-text-muted">
                <span>{cat.cardCount} cards</span>
                <span className="text-brand-purple font-bold group-hover:translate-x-1 transition-transform">
                  Play &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Secondary Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Collection Card */}
        <div
          onClick={() => setPhase('collection')}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-card p-5 text-white flex items-center justify-between cursor-pointer hover:shadow-card transition-all"
        >
          <div>
            <div className="flex items-center gap-2 font-heading font-black text-lg">
              <Layers className="w-5 h-5" /> Card Collection
            </div>
            <p className="text-xs text-white/90 mt-1">
              Browse unlocked cards, inspect verified facts, and view your progress!
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl shrink-0 ml-3">
            📚
          </div>
        </div>

        {/* Settings Card */}
        <div
          onClick={() => setPhase('settings')}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-card p-5 text-white flex items-center justify-between cursor-pointer hover:shadow-card transition-all"
        >
          <div>
            <div className="flex items-center gap-2 font-heading font-black text-lg">
              <Settings className="w-5 h-5" /> Game Settings
            </div>
            <p className="text-xs text-white/90 mt-1">
              Configure audio effects, target cards, and motion preferences.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl shrink-0 ml-3">
            ⚙️
          </div>
        </div>
      </div>
    </div>
  );
};

