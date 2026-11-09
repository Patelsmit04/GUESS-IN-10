'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { CATEGORIES } from '@/features/cards/data/categories';
import { ArrowLeft, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { CardCategory } from '@/types/card';
import { soundManager } from '@/lib/audio/soundManager';

export const CategoryScreen: React.FC = () => {
  const { setPhase, selectCategory, startSetup } = useGameStore();

  const handleChoose = (catId: CardCategory) => {
    soundManager.playClick();
    selectCategory(catId);
    startSetup();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPhase('home')}
          className="flex items-center gap-1.5 text-sm font-bold text-brand-purple hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <span className="text-xs uppercase tracking-wider font-extrabold text-brand-text-muted">
          All Categories
        </span>
      </div>

      <div className="text-center max-w-lg mx-auto">
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-brand-purple">
          Explore Trivia Categories
        </h1>
        <p className="text-sm text-brand-text-muted mt-1">
          Pick a category to launch into setup or quick play. Each category contains factually verified cards with clues and trivia!
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-card p-5 border border-brand-border shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner"
                  style={{ backgroundColor: cat.accentBg }}
                >
                  {cat.icon}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>

              <h2 className="font-heading font-black text-xl text-brand-text mb-1">
                {cat.name}
              </h2>
              <p className="text-xs text-brand-text-muted leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">
                {cat.cardCount} Verified Cards
              </span>
              <button
                onClick={() => handleChoose(cat.id)}
                className="px-3.5 py-1.5 rounded-control text-xs font-bold text-white bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple flex items-center gap-1 transition-transform"
              >
                <Play className="w-3 h-3 fill-current" /> Play
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

