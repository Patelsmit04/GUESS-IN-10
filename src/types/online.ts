import { Card, CardCategory } from './card';
import { GameRulesConfig, QuestionAnswer, QuestionRecord, GuessRecord, RoundResult } from './game';

export type OnlineGameMode = 'one-on-one' | 'team';

export type RoomStatus =
  | 'waiting'        // In lobby, waiting for opponent/team to join and ready up
  | 'ready'          // All required slots filled and marked ready
  | 'in_progress'    // Active round in play
  | 'round_complete' // Round finished (won by guess or exhausted)
  | 'match_complete' // Match won by team reaching target score
  | 'cancelled'      // Cancelled by host
  | 'expired';       // Timed out due to inactivity

export interface RoomParticipant {
  id: string;              // Client session ID (stored in localStorage)
  name: string;            // Display name
  avatar: string;          // Emoji avatar
  team: 'A' | 'B';         // Team A (Host) or Team B (Challenger)
  isHost: boolean;         // Room creator
  isReady: boolean;        // Ready toggle in lobby
  isOnline: boolean;       // Real-time presence
  lastHeartbeat: number;   // Timestamp
}

export interface TeamState {
  name: string;
  avatar: string;
  score: number;
  collectedCardIds: string[];
}

export interface CluesPool {
  hint: number;
  eliminate: number;
  bonus: number;
}

export interface ServerAuthoritativeRoom {
  code: string;
  createdAt: number;
  updatedAt: number;
  status: RoomStatus;
  mode: OnlineGameMode;
  category: CardCategory;
  targetCards: number;
  rules: GameRulesConfig;

  // Teams & Participants
  teamA: TeamState;
  teamB: TeamState;
  participants: Record<string, RoomParticipant>;

  // Roles & Turn Management
  hostParticipantId: string;    // Holds and views the card
  guesserParticipantId: string; // Asks questions, uses clues, guesses
  hostTeam: 'A' | 'B';
  guesserTeam: 'A' | 'B';
  currentRound: number;

  // Secret Card & Deductions (Server Authority)
  secretCard: Card;
  questionCount: number;
  bonusQuestionsGranted: number;
  bonusQuestionsUsed: number;
  bonusClueUsedThisRound: boolean;
  questionHistory: QuestionRecord[];
  guessHistory: GuessRecord[];
  activeHints: string[];
  activeEliminations: string[];
  cluesRemaining: {
    A: CluesPool;
    B: CluesPool;
  };

  // Outcome
  roundResult: RoundResult | null;
  matchWinnerTeam: 'A' | 'B' | null;

  // Revisions & Deduplication
  revision: number;
  processedActionIds: string[];
}

/**
 * Filtered projection sent to client.
 * CRITICAL SECURITY GUARANTEE: secretCard is NULL for guesser during active play!
 */
export interface ClientRoomState {
  code: string;
  status: RoomStatus;
  mode: OnlineGameMode;
  category: CardCategory;
  targetCards: number;
  rules: GameRulesConfig;

  teamA: TeamState;
  teamB: TeamState;
  participants: RoomParticipant[];

  hostParticipantId: string;
  guesserParticipantId: string;
  hostTeam: 'A' | 'B';
  guesserTeam: 'A' | 'B';
  currentRound: number;

  // Secret Card: Populated ONLY for Host, or when round is complete!
  secretCard: Card | null;
  // Thematic buzzwords are safe anchor clues shared with both players
  publicBuzzWords: [string, string, string];

  questionCount: number;
  bonusQuestionsGranted: number;
  bonusQuestionsUsed: number;
  bonusClueUsedThisRound: boolean;
  questionHistory: QuestionRecord[];
  guessHistory: GuessRecord[];
  activeHints: string[];
  activeEliminations: string[];
  cluesRemaining: {
    A: CluesPool;
    B: CluesPool;
  };

  roundResult: RoundResult | null;
  matchWinnerTeam: 'A' | 'B' | null;
  revision: number;
  updatedAt: number;

  // Client context
  myParticipantId: string;
  myTeam: 'A' | 'B';
  isHost: boolean;
  isMyTurnToAsk: boolean;
  isMyTurnToAnswer: boolean;
}

export type RoomActionType =
  | 'SET_READY'
  | 'SWITCH_TEAM'
  | 'UPDATE_SETTINGS'
  | 'START_MATCH'
  | 'ASK_QUESTION'
  | 'ANSWER_QUESTION'
  | 'USE_CLUE'
  | 'SUBMIT_GUESS'
  | 'NEXT_ROUND'
  | 'REMATCH'
  | 'LEAVE_ROOM';

export interface RoomAction {
  actionId: string;
  type: RoomActionType;
  participantId: string;
  payload?: any;
  clientTimestamp?: number;
}
