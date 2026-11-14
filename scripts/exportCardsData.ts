import * as fs from 'fs';
import * as path from 'path';
import { CARDS_DATA } from '../src/features/cards/data/cards';
import { CATEGORIES } from '../src/features/cards/data/categories';

interface ExportCardRow {
  category_id: string;
  category_name: string;
  card_id: string;
  card_name: string;
  difficulty: string;
  emoji: string;
  buzz_word_1: string;
  buzz_word_2: string;
  buzz_word_3: string;
  all_buzz_words: string;
  clue_1: string;
  clue_2: string;
  clue_3: string;
  primary_clues: string;
  secondary_clues: string;
  fact_grid_1: string;
  fact_grid_2: string;
  fact_grid_3: string;
  fact_grid_4: string;
  all_fact_grid: string;
  raw_facts: string;
  bonus_question: string;
  bonus_answer: string;
  fun_fact: string;
  elimination_clues: string;
  aliases: string;
  explanation: string;
}

const catMap = new Map<string, string>();
CATEGORIES.forEach((c) => catMap.set(c.id, c.name));

const rows: ExportCardRow[] = CARDS_DATA.map((card) => {
  const categoryName = catMap.get(card.category) || card.category;

  const b1 = card.buzzWords?.[0] || '';
  const b2 = card.buzzWords?.[1] || '';
  const b3 = card.buzzWords?.[2] || '';
  const allBuzz = [b1, b2, b3].filter(Boolean).join(' | ');

  const clues = card.clues || [];
  const c1 = clues[0] || card.primaryClues?.[0] || '';
  const c2 = clues[1] || card.primaryClues?.[1] || '';
  const c3 = clues[2] || card.secondaryClues?.[0] || '';

  const primaryCluesStr = (card.primaryClues || []).join('\n• ');
  const secondaryCluesStr = (card.secondaryClues || []).join('\n• ');

  const fg = card.factGrid || [];
  const fg1 = fg[0] ? `${fg[0].icon || ''} ${fg[0].label}: ${fg[0].value}`.trim() : '';
  const fg2 = fg[1] ? `${fg[1].icon || ''} ${fg[1].label}: ${fg[1].value}`.trim() : '';
  const fg3 = fg[2] ? `${fg[2].icon || ''} ${fg[2].label}: ${fg[2].value}`.trim() : '';
  const fg4 = fg[3] ? `${fg[3].icon || ''} ${fg[3].label}: ${fg[3].value}`.trim() : '';
  const allFg = fg.map((f) => `${f.icon || ''} ${f.label}: ${f.value}`.trim()).join(' | ');

  const rawFactsStr = card.facts ? JSON.stringify(card.facts, null, 2) : '';

  const bonusQ = card.bonusTrivia?.question || '';
  const bonusA = card.bonusTrivia?.answer || '';
  const funFact = card.funFact || '';

  const elimsStr = (card.eliminationClues || []).join(' | ');
  const aliasesStr = (card.aliases || []).join(', ');

  return {
    category_id: card.category,
    category_name: categoryName,
    card_id: card.id,
    card_name: card.name,
    difficulty: card.difficulty,
    emoji: card.emoji || '',
    buzz_word_1: b1,
    buzz_word_2: b2,
    buzz_word_3: b3,
    all_buzz_words: allBuzz,
    clue_1: c1,
    clue_2: c2,
    clue_3: c3,
    primary_clues: primaryCluesStr ? `• ${primaryCluesStr}` : '',
    secondary_clues: secondaryCluesStr ? `• ${secondaryCluesStr}` : '',
    fact_grid_1: fg1,
    fact_grid_2: fg2,
    fact_grid_3: fg3,
    fact_grid_4: fg4,
    all_fact_grid: allFg,
    raw_facts: rawFactsStr,
    bonus_question: bonusQ,
    bonus_answer: bonusA,
    fun_fact: funFact,
    elimination_clues: elimsStr,
    aliases: aliasesStr,
    explanation: card.explanation || '',
  };
});

const dumpPath = path.join(__dirname, 'cards_dump.json');
fs.writeFileSync(dumpPath, JSON.stringify({ categories: CATEGORIES, cards: rows }, null, 2), 'utf-8');
console.log(`Successfully exported ${rows.length} cards to ${dumpPath}`);
