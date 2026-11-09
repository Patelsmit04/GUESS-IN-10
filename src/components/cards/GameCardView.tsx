'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/types/card';
import { HelpCircle, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/features/cards/data/categories';

interface GameCardViewProps {
  card?: Card | null;
  isFlipped: boolean; // false = back shown (mystery), true = front shown (revealed)
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  onFlip?: () => void;
  className?: string;
}

export const GameCardView: React.FC<GameCardViewProps> = ({
  card,
  isFlipped,
  size = 'md',
  showDetails = true,
  onFlip,
  className = '',
}) => {
  const categoryInfo = card ? CATEGORIES.find((c) => c.id === card.category) : null;

  // Generous dimensions to guarantee no text truncation or card squishing
  const dimensions = {
    sm: { width: 260, height: 420, widthClass: 'w-[260px]', heightClass: 'h-[420px]' },
    md: { width: 340, height: 530, widthClass: 'w-[330px] sm:w-[340px]', heightClass: 'h-[520px] sm:h-[530px]' },
    lg: { width: 360, height: 560, widthClass: 'w-[350px] sm:w-[360px]', heightClass: 'h-[550px] sm:h-[560px]' },
  }[size];

  // 3 Clues
  const displayedClues = card?.clues && card.clues.length >= 3
    ? card.clues
    : [
        ...(card?.primaryClues || []),
        ...(card?.secondaryClues || []),
      ].slice(0, 3);

  // 3 Buzz words
  const buzzWords = card?.buzzWords || ['Clue 1', 'Clue 2', 'Clue 3'];

  // 4 Fact Grid items
  const factGrid = card?.factGrid && card.factGrid.length >= 4
    ? card.factGrid
    : [
        { icon: '🌍', label: 'Domain', value: card?.category || 'Nature' },
        { icon: '⭐', label: 'Difficulty', value: card?.difficulty || 'Medium' },
        { icon: '🏷️', label: 'Verified', value: '100% Fact' },
        { icon: '✨', label: 'Game', value: 'Guess 10' },
      ];

  return (
    <div
      onClick={onFlip}
      className={`perspective-1000 relative select-none shrink-0 ${dimensions.widthClass} ${dimensions.heightClass} ${className} ${onFlip ? 'cursor-pointer' : ''}`}
      style={{
        width: dimensions.width,
        minWidth: dimensions.width,
        height: dimensions.height,
        minHeight: dimensions.height,
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full h-full min-h-full transform-style-3d relative"
        style={{
          width: '100%',
          height: '100%',
          minHeight: dimensions.height,
        }}
      >
        {/* ================= CARD BACK (Mystery / Hidden Back) ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-card-lg backface-hidden shadow-card hover:shadow-card-hover transition-shadow overflow-hidden border-4 border-white flex flex-col items-center justify-between p-5 bg-gradient-to-br from-brand-purple via-indigo-600 to-brand-blue"
          style={{
            transform: 'rotateY(0deg)',
            height: dimensions.height,
            minHeight: dimensions.height,
          }}
        >
          {/* Subtle background decorative shapes */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full border-8 border-white"></div>
            <div className="absolute top-1/2 -right-12 w-52 h-52 rounded-full border-8 border-white"></div>
            <div className="absolute -bottom-10 left-1/4 w-36 h-36 rounded-full border-8 border-white"></div>
          </div>

          {/* Top Banner with Official Logo */}
          <div className="z-10 flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-xl backdrop-blur-sm border border-white/25 shadow-sm">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-5 h-5 rounded-md object-contain border border-white/30"
              />
              <span className="text-[10px] uppercase tracking-widest font-black text-white">
                GUESS 10
              </span>
            </div>
            <span className="text-lg">✨</span>
          </div>

          {/* Center Graphic */}
          <div className="z-10 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-3xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-4xl sm:text-5xl shadow-inner mb-3">
              {categoryInfo?.icon || <HelpCircle className="w-12 h-12 text-white/90" />}
            </div>
            <p className="font-heading font-black text-white text-lg sm:text-xl drop-shadow-md">
              {categoryInfo?.name || 'Secret Card'}
            </p>
            <p className="text-xs font-semibold text-white/80 max-w-[220px] mt-1.5 leading-snug">
              Ask up to 10 strategic Yes/No questions to identify this secret card!
            </p>
          </div>

          {/* Bottom Card Footer */}
          <div className="z-10 w-full flex items-center justify-center gap-1.5 text-white/80 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" /> Mystery Card Locked
          </div>
        </div>

        {/* ================= CARD FRONT (Physical Card Replica) ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-card-lg backface-hidden shadow-card border-4 border-emerald-600 bg-[#2D5A27] flex flex-col overflow-hidden rotate-y-180 text-white"
          style={{
            transform: 'rotateY(180deg)',
            backgroundColor: categoryInfo?.color ? `${categoryInfo.color}` : '#1E3A8A',
            height: dimensions.height,
            minHeight: dimensions.height,
          }}
        >
          {card ? (
            <div className="w-full h-full flex flex-col p-3 sm:p-3.5 justify-between bg-gradient-to-b from-black/25 via-transparent to-black/35">
              {/* 1. TOP TITLE BANNER */}
              <div className="w-full flex items-center justify-center">
                <div className="w-full bg-emerald-800/95 border-2 border-emerald-400/80 rounded-xl py-1 px-3 text-center shadow-md">
                  <h2 className="font-heading font-black text-base sm:text-lg uppercase tracking-wider text-white drop-shadow truncate">
                    {card.name}
                  </h2>
                </div>
              </div>

              {/* 2. ART & SCENERY AREA (Compact height gives room for clues & facts) */}
              <div className="w-full h-20 sm:h-22 rounded-xl bg-gradient-to-b from-emerald-900/60 to-emerald-950/80 border border-white/20 flex items-center justify-center relative overflow-hidden my-1 shadow-inner shrink-0">
                <span className="text-4xl sm:text-5xl drop-shadow-lg transform hover:scale-110 transition-transform">
                  {card.emoji || '🌟'}
                </span>
                <div className="absolute top-1.5 right-2 flex items-center gap-1 bg-black/45 px-2 py-0.5 rounded-full text-[10px] text-white/90 font-bold backdrop-blur-sm border border-white/20">
                  <span>{categoryInfo?.icon}</span>
                  <span className="capitalize">{card.difficulty}</span>
                </div>
              </div>

              {/* 3. BUZZ-WORDS PILL BAR (Thematic anchor clues) */}
              <div className="w-full bg-black/45 border border-white/25 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px] font-bold my-1 shadow-inner shrink-0">
                <span className="text-amber-300 font-black uppercase text-[10px] tracking-wider shrink-0 pr-1.5 border-r border-white/25">
                  Buzz-words
                </span>
                <div className="flex items-center justify-around flex-1 text-white font-bold pl-2 text-[11px]">
                  <span className="truncate max-w-[85px]">{buzzWords[0]}</span>
                  <span className="text-white/40">|</span>
                  <span className="truncate max-w-[85px]">{buzzWords[1]}</span>
                  <span className="text-white/40">|</span>
                  <span className="truncate max-w-[85px]">{buzzWords[2]}</span>
                </div>
              </div>

              {/* 4. MAIN CLUES & FACTS 2x2 GRID (No truncation, comfortable line height) */}
              <div className="grid grid-cols-12 gap-2 my-1 items-stretch flex-1">
                {/* Numbered Clues 1, 2, 3 (Col 7) */}
                <div className="col-span-7 bg-black/30 rounded-xl p-2.5 border border-white/20 flex flex-col justify-around space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block mb-0.5">
                    Clues
                  </span>
                  {displayedClues.map((clue, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[10px] sm:text-[11px] leading-snug text-white/95">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="break-words leading-tight">{clue}</span>
                    </div>
                  ))}
                </div>

                {/* Facts 2x2 Grid (Col 5) - No truncation, words wrap cleanly */}
                <div className="col-span-5 bg-amber-50 rounded-xl p-1.5 text-gray-800 border border-amber-200 flex flex-col justify-between shadow-sm">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 text-center block mb-0.5">
                    Facts
                  </span>
                  <div className="grid grid-cols-2 gap-1 text-[9px] leading-tight text-center my-auto">
                    {factGrid.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/95 p-1 rounded-md border border-amber-100 flex flex-col items-center justify-center min-h-[40px]"
                      >
                        <span className="text-xs leading-none">{item.icon}</span>
                        <span className="font-bold text-[8px] text-gray-500 uppercase mt-0.5 line-clamp-1">
                          {item.label}
                        </span>
                        <span className="font-black text-[9px] text-gray-900 leading-tight break-words text-center px-0.5">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. BONUS BOX AT BOTTOM (No truncation, multi-line wrap) */}
              <div className="w-full bg-emerald-950/95 border border-emerald-400/50 rounded-xl p-2 sm:p-2.5 flex items-start gap-2 mt-1 shadow-inner shrink-0">
                <span className="bg-amber-400 text-black font-black text-[9px] uppercase px-1.5 py-0.5 rounded-md tracking-wider shrink-0 shadow mt-0.5">
                  BONUS
                </span>
                <p className="text-[10px] sm:text-[10.5px] text-white/95 leading-snug break-words">
                  {card.bonusTrivia?.question || card.funFact || card.explanation}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-xs">
              No card selected
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
