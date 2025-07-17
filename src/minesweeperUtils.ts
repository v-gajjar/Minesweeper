import { BoardSize, CellData, CoordinateType, GameStatus } from "./types";

export const getBoard = (boardSize: BoardSize): CellData[][] => {
  const { rowCount, columnCount } = boardSize;
  return Array.from({ length: rowCount }, (_, x) =>
    Array.from({ length: columnCount }, (_, y) => ({
      x,
      y,
      isRevealed: false,
      hasMine: false,
      isFlagged: false,
      adjacentMinesCount: 0,
    }))
  );
};

export const getMineLocations = (
  exclude: CoordinateType,
  boardSize: BoardSize,
  mineCount: number
): CoordinateType[] => {
  const locations: CoordinateType[] = [];
  const totalCells = boardSize.rowCount * boardSize.columnCount;

  const excludeIndex = exclude.x * boardSize.columnCount + exclude.y;

  while (locations.length < mineCount) {
    const index = Math.floor(Math.random() * totalCells);
    if (index === excludeIndex) continue;

    const x = Math.floor(index / boardSize.columnCount);
    const y = index % boardSize.columnCount;

    if (!locations.some((loc) => loc.x === x && loc.y === y)) {
      locations.push({ x, y });
    }
  }

  return locations;
};

export const getCellsWithMines = (
  board: CellData[][],
  mineLocations: CoordinateType[]
): CellData[][] => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  for (const { x, y } of mineLocations) {
    newBoard[x][y].hasMine = true;
  }

  for (const row of newBoard) {
    for (const cell of row) {
      if (!cell.hasMine) {
        const adjacent = getAdjacentCells(cell.x, cell.y, newBoard);
        cell.adjacentMinesCount = adjacent.filter((c) => c.hasMine).length;
      }
    }
  }

  return newBoard;
};

export const revealCell = (
  x: number,
  y: number,
  board: CellData[][]
): CellData[] => {
  const visited = new Set<string>();
  const revealed: CellData[] = [];

  const dfs = (cx: number, cy: number) => {
    const key = `${cx},${cy}`;
    if (visited.has(key)) return;
    visited.add(key);

    const cell = board[cx]?.[cy];
    if (!cell || cell.isRevealed || cell.isFlagged) return;

    const newCell = { ...cell, isRevealed: true };
    revealed.push(newCell);

    if (newCell.adjacentMinesCount === 0 && !newCell.hasMine) {
      getAdjacentCells(cx, cy, board).forEach((adj) => dfs(adj.x, adj.y));
    }
  };

  dfs(x, y);
  return revealed;
};

export const updateBoard = (
  board: CellData[][],
  updatedCells: CellData[]
): CellData[][] => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  for (const cell of updatedCells) {
    newBoard[cell.x][cell.y] = cell;
  }
  return newBoard;
};

export const updateGameState = (
  updatedBoard: CellData[][],
  selectedCell: CellData,
  revealedCells: CellData[],
  flagLocations: CoordinateType[],
  mineLocations: CoordinateType[],
  setBoard: React.Dispatch<React.SetStateAction<CellData[][]>>,
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  setSafeCellsCount: React.Dispatch<React.SetStateAction<number>>,
  setRemainingFlagsCount: React.Dispatch<React.SetStateAction<number>>
): { board: CellData[][]; status: GameStatus } => {
  let newGameStatus = GameStatus.GAME_IN_PROGRESS;

  const totalRevealed = updatedBoard.flat().filter((cell) => cell.isRevealed).length;
  const totalCells = updatedBoard.length * updatedBoard[0].length;
  const safeCells = totalCells - mineLocations.length;

  if (selectedCell.hasMine) {
    newGameStatus = GameStatus.GAME_LOST;
  } else if (totalRevealed >= safeCells) {
    newGameStatus = GameStatus.GAME_WON;
  }

  setBoard(updatedBoard);
  setGameStatus(newGameStatus);
  setSafeCellsCount(safeCells - totalRevealed);
  setRemainingFlagsCount(flagLocations.length);

  return {
    board: updatedBoard,
    status: newGameStatus,
  };
};

const getAdjacentCells = (x: number, y: number, board: CellData[][]): CellData[] => {
  const deltas = [-1, 0, 1];
  const cells: CellData[] = [];

  for (const dx of deltas) {
    for (const dy of deltas) {
      if (dx === 0 && dy === 0) continue;
      const cell = board[x + dx]?.[y + dy];
      if (cell) cells.push(cell);
    }
  }

  return cells;
};