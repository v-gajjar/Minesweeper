import { useState, useEffect } from "react";

import GameStatus from "./enum/GameStatus";
import { GAME_DIFFICULTY_LEVEL_SETTINGS } from "./config/gameDifficultyLevelSettings";

import GameDifficultySelector from "./components/GameDifficultySelector";
import GameBoard from "./components/GameBoard";
import GameResultModal from "./components/GameResultModal";
import RemainingFlagsCounter from "./components/RemainingFlagsCounter";

import { 
  getMineLocations,
  getCellsWithMines,
  updateBoard,
  revealCell,
  coordinatesMatch,
  getFilteredFlagLocations,
  getGameLostBoard,
  getBoard,
}
from "./minesweeperUtils.js"
  

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
