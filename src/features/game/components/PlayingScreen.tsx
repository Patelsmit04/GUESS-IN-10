'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { CATEGORIES } from '@/features/cards/data/categories';
import { QuestionAnswer } from '@/types/game';
import { GuessSubmissionModal } from './GuessSubmissionModal';
import { GameCardView } from '@/components/cards/GameCardView';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Compass,
  PlusCircle,
  Trophy,
  Eye,
  EyeOff,
  Sparkles,
  Send,
  MessageSquare,
  ShieldCheck,
  ShieldAlert,
  Lock,
  X,
  Zap,
} from 'lucide-react';
import { soundManager } from '@/lib/audio/soundManager';

const SAMPLE_QUESTION_CHIPS = [
  'Is it alive?',
  'Can it fly or swim?',
  'Is it larger than a human?',
  'Is it made by humans?',
  'Is it found outdoors?',
  'Is it warm-blooded?',
  'Is it located in Asia or Europe?',
  'Is it edible or sweet?',
];

export const PlayingScreen: React.FC = () => {
  const {
    players,
    hostIndex,
    guesserIndex,
    currentRound,
    selectedCategory,
    rules,
    secretCard,
    questionCount,
    bonusQuestionsGranted,
    bonusQuestionsUsed,
    questionHistory,
    guessHistory,
    activeHints,
    activeEliminations,
    answerQuestion,
    useClue,
    submitGuess,
  } = useGameStore();

  const hostPlayer = players[hostIndex] || players[0];
  const guesserPlayer = players[guesserIndex] || players[1];
  const categoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);

  const [questionInput, setQuestionInput] = useState('');
  const [isGuessModalOpen, setIsGuessModalOpen] = useState(false);
  const [isHostPeekModalOpen, setIsHostPeekModalOpen] = useState(false);
  const [hostRevealedInModal, setHostRevealedInModal] = useState(false);
  const [clueBannerMessage, setClueBannerMessage] = useState<string | null>(null);

  const totalAllowed = rules.maxQuestions + bonusQuestionsGranted;
  const currentTotalAsked = questionCount + bonusQuestionsUsed;
  const questionsLeft = Math.max(0, totalAllowed - currentTotalAsked);
  const guessesLeft = Math.max(0, rules.maxGuessesPerRound - guessHistory.length);

  const handleAnswer = (response: QuestionAnswer) => {
    const text = questionInput.trim() || `Question #${currentTotalAsked + 1}`;
    answerQuestion(text, response);
    setQuestionInput('');
  };

  const handleUseClue = (type: 'hint' | 'eliminate' | 'bonus') => {
    const res = useClue(type);
    setClueBannerMessage(res.message);
    setTimeout(() => setClueBannerMessage(null), 4500);
  };

  const buzzWords = secretCard?.buzzWords || ['Clue 1', 'Clue 2', 'Clue 3'];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 pb-16 sm:pb-8 space-y-4">
      {/* Clue Banner Notification */}
      <AnimatePresence>
        {clueBannerMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-brand-yellow-light border-2 border-brand-yellow text-amber-900 rounded-card font-bold text-xs sm:text-sm flex items-center justify-between shadow-md"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
              {clueBannerMessage}
            </span>
            <button
              onClick={() => setClueBannerMessage(null)}
              className="text-xs uppercase text-amber-800 hover:underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Match Bar: Players, Category & Round */}
      <div className="bg-white rounded-card p-3.5 sm:p-4 border border-brand-border shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Round & Category Info */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner shrink-0"
            style={{ backgroundColor: categoryInfo?.accentBg || '#F5F3FF' }}
          >
            {categoryInfo?.icon}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider font-extrabold text-brand-text-muted">
              Round {currentRound} • Category
            </div>
            <div className="font-heading font-black text-base text-brand-purple leading-tight">
              {categoryInfo?.name}
            </div>
          </div>
        </div>

        {/* Players Turn Status */}
        <div className="flex items-center gap-4">
          {/* Host Tag */}
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-gray-400 font-semibold block">Host (Answers)</span>
            <span className="text-xs font-bold text-gray-700">
              {hostPlayer.avatar} {hostPlayer.name}
            </span>
          </div>

          <div className="h-7 w-[1px] bg-gray-200 hidden sm:block" />

          {/* Guesser Tag */}
          <div className="bg-brand-purple-light border border-brand-purple/20 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <span className="text-xl">{guesserPlayer.avatar}</span>
            <div>
              <span className="text-[10px] uppercase font-black text-brand-purple tracking-wider block">
                Guessing Now
              </span>
              <span className="text-xs font-black text-brand-text">
                {guesserPlayer.name} ({guesserPlayer.score} cards)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gameplay Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT COLUMN: Question Tracker & History (Col 7) ================= */}
        <div className="lg:col-span-7 space-y-4">
          {/* 3 BUZZ-WORDS PROMINENT BANNER (For Guesser Guidance) */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-card p-3 sm:p-4 text-white shadow-md border border-amber-300">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-heading font-black uppercase tracking-wider">
                <Zap className="w-4 h-4 fill-brand-yellow text-brand-yellow" /> Thematic Buzz-Words
              </span>
              <span className="text-[10px] font-bold bg-black/25 px-2 py-0.5 rounded-full text-white/90">
                Guesser Anchor Clues
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {buzzWords.map((word, idx) => (
                <div
                  key={idx}
                  className="bg-white/20 backdrop-blur-md rounded-xl py-1.5 px-2 border border-white/30 font-heading font-black text-xs sm:text-sm drop-shadow-sm truncate"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          {/* Question Counter Card */}
          <div className="bg-white rounded-card p-4 sm:p-5 border border-brand-border shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-brand-text-muted">
                  Questions Remaining
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-brand-purple">
                    {questionsLeft}
                  </span>
                  <span className="text-xs text-gray-400 font-bold">
                    of {totalAllowed} max
                  </span>
                  {bonusQuestionsGranted > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-700">
                      +1 Bonus Active
                    </span>
                  )}
                </div>
              </div>

              {/* Make a Guess Action Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsGuessModalOpen(true);
                }}
                className="px-5 py-3 rounded-card font-heading font-black text-sm sm:text-base text-white bg-gradient-to-r from-brand-coral to-rose-600 hover:brightness-105 btn-tactile-coral flex items-center gap-2 shadow-md animate-bounce-subtle"
              >
                <Trophy className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
                Make a Guess! ({guessesLeft} left)
              </button>
            </div>

            {/* Visual Stepper / Question Progress Bar */}
            <div className="grid grid-cols-10 gap-1.5 pt-1">
              {Array.from({ length: 10 }).map((_, i) => {
                const isAnswered = i < questionCount;
                const isCurrent = i === questionCount;
                return (
                  <div
                    key={i}
                    className={`h-2.5 rounded-full transition-all ${
                      isAnswered
                        ? 'bg-brand-purple shadow-sm'
                        : isCurrent
                        ? 'bg-brand-yellow animate-pulse'
                        : 'bg-gray-100'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Clues Bar (Hint, Eliminate, Bonus Question) */}
          <div className="bg-white rounded-card p-3.5 sm:p-4 border border-brand-border shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" /> Clue Cards Available
              </span>
              <span className="text-[11px] text-gray-400">Tap to activate</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Clue 1: Hint */}
              <button
                type="button"
                disabled={guesserPlayer.cluesRemaining.hint <= 0}
                onClick={() => handleUseClue('hint')}
                className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                  guesserPlayer.cluesRemaining.hint > 0
                    ? 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 cursor-pointer shadow-sm'
                    : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                }`}
              >
                <Lightbulb className="w-4 h-4 text-amber-500 mb-1" />
                <span className="font-heading font-black text-xs leading-tight">Reveal Hint</span>
                <span className="text-[10px] font-bold text-amber-700 mt-0.5">
                  ({guesserPlayer.cluesRemaining.hint} left)
                </span>
              </button>

              {/* Clue 2: Eliminate */}
              <button
                type="button"
                disabled={guesserPlayer.cluesRemaining.eliminate <= 0}
                onClick={() => handleUseClue('eliminate')}
                className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                  guesserPlayer.cluesRemaining.eliminate > 0
                    ? 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 cursor-pointer shadow-sm'
                    : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                }`}
              >
                <Compass className="w-4 h-4 text-purple-500 mb-1" />
                <span className="font-heading font-black text-xs leading-tight">Eliminate</span>
                <span className="text-[10px] font-bold text-purple-700 mt-0.5">
                  ({guesserPlayer.cluesRemaining.eliminate} left)
                </span>
              </button>

              {/* Clue 3: Bonus Question */}
              <button
                type="button"
                disabled={guesserPlayer.cluesRemaining.bonus <= 0 || bonusQuestionsGranted > 0}
                onClick={() => handleUseClue('bonus')}
                className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                  guesserPlayer.cluesRemaining.bonus > 0 && bonusQuestionsGranted === 0
                    ? 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-900 cursor-pointer shadow-sm'
                    : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-blue-500 mb-1" />
                <span className="font-heading font-black text-xs leading-tight">+1 Question</span>
                <span className="text-[10px] font-bold text-blue-700 mt-0.5">
                  ({guesserPlayer.cluesRemaining.bonus} left)
                </span>
              </button>
            </div>
          </div>

          {/* Active Revealed Clues Drawer (if any clues were used) */}
          {(activeHints.length > 0 || activeEliminations.length > 0) && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-card p-3.5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Active Clues for {guesserPlayer.name}
              </span>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {activeHints.map((hint, idx) => (
                  <li key={`hint_${idx}`} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold shrink-0">💡 Hint:</span>
                    <span>{hint}</span>
                  </li>
                ))}
                {activeEliminations.map((elim, idx) => (
                  <li key={`elim_${idx}`} className="flex items-start gap-1.5">
                    <span className="text-purple-600 font-bold shrink-0">🚫 Eliminated:</span>
                    <span>{elim}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Question History */}
          <div className="bg-white rounded-card p-4 sm:p-5 border border-brand-border shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-purple" />
                <h3 className="font-heading font-black text-base text-brand-text">
                  Question History ({questionHistory.length})
                </h3>
              </div>
              <span className="text-[11px] text-brand-text-muted">
                Order of asked questions
              </span>
            </div>

            {questionHistory.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                No questions asked yet. Ask a question below to start deducing the secret card!
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {questionHistory.map((item) => {
                  const isYes = item.response === 'yes';
                  const isNo = item.response === 'no';
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/70 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-600 font-black flex items-center justify-center text-[10px] shrink-0">
                          #{item.number}
                        </span>
                        <span className="font-semibold text-gray-800 leading-tight">
                          {item.text}
                        </span>
                      </div>

                      {/* Response Badge */}
                      <div className="shrink-0">
                        {isYes && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-green-100 text-green-700 border border-green-200">
                            <CheckCircle2 className="w-3.5 h-3.5" /> YES
                          </span>
                        )}
                        {isNo && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-700 border border-rose-200">
                            <XCircle className="w-3.5 h-3.5" /> NO
                          </span>
                        )}
                        {!isYes && !isNo && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-700 border border-purple-200">
                            <HelpCircle className="w-3.5 h-3.5" /> UNKNOWN
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Mystery Card Stand & Host Box (Col 5) ================= */}
        <div className="lg:col-span-5 flex flex-col items-center gap-4">
          {/* Mystery Card View (Facing Back to Guesser) */}
          <div className="w-full flex flex-col items-center justify-center py-2 shrink-0">
            <GameCardView
              card={secretCard}
              isFlipped={false} // Guesser only sees mystery back!
              size="md"
            />
          </div>

          {/* Host Response & Question Input Box */}
          <div className="w-full bg-white rounded-card p-4 sm:p-5 border-2 border-brand-purple/30 shadow-card space-y-3.5 mt-2">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">{hostPlayer.avatar}</span>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">
                    Host Console
                  </span>
                  <span className="text-xs font-black text-brand-purple">
                    {hostPlayer.name} Answers
                  </span>
                </div>
              </div>

              {/* Private Shield Button for Host Fact Verification */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setHostRevealedInModal(false);
                  setIsHostPeekModalOpen(true);
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 flex items-center gap-1.5 transition-colors shadow-sm"
                title="Check secret card facts privately"
              >
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span>Host Fact Check</span>
              </button>
            </div>

            {/* Guesser's Question Input (Safe: Zero card leaks!) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <span>Guesser&apos;s Question:</span>
                <span className="text-[10px] font-normal text-gray-400">Type or ask aloud</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder="Question text (e.g. Can it fly?)..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-purple focus:bg-white"
                />
              </div>

              {/* Sample Question Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SAMPLE_QUESTION_CHIPS.slice(0, 4).map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuestionInput(chip)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Host Decision Buttons: YES / NO / UNKNOWN */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Host: Tap to answer current question
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleAnswer('yes')}
                  className="py-3 px-2 rounded-xl font-heading font-black text-xs sm:text-sm text-white bg-brand-green hover:bg-emerald-600 btn-tactile-green flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" /> YES
                </button>

                <button
                  type="button"
                  onClick={() => handleAnswer('no')}
                  className="py-3 px-2 rounded-xl font-heading font-black text-xs sm:text-sm text-white bg-brand-coral hover:bg-rose-600 btn-tactile-coral flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <XCircle className="w-4 h-4" /> NO
                </button>

                <button
                  type="button"
                  onClick={() => handleAnswer('unknown')}
                  className="py-3 px-2 rounded-xl font-heading font-black text-xs sm:text-sm text-white bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <HelpCircle className="w-4 h-4" /> UNKNOWN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Host Private Peek Shield Modal */}
      <AnimatePresence>
        {isHostPeekModalOpen && secretCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-modal shadow-float max-w-sm sm:max-w-md w-full overflow-hidden border-2 border-brand-purple flex flex-col"
              role="dialog"
            >
              {/* Modal Top Bar */}
              <div className="p-3.5 bg-brand-purple text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand-yellow" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Host Private Peek
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsHostPeekModalOpen(false);
                    setHostRevealedInModal(false);
                  }}
                  className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!hostRevealedInModal ? (
                /* Privacy Shield Gate */
                <div className="p-6 text-center space-y-4 bg-amber-50/50">
                  <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl mx-auto shadow-inner border border-amber-200">
                    🛡️
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl text-amber-950">
                      Pass Device to {hostPlayer.name} Only!
                    </h3>
                    <p className="text-xs text-amber-800 mt-1.5 font-medium leading-relaxed">
                      <strong>{guesserPlayer.name}</strong>, please look away from the screen right now to prevent spoiling the secret card!
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setHostRevealedInModal(true)}
                      className="w-full py-3.5 px-4 rounded-card font-heading font-black text-sm text-white bg-amber-600 hover:bg-amber-700 btn-tactile-coral flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>I am {hostPlayer.name} • Reveal Secret Card</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsHostPeekModalOpen(false)}
                    className="text-xs text-gray-500 hover:text-gray-700 font-bold underline"
                  >
                    Cancel & Return to Game
                  </button>
                </div>
              ) : (
                /* Host Card View */
                <div className="p-4 sm:p-5 flex flex-col items-center space-y-3 bg-gray-50/70 max-h-[80vh] overflow-y-auto">
                  <div className="w-full bg-amber-100 border border-amber-300 rounded-xl p-2.5 text-center text-xs text-amber-900 font-bold flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Host Fact Verification Mode</span>
                  </div>

                  {/* Physical Card Front View */}
                  <div className="w-full flex justify-center py-1">
                    <GameCardView
                      card={secretCard}
                      isFlipped={true}
                      size="sm"
                    />
                  </div>

                  {/* Explanation summary */}
                  <div className="w-full bg-white p-3 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1">
                    <div className="font-heading font-black text-xs text-brand-purple">
                      Secret: {secretCard.name} ({secretCard.category})
                    </div>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      {secretCard.explanation}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setHostRevealedInModal(false);
                      setIsHostPeekModalOpen(false);
                    }}
                    className="w-full py-3.5 rounded-card font-heading font-black text-sm text-white bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple shadow-md"
                  >
                    ✕ Hide Secret & Hand Back to {guesserPlayer.name}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Guess Submission Modal */}
      {isGuessModalOpen && (
        <GuessSubmissionModal
          isOpen={isGuessModalOpen}
          onClose={() => setIsGuessModalOpen(false)}
          onSubmit={submitGuess}
          guessesRemaining={guessesLeft}
          categoryName={categoryInfo?.name || 'Secret Card'}
        />
      )}
    </div>
  );
};
