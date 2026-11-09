'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { ShieldAlert, ArrowRight, Shuffle, Eye, EyeOff } from 'lucide-react';
import { soundManager } from '@/lib/audio/soundManager';
import { GameCardView } from '@/components/cards/GameCardView';
import { CATEGORIES } from '@/features/cards/data/categories';

export const PrivacyTransitionScreen: React.FC = () => {
  const {
    players,
    guesserIndex,
    hostIndex,
    currentRound,
    selectedCategory,
    secretCard,
    selectRandomSecretCard,
    confirmPrivacy,
  } = useGameStore();

  const [hasAcknowledged, setHasAcknowledged] = useState(false);

  const hostPlayer = players[hostIndex] || players[0];
  const guesserPlayer = players[guesserIndex] || players[1];
  const categoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);

  const handleDrawAnother = () => {
    soundManager.playClick();
    selectRandomSecretCard();
  };

  const handleStartRound = () => {
    soundManager.playClick();
    confirmPrivacy();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* 1. Host Privacy Alert Header */}
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
              HOST ONLY: Pass-and-Play Secret Screen
            </h2>
            <p className="text-xs text-white/95">
              Only <strong>{hostPlayer.name} ({hostPlayer.avatar})</strong> should view this screen!{' '}
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

      {/* 2. Main Host Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Host Mission, Instructions & Controls (Col 6) - Order 2 on mobile, Order 1 on Desktop */}
        <div className="order-2 lg:order-1 lg:col-span-6 bg-white rounded-modal p-5 sm:p-6 border border-brand-border shadow-card space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-purple-light text-brand-purple mb-2">
              <span>{categoryInfo?.icon}</span> {categoryInfo?.name}
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-brand-purple">
              {hostPlayer.name}, this is your Secret Card!
            </h1>
            <p className="text-xs sm:text-sm text-brand-text-muted mt-1 leading-relaxed">
              A random card has been drawn from the deck. Review the <strong>buzz-words</strong> and <strong>clues</strong> on the card so you can accurately answer {guesserPlayer.name}’s Yes/No questions!
            </p>
          </div>

          {/* Quick Guidelines */}
          <div className="bg-brand-bg rounded-xl p-3.5 border border-brand-border space-y-2 text-xs text-brand-text">
            <div className="font-heading font-black text-xs text-brand-purple uppercase tracking-wider flex items-center gap-1.5">
              <span>💡</span> Host Rules for Round {currentRound}
            </div>
            <ul className="space-y-1.5 text-gray-700">
              <li className="flex items-start gap-1.5">
                <span className="text-brand-green font-bold shrink-0">✓</span>
                <span>The 3 <strong>Buzz-words</strong> will be shown on the board as anchors.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-brand-green font-bold shrink-0">✓</span>
                <span>Answer each question with <strong>YES</strong>, <strong>NO</strong>, or <strong>UNKNOWN</strong> based on the card facts.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-brand-green font-bold shrink-0">✓</span>
                <span>Never say the secret answer until the round ends!</span>
              </li>
            </ul>
          </div>

          {/* Reroll Button (If Host wants a different card without seeing catalog) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleDrawAnother}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Shuffle className="w-4 h-4 text-amber-700" />
              <span>Draw a Different Random Card</span>
            </button>
          </div>

          {/* Acknowledge Checkbox & Start Button */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 text-xs text-brand-text cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasAcknowledged}
                onChange={(e) => setHasAcknowledged(e.target.checked)}
                className="w-4 h-4 rounded text-brand-purple focus:ring-brand-purple"
              />
              <span className="font-semibold text-gray-700">
                I have reviewed the card and I am ready to pass the device to <strong>{guesserPlayer.name}</strong>.
              </span>
            </label>

            <button
              disabled={!hasAcknowledged}
              onClick={handleStartRound}
              className={`w-full py-4 rounded-card font-heading font-black text-base flex items-center justify-center gap-2 shadow-md transition-all ${
                hasAcknowledged
                  ? 'bg-brand-purple hover:bg-brand-purple-dark text-white btn-tactile-purple'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Pass Device to {guesserPlayer.name} & Start!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: Secret Card Front Revealed to Host (Col 6) - Order 1 on mobile, Order 2 on Desktop */}
        <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-xs uppercase font-extrabold text-brand-purple bg-brand-purple-light px-3 py-1 rounded-full">
              Host Secret Preview
            </span>
            <p className="text-[11px] text-gray-500 mt-1">
              Memorize these clues to answer Yes/No accurately!
            </p>
          </div>

          {secretCard && (
            <div className="w-full flex justify-center">
              <GameCardView
                card={secretCard}
                isFlipped={true} // Host sees the revealed front
                size="md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
