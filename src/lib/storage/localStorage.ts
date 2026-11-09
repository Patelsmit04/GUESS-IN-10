export interface UserPreferences {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
  reducedMotion: boolean;
  targetCards: number;
}

export interface StoredGameStats {
  gamesPlayed: number;
  gamesWon: number;
  cardsCollected: string[]; // card IDs
  totalQuestionsAsked: number;
}

const PREFERENCES_KEY = 'guess10_user_preferences';
const STATS_KEY = 'guess10_stats';

const DEFAULT_PREFERENCES: UserPreferences = {
  soundEnabled: true,
  musicEnabled: true,
  volume: 0.7,
  reducedMotion: false,
  targetCards: 7,
};

const DEFAULT_STATS: StoredGameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  cardsCollected: [],
  totalQuestionsAsked: 0,
};

export class StorageManager {
  public static getPreferences(): UserPreferences {
    if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_PREFERENCES;
  }

  public static savePreferences(prefs: Partial<UserPreferences>): void {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  public static getStats(): StoredGameStats {
    if (typeof window === 'undefined') return DEFAULT_STATS;
    try {
      const stored = localStorage.getItem(STATS_KEY);
      if (stored) {
        return { ...DEFAULT_STATS, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_STATS;
  }

  public static addCollectedCard(cardId: string): void {
    if (typeof window === 'undefined') return;
    try {
      const stats = this.getStats();
      if (!stats.cardsCollected.includes(cardId)) {
        stats.cardsCollected.push(cardId);
        stats.gamesWon += 1;
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
      }
    } catch {
      // ignore
    }
  }

  public static recordGame(questionsCount: number): void {
    if (typeof window === 'undefined') return;
    try {
      const stats = this.getStats();
      stats.gamesPlayed += 1;
      stats.totalQuestionsAsked += questionsCount;
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }

  public static resetAll(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(PREFERENCES_KEY);
      localStorage.removeItem(STATS_KEY);
    } catch {
      // ignore
    }
  }
}

