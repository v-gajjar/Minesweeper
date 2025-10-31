import type { DifficultyConfig } from '@/types';

export type DifficultySelectProps = {
  gameDifficultySettings: DifficultyConfig;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
};