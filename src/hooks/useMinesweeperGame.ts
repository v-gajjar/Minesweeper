// src/hooks/useMinesweeperGame.ts

import { useReducer } from 'react';
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
import type {
  BoardData,
  DifficultyLevel,
  Coordinate,
  FlagLocations,
  MineLocations,
  GameStatus,
} from '@/types';

export type GameState = {
  board: BoardData;
  flagLocations: FlagLocations;
  mineLocations: MineLocations;
  shouldPlaceMines: boolean;
  gameStatus: GameStatus;
  difficultyLevel: DifficultyLevel;
  remainingFlagsCount: number;
  safeCellsCount: number;
};

export type GameAction =
  | { type: 'START_NEW_GAME'; difficulty: DifficultyLevel }
  | { type: 'TOGGLE_FLAG'; location: Coordinate }
  | { type: 'REVEAL_CELL'; location: Coordinate };

const cloneBoard = (board: BoardData): BoardData =>
  board.map((row) => row.map((cell) => ({ ...cell })));

const cloneLocations = (locations: Coordinate[]): Coordinate[] =>
  locations.map((location) => ({ ...location }));

const getDifficultySettingsForLevel = (level: DifficultyLevel) =>
  GAME_DIFFICULTY_LEVEL_SETTINGS[level];

const getDifficultySettingsForState = (state: GameState) =>
  getDifficultySettingsForLevel(state.difficultyLevel);

// Helper to make intent clearer when accessing a cell by coordinate
const getCellAt = (board: BoardData, { x, y }: Coordinate) => board[x][y];

type ToggleFlagResult = {
  board: BoardData;
  flagLocations: FlagLocations;
  remainingFlagsCount: number;
  changed: boolean;
};

function toggleFlagOnBoard(
  state: GameState,
  location: Coordinate
): ToggleFlagResult {
  const board = cloneBoard(state.board);
  const flagLocations = cloneLocations(state.flagLocations);
  const cell = getCellAt(board, location);

  // Can't flag already revealed cells → no change
  if (cell.isRevealed) {
    return {
      board: state.board,
      flagLocations: state.flagLocations,
      remainingFlagsCount: state.remainingFlagsCount,
      changed: false,
    };
  }

  const isFlagged = !cell.isFlagged;
  board[location.x][location.y] = { ...cell, isFlagged };

  const updatedFlagLocations: FlagLocations = isFlagged
    ? [...flagLocations, { x: location.x, y: location.y }]
    : flagLocations.filter((f) => !(f.x === location.x && f.y === location.y));

  const updatedRemainingFlags = isFlagged
    ? state.remainingFlagsCount - 1
    : state.remainingFlagsCount + 1;

  return {
    board,
    flagLocations: updatedFlagLocations,
    remainingFlagsCount: updatedRemainingFlags,
    changed: true,
  };
}

function placeMinesOnFirstClick(
  board: BoardData,
  clickLocation: Coordinate,
  state: GameState
): { board: BoardData; mineLocations: MineLocations } {
  const settings = getDifficultySettingsForState(state);
  const clickedCell = getCellAt(board, clickLocation);

  const mineLocations = getMineLocations(
    clickedCell,
    board,
    settings.mineCount,
    settings.boardSize
  );

  const boardWithMines = updateBoard(
    board,
    getCellsWithMines(mineLocations, board)
  );

  return {
    board: boardWithMines,
    mineLocations,
  };
}

function getSafeProgress(
  board: BoardData,
  difficultyLevel: DifficultyLevel
): { safeCellsLeft: number; status: GameStatus } {
  const settings = getDifficultySettingsForLevel(difficultyLevel);
  const totalCells =
    settings.boardSize.rowCount * settings.boardSize.columnCount;
  const totalMines = settings.mineCount;
  const totalSafeCells = totalCells - totalMines;

  const revealedSafeCells = board
    .flat()
    .filter((c) => !c.hasMine && c.isRevealed).length;

  const safeCellsLeft = totalSafeCells - revealedSafeCells;
  const status: GameStatus = safeCellsLeft === 0 ? 'WON' : 'IN_PROGRESS';

  return { safeCellsLeft, status };
}

export function getHintLocationFromState(state: GameState): Coordinate | null {
  if (state.gameStatus !== 'IN_PROGRESS') {
    return null;
  }

  const { board } = state;
  const rowCount = board.length;
  if (rowCount === 0) return null;

  const colCount = board[0].length;

  const allSafe: Coordinate[] = [];
  const frontierSafe: Coordinate[] = [];

  const frontierSeen = new Set<string>();

  const isSafeCandidate = (x: number, y: number) => {
    const cell = board[x][y];
    return !cell.isRevealed && !cell.isFlagged && !cell.hasMine;
  };

  const addFrontierSafe = (x: number, y: number) => {
    if (!isSafeCandidate(x, y)) return;
    const key = `${x},${y}`;
    if (frontierSeen.has(key)) return;
    frontierSeen.add(key);
    frontierSafe.push({ x, y });
  };

  // 1) collect all safe candidates
  for (let x = 0; x < rowCount; x++) {
    for (let y = 0; y < colCount; y++) {
      if (isSafeCandidate(x, y)) {
        allSafe.push({ x, y });
      }
    }
  }

  // 2) collect safe cells that are NEXT TO any revealed cell
  for (let x = 0; x < rowCount; x++) {
    for (let y = 0; y < colCount; y++) {
      const cell = board[x][y];
      if (!cell.isRevealed) continue;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;

          const nx = x + dx;
          const ny = y + dy;

          if (nx < 0 || ny < 0 || nx >= rowCount || ny >= colCount) continue;

          addFrontierSafe(nx, ny);
        }
      }
    }
  }

  const pickRandom = (coords: Coordinate[]) => {
    const i = Math.floor(Math.random() * coords.length);
    return coords[i];
  };

  if (frontierSafe.length > 0) {
    return pickRandom(frontierSafe);
  }

  if (allSafe.length > 0) {
    return pickRandom(allSafe);
  }

  return null;
}

