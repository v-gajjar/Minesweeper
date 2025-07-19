import { CellData, CoordinateType, BoardSize, GameStatus } from "./types";

/**
 * Generates an empty board of CellData objects.
 */
export function getBoard(boardSize: BoardSize): CellData[][] {
  const { rowCount, columnCount } = boardSize;
  return Array.from({ length: rowCount }, (_, x) =>
    Array.from({ length: columnCount }, (_, y) => ({
      x,
      y,
      isRevealed: false,
      hasMine: false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  );
}

/**
 * Returns an array of mine coordinates, excluding the initial click.
 */
export function getMineLocations(
  initial: CellData,
  boardSize: BoardSize,
  mineCount: number,
): CoordinateType[] {
  const locations: CoordinateType[] = [];
  const { rowCount, columnCount } = boardSize;

  while (locations.length < mineCount) {
    const x = Math.floor(Math.random() * rowCount);
    const y = Math.floor(Math.random() * columnCount);

    // Avoid duplicate mines and first-click cell
    if (
      !(x === initial.x && y === initial.y) &&
      !locations.some((loc) => loc.x === x && loc.y === y)
    ) {
      locations.push({ x, y });
    }
  }

  return locations;
}

/**
 * Adds mines and updates adjacent mine counts.
 */
export function getCellsWithMines(
  board: CellData[][],
  mineLocations: CoordinateType[],
): CellData[][] {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  for (const { x, y } of mineLocations) {
    newBoard[x][y].hasMine = true;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < newBoard.length &&
          ny < newBoard[0].length &&
          !(dx === 0 && dy === 0)
        ) {
          newBoard[nx][ny].adjacentMines++;
        }
      }
    }
  }

  return newBoard;
}

/**
 * Reveals a cell and its neighbors recursively.
 */
export function revealCell(
  x: number,
  y: number,
  board: CellData[][],
): CellData[] {
  const revealed: CellData[] = [];
  const visited = new Set<string>();

  const dfs = (cx: number, cy: number) => {
    const key = `${cx},${cy}`;
    if (
      cx < 0 ||
      cy < 0 ||
      cx >= board.length ||
      cy >= board[0].length ||
      visited.has(key)
    )
      return;

    visited.add(key);

    const cell = board[cx][cy];
    if (cell.isRevealed || cell.isFlagged) return;

    revealed.push({ ...cell, isRevealed: true });

    if (cell.adjacentMines === 0 && !cell.hasMine) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (!(dx === 0 && dy === 0)) {
            dfs(cx + dx, cy + dy);
          }
        }
      }
    }
  };

  dfs(x, y);
  return revealed;
}

/**
 * Updates the board with revealed cells.
 */
export function updateBoard(
  board: CellData[][],
  revealed: CellData[],
): CellData[][] {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  for (const cell of revealed) {
    newBoard[cell.x][cell.y] = cell;
  }

  return newBoard;
}

/**
 * Updates game state (win/loss/continue).
 */
export function updateGameState(
  updatedBoard: CellData[][],
  clickedCell: CellData,
  revealed: CellData[],
  flagLocations: CoordinateType[],
  mineLocations: CoordinateType[],
  setBoard: React.Dispatch<React.SetStateAction<CellData[][]>>,
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  setSafeCellsCount: React.Dispatch<React.SetStateAction<number>>,
  setRemainingFlagsCount: React.Dispatch<React.SetStateAction<number>>,
): void {
  setBoard(updatedBoard);

  if (clickedCell.hasMine) {
    setGameStatus(GameStatus.GAME_LOST);
    return;
  }

  setSafeCellsCount((prev) => {
    const newSafeCount = prev - revealed.length;
    if (newSafeCount === 0) {
      setGameStatus(GameStatus.GAME_WON);
      setRemainingFlagsCount(0);
    }
    return newSafeCount;
  });
}
