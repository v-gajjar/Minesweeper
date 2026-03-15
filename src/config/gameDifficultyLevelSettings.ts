import type { DifficultyConfig, DifficultyLevel } from '@/types';

export const GAME_DIFFICULTY_LEVEL_SETTINGS: Record<
  DifficultyLevel,
  DifficultyConfig
> = {
  EASY: {
    boardSize: { rowCount: 9, columnCount: 9 },
    mineCount: 10,
    label: 'common:beginner',
  },
  MEDIUM: {
    boardSize: { rowCount: 16, columnCount: 16 },
    mineCount: 40,
    label: 'common:intermediate',
  },
  HARD: {
    boardSize: { rowCount: 16, columnCount: 30 },
    mineCount: 80,
    label: 'common:expert',
  },
};
