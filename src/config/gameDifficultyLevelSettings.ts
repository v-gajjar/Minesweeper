import { GameDifficultyLevel } from "../enum/GameDifficultyLevel";
import { GameDifficultySettings } from "../types";

export const difficultySettings: Record<GameDifficultyLevel, GameDifficultySettings> = {
  [GameDifficultyLevel.EASY]: {
    level: GameDifficultyLevel.EASY,
    label: "Easy",
    mineCount: 10,
    boardSize: { rowCount: 9, columnCount: 9 },
  },
  [GameDifficultyLevel.MEDIUM]: {
    level: GameDifficultyLevel.MEDIUM,
    label: "Medium",
    mineCount: 40,
    boardSize: { rowCount: 16, columnCount: 16 },
  },
  [GameDifficultyLevel.HARD]: {
    level: GameDifficultyLevel.HARD,
    label: "Hard",
    mineCount: 99,
    boardSize: { rowCount: 16, columnCount: 30 },
  },
};