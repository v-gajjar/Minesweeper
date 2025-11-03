import React, { useState, useEffect, useRef, useCallback } from 'react';

import { GAME_DIFFICULTY_LEVEL_SETTINGS } from '@config/gameDifficultyLevelSettings';

import DifficultySelect from '@/components/feature/DifficultySelect/DifficultySelect';

import GameBoard from '@feature/GameBoard/GameBoard';
import ResultModal from '@/components/feature/ResultModal/ResultModal';
import RemainingFlagsCounter from '@feature/RemainingFlagsCounter/RemainingFlagsCounter';

import {
  getMineLocations,
  getCellsWithMines,
  updateBoard,
  getBoard,
  getGameLostBoard,
  revealCell,
  coordinatesMatch,
  getFilteredFlagLocations,
} from './utils/index.ts';

import './App.css';
import type {
  DifficultyLevel,
  DifficultyConfig,
  BoardData,
  CellData,
  FlagLocations,
  MineLocations,
  GameStatus,
} from '@/types';

function App() {
  const [board, setBoard] = useState<BoardData>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('NOT_STARTED');

  const [remainingFlagsCount, setRemainingFlagsCount] = useState(0);
  const [shouldPlaceMines, setShouldPlaceMines] = useState(true);
  const [safeCellsCount, setSafeCellsCount] = useState(0);
  const [mineLocations, setMineLocations] = useState<MineLocations>([]);
  const [flagLocations, setFlagLocations] = useState<FlagLocations>([]);

  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('EASY');

  const boardContainerRef = useRef<HTMLInputElement>(null);

  const DIFFICULTY_SELECT_ID = 'game-difficulty-select';

  const gameDifficultySettings: DifficultyConfig =
    GAME_DIFFICULTY_LEVEL_SETTINGS[difficultyLevel];

  const onSelectDifficulty = useCallback((difficultyLevel: DifficultyLevel) => {
    resetBoardContainerScroll();
    setGameStatus('NOT_STARTED');
    setDifficultyLevel(difficultyLevel);
  }, []);

  const handleGameRestart = () => {
    resetBoardContainerScroll();
    setupNewGame();
  };

  const resetBoardContainerScroll = () => {
    if (!boardContainerRef.current) return;
    // scroll doesn't automatically reset when board size is changed
    // so reset to 0 for better UX
    boardContainerRef.current.scrollLeft = 0;
  };

  const onRevealCell = (x: number, y: number) => {
    const rowIndex = x;
    const colIndex = y;

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
      setGameStatus('LOST');

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
      ? setGameStatus('WON')
      : setGameStatus('IN_PROGRESS');
  };

  const onToggleFlag = (x: number, y: number) => {
    const rowIndex = x;
    const colIndex = y;

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

  //memoized to prevent infinite loop --- IGNORE ---
  const setupNewGame = useCallback(() => {
    const boardSize = gameDifficultySettings.boardSize;
    const rowCount = boardSize.rowCount;
    const columnCount = boardSize.columnCount;
    const mineCount = gameDifficultySettings.mineCount;

    const newBoard = getBoard(boardSize);

    setMineLocations([]);
    setFlagLocations([]);
    setShouldPlaceMines(true);
    setGameStatus('NOT_STARTED');
    setRemainingFlagsCount(gameDifficultySettings.mineCount);
    setSafeCellsCount(rowCount * columnCount - mineCount);
    setBoard(newBoard);
  }, [gameDifficultySettings]);

  //moved from above to here --- IGNORE ---
  useEffect(() => {
    setupNewGame();
  }, [setupNewGame]);

  const isResultModalOpen =
    gameStatus === 'WON' || gameStatus === 'LOST' ? true : false;

  const gameWon = gameStatus === 'WON' ? true : false;

  return (
    <>
      <header className='header'>
        <h1 className='header-game-title'>Minesweeper</h1>
      </header>
      <main className='wrapper'>
        <div className='game_difficulty_select_wrapper'>
          <label htmlFor={DIFFICULTY_SELECT_ID}>Difficulty: </label>
          <DifficultySelect
            difficultyLevel={difficultyLevel}
            onChange={onSelectDifficulty}
            id={DIFFICULTY_SELECT_ID}
          ></DifficultySelect>
        </div>
        <div className='remainingFlagsCounterWrapper'>
          <RemainingFlagsCounter
            remainingFlagsCount={remainingFlagsCount}
        ></RemainingFlagsCounter>
        </div>
        <ResultModal
          open={isResultModalOpen}
          gameWon={gameWon}
          onClick={handleGameRestart}
        ></ResultModal>
        <div className='boardContainer' ref={boardContainerRef}>
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
