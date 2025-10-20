import { GAME_DIFFICULTY_LEVEL_SETTINGS } from '@config/gameDifficultyLevelSettings';
import { memo } from 'react';
import type { GameDifficultyLevelKeys } from '@enum/GameDifficultyLevel.interfaces';
import type { DifficultySelectProps } from '@/components/feature/DifficultySelect/DifficultySelect.interfaces';
import { DIFFICULTY_SELECT_ID } from '@/components/feature/DifficultySelect/DifficultySelect.interfaces';

const gameDifficultyLevelKeys = Object.keys(
  GAME_DIFFICULTY_LEVEL_SETTINGS
) as GameDifficultyLevelKeys[];

function DifficultySelect({
  gameDifficultySettings,
  onChange,
}: DifficultySelectProps) {
  return (
    <select
      value={gameDifficultySettings.level}
      onChange={onChange}
      name='game-difficulty-select'
      id={DIFFICULTY_SELECT_ID}
      data-testid='difficulty-select'
      aria-describedby='difficulty-description'
    >
      {gameDifficultyLevelKeys.map((setting) => {
        const config = GAME_DIFFICULTY_LEVEL_SETTINGS[setting];
        return (
          <option
            key={setting}
            value={config.level}
            aria-label={`${config.label} - ${config.boardSize.rowCount}x${config.boardSize.columnCount} board with ${config.mineCount} mines`}
          >
            {config.label}
          </option>
        );
      })}
    </select>
  );
}

export default memo(DifficultySelect);