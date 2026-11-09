export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
  score: number; // Cards won
  collectedCardIds: string[];
  cluesRemaining: {
    hint: number;
    eliminate: number;
    bonus: number;
  };
  isTeam?: boolean;
  members?: string[];
}

