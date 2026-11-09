'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { CARDS_DATA } from '@/features/cards/data/cards';
import { CATEGORIES } from '@/features/cards/data/categories';
import { Card, CardCategory } from '@/types/card';
import { StorageManager } from '@/lib/storage/localStorage';
import { ArrowLeft, Layers, Sparkles, X, ShieldCheck, Flame, BookOpen } from 'lucide-react';
import { GameCardView } from '@/components/cards/GameCardView';
import { soundManager } from '@/lib/audio/soundManager';

export const CollectionScreen: React.FC = () => {
  const { setPhase } = useGameStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [inspectedCard, setInspectedCard] = useState<Card | null>(null);

  const stats = StorageManager.getStats();
  const collectedIds = stats.cardsCollected;

  const filteredCards = CARDS_DATA.filter((card) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'collected') return collectedIds.includes(card.id);
    return card.category === selectedFilter;
  });

  const handleCardClick = (card: Card) => {
    soundManager.playCardSelect();
    setInspectedCard(card);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPhase('home')}
          className="flex items-center gap-1.5 text-sm font-bold text-brand-purple hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-extrabold text-brand-text-muted">
            Card Vault
          </span>
        </div>
      </div>

      {/* Progress Showcase */}
      <div className="bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue rounded-modal p-6 text-white shadow-float flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full mb-2">
            <Layers className="w-3.5 h-3.5" /> Trivia Archive
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl">
            Cards Collection
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-md">
            Every card is backed by verified educational facts, primary clues, and fun facts. Win matches to expand your unlocked cards!
          </p>
        </div>

        {/* Progress Circle / Box */}
        <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shrink-0 min-w-[150px]">
          <span className="text-xs font-bold text-white/80 block uppercase">
            Unlocked in Matches
          </span>
          <div className="font-heading font-black text-3xl sm:text-4xl text-brand-yellow mt-0.5">
            {collectedIds.length} <span className="text-xl text-white/60">/ {CARDS_DATA.length}</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-brand-yellow h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, (collectedIds.length / CARDS_DATA.length) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
            selectedFilter === 'all'
              ? 'bg-brand-purple text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          All Cards ({CARDS_DATA.length})
        </button>

        <button
          onClick={() => setSelectedFilter('collected')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 flex items-center gap-1 transition-colors ${
            selectedFilter === 'collected'
              ? 'bg-brand-purple text-white shadow-sm'
              : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          <span>🏆 Unlocked ({collectedIds.length})</span>
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedFilter(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors ${
              selectedFilter === cat.id
                ? 'bg-brand-purple text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {filteredCards.map((card, idx) => {
          const isUnlocked = collectedIds.includes(card.id);
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.03 }}
              onClick={() => handleCardClick(card)}
              className="bg-white rounded-card p-3.5 border border-brand-border shadow-sm hover:shadow-card-hover hover:border-brand-purple cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {isUnlocked && (
                <div className="absolute top-2 right-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center text-[10px] shadow" title="Unlocked in match">
                    ⭐
                  </span>
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-3xl mb-2.5 group-hover:scale-110 transition-transform">
                  {card.emoji}
                </div>
                <h3 className="font-heading font-black text-sm text-brand-text group-hover:text-brand-purple leading-tight truncate">
                  {card.name}
                </h3>
                <span className="text-[10px] uppercase font-bold text-brand-text-muted capitalize">
                  {card.category} • {card.difficulty}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-brand-purple font-semibold">
                <span>Inspect</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Inspect Card Modal */}
      <AnimatePresence>
        {inspectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="bg-white rounded-modal shadow-float max-w-sm sm:max-w-md w-full overflow-hidden border border-brand-border flex flex-col"
              role="dialog"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-brand-purple-light/50">
                <span className="text-xs uppercase font-extrabold text-brand-purple flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> Fact Card Inspector
                </span>
                <button
                  onClick={() => setInspectedCard(null)}
                  className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 sm:p-5 flex justify-center items-center bg-gray-50/50 max-h-[75vh] overflow-y-auto">
                <GameCardView
                  card={inspectedCard}
                  isFlipped={true}
                  size="md"
                />
              </div>

              <div className="p-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setInspectedCard(null)}
                  className="px-6 py-2.5 rounded-control font-bold text-xs uppercase text-white bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

