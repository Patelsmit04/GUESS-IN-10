'use client';

import React from 'react';
import { useGameStore } from '@/features/game/state/gameStore';
import { Volume2, VolumeX, Sparkles, BookOpen, Settings as SettingsIcon, Layers } from 'lucide-react';
import { soundManager } from '@/lib/audio/soundManager';

interface HeaderProps {
  onOpenRules: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRules }) => {
  const { phase, setPhase, preferences, updatePreferences } = useGameStore();

  const toggleSound = () => {
    const nextState = !preferences.soundEnabled;
    updatePreferences({ soundEnabled: nextState });
    if (nextState) {
      soundManager.playClick();
    }
  };

  const isGameActive = ['card-selection', 'privacy-transition', 'playing', 'round-result'].includes(phase);

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-brand-border sticky top-0 z-40 transition-all">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Logo / Brand */}
        <button
          onClick={() => {
            if (isGameActive) {
              if (confirm('Leave current game and return to Home?')) {
                setPhase('home');
              }
            } else {
              setPhase('home');
            }
          }}
          className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none min-w-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-brand-purple/20 shadow-md group-hover:scale-105 transition-transform bg-white flex items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="GUESS 10 Official Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left min-w-0">
            <span className="font-heading font-black text-base sm:text-xl tracking-tight text-brand-purple flex items-center gap-1">
              GUESS 10 <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-yellow fill-brand-yellow shrink-0" />
            </span>
            <span className="hidden xs:block text-[9px] sm:text-[10px] uppercase font-bold text-brand-text-muted tracking-wider -mt-0.5 sm:-mt-1 truncate">
              Yes/No Card Trivia
            </span>
          </div>
        </button>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
          {/* Rules Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenRules();
            }}
            aria-label="How to play rules"
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-control text-xs sm:text-sm font-bold text-brand-purple bg-brand-purple-light hover:bg-brand-purple hover:text-white transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Rules</span>
          </button>

          {/* Collection Shortcut */}
          <button
            onClick={() => setPhase('collection')}
            aria-label="View collection"
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-control text-xs sm:text-sm font-bold transition-colors ${
              phase === 'collection'
                ? 'bg-brand-purple text-white'
                : 'text-brand-text hover:bg-gray-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Collection</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={preferences.soundEnabled ? 'Mute sound' : 'Unmute sound'}
            className="p-1.5 sm:p-2 rounded-control text-brand-text-muted hover:text-brand-purple hover:bg-gray-100 transition-colors"
          >
            {preferences.soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-purple" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            )}
          </button>

          {/* Settings Shortcut */}
          <button
            onClick={() => setPhase('settings')}
            aria-label="Game settings"
            className={`p-1.5 sm:p-2 rounded-control transition-colors ${
              phase === 'settings'
                ? 'bg-brand-purple text-white'
                : 'text-brand-text-muted hover:text-brand-purple hover:bg-gray-100'
            }`}
          >
            <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

