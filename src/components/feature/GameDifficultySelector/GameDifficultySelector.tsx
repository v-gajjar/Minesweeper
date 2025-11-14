import type { ChangeEvent } from 'react';
import { GAME_DIFFICULTY_LEVEL_SETTINGS } from '@config/gameDifficultyLevelSettings';
import type { DifficultyLevel, DifficultyConfig } from '@/types';

export type GameDifficultySelectorProps = {
  value: DifficultyLevel;
  onChange: (difficulty: DifficultyLevel) => void;
  id?: string;
  className?: string;
};

const difficultyEntries = Object.entries(
  GAME_DIFFICULTY_LEVEL_SETTINGS
) as [DifficultyLevel, DifficultyConfig][];

export default function GameDifficultySelector({
  value,
  onChange,
  id,
  className,
}: GameDifficultySelectorProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as DifficultyLevel);
  };

  return (
    <select
      id={id}
      className={className}
      value={value}
      onChange={handleChange}
    >
      {difficultyEntries.map(([key, config]) => (
        <option key={key} value={key}>
          {/* use config.label if your config has it, otherwise fall back to the key */}
          {'label' in config && config.label ? config.label : key}
        </option>
      ))}
    </select>
  );
}