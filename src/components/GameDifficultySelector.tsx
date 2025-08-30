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
      <label>Difficulty: </label>
      <select
        value={gameDifficultySettings.level}
        onChange={onChange}
        name='game-difficulty-select'
        id='game-difficulty-select'
        data-testid='difficulty-select'
      >
        {gameDifficultyLevelKeys.map((setting) => (
          <option
            key={setting}
            value={GAME_DIFFICULTY_LEVEL_SETTINGS[setting].level}
          >
            {GAME_DIFFICULTY_LEVEL_SETTINGS[setting].label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(GameDifficultySelector);
