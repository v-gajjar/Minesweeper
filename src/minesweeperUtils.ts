import type { BoardData, BoardSize, CellData, Coordinate } from '@/types';

/**
 * Returns random mine coordinates while guaranteeing:
 * - no mine on the first revealed cell
 * - no duplicate mine coordinates
 */
export const getMineLocations = (
  currentCell: Coordinate,
  currentBoard: BoardData,
  mineCount: number,
  boardSize: BoardSize
): Coordinate[] => {
  const { rowCount, columnCount } = boardSize;

  let allocatedMines = 0;
  const newMineLocations: Coordinate[] = [];

  while (allocatedMines < mineCount) {
    const row = Math.floor(Math.random() * rowCount);
    const col = Math.floor(Math.random() * columnCount);

    const cell = currentBoard[row][col];

    // Never place a mine on the first revealed cell
    if (cell.x === currentCell.x && cell.y === currentCell.y) continue;

    // Avoid duplicates
    if (newMineLocations.some((loc) => loc.x === cell.x && loc.y === cell.y)) {
      continue;
    }

    if (!cell.hasMine) {
      newMineLocations.push({ x: cell.x, y: cell.y });
      allocatedMines++;
    }
  }

  return newMineLocations;
};

export const getCellsWithMines = (
  newMineLocations: Coordinate[],
  currentBoard: BoardData
): CellData[] => {
  const cellsWithMines: CellData[] = [];

  for (const location of newMineLocations) {
    const currentCell = currentBoard[location.x][location.y];

    const updatedCell: CellData = {
      ...currentCell,
      hasMine: true,
    };
    cellsWithMines.push(updatedCell);
  }
  return cellsWithMines;
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
      const xPos = x + i;
      const yPos = y + j;

      if (isOffBoard(xPos, yPos, boardSize)) continue;

      const neighbor = currentBoard[xPos][yPos];
      if (neighbor.hasMine) adjacentMinesCount++;
    }
  }
  return adjacentMinesCount;
};

export const getIncorrectlyFlaggedCells = (
  gameBoard: BoardData,
  currentFlagLocations: Coordinate[]
): CellData[] => {
  const updatedCells: CellData[] = [];

  for (const flagLocation of currentFlagLocations) {
    const cell = gameBoard[flagLocation.x][flagLocation.y];

    if (cell.hasMine) continue;

    const updatedCell: CellData = {
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

    const updatedCell: CellData = {
      ...cell,
      isRevealed: true,
    };
    updatedCells.push(updatedCell);
  }

  return updatedCells;
};

export const isOffBoard = (
  x: number,
  y: number,
  boardSize: BoardSize
): boolean => {
  const { rowCount, columnCount } = boardSize;
  return x < 0 || x >= rowCount || y < 0 || y >= columnCount;
};

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

export const hasCell = (
  x: number,
  y: number,
  cells: Array<Coordinate | CellData>
): boolean => {
  return cells.some((cell) => cell.x === x && cell.y === y);
};

const isRevealed = (x: number, y: number, currentBoard: BoardData): boolean => {
  return currentBoard[x][y].isRevealed;
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

  const updatedCell: CellData = {
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
        const nx = x + i;
        const ny = y + j;
        if (i === 0 && j === 0) continue;
        revealCell(nx, ny, currentBoard, boardSize, revealedCells);
      }
    }
  }

  return revealedCells;
};

export const coordinatesMatch = (
  a: Coordinate | CellData,
  b: Coordinate | CellData
): boolean => a.x === b.x && a.y === b.y;

export const getFilteredFlagLocations = (
  currentFlagLocations: Coordinate[],
  cells: Array<Coordinate | CellData>
): Coordinate[] => {
  return currentFlagLocations.filter(
    (location) => !cells.some((cell) => coordinatesMatch(location, cell))
  );
};

export const getGameLostBoard = (
  currentBoard: BoardData,
  currentMineLocations: Coordinate[],
  currentFlagLocations: Coordinate[]
): BoardData => {
  const revealedMineCells = getRevealedMineCells(
    currentBoard,
    currentMineLocations
  );
  const incorrectlyFlaggedCells = getIncorrectlyFlaggedCells(
    currentBoard,
    currentFlagLocations
  );

  const updatedCells = [...revealedMineCells, ...incorrectlyFlaggedCells];
  return updateBoard(currentBoard, updatedCells);
};

export const getBoard = (boardSize: BoardSize): BoardData => {
  const { rowCount, columnCount } = boardSize;
  const newBoard: BoardData = [];

  for (let i = 0; i < rowCount; i++) {
    const row: CellData[] = [];
    newBoard.push(row);

    for (let j = 0; j < columnCount; j++) {
      row.push({
        x: i,
        y: j,
        hasMine: false,
        hasExplodedMine: false,
        isIncorrectlyFlagged: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMinesCount: 0,
      });
    }
  }

  return newBoard;
};
