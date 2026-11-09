'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../state/gameStore';
import { GameMode } from '@/types/game';
import { CardCategory } from '@/types/card';
import { CATEGORIES } from '@/features/cards/data/categories';
import { ArrowLeft, Play, Users, User, Trophy, Sparkles } from 'lucide-react';
import { soundManager } from '@/lib/audio/soundManager';

const AVATAR_OPTIONS = ['🦊', '🦉', '🦁', '🐼', '🚀', '⚡', '🌟', '🦄', '🐬', '🐯'];

export const SetupScreen: React.FC = () => {
  const { setPhase, configureGame, selectedCategory, rules } = useGameStore();

  const [mode, setMode] = useState<GameMode>('one-on-one');
  const [category, setCategory] = useState<CardCategory>(selectedCategory || 'animals');
  const [targetCards, setTargetCards] = useState<number>(rules.targetCardsToWin || 7);

  // Player / Team names & avatars
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player1Avatar, setPlayer1Avatar] = useState('🦊');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player2Avatar, setPlayer2Avatar] = useState('🦉');

  const [team1Name, setTeam1Name] = useState('Team Lightning');
  const [team1Avatar, setTeam1Avatar] = useState('⚡');
  const [team2Name, setTeam2Name] = useState('Team Cosmic');
  const [team2Avatar, setTeam2Avatar] = useState('🌟');

  const handleStart = () => {
    soundManager.playClick();
    if (mode === 'one-on-one') {
      configureGame(
        'one-on-one',
        [
          { name: player1Name.trim() || 'Player 1', avatar: player1Avatar, color: '#7357FF' },
          { name: player2Name.trim() || 'Player 2', avatar: player2Avatar, color: '#38BDF8' },
        ],
        targetCards,
        category
      );
    } else {
      configureGame(
        'team',
        [
          { name: team1Name.trim() || 'Team A', avatar: team1Avatar, color: '#7357FF', isTeam: true },
          { name: team2Name.trim() || 'Team B', avatar: team2Avatar, color: '#F59E0B', isTeam: true },
        ],
        targetCards,
        category
      );
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
          Game Configuration
        </span>
      </div>

      <div className="bg-white rounded-modal p-6 sm:p-8 shadow-card border border-brand-border space-y-6">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-brand-purple">
            New Match Setup
          </h1>
          <p className="text-xs sm:text-sm text-brand-text-muted mt-1">
            Choose game mode, players, category, and target victory cards.
          </p>
        </div>

        {/* 1. Mode Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-text">
            1. Select Mode
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMode('one-on-one');
              }}
              className={`p-3.5 rounded-card border-2 flex items-center justify-center gap-2.5 font-bold text-sm transition-all ${
                mode === 'one-on-one'
                  ? 'border-brand-purple bg-brand-purple-light text-brand-purple shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <User className="w-4 h-4" /> 1-on-1 Pass & Play
            </button>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMode('team');
              }}
              className={`p-3.5 rounded-card border-2 flex items-center justify-center gap-2.5 font-bold text-sm transition-all ${
                mode === 'team'
                  ? 'border-brand-purple bg-brand-purple-light text-brand-purple shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <Users className="w-4 h-4" /> Team Battle
            </button>
          </div>
        </div>

        {/* 2. Players / Teams Config */}
        <div className="space-y-3.5 bg-gray-50/70 p-4 rounded-card border border-gray-100">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-text">
            {mode === 'one-on-one' ? '2. Player Names & Avatars' : '2. Team Names & Avatars'}
          </label>

          {mode === 'one-on-one' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Player 1 */}
              <div className="space-y-1.5 min-w-0">
                <span className="text-xs font-semibold text-gray-500">Player 1</span>
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <select
                    value={player1Avatar}
                    onChange={(e) => setPlayer1Avatar(e.target.value)}
                    className="p-2 text-xl bg-white border border-gray-200 rounded-xl shrink-0"
                  >
                    {AVATAR_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={player1Name}
                    maxLength={16}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    placeholder="Player 1"
                    className="flex-1 min-w-0 w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-brand-purple"
                  />
                </div>
              </div>

              {/* Player 2 */}
              <div className="space-y-1.5 min-w-0">
                <span className="text-xs font-semibold text-gray-500">Player 2</span>
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <select
                    value={player2Avatar}
                    onChange={(e) => setPlayer2Avatar(e.target.value)}
                    className="p-2 text-xl bg-white border border-gray-200 rounded-xl shrink-0"
                  >
                    {AVATAR_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={player2Name}
                    maxLength={16}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    placeholder="Player 2"
                    className="flex-1 min-w-0 w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-brand-purple"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Team 1 */}
              <div className="space-y-1.5 min-w-0">
                <span className="text-xs font-semibold text-gray-500">Team 1</span>
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <select
                    value={team1Avatar}
                    onChange={(e) => setTeam1Avatar(e.target.value)}
                    className="p-2 text-xl bg-white border border-gray-200 rounded-xl shrink-0"
                  >
                    {AVATAR_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={team1Name}
                    maxLength={18}
                    onChange={(e) => setTeam1Name(e.target.value)}
                    placeholder="Team 1"
                    className="flex-1 min-w-0 w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-brand-purple"
                  />
                </div>
              </div>

              {/* Team 2 */}
              <div className="space-y-1.5 min-w-0">
                <span className="text-xs font-semibold text-gray-500">Team 2</span>
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <select
                    value={team2Avatar}
                    onChange={(e) => setTeam2Avatar(e.target.value)}
                    className="p-2 text-xl bg-white border border-gray-200 rounded-xl shrink-0"
                  >
                    {AVATAR_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={team2Name}
                    maxLength={18}
                    onChange={(e) => setTeam2Name(e.target.value)}
                    placeholder="Team 2"
                    className="flex-1 min-w-0 w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-brand-purple"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Category Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-text">
            3. Choose Starting Category (10 Categories Available)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setCategory(cat.id);
                }}
                className={`p-2.5 rounded-xl border-2 text-left flex flex-col justify-between transition-all min-h-[96px] ${
                  category === cat.id
                    ? 'border-brand-purple bg-brand-purple-light text-brand-purple font-bold shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                }`}
              >
                <span className="text-2xl mb-1">{cat.icon}</span>
                <div className="w-full min-w-0">
                  <div className="text-xs font-heading font-black leading-tight break-words line-clamp-2 min-h-[2rem] flex items-center">
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-gray-400 font-normal mt-0.5">
                    {cat.cardCount} cards
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Target Victory Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-text flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-brand-yellow" /> 4. Match Target (Cards to Win)
            </label>
            <span className="text-xs font-black text-brand-purple bg-brand-purple-light px-2.5 py-0.5 rounded-full">
              {targetCards} Cards to Win
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[
              { num: 3, label: '3', sub: 'Quick' },
              { num: 5, label: '5', sub: 'Fast' },
              { num: 7, label: '7', sub: 'Classic' },
              { num: 10, label: '10', sub: 'Pro' },
              { num: 15, label: '15', sub: 'Marathon' },
            ].map(({ num, label, sub }) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setTargetCards(num);
                }}
                className={`py-2 px-1.5 rounded-xl border-2 text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
                  targetCards === num
                    ? 'border-brand-purple bg-brand-purple text-white shadow-sm'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                }`}
              >
                <span className="font-heading font-black text-sm">{label}</span>
                <span className={`text-[10px] ${targetCards === num ? 'text-white/90' : 'text-gray-400'}`}>
                  ({sub})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full py-4 rounded-card font-heading font-black text-lg text-white bg-brand-purple hover:bg-brand-purple-dark btn-tactile-purple flex items-center justify-center gap-2 shadow-lg transition-transform"
        >
          <Play className="w-5 h-5 fill-current" />
          Start Match!
        </button>
      </div>
    </div>
  );
};

