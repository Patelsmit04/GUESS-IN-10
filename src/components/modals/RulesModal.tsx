'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, CheckCircle2, XCircle, Lightbulb, Compass, PlusCircle, Trophy } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-modal shadow-float max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-brand-border"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-title"
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-brand-purple-light/50">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📖</span>
              <div>
                <h2 id="rules-title" className="font-heading font-black text-xl text-brand-purple">
                  How to Play GUESS 10
                </h2>
                <p className="text-xs text-brand-text-muted">Master the game in under 30 seconds</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close rules"
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar text-sm text-brand-text">
            {/* Rule 1 */}
            <div className="flex items-start gap-3.5 bg-gray-50 p-3.5 rounded-card border border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-brand-purple text-white font-black flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-base text-brand-purple mb-1">One Secret Card</h3>
                <p className="text-brand-text-muted leading-relaxed">
                  The Host picks a secret card (or taps Shuffle). The Guesser only knows the category!
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="flex items-start gap-3.5 bg-gray-50 p-3.5 rounded-card border border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-brand-blue text-white font-black flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-base text-brand-blue mb-1">Ask Up to 10 Questions</h3>
                <p className="text-brand-text-muted leading-relaxed">
                  Ask Yes/No questions to deduce the secret! The Host responds with:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                    <XCircle className="w-3.5 h-3.5" /> No
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                    <HelpCircle className="w-3.5 h-3.5" /> Unknown
                  </span>
                </div>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="flex items-start gap-3.5 bg-gray-50 p-3.5 rounded-card border border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-brand-yellow text-brand-text font-black flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-base text-amber-600 mb-1">Use 3 Strategic Clues</h3>
                <p className="text-brand-text-muted leading-relaxed">
                  Stuck? Activate one of your limited clue cards:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-amber-200">
                    <span className="font-bold flex items-center gap-1 text-amber-700">
                      <Lightbulb className="w-3.5 h-3.5" /> Hint
                    </span>
                    <span className="text-[11px] text-gray-500">Reveals 1 verified clue</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-purple-200">
                    <span className="font-bold flex items-center gap-1 text-purple-700">
                      <Compass className="w-3.5 h-3.5" /> Eliminate
                    </span>
                    <span className="text-[11px] text-gray-500">Rules out possibilities</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-blue-200">
                    <span className="font-bold flex items-center gap-1 text-blue-700">
                      <PlusCircle className="w-3.5 h-3.5" /> +1 Bonus Q
                    </span>
                    <span className="text-[11px] text-gray-500">Grants 1 extra question</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rule 4 */}
            <div className="flex items-start gap-3.5 bg-gray-50 p-3.5 rounded-card border border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-brand-coral text-white font-black flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-base text-brand-coral mb-1 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-brand-yellow" /> Guess & Collect Cards!
                </h3>
                <p className="text-brand-text-muted leading-relaxed">
                  Guess the card at any point! A correct guess wins the card. The first player or team to collect <strong>7 cards</strong> wins the match!
                </p>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-control font-bold text-white bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple transition-all"
            >
              Got it, let’s play!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

