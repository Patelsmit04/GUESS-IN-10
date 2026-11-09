import { create } from 'zustand';
import { Card, CardCategory } from '@/types/card';
import { GameMode, GamePhase, GameRulesConfig, GuessRecord, QuestionAnswer, QuestionRecord, RoundResult } from '@/types/game';
import { Player } from '@/types/player';
import { CardRepository } from '@/features/cards/repository/cardRepository';
import { soundManager } from '@/lib/audio/soundManager';
import { StorageManager, UserPreferences } from '@/lib/storage/localStorage';

export interface GameState {
  // Phase & Navigation
  phase: GamePhase;
  previousPhase?: GamePhase;
  
  // Game Setup
  mode: GameMode;
  selectedCategory: CardCategory;
  rules: GameRulesConfig;
  players: Player[];
  currentRound: number;
  hostIndex: number;
  guesserIndex: number;

  // Active Round State
  secretCard: Card | null;
  privacyConfirmed: boolean;
  questionCount: number; // 0 to 10
  bonusQuestionsGranted: number; // extra questions from bonus clue
  bonusQuestionsUsed: number;
  bonusClueUsedThisRound: boolean;
  questionHistory: QuestionRecord[];
  guessHistory: GuessRecord[];
  
  // Active Clues in Round
  activeHints: string[];
  activeEliminations: string[];

  // Outcome
  roundResult: RoundResult | null;
  matchWinner: Player | null;

  // App & Preferences State
  preferences: UserPreferences;

  // Actions
  setPhase: (phase: GamePhase) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  startSetup: () => void;
  configureGame: (
    mode: GameMode,
    playerConfigs: { name: string; avatar: string; color: string; isTeam?: boolean; members?: string[] }[],
    targetCards: number,
    category: CardCategory
  ) => void;
  selectCategory: (category: CardCategory) => void;
  selectSecretCard: (card: Card) => void;
  selectRandomSecretCard: () => void;
  confirmPrivacy: () => void;
  answerQuestion: (text: string, response: QuestionAnswer) => void;
  useClue: (type: 'hint' | 'eliminate' | 'bonus') => { success: boolean; message: string };
  submitGuess: (guessText: string) => { isCorrect: boolean; feedback: string };
  nextRound: () => void;
  resetMatch: () => void;
  quitToHome: () => void;
}

const DEFAULT_RULES: GameRulesConfig = {
  maxQuestions: 10,
  targetCardsToWin: 7,
  maxGuessesPerRound: 3,
  allowUnknownAnswer: true,
  bonusQuestionLimit: 1,
  startingCluesCount: {
    hint: 1,
    eliminate: 1,
    bonus: 1,
  },
};

const INITIAL_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Player 1',
    avatar: '🦊',
    color: '#7357FF',
    score: 0,
    collectedCardIds: [],
    cluesRemaining: { hint: 1, eliminate: 1, bonus: 1 },
  },
  {
    id: 'p2',
    name: 'Player 2',
    avatar: '🦉',
    color: '#38BDF8',
    score: 0,
    collectedCardIds: [],
    cluesRemaining: { hint: 1, eliminate: 1, bonus: 1 },
  },
];

