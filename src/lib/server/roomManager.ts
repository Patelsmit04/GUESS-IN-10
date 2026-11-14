import { Card, CardCategory } from '@/types/card';
import { CardRepository } from '@/features/cards/repository/cardRepository';
import { GameRulesConfig, QuestionAnswer, QuestionRecord, GuessRecord, RoundResult } from '@/types/game';
import {
  ServerAuthoritativeRoom,
  ClientRoomState,
  RoomParticipant,
  OnlineGameMode,
  RoomAction,
} from '@/types/online';

// Common animal/element words for friendly room codes
const CODE_WORDS = [
  'LION', 'TIGER', 'PANDA', 'EAGLE', 'HAWK', 'BEAR', 'WOLF', 'FOX',
  'STAR', 'MOON', 'COMET', 'SOLAR', 'ATLAS', 'TITAN', 'NOVA', 'ORBIT'
];

function generateRoomCode(existingCodes: Set<string>): string {
  for (let i = 0; i < 50; i++) {
    const word = CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)];
    const num = Math.floor(10 + Math.random() * 90);
    const code = `${word}${num}`;
    if (!existingCodes.has(code)) return code;
  }
  return `G10${Math.floor(1000 + Math.random() * 9000)}`;
}

// Global in-memory room store (preserved across development fast-refresh)
interface RoomStoreGlobal {
  rooms: Map<string, ServerAuthoritativeRoom>;
  subscribers: Map<string, Set<(state: ServerAuthoritativeRoom) => void>>;
}

const globalForRooms = globalThis as unknown as { __guess10Rooms?: RoomStoreGlobal };
if (!globalForRooms.__guess10Rooms) {
  globalForRooms.__guess10Rooms = {
    rooms: new Map(),
    subscribers: new Map(),
  };
}

const store = globalForRooms.__guess10Rooms;

