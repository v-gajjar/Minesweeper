import { GAME_DIFFICULTY_LEVEL_SETTINGS } from '@config/gameDifficultyLevelSettings';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import type { DifficultySelectProps } from '@/components/feature/DifficultySelect/DifficultySelect.interfaces';
import type { DifficultyConfig, DifficultyLevel } from '@/types';

function DifficultySelect({
  difficultyLevel,
  onChange,
  id,
}: DifficultySelectProps) {
  const { t } = useTranslation();
  const entries = Object.entries(GAME_DIFFICULTY_LEVEL_SETTINGS) as [
    DifficultyLevel,
    DifficultyConfig,
  ][];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = event.target.value as DifficultyLevel;
    onChange(selectedLevel);
  };

  return (
    <select
      value={difficultyLevel}
      onChange={handleChange}
      name='game-difficulty-select'
      id={id}
      data-testid='difficulty-select'
      aria-describedby='difficulty-description'
    >
      {entries.map(([level, settings]) => (
        <option
          key={level}
          value={level}
          aria-label={`${t(settings.label)} - ${t('common:ariaBoardWithNMines',{
            rowCount: settings.boardSize.rowCount,
            columnCount: settings.boardSize.columnCount,
            mineCount: settings.mineCount
          })}`}
        >
          {t(settings.label)}
        </option>
      ))}
    </select>
  );
}

export default memo(DifficultySelect);
