import GameDifficultyLevel from "../enum/GameDifficultyLevel";
import type { GameDifficultyLevelSettings } from "./gameDifficultyLevelSettings.interfaces";

export const GAME_DIFFICULTY_LEVEL_SETTINGS: GameDifficultyLevelSettings = {
  EASY: {
    level: GameDifficultyLevel.EASY,
    boardSize: {
      rowCount: 9,
      columnCount: 9,
    },
    mineCount: 10,
    label: "Beginner",
  },
  MEDIUM: {
    level: GameDifficultyLevel.MEDIUM,
    boardSize: {
      rowCount: 16,
      columnCount: 16,
    },
    mineCount: 40,
    label: "Intermediate",
  },
  HARD: {
    level: GameDifficultyLevel.HARD,
    boardSize: {
      rowCount: 16,
      columnCount: 30,
    },
    mineCount: 80,
    label: "Expert",
  },
};
