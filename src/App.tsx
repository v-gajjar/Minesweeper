import { useReducer, useRef, useCallback } from 'react';

import { GAME_DIFFICULTY_LEVEL_SETTINGS } from '@config/gameDifficultyLevelSettings';

import DifficultySelect from '@/components/feature/DifficultySelect/DifficultySelect';

import GameBoard from '@feature/GameBoard/GameBoard';
import ResultModal from '@/components/feature/ResultModal/ResultModal';
import RemainingFlagsCounter from '@feature/RemainingFlagsCounter/RemainingFlagsCounter';

import './App.css';
import type { DifficultyLevel, DifficultyConfig } from '@/types';

import {
  initialGameState,
  gameReducer,
  initializeGameState,
  getHintLocationFromState
} from './hooks/useMinesweeperGame.ts';

function App() {
  // stored state variables
  const [state, dispatch] = useReducer(
    gameReducer,
    initialGameState,
    initializeGameState,
  );

  const { board, gameStatus, remainingFlagsCount, difficultyLevel } = state;

  const boardContainerRef = useRef<HTMLInputElement>(null);

  const DIFFICULTY_SELECT_ID = 'game-difficulty-select';

  const gameDifficultySettings: DifficultyConfig =
    GAME_DIFFICULTY_LEVEL_SETTINGS[difficultyLevel];

  const resetBoardContainerScroll = () => {
    if (!boardContainerRef.current) return;
    // scroll doesn't automatically reset when board size is changed
    // so reset to 0 for better UX
    boardContainerRef.current.scrollLeft = 0;
  };

  const onSelectDifficulty = useCallback(
    (difficultyLevel: DifficultyLevel) => {
      resetBoardContainerScroll();
      dispatch({ type: 'START_NEW_GAME', difficulty: difficultyLevel });
    },
    [dispatch]
  );

  const handleGameRestart = () => {
    resetBoardContainerScroll();
    dispatch({ type: 'START_NEW_GAME', difficulty: difficultyLevel });
  };

  const onRevealCell = useCallback(
    (x: number, y: number) => {
      if (gameStatus === 'WON' || gameStatus === 'LOST') return;
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

  const isResultModalOpen =
    state.gameStatus === 'WON' || state.gameStatus === 'LOST' ? true : false;

  const gameWon = state.gameStatus === 'WON' ? true : false;

  const handleHintClick = () => {
  const coord = getHintLocationFromState(state);
  console.log('HINT:', coord);
};

return (
  <>
    <header className='header'>
      <h1 className='header-game-title'>Minesweeper</h1>
    </header>
    <main className='wrapper'>
      <div className='game-difficulty-select-wrapper'>
        <label htmlFor={DIFFICULTY_SELECT_ID}>Difficulty: </label>
        <DifficultySelect
          difficultyLevel={difficultyLevel}
          onChange={onSelectDifficulty}
          id={DIFFICULTY_SELECT_ID}
        />
      </div>

      <div className='remaining-flags-counter-wrapper'>
        <RemainingFlagsCounter remainingFlagsCount={remainingFlagsCount} />
      </div>

      {/* ⬇️ add this block here ⬇️ */}
      <div className="hint-button-wrapper">
        <button type="button" onClick={handleHintClick}>
          Hint
        </button>
      </div>
      {/* ⬆️ add this block here ⬆️ */}

      <ResultModal
        open={isResultModalOpen}
        gameWon={gameWon}
        onClick={handleGameRestart}
      />
      <div className='board-container' ref={boardContainerRef}>
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
