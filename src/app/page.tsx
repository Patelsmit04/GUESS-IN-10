'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/features/game/state/gameStore';
import { Header } from '@/components/layout/Header';
import { RulesModal } from '@/components/modals/RulesModal';
import { SplashScreen } from '@/features/game/components/SplashScreen';
import { HomeScreen } from '@/features/game/components/HomeScreen';
import { SetupScreen } from '@/features/game/components/SetupScreen';
import { CategoryScreen } from '@/features/game/components/CategoryScreen';
import { CardSelectionScreen } from '@/features/game/components/CardSelectionScreen';
import { PrivacyTransitionScreen } from '@/features/game/components/PrivacyTransitionScreen';
import { PlayingScreen } from '@/features/game/components/PlayingScreen';
import { RoundResultScreen } from '@/features/game/components/RoundResultScreen';
import { MatchResultScreen } from '@/features/game/components/MatchResultScreen';
import { CollectionScreen } from '@/features/game/components/CollectionScreen';
import { SettingsScreen } from '@/features/game/components/SettingsScreen';
import { AnimatePresence, motion } from 'framer-motion';

export default function Guess10App() {
  const { phase } = useGameStore();
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F7F6FF]">
      {/* Header (hidden only on full-screen splash) */}
      {phase !== 'splash' && (
        <Header onOpenRules={() => setIsRulesModalOpen(true)} />
      )}

      {/* Main Content Area with Phase Routing */}
      <main className="flex-1 flex flex-col justify-start pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {phase === 'splash' && <SplashScreen />}
            {phase === 'home' && (
              <HomeScreen onOpenRules={() => setIsRulesModalOpen(true)} />
            )}
            {phase === 'setup' && <SetupScreen />}
            {phase === 'category-selection' && <CategoryScreen />}
            {phase === 'card-selection' && <CardSelectionScreen />}
            {phase === 'privacy-transition' && <PrivacyTransitionScreen />}
            {phase === 'playing' && <PlayingScreen />}
            {phase === 'round-result' && <RoundResultScreen />}
            {phase === 'match-result' && <MatchResultScreen />}
            {phase === 'collection' && <CollectionScreen />}
            {phase === 'settings' && <SettingsScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Rules & Tutorial Modal */}
      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />
    </div>
  );
}