const DEFAULT_ONLINE_RULES: GameRulesConfig = {
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

export class RoomManager {
  /**
   * Broadcast updated room state to all active SSE subscribers
   */
  private static notifySubscribers(room: ServerAuthoritativeRoom) {
    const subs = store.subscribers.get(room.code);
    if (subs && subs.size > 0) {
      subs.forEach((callback) => {
        try {
          callback(room);
        } catch (err) {
          console.error(`Error notifying subscriber for room ${room.code}:`, err);
        }
      });
    }
  }

  /**
   * Subscribe to real-time room state updates
   */
  public static subscribe(
    code: string,
    callback: (state: ServerAuthoritativeRoom) => void
  ): () => void {
    if (!store.subscribers.has(code)) {
      store.subscribers.set(code, new Set());
    }
    const set = store.subscribers.get(code)!;
    set.add(callback);

    return () => {
      set.delete(callback);
      if (set.size === 0) {
        store.subscribers.delete(code);
      }
    };
  }

  /**
   * Create a new authoritative game room
   */
  public static createRoom(params: {
    hostId: string;
    hostName: string;
    hostAvatar: string;
    mode: OnlineGameMode;
    category: CardCategory;
    targetCards?: number;
    teamNameA?: string;
    teamNameB?: string;
  }): ServerAuthoritativeRoom {
    const existingCodes = new Set(store.rooms.keys());
    const code = generateRoomCode(existingCodes);
    const now = Date.now();

    const initialCard =
      CardRepository.getRandomCard(params.category) ||
      CardRepository.getAllCards()[0];

    const hostParticipant: RoomParticipant = {
      id: params.hostId,
      name: params.hostName.trim() || 'Player 1',
      avatar: params.hostAvatar || '🦊',
      team: 'A',
      isHost: true,
      isReady: true, // Host is ready by default
      isOnline: true,
      lastHeartbeat: now,
    };

    const room: ServerAuthoritativeRoom = {
      code,
      createdAt: now,
      updatedAt: now,
      status: 'waiting',
      mode: params.mode,
      category: params.category,
      targetCards: params.targetCards || 7,
      rules: { ...DEFAULT_ONLINE_RULES, targetCardsToWin: params.targetCards || 7 },

      teamA: {
        name: params.teamNameA || (params.mode === 'team' ? 'Team Alpha' : hostParticipant.name),
        avatar: hostParticipant.avatar,
        score: 0,
        collectedCardIds: [],
      },
      teamB: {
        name: params.teamNameB || (params.mode === 'team' ? 'Team Bravo' : 'Opponent'),
        avatar: '🦉',
        score: 0,
        collectedCardIds: [],
      },
      participants: {
        [params.hostId]: hostParticipant,
      },

      hostParticipantId: params.hostId,
      guesserParticipantId: '',
      hostTeam: 'A',
      guesserTeam: 'B',
      currentRound: 1,

      secretCard: initialCard,
      questionCount: 0,
      bonusQuestionsGranted: 0,
      bonusQuestionsUsed: 0,
      bonusClueUsedThisRound: false,
      questionHistory: [],
      guessHistory: [],
      activeHints: [],
      activeEliminations: [],
      cluesRemaining: {
        A: { hint: 1, eliminate: 1, bonus: 1 },
        B: { hint: 1, eliminate: 1, bonus: 1 },
      },

      roundResult: null,
      matchWinnerTeam: null,
      revision: 1,
      processedActionIds: [],
    };

    store.rooms.set(code, room);
    return room;
  }

  /**
   * Get canonical room by code
   */
  public static getRoom(code: string): ServerAuthoritativeRoom | null {
    const normalized = code.trim().toUpperCase();
    return store.rooms.get(normalized) || null;
  }

  /**
   * Join an existing room
   */
  public static joinRoom(params: {
    code: string;
    participantId: string;
    name: string;
    avatar: string;
    preferredTeam?: 'A' | 'B';
  }): { success: boolean; error?: string; room?: ServerAuthoritativeRoom } {
    const room = this.getRoom(params.code);
    if (!room) {
      return { success: false, error: 'Room not found. Please check your code.' };
    }

    if (room.status === 'cancelled' || room.status === 'expired') {
      return { success: false, error: 'This room has ended or expired.' };
    }

    const now = Date.now();
    const existing = room.participants[params.participantId];

    if (existing) {
      // Reconnecting existing participant
      existing.name = params.name.trim() || existing.name;
      existing.avatar = params.avatar || existing.avatar;
      existing.isOnline = true;
      existing.lastHeartbeat = now;
      room.updatedAt = now;
      room.revision += 1;
      this.notifySubscribers(room);
      return { success: true, room };
    }

    // Check capacity for 1v1
    const participantList = Object.values(room.participants);
    if (room.mode === 'one-on-one' && participantList.length >= 2) {
      return { success: false, error: 'Room is already full (2/2 players).' };
    }

    // Determine team
    let assignedTeam: 'A' | 'B' = 'B';
    if (params.preferredTeam) {
      assignedTeam = params.preferredTeam;
    } else {
      const countA = participantList.filter((p) => p.team === 'A').length;
      const countB = participantList.filter((p) => p.team === 'B').length;
      assignedTeam = countA <= countB ? 'A' : 'B';
    }

    const newParticipant: RoomParticipant = {
      id: params.participantId,
      name: params.name.trim() || `Player ${participantList.length + 1}`,
      avatar: params.avatar || '⭐',
      team: assignedTeam,
      isHost: false,
      isReady: false,
      isOnline: true,
      lastHeartbeat: now,
    };

    room.participants[params.participantId] = newParticipant;

    // In 1v1, if joining as Team B, assign guesser
    if (assignedTeam === 'B') {
      room.teamB.name = room.mode === 'team' ? room.teamB.name : newParticipant.name;
      room.teamB.avatar = newParticipant.avatar;
      if (!room.guesserParticipantId) {
        room.guesserParticipantId = params.participantId;
      }
    }

    // Update status if ready
    this.refreshLobbyStatus(room);
    room.updatedAt = now;
    room.revision += 1;
    this.notifySubscribers(room);

    return { success: true, room };
  }

  /**
   * Set participant ready state
   */
  public static setReady(code: string, participantId: string, isReady: boolean): boolean {
    const room = this.getRoom(code);
    if (!room || !room.participants[participantId]) return false;

    room.participants[participantId].isReady = isReady;
    this.refreshLobbyStatus(room);
    room.updatedAt = Date.now();
    room.revision += 1;
    this.notifySubscribers(room);
    return true;
  }

  /**
   * Switch participant team in lobby
   */
  public static switchTeam(code: string, participantId: string, newTeam: 'A' | 'B'): boolean {
    const room = this.getRoom(code);
    if (!room || !room.participants[participantId] || room.status !== 'waiting') return false;

    const p = room.participants[participantId];
    if (p.isHost && newTeam !== 'A') {
      return false; // Host remains on Team A
    }

    p.team = newTeam;
    this.refreshLobbyStatus(room);
    room.updatedAt = Date.now();
    room.revision += 1;
    this.notifySubscribers(room);
    return true;
  }

  /**
   * Update match settings from lobby (Host only)
   */
  public static updateSettings(
    code: string,
    hostId: string,
    updates: { category?: CardCategory; targetCards?: number; mode?: OnlineGameMode }
  ): boolean {
    const room = this.getRoom(code);
    if (!room || room.hostParticipantId !== hostId || room.status !== 'waiting') return false;

    if (updates.category) {
      room.category = updates.category;
      const freshCard = CardRepository.getRandomCard(updates.category);
      if (freshCard) room.secretCard = freshCard;
    }
    if (updates.targetCards) {
      room.targetCards = updates.targetCards;
      room.rules.targetCardsToWin = updates.targetCards;
    }
    if (updates.mode) {
      room.mode = updates.mode;
    }

    room.updatedAt = Date.now();
    room.revision += 1;
    this.notifySubscribers(room);
    return true;
  }

  /**
   * Start match (Host only)
   */
  public static startMatch(code: string, hostId: string): { success: boolean; error?: string } {
    const room = this.getRoom(code);
    if (!room) return { success: false, error: 'Room not found' };
    if (room.hostParticipantId !== hostId) return { success: false, error: 'Only the host can start the match.' };

    const participants = Object.values(room.participants);
    const teamAPlayers = participants.filter((p) => p.team === 'A');
    const teamBPlayers = participants.filter((p) => p.team === 'B');

    if (teamAPlayers.length === 0 || teamBPlayers.length === 0) {
      return { success: false, error: 'Both Team A and Team B must have at least one player to start.' };
    }

    const unready = participants.filter((p) => !p.isReady);
    if (unready.length > 0) {
      return { success: false, error: `Waiting for all players to be ready (${unready.map((u) => u.name).join(', ')}).` };
    }

    // Assign initial host & guesser
    room.hostParticipantId = teamAPlayers[0].id;
    room.guesserParticipantId = teamBPlayers[0].id;
    room.hostTeam = 'A';
    room.guesserTeam = 'B';

    // Draw initial secret card
    const card = CardRepository.getRandomCard(room.category);
    if (card) room.secretCard = card;

    room.status = 'in_progress';
    room.currentRound = 1;
    room.questionCount = 0;
    room.bonusQuestionsGranted = 0;
    room.bonusQuestionsUsed = 0;
    room.bonusClueUsedThisRound = false;
    room.questionHistory = [];
    room.guessHistory = [];
    room.activeHints = [];
    room.activeEliminations = [];
    room.roundResult = null;
    room.matchWinnerTeam = null;

    room.updatedAt = Date.now();
    room.revision += 1;
    this.notifySubscribers(room);
    return { success: true };
  }

  /**
   * Process authoritative in-game action with duplicate prevention
   */
  public static handleAction(code: string, action: RoomAction): { success: boolean; error?: string } {
    const room = this.getRoom(code);
    if (!room) return { success: false, error: 'Room not found' };

    // Idempotency: Reject duplicate action submissions
    if (room.processedActionIds.includes(action.actionId)) {
      return { success: true };
    }

    const participant = room.participants[action.participantId];
    if (!participant) return { success: false, error: 'Participant not recognized' };

    switch (action.type) {
      case 'ASK_QUESTION': {
        if (room.status !== 'in_progress') return { success: false, error: 'Match is not in active play' };
        if (participant.team !== room.guesserTeam) return { success: false, error: 'Only the guessing team can ask questions.' };

        const totalAllowed = room.rules.maxQuestions + room.bonusQuestionsGranted;
        const currentTotal = room.questionCount + room.bonusQuestionsUsed;
        if (currentTotal >= totalAllowed) return { success: false, error: 'All questions have been asked.' };

        const text = (action.payload?.text || '').trim();
        if (!text) return { success: false, error: 'Question text cannot be empty' };

        // Record pending question in history
        const isBonus = room.questionCount >= room.rules.maxQuestions;
        const record: QuestionRecord = {
          id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          number: currentTotal + 1,
          text,
          response: 'unknown', // Host will answer
          timestamp: Date.now(),
          askerId: participant.id,
          isBonus,
        };

        room.questionHistory.push(record);
        break;
      }

      case 'ANSWER_QUESTION': {
        if (room.status !== 'in_progress') return { success: false, error: 'Match is not in active play' };
        if (participant.team !== room.hostTeam) return { success: false, error: 'Only the host team can answer questions.' };

        const response: QuestionAnswer = action.payload?.response || 'unknown';
        const totalAllowed = room.rules.maxQuestions + room.bonusQuestionsGranted;
        const currentTotal = room.questionCount + room.bonusQuestionsUsed;

        if (currentTotal >= totalAllowed) return { success: false, error: 'Question limit reached' };

        let newQ = room.questionCount;
        let newBonus = room.bonusQuestionsUsed;
        const isBonus = room.questionCount >= room.rules.maxQuestions;

        if (isBonus) newBonus += 1;
        else newQ += 1;

        room.questionCount = newQ;
        room.bonusQuestionsUsed = newBonus;

        // Update the last question record or add one
        const lastQ = room.questionHistory[room.questionHistory.length - 1];
        if (lastQ && lastQ.response === 'unknown') {
          lastQ.response = response;
        } else {
          room.questionHistory.push({
            id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            number: newQ + newBonus,
            text: action.payload?.text || `Question #${newQ + newBonus}`,
            response,
            timestamp: Date.now(),
            askerId: room.guesserParticipantId,
            isBonus,
          });
        }

        // Check if all questions are now exhausted
        if (newQ + newBonus >= totalAllowed) {
          room.status = 'round_complete';
          room.roundResult = {
            secretCard: room.secretCard,
            winnerPlayerId: null,
            outcome: 'exhausted',
            questionsUsed: newQ + newBonus,
            cluesUsedCount: room.activeHints.length + room.activeEliminations.length + (room.bonusClueUsedThisRound ? 1 : 0),
            history: room.questionHistory,
          };
        }
        break;
      }

      case 'USE_CLUE': {
        if (room.status !== 'in_progress') return { success: false, error: 'Match is not in active play' };
        if (participant.team !== room.guesserTeam) return { success: false, error: 'Only the guessing team can use clues.' };

        const clueType: 'hint' | 'eliminate' | 'bonus' = action.payload?.type;
        const teamClues = room.cluesRemaining[room.guesserTeam];

        if (!teamClues || teamClues[clueType] <= 0) {
          return { success: false, error: `No ${clueType} clues remaining!` };
        }

        teamClues[clueType] -= 1;

        if (clueType === 'hint') {
          const clues = [
            ...room.secretCard.primaryClues,
            ...room.secretCard.secondaryClues,
          ].filter((c) => !room.activeHints.includes(c));
          const nextHint = clues[0] || 'No further clues available.';
          room.activeHints.push(nextHint);
        } else if (clueType === 'eliminate') {
          const elims = (room.secretCard.eliminationClues || [
            'Eliminate: This does not belong to any non-verified sub-tier.',
          ]).filter((e) => !room.activeEliminations.includes(e));
          room.activeEliminations.push(elims[0] || 'Eliminated a false path.');
        } else if (clueType === 'bonus') {
          if (room.bonusClueUsedThisRound) return { success: false, error: 'Bonus question already used this round!' };
          room.bonusQuestionsGranted += 1;
          room.bonusClueUsedThisRound = true;
        }
        break;
      }

      case 'SUBMIT_GUESS': {
        if (room.status !== 'in_progress') return { success: false, error: 'Match is not in active play' };
        if (participant.team !== room.guesserTeam) return { success: false, error: 'Only the guessing team can submit a guess.' };

        const guessText = (action.payload?.guessText || '').trim();
        if (!guessText) return { success: false, error: 'Guess cannot be empty' };

        const validation = CardRepository.validateGuess(guessText, room.secretCard);
        const isCorrect = validation.isCorrect;

        const guessRecord: GuessRecord = {
          id: `g_${Date.now()}`,
          guess: guessText,
          isCorrect,
          timestamp: Date.now(),
          guesserId: participant.id,
          feedback: isCorrect
            ? `Correct! The secret card is ${room.secretCard.name}!`
            : `"${guessText}" is incorrect.`,
        };
        room.guessHistory.push(guessRecord);

        if (isCorrect) {
          const winningTeam = room.guesserTeam === 'A' ? room.teamA : room.teamB;
          winningTeam.score += 1;
          winningTeam.collectedCardIds.push(room.secretCard.id);

          room.roundResult = {
            secretCard: room.secretCard,
            winnerPlayerId: participant.id,
            outcome: 'correct_guess',
            finalGuess: guessText,
            questionsUsed: room.questionCount + room.bonusQuestionsUsed,
            cluesUsedCount: room.activeHints.length + room.activeEliminations.length + (room.bonusClueUsedThisRound ? 1 : 0),
            history: room.questionHistory,
          };

          // Check if match won!
          if (winningTeam.score >= room.targetCards) {
            room.status = 'match_complete';
            room.matchWinnerTeam = room.guesserTeam;
          } else {
            room.status = 'round_complete';
          }
        } else {
          // Check if out of guess attempts
          if (room.guessHistory.length >= room.rules.maxGuessesPerRound) {
            room.status = 'round_complete';
            room.roundResult = {
              secretCard: room.secretCard,
              winnerPlayerId: null,
              outcome: 'max_guesses_reached',
              finalGuess: guessText,
              questionsUsed: room.questionCount + room.bonusQuestionsUsed,
              cluesUsedCount: room.activeHints.length + room.activeEliminations.length + (room.bonusClueUsedThisRound ? 1 : 0),
              history: room.questionHistory,
            };
          }
        }
        break;
      }

      case 'NEXT_ROUND': {
        if (room.status !== 'round_complete') return { success: false, error: 'Round is not complete yet' };

        // Alternate roles between Team A and Team B
        const nextHostTeam = room.hostTeam === 'A' ? 'B' : 'A';
        const nextGuesserTeam = room.guesserTeam === 'A' ? 'B' : 'A';

        const teamAPlayers = Object.values(room.participants).filter((p) => p.team === 'A');
        const teamBPlayers = Object.values(room.participants).filter((p) => p.team === 'B');

        const nextHostPlayer = nextHostTeam === 'A' ? teamAPlayers[0] : teamBPlayers[0];
        const nextGuesserPlayer = nextGuesserTeam === 'A' ? teamAPlayers[0] : teamBPlayers[0];

        const usedIds = [...room.teamA.collectedCardIds, ...room.teamB.collectedCardIds];
        const freshCard =
          CardRepository.getRandomCard(room.category, usedIds) ||
          CardRepository.getRandomCard(room.category);

        if (freshCard) room.secretCard = freshCard;

        room.hostTeam = nextHostTeam;
        room.guesserTeam = nextGuesserTeam;
        room.hostParticipantId = nextHostPlayer ? nextHostPlayer.id : '';
        room.guesserParticipantId = nextGuesserPlayer ? nextGuesserPlayer.id : '';
        room.currentRound += 1;
        room.questionCount = 0;
        room.bonusQuestionsGranted = 0;
        room.bonusQuestionsUsed = 0;
        room.bonusClueUsedThisRound = false;
        room.questionHistory = [];
        room.guessHistory = [];
        room.activeHints = [];
        room.activeEliminations = [];
        room.roundResult = null;
        room.status = 'in_progress';
        break;
      }

      case 'REMATCH': {
        if (room.status !== 'match_complete') return { success: false, error: 'Match is not complete' };

        room.teamA.score = 0;
        room.teamA.collectedCardIds = [];
        room.teamB.score = 0;
        room.teamB.collectedCardIds = [];

        room.cluesRemaining = {
          A: { hint: 1, eliminate: 1, bonus: 1 },
          B: { hint: 1, eliminate: 1, bonus: 1 },
        };

        const freshCard = CardRepository.getRandomCard(room.category);
        if (freshCard) room.secretCard = freshCard;

        room.currentRound = 1;
        room.hostTeam = 'A';
        room.guesserTeam = 'B';
        room.questionCount = 0;
        room.bonusQuestionsGranted = 0;
        room.bonusQuestionsUsed = 0;
        room.bonusClueUsedThisRound = false;
        room.questionHistory = [];
        room.guessHistory = [];
        room.activeHints = [];
        room.activeEliminations = [];
        room.roundResult = null;
        room.matchWinnerTeam = null;
        room.status = 'in_progress';
        break;
      }

      case 'LEAVE_ROOM': {
        delete room.participants[action.participantId];
        if (Object.keys(room.participants).length === 0) {
          store.rooms.delete(code);
          return { success: true };
        }
        if (participant.isHost) {
          // Transfer host to first remaining participant
          const remaining = Object.values(room.participants);
          if (remaining.length > 0) {
            remaining[0].isHost = true;
            room.hostParticipantId = remaining[0].id;
          }
        }
        this.refreshLobbyStatus(room);
        break;
      }

      default:
        return { success: false, error: `Unrecognized action type: ${(action as any).type}` };
    }

    room.processedActionIds.push(action.actionId);
    if (room.processedActionIds.length > 200) {
      room.processedActionIds.shift();
    }

    room.updatedAt = Date.now();
    room.revision += 1;
    this.notifySubscribers(room);
    return { success: true };
  }

  /**
   * Heartbeat to keep connection alive and track presence
   */
  public static heartbeat(code: string, participantId: string): boolean {
    const room = this.getRoom(code);
    if (!room || !room.participants[participantId]) return false;

    room.participants[participantId].lastHeartbeat = Date.now();
    room.participants[participantId].isOnline = true;
    return true;
  }

  /**
   * Project canonical room to role-safe client state
   * CRITICAL SECURITY: Completely removes secretCard for guesser during active play!
   */
  public static projectForParticipant(
    room: ServerAuthoritativeRoom,
    participantId: string
  ): ClientRoomState {
    const participant = room.participants[participantId];
    const isHost = room.hostParticipantId === participantId;
    const isRoundDone = ['round_complete', 'match_complete'].includes(room.status);

    const safeSecretCard: Card | null = (isHost || isRoundDone) ? room.secretCard : null;
    const publicBuzzWords: [string, string, string] = room.secretCard?.buzzWords || ['Clue 1', 'Clue 2', 'Clue 3'];

    const myTeam = participant ? participant.team : 'B';

    return {
      code: room.code,
      status: room.status,
      mode: room.mode,
      category: room.category,
      targetCards: room.targetCards,
      rules: room.rules,

      teamA: room.teamA,
      teamB: room.teamB,
      participants: Object.values(room.participants),

      hostParticipantId: room.hostParticipantId,
      guesserParticipantId: room.guesserParticipantId,
      hostTeam: room.hostTeam,
      guesserTeam: room.guesserTeam,
      currentRound: room.currentRound,

      secretCard: safeSecretCard,
      publicBuzzWords,

      questionCount: room.questionCount,
      bonusQuestionsGranted: room.bonusQuestionsGranted,
      bonusQuestionsUsed: room.bonusQuestionsUsed,
      bonusClueUsedThisRound: room.bonusClueUsedThisRound,
      questionHistory: room.questionHistory,
      guessHistory: room.guessHistory,
      activeHints: room.activeHints,
      activeEliminations: room.activeEliminations,
      cluesRemaining: room.cluesRemaining,

      roundResult: room.roundResult,
      matchWinnerTeam: room.matchWinnerTeam,
      revision: room.revision,
      updatedAt: room.updatedAt,

      myParticipantId: participantId,
      myTeam,
      isHost: !!participant?.isHost,
      isMyTurnToAsk: myTeam === room.guesserTeam && room.status === 'in_progress',
      isMyTurnToAnswer: myTeam === room.hostTeam && room.status === 'in_progress',
    };
  }

  private static refreshLobbyStatus(room: ServerAuthoritativeRoom) {
    if (room.status !== 'waiting' && room.status !== 'ready') return;
    const participants = Object.values(room.participants);
    const hasA = participants.some((p) => p.team === 'A');
    const hasB = participants.some((p) => p.team === 'B');
    const allReady = participants.length >= 2 && participants.every((p) => p.isReady);

    room.status = (hasA && hasB && allReady) ? 'ready' : 'waiting';
  }
}