function createGameState(difficulty: DifficultyLevel): GameState {
  const settings = getDifficultySettingsForLevel(difficulty);
  const totalCells =
    settings.boardSize.rowCount * settings.boardSize.columnCount;
  const mineCount = settings.mineCount;

  return {
    board: getBoard(settings.boardSize),
    flagLocations: [],
    mineLocations: [],
    shouldPlaceMines: true,
    gameStatus: 'NOT_STARTED',
    difficultyLevel: difficulty,
    remainingFlagsCount: mineCount,
    safeCellsCount: totalCells - mineCount,
  };
}

/**
 * Game rules:
 * - START_NEW_GAME: reset board, flags, mines, and counters for the chosen difficulty.
 * - TOGGLE_FLAG: toggle isFlagged, update flagLocations and remainingFlagsCount.
 *   - Cannot flag revealed cells.
 * - REVEAL_CELL:
 *   - On first click, place mines away from the clicked cell and start the game.
 *   - If a mine is revealed → LOST and show the lost board.
 *   - Auto-remove flags from newly revealed cells.
 *   - Track safeCellsCount; when it hits 0 → WON.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_NEW_GAME': {
      return createGameState(action.difficulty);
    }

    case 'TOGGLE_FLAG': {
      const { location } = action;
      const result = toggleFlagOnBoard(state, location);

      if (!result.changed) {
        return state;
      }

      const nextState: GameState = {
        ...state,
        board: result.board,
        flagLocations: result.flagLocations,
        remainingFlagsCount: result.remainingFlagsCount,
      };
      return nextState;
    }

    case 'REVEAL_CELL': {
      const { location } = action;

      let board = cloneBoard(state.board);
      let mineLocations = cloneLocations(state.mineLocations);
      const flagLocations = cloneLocations(state.flagLocations);
      let { shouldPlaceMines, gameStatus } = state;

      const cellBeforeReveal = getCellAt(board, location);

      // ignore clicks on revealed/flagged cells or finished games
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
        const placement = placeMinesOnFirstClick(board, location, state);
        board = placement.board;
        mineLocations = placement.mineLocations;
        shouldPlaceMines = false;
        gameStatus = 'IN_PROGRESS';
      }

      // reveal clicked cell (and cascades)
      const updatedBoard = updateBoard(
        board,
        revealCell(
          location.x,
          location.y,
          board,
          getDifficultySettingsForState(state).boardSize
        )
      );

      // hit a mine → game over
      const revealedCell = getCellAt(updatedBoard, location);
      if (revealedCell.hasMine) {
        const lostBoard = getGameLostBoard(
          updatedBoard,
          mineLocations,
          flagLocations
        );

        const settings = getDifficultySettingsForState(state);
        const remainingFlagsCount = settings.mineCount - flagLocations.length;

        const nextState: GameState = {
          ...state,
          board: lostBoard,
          gameStatus: 'LOST',
          mineLocations,
          shouldPlaceMines,
          flagLocations,
          safeCellsCount: 0,
          remainingFlagsCount,
        };
        return nextState;
      }

      // otherwise, update flags + safe cell count and maybe mark win
      const revealedCells = updatedBoard.flat().filter((c) => c.isRevealed);

      const updatedFlagLocations = getFilteredFlagLocations(
        flagLocations,
        revealedCells
      );

      const { safeCellsLeft, status } = getSafeProgress(
        updatedBoard,
        state.difficultyLevel
      );

      const settings = getDifficultySettingsForState(state);
      const remainingFlagsCount =
        settings.mineCount - updatedFlagLocations.length;

      const nextState: GameState = {
        ...state,
        board: updatedBoard,
        gameStatus: status,
        mineLocations,
        shouldPlaceMines,
        flagLocations: updatedFlagLocations,
        safeCellsCount: safeCellsLeft,
        remainingFlagsCount,
      };
      return nextState;
    }

    default:
      return state;
  }
}

export const initialGameState: GameState = createGameState('EASY');

export function initializeGameState(state: GameState): GameState {
  return createGameState(state.difficultyLevel);
}

// Thin hook wrapper so App.tsx can just call functions instead of dispatching actions directly
export function useMinesweeperGame() {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialGameState,
    initializeGameState
  );

  const getHintLocation = () => getHintLocationFromState(state);

  const startNewGame = (difficulty: DifficultyLevel) =>
    dispatch({ type: 'START_NEW_GAME', difficulty });

  const revealCellAt = (location: Coordinate) =>
    dispatch({ type: 'REVEAL_CELL', location });

  const toggleFlagAt = (location: Coordinate) =>
    dispatch({ type: 'TOGGLE_FLAG', location });

  return {
    state,
    startNewGame,
    revealCellAt,
    toggleFlagAt,
    getHintLocation,
  };
}
