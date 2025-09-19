import React, { useState, useEffect, useRef } from 'react';

import { GAME_DIFFICULTY_LEVEL_SETTINGS } from './config/gameDifficultyLevelSettings.js';

import GameDifficultySelector from './components/feature/gamedifficulty/GameDifficultySelector';
import GameBoard from './components/feature/gameboard/GameBoard';
import GameResultModal from './components/feature/gameresultmodal/GameResultModal';
import RemainingFlagsCounter from './components/feature/remainingflagscounter/RemainingFlagsCounter';

import {
  getMineLocations,
  getCellsWithMines,
  updateBoard,
  revealCell,
  coordinatesMatch,
  getFilteredFlagLocations,
  getGameLostBoard,
  getBoard,
} from './minesweeperUtils.js';

import GameStatus from './enum/GameStatus.js';
import { useCallback } from 'react';

import './App.css';
import type {
  BoardData,
  CellData,
  FlagLocations,
  LocationColRow,
  MineLocations,
} from './types';

function App() {
  const [board, setBoard] = useState<BoardData>([]);
  const [gameStatus, setGameStatus] = useState<number>(
    GameStatus.GAME_NOT_STARTED
  );
  const [remainingFlagsCount, setRemainingFlagsCount] = useState(0);
  const [shouldPlaceMines, setShouldPlaceMines] = useState(true);
  const [safeCellsCount, setSafeCellsCount] = useState(0);
  const [mineLocations, setMineLocations] = useState<MineLocations>([]);
  const [flagLocations, setFlagLocations] = useState<FlagLocations>([]);

  const [gameDifficultySettings, setGameDifficultySettings] = useState(
    GAME_DIFFICULTY_LEVEL_SETTINGS.EASY
  );
  const boardContainerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameHasEnded()) {
      const gameResultModal = document.getElementById(
        'gameResultModal'
      ) as unknown as { showModal: () => void }; // TODO: refactor modal
      gameResultModal.showModal();
    }
  }, [gameStatus]);

  useEffect(() => {
    setupNewGame();
  }, [gameDifficultySettings]);

  const onGameDifficultyLevelChanged = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedLevel = event.target.value;

      const difficultyLevel = Object.values(
        GAME_DIFFICULTY_LEVEL_SETTINGS
      ).find((difficultySetting) => selectedLevel === difficultySetting.level);

      if (!difficultyLevel) {
        return;
      }

      resetBoardContainerScroll();
      setGameStatus(GameStatus.GAME_NOT_STARTED);
      setGameDifficultySettings(difficultyLevel);
    },
    []
  );

  const onCloseGameResultModal = () => {
    const gameResultModal = document.getElementById(
      'gameResultModal'
    ) as unknown as { close: () => void }; // TODO: refactor modal
    gameResultModal.close();

    resetBoardContainerScroll();
    setupNewGame();
  };

  const resetBoardContainerScroll = () => {
    if (!boardContainerRef.current) return;
    // scroll doesn't automatically reset when board size is changed
    // so reset to 0 for better UX
    boardContainerRef.current.scrollLeft = 0;
  };

  const onRevealCell = (event: React.SyntheticEvent<HTMLElement>) => {
    const target = event.target as unknown as {
      dataset: { row: string; col: string };
    };
    const rowIndex = parseInt(target.dataset.row);
    const colIndex = parseInt(target.dataset.col);

    const selectedCell = board[rowIndex][colIndex];

    if (selectedCell.isRevealed) {
      return;
    }

    const currentBoard = [...board];

    if (shouldPlaceMines) {
      const newMineLocations = getMineLocations(
        selectedCell,
        currentBoard,
        gameDifficultySettings.mineCount,
        gameDifficultySettings.boardSize
      );

      const cellsWithMines = getCellsWithMines(newMineLocations, currentBoard);
      const boardWithMines = updateBoard(currentBoard, cellsWithMines);

      setMineLocations(newMineLocations);
      setShouldPlaceMines(false);
      setBoard(boardWithMines);
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
    currentBoard: BoardData,
    selectedCell: CellData,
    revealedCells: CellData[],
    currentFlagLocations: FlagLocations,
    currentMineLocations: MineLocations
  ) => {
    if (selectedCell.hasMine) {
      const gameLostBoard = getGameLostBoard(
        currentBoard,
        currentMineLocations,
        currentFlagLocations
      );

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

  const onToggleFlag = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const target = event.currentTarget as unknown as {
      dataset: LocationColRow;
    };
    const rowIndex = parseInt(target.dataset.row);
    const colIndex = parseInt(target.dataset.col);

    const selectedCell = board[rowIndex][colIndex];

    if (selectedCell.isRevealed) {
      return;
    }

    const updatedBoard = [...board];
    let flagCount = remainingFlagsCount;

    const isFlagged = selectedCell.isFlagged ? false : true;

    const updatedCell = {
      ...selectedCell,
      isFlagged: isFlagged,
    };
    updatedBoard[rowIndex][colIndex] = updatedCell;

    let updatedFlagLocations = [];

    if (isFlagged) {
      flagCount = flagCount - 1;
      updatedFlagLocations = [
        ...flagLocations,
        { x: selectedCell.x, y: selectedCell.y },
      ];
    } else {
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
    <>
      <header>
        <h1 className='game-title'>Minesweeper</h1>
      </header>
      <main className='wrapper'>
        <GameDifficultySelector
          gameDifficultySettings={gameDifficultySettings}
          onChange={onGameDifficultyLevelChanged}
        ></GameDifficultySelector>
        <RemainingFlagsCounter
          remainingFlagsCount={remainingFlagsCount}
        ></RemainingFlagsCounter>
        {gameHasEnded() && (
          <GameResultModal
            gameWon={userWonGame()}
            onClick={onCloseGameResultModal}
          ></GameResultModal>
        )}
        <div id='boardContainer' ref={boardContainerRef}>
          <GameBoard
            board={board}
            boardSize={gameDifficultySettings.boardSize}
            onClick={onRevealCell}
            onContextMenu={onToggleFlag}
          ></GameBoard>
        </div>
      </main>
    </>
  );
}

export default App;
