import type { BoardData, CellData, BoardSize, Coordinate } from '@/types';
import { getRevealedMineCells, getIncorrectlyFlaggedCells } from './cellUtils';

export const updateBoard = (
    currentBoard: BoardData,
    updatedCells: CellData[]
): BoardData => {
    const updatedBoard = [...currentBoard];

    for (const cell of updatedCells) {
        const updatedCell = { ...cell };
        updatedBoard[cell.x][cell.y] = updatedCell;
    }
    return updatedBoard;
};

export const isOffBoard = (x: number, y: number, boardSize: BoardSize): boolean => {
  const rowCount = boardSize.rowCount;
  const columnCount = boardSize.columnCount;

  if (x < 0 || x >= rowCount || y < 0 || y >= columnCount) {
    return true;
  } else {
    return false;
  }
};

export const getGameLostBoard = (
  currentBoard: BoardData,
  currentMineLocations: Coordinate[],
  currentFlagLocations: Coordinate[]  
) => {
  const revealedMineCells = getRevealedMineCells(
    currentBoard,
    currentMineLocations
  );
  const incorrectlyFlaggedCells = getIncorrectlyFlaggedCells(
    currentBoard,
    currentFlagLocations
  );

  const updatedCells = [...revealedMineCells, ...incorrectlyFlaggedCells];
  const gameLostBoard = updateBoard(currentBoard, updatedCells);

  return gameLostBoard;
};

export const getBoard = (boardSize: BoardSize): BoardData => {
  const rowCount = boardSize.rowCount;
  const columnCount = boardSize.columnCount;
  const newBoard = [];

  for (var i = 0; i < rowCount; i++) {
    const row: CellData[] = [];
    newBoard.push(row);

    for (var j = 0; j < columnCount; j++) {
      row.push({
        x: i,
        y: j,
        hasMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMinesCount: null,
      });
    }
  }

  return newBoard;
};