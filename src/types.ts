import { GameDifficultyLevel } from "./enum/GameDifficultyLevel";

export type CoordinateType = {
  x: number;
  y: number;
};

export type BoardSize = {
  rowCount: number;
  columnCount: number;
};

export type GameDifficultySettings = {
  level: GameDifficultyLevel;
  mineCount: number;
  boardSize: BoardSize;
  label: string;
};

export enum GameStatus {
  GAME_NOT_STARTED = "GAME_NOT_STARTED",
  GAME_IN_PROGRESS = "GAME_IN_PROGRESS",
  GAME_WON = "GAME_WON",
  GAME_LOST = "GAME_LOST",
} 

export type CellData = {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
  hasExplodedMine?: boolean;
  hasMine: boolean;
};
