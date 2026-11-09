'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { Smartphone, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { soundManager } from '@/lib/audio/soundManager';

export const PrivacyTransitionScreen: React.FC = () => {
  const { players, guesserIndex, hostIndex, confirmPrivacy } = useGameStore();

  const hostPlayer = players[hostIndex] || players[0];
  const guesserPlayer = players[guesserIndex] || players[1];

  const handleContinue = () => {
    soundManager.playClick();
    confirmPrivacy();
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[75vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-white rounded-modal p-6 sm:p-8 border border-brand-border shadow-float text-center space-y-6"
      >
        {/* Official Logo & Animated Pass Device Illustration */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border-2 border-brand-purple/20 bg-white p-1">
            <img
              src="/logo.png"
              alt="GUESS 10 Official Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <motion.div
            animate={{ rotate: [-6, 6, -6], y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-2xl bg-brand-purple-light text-brand-purple flex items-center justify-center shadow-inner text-4xl"
          >
            📱
          </motion.div>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Pass & Play Handover
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-brand-text">
            Pass the device to {guesserPlayer.name}!
          </h1>
          <p className="text-sm text-brand-text-muted mt-2 max-w-sm mx-auto">
            {hostPlayer.name} has locked in the secret card. Now it’s {guesserPlayer.name}’s turn to ask up to 10 questions and guess!
          </p>
        </div>

        {/* Guesser Callout Card */}
        <div className="bg-brand-bg p-4 rounded-card border border-brand-border flex items-center justify-center gap-3">
          <span className="text-3xl">{guesserPlayer.avatar}</span>
          <div className="text-left">
            <div className="font-heading font-black text-base text-brand-purple">
              {guesserPlayer.name} is Guessing
            </div>
            <div className="text-xs text-brand-text-muted">
              Ready to ask questions 1 through 10
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-card font-heading font-black text-lg text-white bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple flex items-center justify-center gap-2 shadow-lg transition-transform"
        >
          <UserCheck className="w-5 h-5" />
          <span>I am {guesserPlayer.name}, Let’s Play!</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};

