import type { DifficultyLevel } from '@/types';

export type DifficultySelectProps = {
  difficultyLevel: DifficultyLevel;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
};