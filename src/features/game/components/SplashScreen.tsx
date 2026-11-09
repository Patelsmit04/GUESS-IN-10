'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { Sparkles } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setPhase } = useGameStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('home');
    }, 1800);
    return () => clearTimeout(timer);
  }, [setPhase]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-brand-purple via-indigo-700 to-brand-blue text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* Official Logo Banner */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden shadow-2xl mb-5 border-4 border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center p-1"
        >
          <img
            src="/logo.png"
            alt="GUESS 10 Official Logo"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>

        {/* Title */}
        <h1 className="font-heading font-black text-4xl sm:text-5xl tracking-tight flex items-center gap-2 drop-shadow-md">
          GUESS 10 <Sparkles className="w-8 h-8 text-brand-yellow fill-brand-yellow animate-pulse" />
        </h1>

        <p className="text-white/80 font-medium text-sm sm:text-base mt-2 tracking-wide uppercase">
          The Yes/No Card Guessing Experience
        </p>

        {/* Subtle Loading Dots */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              className="w-2.5 h-2.5 rounded-full bg-brand-yellow shadow"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

