import { useReducer, useRef, useCallback, useEffect } from 'react';

import { GAME_DIFFICULTY_LEVEL_SETTINGS } from '@config/gameDifficultyLevelSettings';

import DifficultySelect from '@/components/feature/DifficultySelect/DifficultySelect';
import GameBoard from '@feature/GameBoard/GameBoard';
import ResultModal from '@/components/feature/ResultModal/ResultModal';
import RemainingFlagsCounter from '@feature/RemainingFlagsCounter/RemainingFlagsCounter';
import GameTimer from '@feature/GameTimer/GameTimer';

import './App.css';
import type { DifficultyLevel, DifficultyConfig } from '@/types';

import {
  initialGameState,
  gameReducer,
  initializeGameState,
} from './hooks/useMinesweeperGame';

// import timer controls so App can drive the timer based on game events
import {
  timerStart,
  timerStop,
  timerReset,
} from '@feature/GameTimer/useGameTimer';

function App() {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialGameState,
    initializeGameState
  );

  const { board, gameStatus, remainingFlagsCount, difficultyLevel } = state;

  const boardContainerRef = useRef<HTMLDivElement>(null);

  const DIFFICULTY_SELECT_ID = 'game-difficulty-select';

  const gameDifficultySettings: DifficultyConfig =
    GAME_DIFFICULTY_LEVEL_SETTINGS[difficultyLevel];

  const resetBoardContainerScroll = () => {
    if (!boardContainerRef.current) return;
    boardContainerRef.current.scrollLeft = 0;
  };

  // stop timer when game ends
  useEffect(() => {
    if (gameStatus === 'WON' || gameStatus === 'LOST') {
      timerStop();
    }
  }, [gameStatus]);

  const onSelectDifficulty = useCallback(
    (difficulty: DifficultyLevel) => {
      resetBoardContainerScroll();
      // new game → reset timer to 00:00 and stop it
      timerReset();
      dispatch({ type: 'START_NEW_GAME', difficulty });
    },
    [dispatch]
  );

  const handleGameRestart = useCallback(() => {
    resetBoardContainerScroll();
    // restart → reset timer as well
    timerReset();
    dispatch({ type: 'START_NEW_GAME', difficulty: difficultyLevel });
  }, [difficultyLevel, dispatch]);

  const onRevealCell = useCallback(
    (x: number, y: number) => {
      if (gameStatus === 'WON' || gameStatus === 'LOST') {
        return;
      }

      // first click → start timer
      if (gameStatus === 'NOT_STARTED') {
        timerReset();
        timerStart();
      }

      dispatch({ type: 'REVEAL_CELL', location: { x, y } });
    },
    [dispatch, gameStatus]
  );

  const onToggleFlag = useCallback(
    (x: number, y: number) => {
      if (gameStatus === 'WON' || gameStatus === 'LOST') return;
      dispatch({ type: 'TOGGLE_FLAG', location: { x, y } });
    },
    [dispatch, gameStatus]
  );

  const isResultModalOpen = gameStatus === 'WON' || gameStatus === 'LOST';
  const gameWon = gameStatus === 'WON';

  return (
    <>
      <header className="header">
        <h1 className="header-game-title">Minesweeper</h1>
        <div className="header-timer">
          <GameTimer />
        </div>
      </header>

      <main className="wrapper">
        <div className="game-difficulty-select-wrapper">
          <label htmlFor={DIFFICULTY_SELECT_ID}>Difficulty: </label>
          <DifficultySelect
            difficultyLevel={difficultyLevel}
            onChange={onSelectDifficulty}
            id={DIFFICULTY_SELECT_ID}
          />
        </div>

        <div className="remaining-flags-counter-wrapper">
          <RemainingFlagsCounter remainingFlagsCount={remainingFlagsCount} />
        </div>

        <ResultModal
          open={isResultModalOpen}
          gameWon={gameWon}
          onClick={handleGameRestart}
        />

        <div className="board-container" ref={boardContainerRef}>
          <GameBoard
            board={board}
            boardSize={gameDifficultySettings.boardSize}
            onClick={onRevealCell}
            onContextMenu={onToggleFlag}
          />
        </div>
      </main>
    </>
  );
}

export default App;