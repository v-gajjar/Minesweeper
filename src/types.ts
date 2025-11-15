// src/types.ts

export type CellData = {
  hasMine: boolean;
  hasExplodedMine?: boolean;
  isFlagged: boolean;
  isRevealed: boolean;
  isIncorrectlyFlagged?: boolean;
  adjacentMinesCount: number;
  x: number;
  y: number;
};

export type BoardData = CellData[][];

export type BoardSize = {
  rowCount: number;
  columnCount: number;
};

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export type DifficultyConfig = {
  boardSize: BoardSize;
  mineCount: number;
  label: string;
};

// Coordinate: x = row index, y = column index
export type Coordinate = {
  x: number;
  y: number;
};

export type FlagLocations = Coordinate[];
export type MineLocations = Coordinate[];

export type GameStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'WON' | 'LOST';
