import type { BoardData, CellData, BoardSize, Coordinate } from '@/types';
import { isOffBoard } from './boardUtils';

export const getCellsWithMines = (newMineLocations: Coordinate[], currentBoard: BoardData): CellData[] => {
  const cellsWithMines: CellData[] = [];

  for (const location of newMineLocations) {
    const currentCell = currentBoard[location.x][location.y];

    const updatedCell = {
      ...currentCell,
      hasMine: true,
    };
    cellsWithMines.push(updatedCell);
  }
  return cellsWithMines;
};

export const getMineLocations = (
  currentCell: CellData,
  currentBoard: BoardData,
  mineCount: number,
  boardSize: BoardSize
): Coordinate[] => {
  const rowCount = boardSize.rowCount;
  const columnCount = boardSize.columnCount;

  let allocatedMines = 0;

  const newMineLocations: Coordinate[] = [];

  while (allocatedMines < mineCount) {
    let row = Math.floor(Math.random() * rowCount);
    let col = Math.floor(Math.random() * columnCount);

    allocatedMines++;
    let cell = currentBoard[row][col];

    if (cell.x === currentCell.x && cell.y === currentCell.y) {
      // The first cell that is subjected to a left click should be ignored when placing a mine
      // to make the game a bit easier/fairer - the user cannot lose on the
      // the first left click
      continue;
    }
    // check for a duplication location in the newMineLocations array and skip if found
    if (
      newMineLocations.some(
        (location) => location.x === cell.x && location.y === cell.y
      )
    ) {
      continue;
    }

    newMineLocations.push({ x: cell.x, y: cell.y });
  }

  return newMineLocations;
};

export const getAdjacentMinesCount = (
  selectedCell: Coordinate,
  currentBoard: BoardData,
  boardSize: BoardSize
): number => {
  let adjacentMinesCount = 0;

  const x = selectedCell.x;
  const y = selectedCell.y;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // skip self
      if (i === 0 && j === 0) continue;

      const xPos = x + i;
      const yPos = y + j;

      if (isOffBoard(xPos, yPos, boardSize)) continue;

      const neighbor = currentBoard[xPos][yPos];
      if (neighbor.hasMine) adjacentMinesCount++;
    }
  }
  return adjacentMinesCount;
}