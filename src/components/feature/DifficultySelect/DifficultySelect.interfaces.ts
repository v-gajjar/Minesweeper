import type { GameDifficultyLevelSettings } from '@config/gameDifficultyLevelSettings.interfaces';

export type DifficultySelectProps = {
  gameDifficultySettings: GameDifficultyLevelSettings[keyof GameDifficultyLevelSettings];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
