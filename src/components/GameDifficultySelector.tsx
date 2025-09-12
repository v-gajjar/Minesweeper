import { GAME_DIFFICULTY_LEVEL_SETTINGS } from '../config/gameDifficultyLevelSettings';
import { memo } from 'react';
import type { GameDifficultyLevelKeys } from '../enum/GameDifficultyLevel.interfaces';
import type { GameDifficultySelectorProps } from './GameDifficultySelector.interfaces';

const gameDifficultyLevelKeys = Object.keys(
  GAME_DIFFICULTY_LEVEL_SETTINGS
) as GameDifficultyLevelKeys[];

function GameDifficultySelector({
  gameDifficultySettings,
  onChange,
}: GameDifficultySelectorProps) {
  return (
    <div className='game-difficulty-select-wrapper'>
      <label htmlFor='game-difficulty-select'>Difficulty: </label>
      <select
        value={gameDifficultySettings.level}
        onChange={onChange}
        name='game-difficulty-select'
        id='game-difficulty-select'
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
    </div>
  );
}

export default memo(GameDifficultySelector);
