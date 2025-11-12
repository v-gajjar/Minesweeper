import {
  getBoard,
  revealCell,
  updateBoard,
  getMineLocations,
  getCellsWithMines,
  getGameLostBoard,
  getFilteredFlagLocations,
} from '../utils';
import { GAME_DIFFICULTY_LEVEL_SETTINGS } from '@config/gameDifficultyLevelSettings';
import type { BoardData, DifficultyLevel } from '@/types';

type Location = { x: number; y: number };

type GameState = {
  board: BoardData;
  flagLocations: Location[];
  mineLocations: Location[];
  shouldPlaceMines: boolean;
  gameStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'WON' | 'LOST';
  difficultyLevel: DifficultyLevel;
  remainingFlagsCount: number;
  safeCellsCount: number;
};

type GameAction =
  | { type: 'START_NEW_GAME'; difficulty: DifficultyLevel }
  | { type: 'TOGGLE_FLAG'; location: Location }
  | { type: 'REVEAL_CELL'; location: Location };

const cloneBoard = (board: BoardData): BoardData =>
  board.map((row) => row.map((cell) => ({ ...cell })));

const cloneLocations = (locations: Location[]): Location[] =>
  locations.map((location) => ({ ...location }));

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_NEW_GAME': {
      const difficulty = GAME_DIFFICULTY_LEVEL_SETTINGS[action.difficulty];
      const totalCells =
        difficulty.boardSize.rowCount * difficulty.boardSize.columnCount;
      const mineCount = difficulty.mineCount;
      const newBoard = getBoard(difficulty.boardSize);

      const nextState: GameState = {
        ...state,
        board: newBoard,
        flagLocations: [],
        mineLocations: [],
        shouldPlaceMines: true,
        gameStatus: 'NOT_STARTED',
        remainingFlagsCount: mineCount,
        safeCellsCount: totalCells - mineCount,
        difficultyLevel: action.difficulty,
      };
      return nextState;
    }

    case 'TOGGLE_FLAG': {
      const { location } = action;
      const board = cloneBoard(state.board);
      const flagLocations = cloneLocations(state.flagLocations);
      const cell = board[location.x][location.y];
      
      if (cell.isRevealed) return state;

      const isFlagged = !cell.isFlagged;
      board[location.x][location.y] = { ...cell, isFlagged };

      const updatedFlagLocations = isFlagged
        ? [...flagLocations, { x: location.x, y: location.y }]
        : flagLocations.filter(
            (f) => !(f.x === location.x && f.y === location.y)
          );

      const updatedRemainingFlags = isFlagged
        ? state.remainingFlagsCount - 1
        : state.remainingFlagsCount + 1;

      const nextState: GameState = {
        ...state,
        board,
        flagLocations: updatedFlagLocations,
        remainingFlagsCount: updatedRemainingFlags,
      };
      return nextState;
    }

    case 'REVEAL_CELL': {
      const { location } = action;

      let board = cloneBoard(state.board);
      let mineLocations = cloneLocations(state.mineLocations);
      let flagLocations = cloneLocations(state.flagLocations);
      let { shouldPlaceMines, gameStatus } = state;

      const cellBeforeReveal = board[location.x][location.y];
      if (
        cellBeforeReveal.isRevealed ||
        cellBeforeReveal.isFlagged ||
        gameStatus === 'WON' ||
        gameStatus === 'LOST'
      ) {
        return state;
      }

      // place mines on first click
      if (shouldPlaceMines) {
        const settings = GAME_DIFFICULTY_LEVEL_SETTINGS[state.difficultyLevel];
        mineLocations = getMineLocations(
          cellBeforeReveal,
          board,
          settings.mineCount,
          settings.boardSize
        );
        board = updateBoard(board, getCellsWithMines(mineLocations, board));
        shouldPlaceMines = false;
        gameStatus = 'IN_PROGRESS';
      }

      // reveal clicked cell
      const updatedBoard = updateBoard(
        board,
        revealCell(
          location.x,
          location.y,
          board,
          GAME_DIFFICULTY_LEVEL_SETTINGS[state.difficultyLevel].boardSize
        )
      );

      // hit a mine → game over
      const revealedCell = updatedBoard[location.x][location.y];
      if (revealedCell.hasMine) {
        const lostBoard = getGameLostBoard(
          updatedBoard,
          mineLocations,
          flagLocations
        );
        const nextState: GameState = {
          ...state,
          board: lostBoard,
          gameStatus: 'LOST',
          mineLocations,
          shouldPlaceMines,
          flagLocations,
        };
        return nextState;
      }

      const updatedFlagLocations = getFilteredFlagLocations(
        flagLocations,
        updatedBoard.flat().filter((c) => c.isRevealed)
      );

      const settings = GAME_DIFFICULTY_LEVEL_SETTINGS[state.difficultyLevel];
      const totalCells =
        settings.boardSize.rowCount * settings.boardSize.columnCount;
      const totalMines = settings.mineCount;
      const totalSafeCells = totalCells - totalMines;
      const revealedSafeCells = updatedBoard
        .flat()
        .filter((c) => !c.hasMine && c.isRevealed).length;

      const nextGameStatus =
        revealedSafeCells === totalSafeCells ? 'WON' : 'IN_PROGRESS';

      const nextState: GameState = {
        ...state,
        board: updatedBoard,
        gameStatus: nextGameStatus,
        mineLocations,
        shouldPlaceMines,
        flagLocations: updatedFlagLocations,
        safeCellsCount: totalSafeCells - revealedSafeCells,
      };
      return nextState;
    }

    default:
      return state;
  }
}

export const initialGameState: GameState = {
  board: [],
  flagLocations: [],
  mineLocations: [],
  shouldPlaceMines: true,
  gameStatus: 'NOT_STARTED',
  difficultyLevel: 'EASY',
  remainingFlagsCount: 0,
  safeCellsCount: 0,
};

export function initializeGameState(state: GameState): GameState {
  const settings = GAME_DIFFICULTY_LEVEL_SETTINGS[state.difficultyLevel];
  const totalCells =
    settings.boardSize.rowCount * settings.boardSize.columnCount;
  const mineCount = settings.mineCount;

  return {
    ...state,
    board: getBoard(settings.boardSize),
    flagLocations: [],
    mineLocations: [],
    shouldPlaceMines: true,
    gameStatus: 'NOT_STARTED',
    remainingFlagsCount: mineCount,
    safeCellsCount: totalCells - mineCount,
  };
}