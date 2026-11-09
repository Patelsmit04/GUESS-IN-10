import { CARDS_DATA } from '../data/cards';
import { CATEGORIES } from '../data/categories';
import { Card, CardCategory, CardDifficulty, CategoryInfo } from '@/types/card';

export class CardRepository {
  private static cards: Card[] = CARDS_DATA;
  private static categories: CategoryInfo[] = CATEGORIES;

  public static getAllCards(): Card[] {
    return [...this.cards];
  }

  public static getAllCategories(): CategoryInfo[] {
    // Update cardCount dynamically from actual cards
    return this.categories.map((cat) => ({
      ...cat,
      cardCount: this.cards.filter((c) => c.category === cat.id).length,
    }));
  }

  public static getCardsByCategory(category: CardCategory): Card[] {
    return this.cards.filter((card) => card.category === category);
  }

  public static getCardById(id: string): Card | undefined {
    return this.cards.find((card) => card.id === id);
  }

  public static getRandomCard(
    category?: CardCategory,
    excludeIds: string[] = []
  ): Card | null {
    let pool = this.cards.filter((c) => !excludeIds.includes(c.id));
    if (category) {
      pool = pool.filter((c) => c.category === category);
    }
    if (pool.length === 0) {
      // If all excluded, allow fallback to any in category
      pool = category ? this.cards.filter((c) => c.category === category) : this.cards;
    }
    if (pool.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }

  /**
   * Validates a player's guess against the secret card name and aliases.
   * Strips extra spaces, accents, special characters, and handles common variations.
   */
  public static validateGuess(
    userGuess: string,
    secretCard: Card
  ): { isCorrect: boolean; matchedAlias?: string } {
    if (!userGuess || !userGuess.trim()) {
      return { isCorrect: false };
    }

    const clean = (str: string) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove diacritics
        .replace(/^(the|a|an)\s+/i, '') // remove leading articles
        .replace(/[^a-z0-9]/g, '') // remove all non-alphanumerics
        .trim();

    const normalizedGuess = clean(userGuess);

    const candidates = [
      secretCard.name,
      ...secretCard.aliases,
    ];

    for (const candidate of candidates) {
      const normalizedCandidate = clean(candidate);
      if (normalizedGuess === normalizedCandidate) {
        return { isCorrect: true, matchedAlias: candidate };
      }
    }

    return { isCorrect: false };
  }
}

