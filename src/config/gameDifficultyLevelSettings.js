import GameDifficultyLevel from "../enum/GameDifficultyLevel";

export const GAME_DIFFICULTY_LEVEL_SETTINGS = {
  EASY: {
    level: GameDifficultyLevel.EASY,
    boardSize: {
      numberOfRows: 9,
      numberOfColumns: 9,
    },
    numberOfMines: 10,
    label: "Beginnner"
  },
  MEDIUM: {
    level: GameDifficultyLevel.MEDIUM,
    boardSize: {
      numberOfRows: 16,
      numberOfColumns: 16,
    },
    numberOfMines: 40,
    label: "Intermediate"
  },
  HARD: {
    level: GameDifficultyLevel.HARD,
    boardSize: {
      numberOfRows: 20,
      numberOfColumns: 20,
    },
    numberOfMines: 80,
    label: "Advance"
  },
};