export const useGameStore = create<GameState>((set, get) => {
  const initialPrefs = StorageManager.getPreferences();
  soundManager.setSoundEnabled(initialPrefs.soundEnabled);
  soundManager.setVolume(initialPrefs.volume);

  return {
    phase: 'splash',
    mode: 'one-on-one',
    selectedCategory: 'animals',
    rules: { ...DEFAULT_RULES, targetCardsToWin: initialPrefs.targetCards },
    players: INITIAL_PLAYERS,
    currentRound: 1,
    hostIndex: 0,
    guesserIndex: 1,

    secretCard: null,
    privacyConfirmed: false,
    questionCount: 0,
    bonusQuestionsGranted: 0,
    bonusQuestionsUsed: 0,
    bonusClueUsedThisRound: false,
    questionHistory: [],
    guessHistory: [],

    activeHints: [],
    activeEliminations: [],

    roundResult: null,
    matchWinner: null,
    preferences: initialPrefs,

    setPhase: (phase: GamePhase) => {
      soundManager.playClick();
      set((state) => ({ previousPhase: state.phase, phase }));
    },

    updatePreferences: (newPrefs: Partial<UserPreferences>) => {
      const updated = { ...get().preferences, ...newPrefs };
      if (newPrefs.soundEnabled !== undefined) {
        soundManager.setSoundEnabled(newPrefs.soundEnabled);
      }
      if (newPrefs.volume !== undefined) {
        soundManager.setVolume(newPrefs.volume);
      }
      StorageManager.savePreferences(updated);
      set({ preferences: updated });
    },

    startSetup: () => {
      soundManager.playClick();
      set({ phase: 'setup' });
    },

    configureGame: (mode, playerConfigs, targetCards, category) => {
      soundManager.playClick();
      const players: Player[] = playerConfigs.map((cfg, idx) => ({
        id: `player_${idx + 1}`,
        name: cfg.name || `Player ${idx + 1}`,
        avatar: cfg.avatar || '⭐',
        color: cfg.color || '#7357FF',
        score: 0,
        collectedCardIds: [],
        cluesRemaining: { hint: 1, eliminate: 1, bonus: 1 },
        isTeam: cfg.isTeam,
        members: cfg.members,
      }));

      set((state) => ({
        mode,
        players,
        selectedCategory: category,
        rules: { ...state.rules, targetCardsToWin: targetCards },
        currentRound: 1,
        hostIndex: 0,
        guesserIndex: 1,
        phase: 'card-selection',
        secretCard: null,
        privacyConfirmed: false,
        questionCount: 0,
        bonusQuestionsGranted: 0,
        bonusQuestionsUsed: 0,
        bonusClueUsedThisRound: false,
        questionHistory: [],
        guessHistory: [],
        activeHints: [],
        activeEliminations: [],
        roundResult: null,
        matchWinner: null,
      }));
    },

    selectCategory: (category: CardCategory) => {
      soundManager.playClick();
      set({ selectedCategory: category });
    },

    selectSecretCard: (card: Card) => {
      soundManager.playCardSelect();
      set({
        secretCard: card,
        phase: 'privacy-transition',
        privacyConfirmed: false,
      });
    },

    selectRandomSecretCard: () => {
      soundManager.playCardSelect();
      const { selectedCategory } = get();
      const randomCard = CardRepository.getRandomCard(selectedCategory);
      if (randomCard) {
        set({
          secretCard: randomCard,
          phase: 'privacy-transition',
          privacyConfirmed: false,
        });
      }
    },

    confirmPrivacy: () => {
      soundManager.playClick();
      set({
        privacyConfirmed: true,
        phase: 'playing',
      });
    },

    answerQuestion: (text: string, response: QuestionAnswer) => {
      const state = get();
      if (!state.secretCard) return;

      if (response === 'yes') soundManager.playAnswerYes();
      else if (response === 'no') soundManager.playAnswerNo();
      else soundManager.playAnswerUnknown();

      const totalAllowed = state.rules.maxQuestions + state.bonusQuestionsGranted;
      const currentUsed = state.questionCount + state.bonusQuestionsUsed;

      if (currentUsed >= totalAllowed) {
        return;
      }

      let newQuestionCount = state.questionCount;
      let newBonusUsed = state.bonusQuestionsUsed;
      const isBonus = state.questionCount >= state.rules.maxQuestions;

      if (isBonus) {
        newBonusUsed += 1;
      } else {
        newQuestionCount += 1;
      }

      const newRecord: QuestionRecord = {
        id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        number: currentUsed + 1,
        text: text.trim() || `Question #${currentUsed + 1}`,
        response,
        timestamp: Date.now(),
        askerId: state.players[state.guesserIndex].id,
        isBonus,
      };

      const updatedHistory = [...state.questionHistory, newRecord];

      // Check if questions are now completely exhausted
      const totalQuestionsNow = newQuestionCount + newBonusUsed;
      if (totalQuestionsNow >= totalAllowed) {
        // Automatically check if round ends due to exhausted questions
        soundManager.playLoss();
        StorageManager.recordGame(totalQuestionsNow);
        set({
          questionCount: newQuestionCount,
          bonusQuestionsUsed: newBonusUsed,
          questionHistory: updatedHistory,
          phase: 'round-result',
          roundResult: {
            secretCard: state.secretCard,
            winnerPlayerId: null,
            outcome: 'exhausted',
            questionsUsed: totalQuestionsNow,
            cluesUsedCount: state.activeHints.length + state.activeEliminations.length + (state.bonusClueUsedThisRound ? 1 : 0),
            history: updatedHistory,
          },
        });
        return;
      }

      set({
        questionCount: newQuestionCount,
        bonusQuestionsUsed: newBonusUsed,
        questionHistory: updatedHistory,
      });
    },

    useClue: (type: 'hint' | 'eliminate' | 'bonus') => {
      const state = get();
      const currentGuesser = state.players[state.guesserIndex];
      const cluesLeft = currentGuesser.cluesRemaining[type];

      if (cluesLeft <= 0) {
        return { success: false, message: `No ${type} clues remaining!` };
      }

      if (!state.secretCard) {
        return { success: false, message: 'No card selected' };
      }

      soundManager.playClueUse();

      // Deduct clue from current guesser
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === state.guesserIndex) {
          return {
            ...p,
            cluesRemaining: {
              ...p.cluesRemaining,
              [type]: p.cluesRemaining[type] - 1,
            },
          };
        }
        return p;
      });

      if (type === 'hint') {
        const availableClues = [
          ...state.secretCard.primaryClues,
          ...state.secretCard.secondaryClues,
        ].filter((c) => !state.activeHints.includes(c));

        const nextHint = availableClues[0] || 'No further hints available.';
        set({
          players: updatedPlayers,
          activeHints: [...state.activeHints, nextHint],
        });
        return { success: true, message: `Hint: "${nextHint}"` };
      }

      if (type === 'eliminate') {
        const availableEliminations = (state.secretCard.eliminationClues || [
          'Eliminate: This does not belong to any non-verified sub-tier.',
        ]).filter((e) => !state.activeEliminations.includes(e));

        const nextElimination = availableEliminations[0] || 'Eliminated a false path.';
        set({
          players: updatedPlayers,
          activeEliminations: [...state.activeEliminations, nextElimination],
        });
        return { success: true, message: `Elimination clue revealed!` };
      }

      if (type === 'bonus') {
        if (state.bonusClueUsedThisRound) {
          return { success: false, message: 'Bonus question already used this round!' };
        }
        set({
          players: updatedPlayers,
          bonusQuestionsGranted: state.bonusQuestionsGranted + 1,
          bonusClueUsedThisRound: true,
        });
        return { success: true, message: 'Granted +1 extra question for this round!' };
      }

      return { success: false, message: 'Unknown clue' };
    },

    submitGuess: (guessText: string) => {
      const state = get();
      if (!state.secretCard) return { isCorrect: false, feedback: 'No secret card active' };

      const validation = CardRepository.validateGuess(guessText, state.secretCard);
      const isCorrect = validation.isCorrect;

      const newGuessRecord: GuessRecord = {
        id: `guess_${Date.now()}`,
        guess: guessText,
        isCorrect,
        timestamp: Date.now(),
        guesserId: state.players[state.guesserIndex].id,
        feedback: isCorrect
          ? `Correct! The answer is ${state.secretCard.name}!`
          : `"${guessText}" is not correct.`,
      };

      const updatedGuessHistory = [...state.guessHistory, newGuessRecord];

      if (isCorrect) {
        soundManager.playCorrect();
        const guesser = state.players[state.guesserIndex];
        const newScore = guesser.score + 1;
        const newCollected = [...guesser.collectedCardIds, state.secretCard.id];

        // Save card into user local storage collection
        StorageManager.addCollectedCard(state.secretCard.id);
        StorageManager.recordGame(state.questionCount + state.bonusQuestionsUsed);

        const updatedPlayers = state.players.map((p, idx) => {
          if (idx === state.guesserIndex) {
            return {
              ...p,
              score: newScore,
              collectedCardIds: newCollected,
            };
          }
          return p;
        });

        const roundResult: RoundResult = {
          secretCard: state.secretCard,
          winnerPlayerId: guesser.id,
          outcome: 'correct_guess',
          finalGuess: guessText,
          questionsUsed: state.questionCount + state.bonusQuestionsUsed,
          cluesUsedCount: state.activeHints.length + state.activeEliminations.length + (state.bonusClueUsedThisRound ? 1 : 0),
          history: state.questionHistory,
        };

        // Check for match victory!
        if (newScore >= state.rules.targetCardsToWin) {
          soundManager.playVictory();
          set({
            players: updatedPlayers,
            guessHistory: updatedGuessHistory,
            roundResult,
            matchWinner: updatedPlayers[state.guesserIndex],
            phase: 'match-result',
          });
          return { isCorrect: true, feedback: `Match Victory! ${guesser.name} reached ${newScore} cards!` };
        }

        set({
          players: updatedPlayers,
          guessHistory: updatedGuessHistory,
          roundResult,
          phase: 'round-result',
        });
        return { isCorrect: true, feedback: `Correct! ${state.secretCard.name} is the secret card!` };
      } else {
        soundManager.playIncorrect();

        // Check if max guesses exceeded
        if (updatedGuessHistory.length >= state.rules.maxGuessesPerRound) {
          soundManager.playLoss();
          StorageManager.recordGame(state.questionCount + state.bonusQuestionsUsed);
          set({
            guessHistory: updatedGuessHistory,
            phase: 'round-result',
            roundResult: {
              secretCard: state.secretCard,
              winnerPlayerId: null,
              outcome: 'max_guesses_reached',
              finalGuess: guessText,
              questionsUsed: state.questionCount + state.bonusQuestionsUsed,
              cluesUsedCount: state.activeHints.length + state.activeEliminations.length + (state.bonusClueUsedThisRound ? 1 : 0),
              history: state.questionHistory,
            },
          });
          return { isCorrect: false, feedback: `Out of guess attempts! The card was ${state.secretCard.name}.` };
        }

        set({
          guessHistory: updatedGuessHistory,
        });
        return { isCorrect: false, feedback: `Incorrect guess! You have ${state.rules.maxGuessesPerRound - updatedGuessHistory.length} attempts remaining.` };
      }
    },

    nextRound: () => {
      soundManager.playClick();
      const state = get();
      const numPlayers = state.players.length;
      const nextHost = (state.hostIndex + 1) % numPlayers;
      const nextGuesser = (state.guesserIndex + 1) % numPlayers;

      set({
        currentRound: state.currentRound + 1,
        hostIndex: nextHost,
        guesserIndex: nextGuesser,
        secretCard: null,
        privacyConfirmed: false,
        questionCount: 0,
        bonusQuestionsGranted: 0,
        bonusQuestionsUsed: 0,
        bonusClueUsedThisRound: false,
        questionHistory: [],
        guessHistory: [],
        activeHints: [],
        activeEliminations: [],
        roundResult: null,
        phase: 'card-selection',
      });
    },

    resetMatch: () => {
      soundManager.playClick();
      const state = get();
      const resetPlayers = state.players.map((p) => ({
        ...p,
        score: 0,
        collectedCardIds: [],
        cluesRemaining: { hint: 1, eliminate: 1, bonus: 1 },
      }));

      set({
        currentRound: 1,
        hostIndex: 0,
        guesserIndex: 1,
        players: resetPlayers,
        secretCard: null,
        privacyConfirmed: false,
        questionCount: 0,
        bonusQuestionsGranted: 0,
        bonusQuestionsUsed: 0,
        bonusClueUsedThisRound: false,
        questionHistory: [],
        guessHistory: [],
        activeHints: [],
        activeEliminations: [],
        roundResult: null,
        matchWinner: null,
        phase: 'card-selection',
      });
    },

    quitToHome: () => {
      soundManager.playClick();
      set({
        phase: 'home',
        secretCard: null,
        roundResult: null,
        matchWinner: null,
      });
    },
  };
});

