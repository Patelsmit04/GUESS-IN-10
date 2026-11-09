import { Card } from '@/types/card';
import { ANIMALS_CARDS } from './categories/animals';
import { COUNTRIES_CARDS } from './categories/countries';
import { CITIES_CARDS } from './categories/cities';
import { WONDERS_INDIA_CARDS } from './categories/wonders_india';
import { SPACE_CARDS } from './categories/space';
import { SPORTS_CARDS } from './categories/sports';
import { LANDMARKS_CARDS } from './categories/landmarks';
import { FOOD_CARDS } from './categories/food';
import { PROFESSIONS_CARDS } from './categories/professions';
import { DINOSAURS_CARDS } from './categories/dinosaurs';

export const CARDS_DATA: Card[] = [
  ...ANIMALS_CARDS,
  ...COUNTRIES_CARDS,
  ...CITIES_CARDS,
  ...WONDERS_INDIA_CARDS,
  ...SPACE_CARDS,
  ...SPORTS_CARDS,
  ...LANDMARKS_CARDS,
  ...FOOD_CARDS,
  ...PROFESSIONS_CARDS,
  ...DINOSAURS_CARDS,
];

export const TOTAL_CARDS_COUNT = CARDS_DATA.length;
