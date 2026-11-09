'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { GameCardView } from '@/components/cards/GameCardView';
import { Trophy, ArrowRight, Sparkles, Frown, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '@/lib/audio/soundManager';

export const RoundResultScreen: React.FC = () => {
  const { roundResult, players, nextRound, rules, setPhase } = useGameStore();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Card flip suspense: start on back, then flip to front with sound
    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
      soundManager.playCardFlip();
    }, 450);

    // If correct guess, trigger celebratory confetti!
    if (roundResult?.outcome === 'correct_guess') {
      const confettiTimer = setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7357FF', '#38BDF8', '#FFD166', '#22C55E', '#FF6B6B'],
        });
      }, 700);
      return () => {
        clearTimeout(flipTimer);
        clearTimeout(confettiTimer);
      };
    }

    return () => clearTimeout(flipTimer);
  }, [roundResult]);

  if (!roundResult) return null;

  const winner = players.find((p) => p.id === roundResult.winnerPlayerId);
  const isWon = roundResult.outcome === 'correct_guess';

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Banner Result */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-modal text-white text-center shadow-float ${
          isWon
            ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-brand-blue'
            : 'bg-gradient-to-r from-purple-700 via-indigo-700 to-slate-800'
        }`}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider mb-2">
          {isWon ? (
            <>
              <Trophy className="w-4 h-4 text-brand-yellow fill-brand-yellow" /> Round Won!
            </>
          ) : (
            <>
              <Frown className="w-4 h-4" /> Round Finished
            </>
          )}
        </div>

        <h1 className="font-heading font-black text-2xl sm:text-4xl">
          {isWon
            ? `Fantastic Guess! ${winner?.name} Won the Card!`
            : `Out of Questions! The Secret Card Revealed`}
        </h1>

        <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-md mx-auto">
          {isWon
            ? `Guessed in ${roundResult.questionsUsed} questions with answer "${roundResult.finalGuess}"!`
            : `Better luck next round! Review the card's verified clues and fun facts below.`}
        </p>
      </motion.div>

      {/* Center: Secret Card Reveal with 3D Flip */}
      <div className="flex flex-col items-center justify-center py-2">
        <span className="text-xs uppercase font-extrabold text-brand-text-muted tracking-wider mb-3">
          Revealed Fact Card
        </span>
        <GameCardView
          card={roundResult.secretCard}
          isFlipped={isFlipped}
          size="lg"
        />
      </div>

      {/* Players Standings */}
      <div className="bg-white rounded-card p-5 border border-brand-border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading font-black text-sm uppercase tracking-wider text-brand-purple flex items-center gap-1.5">
            <Award className="w-4 h-4 text-brand-yellow" /> Current Match Standings
          </span>
          <span className="text-xs text-gray-400 font-semibold">
            First to {rules.targetCardsToWin} cards wins
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {players.map((p) => {
            const isRoundWinner = p.id === roundResult.winnerPlayerId;
            return (
              <div
                key={p.id}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  isRoundWinner
                    ? 'border-green-300 bg-green-50/70'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.avatar}</span>
                  <div>
                    <div className="font-bold text-xs text-brand-text truncate max-w-[120px]">
                      {p.name}
                    </div>
                    {isRoundWinner && (
                      <span className="text-[10px] text-green-700 font-extrabold">
                        +1 Card Won!
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading font-black text-xl text-brand-purple">
                    {p.score}
                  </span>
                  <span className="text-[10px] text-gray-400 block font-semibold">
                    cards
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Next Round Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPhase('home')}
          className="px-5 py-4 rounded-card font-bold text-sm text-gray-600 bg-white hover:bg-gray-100 border border-brand-border transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Quit to Home
        </button>

        <button
          onClick={nextRound}
          className="flex-1 py-4 rounded-card font-heading font-black text-base sm:text-lg text-white bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple flex items-center justify-center gap-2 shadow-lg transition-transform"
        >
          <span>Next Round (Switch Roles)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

