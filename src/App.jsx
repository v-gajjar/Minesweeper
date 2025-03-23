import { useState, useEffect } from "react";

import GameStatus from "./enum/GameStatus";
import { GAME_DIFFICULTY_LEVEL_SETTINGS } from "./config/gameDifficultyLevelSettings";

import GameDifficultySelector from "./components/GameDifficultySelector";
import GameBoard from "./components/GameBoard";
import GameResultModal from "./components/GameResultModal";
import RemainingFlagsCounter from "./components/RemainingFlagsCounter";

import "./App.css";


function App() {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState(GameStatus.GAME_NOT_STARTED);
  const [remainingFlagsCount, setRemainingFlagsCount] = useState(0);
  const [shouldPlaceMines, setShouldPlaceMines] = useState(true);
  const [safeCellsCount, setSafeCellsCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [flagLocations, setFlagLocations] = useState([]);
 
  const [gameDifficultySettings, setGameDifficultySettings] = useState(GAME_DIFFICULTY_LEVEL_SETTINGS.EASY);

  useEffect(() => {
    if (gameHasEnded()) {
      const gameResultModal = document.getElementById("gameResultModal");
      gameResultModal.showModal();
    }
  }, [gameStatus]);

  useEffect(() => {

    setupNewGame();
  }, [gameDifficultySettings]);

  const onGameDifficultyLevelChanged = (event) => {
    const selectedLevel = event.target.value;

    const difficultyLevel = Object.values(GAME_DIFFICULTY_LEVEL_SETTINGS).find(
      (difficultySetting) => selectedLevel === difficultySetting.level
    );

    if (! difficultyLevel) {
      return;
    }

    setGameStatus(GameStatus.GAME_NOT_STARTED);
    setGameDifficultySettings(difficultyLevel)
  };

  const onCloseGameResultModal = () => {
    const gameResultModal = document.getElementById("gameResultModal");
    gameResultModal.close();
    
    setupNewGame();
  };

  const getMineLocations = (currentCell, currentBoard, mineCount, boardSize) => {
    const rowCount = boardSize.rowCount;
    const columnCount = boardSize.columnCount;

    let allocatedMines = 0;

    const newMineLocations = [];
    
    while (allocatedMines < mineCount) {
      let row = Math.floor(Math.random() * rowCount);
      let col = Math.floor(Math.random() * columnCount);

      let cell = currentBoard[row][col];

      if ( cell.x === currentCell.x && cell.y === currentCell.y ){
        // The first cell that is subjected to a left click should be ignored when placing a mine
        // to make the game a bit easier/fairer - the user cannot lose on the 
        // the first left click
        continue;
      }
      // check for a duplication location in the newMineLocations array and skip if found
      if ( newMineLocations.some((location) => location.x === cell.x && location.y === cell.y) ){
        continue;
      }

      if (!cell.hasMine ) {
        newMineLocations.push({x: cell.x, y: cell.y});
        allocatedMines++;
      }
    }

    return newMineLocations;
  };

  const getCellsWithMines = (newMineLocations, currentBoard) => {
    const cellsWithMines = [];

    for( const location of newMineLocations){
      const currentCell = currentBoard[location.x][location.y];

      const updatedCell = {
        ...currentCell,
        hasMine: true
      }
      cellsWithMines.push( updatedCell );
    }
    return cellsWithMines;
  }

  const getAdjacentMinesCount = (selectedCell, currentBoard, boardSize) => {
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

        if ( neighbourCell.hasMine ) {
          adjacentMinesCount++;
        }
      }
    }
    return adjacentMinesCount;
  };

  const getIncorrectlyFlaggedCells = (gameBoard, currentFlagLocations) => {
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

  const getRevealedMineCells = (gameBoard, currentMineLocations) => {
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

  const isOffBoard = (x, y, boardSize) => {
    const rowCount = boardSize.rowCount;
    const columnCount = boardSize.columnCount;

    if (
      x < 0 || x >= rowCount || y < 0 || y >= columnCount 
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  const updateBoard = (currentBoard, updatedCells) => {
    const updatedBoard = [...currentBoard];

    for ( const cell of updatedCells ){
      const updatedCell = { ...cell };
      updatedBoard[cell.x][cell.y] = updatedCell;
    }
    return updatedBoard;
  };

  const hasCell = (x, y, cells) => {
    return cells.some((cell) => cell.x === x && cell.y === y)
  }

  const revealCell = (x, y, currentBoard, boardSize, revealedCells = []) => {

    if ( isOffBoard(x, y, boardSize) || hasCell(x, y, revealedCells) ) {
      return;
    }

    const cell = currentBoard[x][y];
    
    const updatedCell = {
      ...cell,
      isFlagged: false,
      isRevealed: true
    }

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

  const coordinatesMatch = ({x: x1, y: y1}, {x: x2, y: y2}) => {
      return x1 === x2 && y1 === y2
  }

  const getFilteredFlagLocations = (currentFlagLocations, cells) => {

    const updatedFlagLocations = currentFlagLocations.filter(location => 
      !cells.some(cell => coordinatesMatch(location, cell))
    );

    return updatedFlagLocations;
  }

  const onRevealCell = (event) => {
    const target = event.target;
    const rowIndex = parseInt(target.dataset.row);
    const colIndex = parseInt(target.dataset.col);

    const selectedCell = board[rowIndex][colIndex];

    if (selectedCell.isRevealed) {
      return;
    }

    const currentBoard = [...board];

    if ( shouldPlaceMines ){
      const newMineLocations = getMineLocations(
        selectedCell,
        currentBoard,
        gameDifficultySettings.mineCount,
        gameDifficultySettings.boardSize,
      );

      const cellsWithMines = getCellsWithMines(newMineLocations, currentBoard);
      const boardWithMines = updateBoard(currentBoard, cellsWithMines);
      
      setMineLocations(newMineLocations);
      setShouldPlaceMines(false);
      setBoard(prevBoard => boardWithMines);
    }

    const revealedCells = revealCell(
      selectedCell.x, 
      selectedCell.y, 
      currentBoard, 
      gameDifficultySettings.boardSize
    );
    
    const updatedBoard = updateBoard(currentBoard, revealedCells);

    updateGameState(
      updatedBoard,
      selectedCell,
      revealedCells,
      flagLocations,
      mineLocations
    );
  };

  const updateGameState = (
    currentBoard,
    selectedCell,
    revealedCells,
    currentFlagLocations,
    currentMineLocations
  ) => {

    if (selectedCell.hasMine) {

      const gameLostBoard = getGameLostBoard(currentBoard, currentMineLocations, currentFlagLocations);
      
      setBoard(gameLostBoard);
      setGameStatus(GameStatus.GAME_LOST);

      return;
    }

    const updatedFlagLocations = getFilteredFlagLocations(
      currentFlagLocations,
      revealedCells
    );

    const revealedCellsCount = revealedCells.length;
    const flagsCount = updatedFlagLocations.length;
    const mineCount = gameDifficultySettings.mineCount;

    const updatedFlagsCount = mineCount - flagsCount;
    const updatedSafeCellsCount = safeCellsCount - revealedCellsCount;

    setFlagLocations(updatedFlagLocations);
    setRemainingFlagsCount(updatedFlagsCount);
    setBoard(currentBoard);
    setSafeCellsCount(updatedSafeCellsCount);

    updatedSafeCellsCount === 0
      ? setGameStatus(GameStatus.GAME_WON)
      : setGameStatus(GameStatus.GAME_IN_PROGRESS);
  };

  const getGameLostBoard = (currentBoard, currentMineLocations, currentFlagLocations) => {
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
  }

  const onToggleFlag = (event) => {
    event.preventDefault();

    let target = event.currentTarget;
    let rowIndex = parseInt(target.dataset.row);
    let colIndex = parseInt(target.dataset.col);

    let selectedCell = board[rowIndex][colIndex];

    if (selectedCell.isRevealed) {
      return;
    }

    let updatedBoard = [...board];
    let flagCount = remainingFlagsCount;
    
    const isFlagged = selectedCell.isFlagged ? false : true;

    let updatedCell = {
      ...selectedCell,
      isFlagged: isFlagged
    }
    updatedBoard[rowIndex][colIndex] = updatedCell;

    let updatedFlagLocations = [];

    if ( isFlagged ){
      flagCount  = flagCount - 1;
      updatedFlagLocations = [...flagLocations, {x: selectedCell.x, y: selectedCell.y}];
    }
    else {
      flagCount = flagCount + 1;
      updatedFlagLocations = flagLocations.filter(
        (flagLocation) => !coordinatesMatch(flagLocation, selectedCell)
      );
    }
    setRemainingFlagsCount(flagCount);
    setFlagLocations(updatedFlagLocations);
    setBoard(updatedBoard);
  };

  const getBoard = (boardSize) => {

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
  }

  const setupNewGame = () => {

    const boardSize = gameDifficultySettings.boardSize;
    const rowCount = boardSize.rowCount;
    const columnCount = boardSize.columnCount;
    const mineCount = gameDifficultySettings.mineCount;

    const newBoard = getBoard(boardSize);

    setMineLocations([]);
    setFlagLocations([]);
    setShouldPlaceMines(true);
    setGameStatus(GameStatus.GAME_NOT_STARTED);
    setRemainingFlagsCount(gameDifficultySettings.mineCount);
    setSafeCellsCount(rowCount * columnCount - mineCount);
    setBoard(newBoard);
  };

  const gameHasEnded = () => {
    switch (gameStatus) {
      case GameStatus.GAME_LOST:
        return true;
      case GameStatus.GAME_WON:
        return true;
      default:
        return false;
    }
  };

  const userWonGame = () => {
    if (gameStatus === GameStatus.GAME_WON) {
      return true;
    }
    return false;
  };

  return (
      <div className="wrapper">
        <h1 className="game-title">Minesweeper</h1>
        <GameDifficultySelector
          gameDifficultySettings={gameDifficultySettings}
          onChange={onGameDifficultyLevelChanged}
        ></GameDifficultySelector>
        <RemainingFlagsCounter remainingFlagsCount={remainingFlagsCount}></RemainingFlagsCounter>
        { gameHasEnded() && 
            <GameResultModal
              gameWon={userWonGame()}
              onClick={onCloseGameResultModal}
            ></GameResultModal>
        }
        <GameBoard
          board={board}
          boardSize={gameDifficultySettings.boardSize}
          onClick={onRevealCell}
          onContextMenu={onToggleFlag}
        ></GameBoard>
      </div>
  );
}

export default App;
