'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { Trophy, RotateCcw, Home, Award, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CardRepository } from '@/features/cards/repository/cardRepository';

export const MatchResultScreen: React.FC = () => {
  const { matchWinner, players, currentRound, resetMatch, quitToHome, rules } = useGameStore();

  useEffect(() => {
    // Grand celebration confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#7357FF', '#38BDF8', '#FFD166', '#22C55E', '#FF6B6B'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  if (!matchWinner) return null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Winner Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 rounded-modal p-8 text-white text-center shadow-float relative overflow-hidden"
      >
        <div className="absolute top-2 right-2 text-6xl opacity-20 pointer-events-none">
          🏆
        </div>

        <motion.div
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-full bg-white text-amber-500 flex items-center justify-center text-5xl mx-auto shadow-2xl mb-4"
        >
          {matchWinner.avatar}
        </motion.div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider mb-2">
          <Star className="w-3.5 h-3.5 fill-current" /> Champion Victory!
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-5xl drop-shadow-md">
          {matchWinner.name} Wins!
        </h1>

        <p className="text-white/90 text-sm sm:text-base mt-2 max-w-md mx-auto font-medium">
          First to collect {rules.targetCardsToWin} secret cards and conquer the GUESS 10 challenge!
        </p>
      </motion.div>

      {/* Match Summary Box */}
      <div className="bg-white rounded-modal p-6 border border-brand-border shadow-card space-y-5">
        <h2 className="font-heading font-black text-lg text-brand-purple flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-yellow" /> Final Match Standings
        </h2>

        <div className="space-y-3">
          {players.map((p, idx) => {
            const isWinner = p.id === matchWinner.id;
            return (
              <div
                key={p.id}
                className={`p-4 rounded-card border flex items-center justify-between ${
                  isWinner
                    ? 'border-amber-300 bg-amber-50/70 shadow-sm'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border font-black text-sm flex items-center justify-center text-gray-700">
                    #{idx + 1}
                  </div>
                  <span className="text-3xl">{p.avatar}</span>
                  <div>
                    <div className="font-heading font-black text-base text-brand-text">
                      {p.name} {isWinner && '👑'}
                    </div>
                    <div className="text-xs text-brand-text-muted">
                      Collected {p.score} of {rules.targetCardsToWin} cards
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading font-black text-2xl text-brand-purple">
                    {p.score}
                  </span>
                  <span className="text-[10px] text-gray-400 block font-semibold">
                    cards won
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Collected Cards Showcase */}
        {matchWinner.collectedCardIds.length > 0 && (
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <span className="text-xs uppercase font-extrabold text-brand-text-muted block">
              Cards Won in this Match:
            </span>
            <div className="flex flex-wrap gap-2">
              {matchWinner.collectedCardIds.map((cId) => {
                const card = CardRepository.getCardById(cId);
                if (!card) return null;
                return (
                  <span
                    key={cId}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-purple-light text-brand-purple border border-brand-purple/20"
                  >
                    <span>{card.emoji}</span>
                    <span>{card.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <button
          onClick={resetMatch}
          className="py-4 rounded-card font-heading font-black text-base text-white bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple flex items-center justify-center gap-2 shadow-md transition-transform"
        >
          <RotateCcw className="w-5 h-5" />
          Play Rematch
        </button>

        <button
          onClick={quitToHome}
          className="py-4 rounded-card font-bold text-base text-gray-700 bg-white hover:bg-gray-100 border border-brand-border flex items-center justify-center gap-2 transition-colors"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </button>
      </div>
    </div>
  );
};

