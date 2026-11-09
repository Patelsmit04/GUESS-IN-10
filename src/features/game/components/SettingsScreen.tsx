'use client';

import React, { useState } from 'react';
import { useGameStore } from '../state/gameStore';
import { StorageManager } from '@/lib/storage/localStorage';
import { ArrowLeft, Volume2, VolumeX, Eye, RotateCcw, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import { soundManager } from '@/lib/audio/soundManager';

export const SettingsScreen: React.FC = () => {
  const { setPhase, preferences, updatePreferences } = useGameStore();
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleToggleSound = () => {
    const nextVal = !preferences.soundEnabled;
    updatePreferences({ soundEnabled: nextVal });
    if (nextVal) {
      soundManager.playClick();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    updatePreferences({ volume: vol });
  };

  const handleToggleReducedMotion = () => {
    updatePreferences({ reducedMotion: !preferences.reducedMotion });
    soundManager.playClick();
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all game stats and unlocked cards?')) {
      StorageManager.resetAll();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
      soundManager.playClick();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPhase('home')}
          className="flex items-center gap-1.5 text-sm font-bold text-brand-purple hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <span className="text-xs uppercase tracking-wider font-extrabold text-brand-text-muted">
          Preferences
        </span>
      </div>

      <div className="bg-white rounded-modal p-6 sm:p-8 shadow-card border border-brand-border space-y-6">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-brand-purple flex items-center gap-2">
            <Sliders className="w-6 h-6 text-brand-purple" /> Game Settings
          </h1>
          <p className="text-xs sm:text-sm text-brand-text-muted mt-1">
            Customize audio, accessibility, and local game storage.
          </p>
        </div>

        {/* 1. Audio Section */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <h2 className="text-xs uppercase font-extrabold tracking-wider text-brand-text flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-brand-purple" /> Audio & Sound Effects
          </h2>

          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-card border border-gray-100">
            <div>
              <div className="font-bold text-sm text-brand-text">Sound Effects</div>
              <div className="text-xs text-brand-text-muted">
                Tactile chimes for card flips, Yes/No answers, clues, and victory.
              </div>
            </div>
            <button
              onClick={handleToggleSound}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                preferences.soundEnabled ? 'bg-brand-purple' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  preferences.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Volume slider */}
          {preferences.soundEnabled && (
            <div className="space-y-2 px-1">
              <div className="flex justify-between text-xs font-bold text-brand-text">
                <span>Volume</span>
                <span>{Math.round(preferences.volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={preferences.volume}
                onChange={handleVolumeChange}
                className="w-full accent-brand-purple cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* 2. Accessibility & Animation Section */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <h2 className="text-xs uppercase font-extrabold tracking-wider text-brand-text flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-brand-purple" /> Motion & Accessibility
          </h2>

          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-card border border-gray-100">
            <div>
              <div className="font-bold text-sm text-brand-text">Reduced Motion Mode</div>
              <div className="text-xs text-brand-text-muted">
                Minimizes 3D rotations, transitions, and particle animations.
              </div>
            </div>
            <button
              onClick={handleToggleReducedMotion}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                preferences.reducedMotion ? 'bg-brand-purple' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  preferences.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 3. Local Data Management */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <h2 className="text-xs uppercase font-extrabold tracking-wider text-brand-text flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-brand-purple" /> Local Storage & Privacy
          </h2>

          <div className="p-3.5 bg-gray-50 rounded-card border border-gray-100 space-y-3">
            <div className="text-xs text-brand-text leading-relaxed">
              GUESS 10 is 100% free and private. No accounts, cookies, ads, or external data tracking are ever used. All unlocked cards are saved directly on this browser.
            </div>

            <button
              onClick={handleResetData}
              className="px-4 py-2 rounded-control text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Local Stats & Unlocked Cards
            </button>

            {resetSuccess && (
              <span className="text-xs text-green-600 font-bold block">
                ✓ Local game data reset successfully!
              </span>
            )}
          </div>
        </div>

        {/* Version info */}
        <div className="pt-2 text-center text-[11px] text-gray-400">
          GUESS 10 • Version 1.0 MVP • Built for Family Trivia Fun
        </div>
      </div>
    </div>
  );
};

