export const getMineLocations = (
  currentCell,
  currentBoard,
  mineCount,
  boardSize
) => {
  const rowCount = boardSize.rowCount;
  const columnCount = boardSize.columnCount;

  let allocatedMines = 0;

  const newMineLocations = [];

  while (allocatedMines < mineCount) {
    let row = Math.floor(Math.random() * rowCount);
    let col = Math.floor(Math.random() * columnCount);

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

    if (!cell.hasMine) {
      newMineLocations.push({ x: cell.x, y: cell.y });
      allocatedMines++;
    }
  }

  return newMineLocations;
};

export const getCellsWithMines = (newMineLocations, currentBoard) => {
  const cellsWithMines = [];

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

export const getAdjacentMinesCount = (
  selectedCell,
  currentBoard,
  boardSize
) => {
  let adjacentMinesCount = 0;

  let x = selectedCell.x;
  let y = selectedCell.y;

  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      let xPos = x + i;
      let yPos = y + j;

      if (isOffBoard(xPos, yPos, boardSize)) {
        continue;
      }
      let neighbourCell = currentBoard[xPos][yPos];

      if (neighbourCell.hasMine) {
        adjacentMinesCount++;
      }
    }
  }
  return adjacentMinesCount;
};

export const getIncorrectlyFlaggedCells = (gameBoard, currentFlagLocations) => {
  const updatedCells = [];

  for (const flagLocation of currentFlagLocations) {
    let cell = gameBoard[flagLocation.x][flagLocation.y];

    if (cell.hasMine) continue;

    const updatedCell = {
      ...cell,
      isIncorrectlyFlagged: true,
    };
    updatedCells.push(updatedCell);
  }

  return updatedCells;
};

export const getRevealedMineCells = (gameBoard, currentMineLocations) => {
  const updatedCells = [];

  for (const mineLocation of currentMineLocations) {
    let cell = gameBoard[mineLocation.x][mineLocation.y];

    if (cell.isFlagged) continue;

    const updatedCell = {
      ...cell,
      isRevealed: true,
    };
    updatedCells.push(updatedCell);
  }

  return updatedCells;
};

export const isOffBoard = (x, y, boardSize) => {
  const rowCount = boardSize.rowCount;
  const columnCount = boardSize.columnCount;

  if (x < 0 || x >= rowCount || y < 0 || y >= columnCount) {
    return true;
  } else {
    return false;
  }
};

export const updateBoard = (currentBoard, updatedCells) => {
  const updatedBoard = [...currentBoard];

  for (const cell of updatedCells) {
    const updatedCell = { ...cell };
    updatedBoard[cell.x][cell.y] = updatedCell;
  }
  return updatedBoard;
};

export const hasCell = (x, y, cells) => {
  return cells.some((cell) => cell.x === x && cell.y === y);
};

const isRevealed = (x, y, currentBoard) => {
  const cell = currentBoard[x][y];

  return cell.isRevealed; 
}

export const revealCell = (
  x,
  y,
  currentBoard,
  boardSize,
  revealedCells = []
) => {
  if (isOffBoard(x, y, boardSize) || hasCell(x, y, revealedCells) || isRevealed(x, y, currentBoard)) {
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

export const coordinatesMatch = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  return x1 === x2 && y1 === y2;
};

export const getFilteredFlagLocations = (currentFlagLocations, cells) => {
  const updatedFlagLocations = currentFlagLocations.filter(
    (location) => !cells.some((cell) => coordinatesMatch(location, cell))
  );

  return updatedFlagLocations;
};

export const getGameLostBoard = (
  currentBoard,
  currentMineLocations,
  currentFlagLocations
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

export const getBoard = (boardSize) => {
  const rowCount = boardSize.rowCount;
  const columnCount = boardSize.columnCount;
  const newBoard = [];

  for (var i = 0; i < rowCount; i++) {
    const row = [];
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
