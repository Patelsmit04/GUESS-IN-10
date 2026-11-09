import { Card, CardCategory, CardDifficulty } from './card';
import { Player } from './player';

export type GamePhase =
  | 'splash'
  | 'home'
  | 'setup'
  | 'category-selection'
  | 'card-selection'
  | 'privacy-transition'
  | 'playing'
  | 'guess-submission'
  | 'round-result'
  | 'match-result'
  | 'collection'
  | 'settings';

export type GameMode = 'one-on-one' | 'team';

export type QuestionAnswer = 'yes' | 'no' | 'unknown';

export interface QuestionRecord {
  id: string;
  number: number;
  text: string;
  response: QuestionAnswer;
  timestamp: number;
  askerId: string;
  isBonus: boolean;
}

export interface GuessRecord {
  id: string;
  guess: string;
  isCorrect: boolean;
  timestamp: number;
  guesserId: string;
  feedback?: string;
}

export interface GameRulesConfig {
  maxQuestions: number; // default 10
  targetCardsToWin: number; // default 7
  maxGuessesPerRound: number; // default 3
  allowUnknownAnswer: boolean; // default true
  bonusQuestionLimit: number; // default 1 per round
  startingCluesCount: {
    hint: number;
    eliminate: number;
    bonus: number;
  };
}

export interface RoundResult {
  secretCard: Card;
  winnerPlayerId: string | null;
  outcome: 'correct_guess' | 'exhausted' | 'max_guesses_reached';
  finalGuess?: string;
  questionsUsed: number;
  cluesUsedCount: number;
  history: QuestionRecord[];
}

export interface MatchStats {
  totalRounds: number;
  totalQuestionsAsked: number;
  totalGuessesMade: number;
  cluesUsed: number;
  matchDurationMs: number;
  startTime: number;
}

