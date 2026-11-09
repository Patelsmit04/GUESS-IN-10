export type CardCategory = 
  | 'animals' 
  | 'countries' 
  | 'cities'
  | 'wonders_india'
  | 'space'
  | 'sports'
  | 'landmarks'
  | 'food'
  | 'professions'
  | 'dinosaurs';

export type CardDifficulty = 'easy' | 'medium' | 'hard';

export type CardVerificationStatus = 'verified' | 'pending';

export interface CardFactGridItem {
  icon: string;
  label: string;
  value: string;
}

export interface CardBonusQuestion {
  question: string;
  answer: string;
}

export interface Card {
  id: string;
  category: CardCategory;
  name: string;
  difficulty: CardDifficulty;
  buzzWords: [string, string, string]; // 3 anchor buzz words revealed to guesser
  clues: string[]; // 3 numbered clues matching physical card
  primaryClues: string[];
  secondaryClues: string[];
  facts: {
    [key: string]: boolean | string | number;
  };
  factGrid?: CardFactGridItem[]; // 2x2 grid of facts on card
  bonusTrivia?: CardBonusQuestion; // Bottom BONUS box
  aliases: string[];
  explanation: string;
  verificationStatus: CardVerificationStatus;
  emoji?: string;
  funFact?: string;
  eliminationClues?: string[]; // Used for "Eliminate a possibility" clue
}

export interface CategoryInfo {
  id: CardCategory;
  name: string;
  icon: string;
  description: string;
  color: string;
  accentBg: string;
  cardCount: number;
}
