import type { GameDifficultyLevelSettings } from '../config/gameDifficultyLevelSettings.interfaces';

export type GameDifficultySelectorProps = {
  gameDifficultySettings: GameDifficultyLevelSettings[keyof GameDifficultyLevelSettings];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
