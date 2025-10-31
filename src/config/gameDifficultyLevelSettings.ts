import type { DifficultyConfig, DifficultyLevel } from '@/types';

export const GAME_DIFFICULTY_LEVEL_SETTINGS: Record<
  DifficultyLevel,
  DifficultyConfig
> = {
  EASY: {
    level: 'EASY',
    boardSize: { rowCount: 9, columnCount: 9 },
    mineCount: 10,
    label: 'Beginner',
  },
  MEDIUM: {
    level: 'MEDIUM',
    boardSize: { rowCount: 16, columnCount: 16 },
    mineCount: 40,
    label: 'Intermediate',
  },
  HARD: {
    level: 'HARD',
    boardSize: { rowCount: 16, columnCount: 30 },
    mineCount: 80,
    label: 'Expert',
  },
};
