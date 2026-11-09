'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, AlertCircle, Sparkles, Send } from 'lucide-react';

interface GuessSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (guess: string) => { isCorrect: boolean; feedback: string };
  guessesRemaining: number;
  categoryName: string;
}

export const GuessSubmissionModal: React.FC<GuessSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  guessesRemaining,
  categoryName,
}) => {
  const [guessInput, setGuessInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim()) return;

    const result = onSubmit(guessInput.trim());
    if (!result.isCorrect) {
      setFeedback(result.feedback);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={
            isShaking
              ? { x: [-10, 10, -8, 8, -4, 4, 0], scale: 1, opacity: 1 }
              : { opacity: 1, scale: 1, y: 0, x: 0 }
          }
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-modal shadow-float max-w-md w-full overflow-hidden border border-brand-border"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-brand-purple to-indigo-600 text-white">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-brand-yellow fill-brand-yellow" />
              <div>
                <h2 className="font-heading font-black text-xl leading-tight">
                  Submit Your Guess!
                </h2>
                <p className="text-xs text-white/80">Category: {categoryName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-sm text-brand-text">
              What do you think the secret card is? Type your answer below:
            </p>

            <div className="relative">
              <input
                type="text"
                autoFocus
                value={guessInput}
                onChange={(e) => {
                  setGuessInput(e.target.value);
                  if (feedback) setFeedback(null);
                }}
                placeholder="e.g. Giant Panda, Eiffel Tower, Japan..."
                className="w-full px-4 py-3.5 text-base sm:text-lg bg-gray-50 border-2 border-brand-border rounded-xl focus:outline-none focus:border-brand-purple focus:bg-white transition-all text-brand-text font-bold"
              />
            </div>

            {/* Feedback message on error */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{feedback}</span>
              </motion.div>
            )}

            <div className="flex items-center justify-between text-xs text-brand-text-muted">
              <span>
                Attempts remaining this round:{' '}
                <strong className="text-brand-purple">{guessesRemaining}</strong>
              </span>
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <Sparkles className="w-3 h-3 text-brand-yellow" /> Aliases accepted
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-control text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!guessInput.trim()}
                className={`flex-1 py-3 rounded-control font-heading font-black text-sm text-white flex items-center justify-center gap-2 transition-all ${
                  guessInput.trim()
                    ? 'bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                Confirm Guess
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

