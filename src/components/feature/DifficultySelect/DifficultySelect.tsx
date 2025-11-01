import { GAME_DIFFICULTY_LEVEL_SETTINGS } from '@config/gameDifficultyLevelSettings';
import { memo } from 'react';

import type { DifficultySelectProps } from '@/components/feature/DifficultySelect/DifficultySelect.interfaces';
import type { DifficultyConfig, DifficultyLevel } from '@/types';

function DifficultySelect({
  difficultyLevel,
  onChange,
  id,
}: DifficultySelectProps) {
  const entries = Object.entries(GAME_DIFFICULTY_LEVEL_SETTINGS) as [
    DifficultyLevel,
    DifficultyConfig,
  ][];

  return (
    <select
      value={difficultyLevel}
      onChange={onChange}
      name='game-difficulty-select'
      id={id}
      data-testid='difficulty-select'
      aria-describedby='difficulty-description'
    >
      {entries.map(([level, settings]) => (
        <option
          key={level}
          value={level}
          aria-label={`${settings.label} - ${settings.boardSize.rowCount}x${settings.boardSize.columnCount} board with ${settings.mineCount} mines`}
        >
          {settings.label}
        </option>
      ))}
    </select>
  );
}

export default memo(DifficultySelect);
