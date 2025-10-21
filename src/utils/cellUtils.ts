import type { BoardData, CellData, BoardSize, Coordinate } from '@/types';
import { isOffBoard } from './boardUtils';
import { getAdjacentMinesCount } from './mineUtils';

export const coordinatesMatch = (
  { x: x1, y: y1 }: Coordinate,
  { x: x2, y: y2 }: Coordinate
): boolean => {
  return x1 === x2 && y1 === y2;
};

export const getFilteredFlagLocations = (
  currentFlagLocations: Coordinate[],
  cells: CellData[]
): Coordinate[] => {
  const updatedFlagLocations = currentFlagLocations.filter(
    (location) => !cells.some((cell) => coordinatesMatch(location, cell))
  );
  return updatedFlagLocations;
};

const hasCell = (x: number, y: number, cells: CellData[]): boolean => {
  return cells.some((cell) => cell.x === x && cell.y === y);
};

const isRevealed = (x: number, y: number, currentBoard: BoardData): boolean => {
  const cell = currentBoard[x][y];
  return cell.isRevealed;
};

export const revealCell = (
  x: number,
  y: number,
  currentBoard: BoardData,
  boardSize: BoardSize,
  revealedCells: CellData[] = []
): CellData[] => {
  if (
    isOffBoard(x, y, boardSize) ||
    hasCell(x, y, revealedCells) ||
    isRevealed(x, y, currentBoard)
  ) {
    return revealedCells;
  }

  const cell = currentBoard[x][y];

  const updatedCell = {
    ...cell,
    isFlagged: false,
    isRevealed: true,
  };

  if (updatedCell.hasMine) {
    updatedCell.hasExplodedMine = true;
    revealedCells.push(updatedCell);
    return revealedCells;
  }
  updatedCell.adjacentMinesCount = getAdjacentMinesCount(
    updatedCell,
    currentBoard,
    boardSize
  );
  revealedCells.push(updatedCell);

  if (updatedCell.adjacentMinesCount === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        revealCell(x + i, y + j, currentBoard, boardSize, revealedCells);
      }
    }
  }

  return revealedCells;
};

export const getIncorrectlyFlaggedCells = (
  gameBoard: BoardData,
  currentFlagLocations: Coordinate[]
): CellData[] => {
  const updatedCells: CellData[] = [];

  for (const flagLocation of currentFlagLocations) {
    const cell = gameBoard[flagLocation.x][flagLocation.y];

    if (cell.hasMine) continue;

    const updatedCell = {
      ...cell,
      isIncorrectlyFlagged: true,
    };
    updatedCells.push(updatedCell);
  }

  return updatedCells;
};

export const getRevealedMineCells = (
  gameBoard: BoardData,
  currentMineLocations: Coordinate[]
): CellData[] => {
  const updatedCells: CellData[] = [];

  for (const mineLocation of currentMineLocations) {
    const cell = gameBoard[mineLocation.x][mineLocation.y];

    if (cell.isFlagged) continue;

    const updatedCell = {
      ...cell,
      isRevealed: true,
    };
    updatedCells.push(updatedCell);
  }

  return updatedCells;
};
