'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { CardRepository } from '@/features/cards/repository/cardRepository';
import { Card } from '@/types/card';
import { GameCardView } from '@/components/cards/GameCardView';
import { EyeOff, Shuffle, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { soundManager } from '@/lib/audio/soundManager';

export const CardSelectionScreen: React.FC = () => {
  const {
    players,
    hostIndex,
    guesserIndex,
    currentRound,
    selectedCategory,
    selectSecretCard,
    selectRandomSecretCard,
    rules,
  } = useGameStore();

  const hostPlayer = players[hostIndex] || players[0];
  const guesserPlayer = players[guesserIndex] || players[1];

  const availableCards = CardRepository.getCardsByCategory(selectedCategory);
  const [selectedCard, setSelectedCard] = useState<Card | null>(availableCards[0] || null);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);

  const handleConfirm = () => {
    if (!selectedCard) return;
    selectSecretCard(selectedCard);
  };

  const handleShuffle = () => {
    soundManager.playClick();
    const random = CardRepository.getRandomCard(selectedCategory);
    if (random) {
      setSelectedCard(random);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Privacy Warning Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-amber-500 text-white rounded-card-lg p-4 sm:p-5 shadow-md flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <EyeOff className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-heading font-black text-base sm:text-lg">
              HOST ONLY: Pass-and-Play Privacy Alert
            </h2>
            <p className="text-xs text-white/90">
              Only <strong>{hostPlayer.name} ({hostPlayer.avatar})</strong> should look at this screen!{' '}
              <strong>{guesserPlayer.name}</strong> must look away!
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs uppercase font-extrabold tracking-wider bg-black/20 px-3 py-1 rounded-full">
            Round {currentRound}
          </span>
        </div>
      </motion.div>

      {/* Main Selection Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Card Selection list & Controls (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-modal p-5 sm:p-6 border border-brand-border shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-black text-xl sm:text-2xl text-brand-purple">
                Choose the Secret Card
              </h1>
              <p className="text-xs text-brand-text-muted mt-0.5">
                Category:{' '}
                <span className="font-bold capitalize text-brand-text">
                  {selectedCategory}
                </span>
              </p>
            </div>

            <button
              onClick={handleShuffle}
              className="px-3 py-2 rounded-control text-xs font-bold bg-brand-yellow-light text-amber-800 border border-amber-200 hover:bg-amber-200 flex items-center gap-1.5 transition-colors"
            >
              <Shuffle className="w-4 h-4" /> Random Pick
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1 custom-scrollbar">
            {availableCards.map((card) => {
              const isSelected = selectedCard?.id === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    soundManager.playCardSelect();
                    setSelectedCard(card);
                  }}
                  className={`p-3 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-brand-purple bg-brand-purple-light/70 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{card.emoji}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-brand-purple text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="font-bold text-xs text-brand-text leading-tight truncate">
                      {card.name}
                    </div>
                    <span className="text-[10px] text-brand-text-muted capitalize">
                      {card.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Privacy confirmation checkbox */}
          <div className="pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2.5 text-xs text-brand-text cursor-pointer select-none">
              <input
                type="checkbox"
                checked={privacyAcknowledged}
                onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
                className="w-4 h-4 rounded text-brand-purple focus:ring-brand-purple"
              />
              <span className="font-medium">
                I confirm that <strong>{guesserPlayer.name}</strong> cannot see my screen.
              </span>
            </label>
          </div>

          {/* Confirm Button */}
          <button
            disabled={!selectedCard || !privacyAcknowledged}
            onClick={handleConfirm}
            className={`w-full py-3.5 rounded-card font-heading font-black text-base flex items-center justify-center gap-2 transition-all ${
              selectedCard && privacyAcknowledged
                ? 'bg-brand-purple hover:bg-brand-purple-dark text-white btn-tactile-purple'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Confirm Secret Card</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Secret Card Host Preview (Col 5) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-xs uppercase font-extrabold text-brand-purple bg-brand-purple-light px-3 py-1 rounded-full">
              Host Secret Preview
            </span>
            <p className="text-[11px] text-gray-500 mt-1">
              Memorize these clues to answer Yes/No accurately!
            </p>
          </div>

          {selectedCard && (
            <GameCardView
              card={selectedCard}
              isFlipped={true} // Host sees the revealed front
              size="md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

