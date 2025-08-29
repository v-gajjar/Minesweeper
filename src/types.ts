export type CellData = {
  hasMine: boolean;
  hasExplodedMine: boolean;
  isFlagged: boolean;
  isRevealed: boolean;
  isIncorrectlyFlagged: boolean;
  adjacentMinesCount: number;
  x: number;
  y: number;
};

export type BoardData = CellData[][];

export type BoardSize = {
  rowCount: number;
  columnCount: number;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type LocationColRow = {
  col: string;
  row: string;
};

export type FlagLocations = Coordinate[];
export type MineLocations = Coordinate[];
