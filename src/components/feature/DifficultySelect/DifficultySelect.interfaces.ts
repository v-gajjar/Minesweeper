import type { DifficultyLevel } from '@/types';

export type DifficultySelectProps = {
  difficultyLevel: DifficultyLevel;
  onChange: (difficultyLevel: DifficultyLevel) => void;
  id: string;
};
