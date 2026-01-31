import { describe, it, expect } from 'vitest';
import {
  getBoard,
  updateBoard,
  isOffBoard,
  getGameLostBoard,
} from '@/utils/boardUtils';
import type { BoardData, BoardSize, CellData } from '@/types';

/**
 * Small helper to build a complete CellData object without repeating every field.
 * Defaults represent a normal, untouched cell.
 */
const makeCell = (
  x: number,
  y: number,
  overrides: Partial<CellData> = {}
): CellData => ({
  x,
  y,
  isRevealed: false,
  hasMine: false,
  isFlagged: false,
  adjacentMinesCount: 0,
  hasExplodedMine: false,
  isIncorrectlyFlagged: false,
  ...overrides,
});

/**
 * Helper to clone a board (shallow clone of rows and cells) for comparison.
 * Useful when you want to verify untouched cells stay the same after updates.
 */
const cloneBoard = (board: BoardData): BoardData =>
  board.map((row) => row.map((cell) => ({ ...cell })));

describe('boardUtils', () => {
  describe('getBoard', () => {
    it('creates a new board with the requested dimensions', () => {
      const boardSize: BoardSize = { rowCount: 6, columnCount: 8 };
      const board: BoardData = getBoard(boardSize);

      expect(board).toHaveLength(6);
      expect(board[0]).toHaveLength(8);
    });
  });

  describe('updateBoard', () => {
    it('applies the provided cells at their coordinates', () => {
      const initialBoard: BoardData = getBoard({ rowCount: 3, columnCount: 3 });

      const updatedCells: CellData[] = [
        makeCell(0, 0, { isRevealed: true, adjacentMinesCount: 1 }),
        makeCell(1, 1, { isRevealed: true, adjacentMinesCount: 2 }),
        makeCell(2, 2, { isRevealed: false, adjacentMinesCount: 0 }),
      ];

      const updatedBoard: BoardData = updateBoard(initialBoard, updatedCells);

      // Verify specific updated coordinates reflect the provided changes
      expect(updatedBoard[0][0].isRevealed).toBe(true);
      expect(updatedBoard[0][0].adjacentMinesCount).toBe(1);

      expect(updatedBoard[1][1].isRevealed).toBe(true);
      expect(updatedBoard[1][1].adjacentMinesCount).toBe(2);
    });

    it('does not change cells that are not in the updatedCells list', () => {
      const initialBoard: BoardData = getBoard({ rowCount: 4, columnCount: 4 });
      const before = cloneBoard(initialBoard);

      const updatedCells: CellData[] = [
        makeCell(0, 0, { isRevealed: true, adjacentMinesCount: 1 }),
      ];
      const updatedBoard: BoardData = updateBoard(initialBoard, updatedCells);

      // A cell not mentioned in updatedCells should match its pre-update state
      expect(updatedBoard[1][1]).toEqual(before[1][1]);

      // The cell that was updated should differ from its pre-update state
      expect(updatedBoard[0][0]).not.toEqual(before[0][0]);
      expect(updatedBoard[0][0].isRevealed).toBe(true);
    });
  });

  describe('isOffBoard', () => {
    it('returns true for negative coordinates', () => {
      const boardSize: BoardSize = { rowCount: 5, columnCount: 5 };

      expect(isOffBoard(-1, 0, boardSize)).toBe(true);
      expect(isOffBoard(0, -1, boardSize)).toBe(true);
    });

    it('returns true for coordinates beyond the board boundaries', () => {
      const boardSize: BoardSize = { rowCount: 5, columnCount: 5 };

      // Valid x indices are 0..4, so x === 5 is off-board
      expect(isOffBoard(5, 0, boardSize)).toBe(true);

      // Valid y indices are 0..4, so y === 5 is off-board
      expect(isOffBoard(0, 5, boardSize)).toBe(true);
    });

    it('returns false for coordinates inside the board', () => {
      const boardSize: BoardSize = { rowCount: 5, columnCount: 5 };

      expect(isOffBoard(0, 0, boardSize)).toBe(false);
      expect(isOffBoard(2, 2, boardSize)).toBe(false);
      expect(isOffBoard(4, 4, boardSize)).toBe(false);
    });
  });

  describe('getGameLostBoard', () => {
    it('reveals unflagged mines and marks incorrectly flagged cells', () => {
      const initialBoard: BoardData = getBoard({ rowCount: 3, columnCount: 3 });

      // Place a mine that should be revealed on loss (unflagged)
      initialBoard[0][0] = makeCell(0, 0, {
        hasMine: true,
        isFlagged: false,
        isRevealed: false,
      });

      // Place a flag on a non-mine cell, which should become "incorrectly flagged" on loss
      initialBoard[1][1] = makeCell(1, 1, {
        hasMine: false,
        isFlagged: true,
        isRevealed: false,
      });

      // A normal cell should remain unrevealed if it is neither a mine nor part of flagged logic
      initialBoard[2][2] = makeCell(2, 2, {
        hasMine: false,
        isFlagged: false,
        isRevealed: false,
      });

      const mineLocations = [{ x: 0, y: 0 }];
      const flagLocations = [{ x: 1, y: 1 }];

      const gameLostBoard: BoardData = getGameLostBoard(
        initialBoard,
        mineLocations,
        flagLocations
      );

      // The mine location should be revealed on loss if it is not flagged
      expect(gameLostBoard[0][0].isRevealed).toBe(true);

      // A normal non-mine cell should not be revealed just because the game ended
      expect(gameLostBoard[2][2].isRevealed).toBe(false);

      // Non-mine flagged cells should be marked as incorrectly flagged
      expect(gameLostBoard[1][1].isIncorrectlyFlagged).toBe(true);
    });

    it('does not reveal a mine that is flagged', () => {
      const initialBoard: BoardData = getBoard({ rowCount: 5, columnCount: 5 });

      initialBoard[0][0] = makeCell(0, 0, {
        hasMine: true,
        isFlagged: true,
        isRevealed: false,
      });

      const mineLocations = [{ x: 0, y: 0 }];
      const flagLocations = [{ x: 0, y: 0 }];

      const gameLostBoard: BoardData = getGameLostBoard(
        initialBoard,
        mineLocations,
        flagLocations
      );

      // Flagged mines should stay unrevealed
      expect(gameLostBoard[0][0].isRevealed).toBe(false);
    });

    it('does not mark a correctly flagged mine as incorrectly flagged', () => {
      const initialBoard: BoardData = getBoard({ rowCount: 5, columnCount: 5 });

      initialBoard[0][0] = makeCell(0, 0, {
        hasMine: true,
        isFlagged: true,
        isIncorrectlyFlagged: false,
      });

      const mineLocations = [{ x: 0, y: 0 }];
      const flagLocations = [{ x: 0, y: 0 }];

      const gameLostBoard: BoardData = getGameLostBoard(
        initialBoard,
        mineLocations,
        flagLocations
      );

      // Only flags on non-mine cells should be marked incorrect
      expect(gameLostBoard[0][0].isIncorrectlyFlagged).toBe(false);
    });

    it('marks multiple non-mine flagged cells as incorrectly flagged', () => {
      const initialBoard: BoardData = getBoard({ rowCount: 5, columnCount: 5 });

      initialBoard[1][1] = makeCell(1, 1, { hasMine: false, isFlagged: true });
      initialBoard[2][2] = makeCell(2, 2, { hasMine: false, isFlagged: true });

      const mineLocations = [{ x: 0, y: 0 }];
      const flagLocations = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];

      const gameLostBoard: BoardData = getGameLostBoard(
        initialBoard,
        mineLocations,
        flagLocations
      );

      expect(gameLostBoard[1][1].isIncorrectlyFlagged).toBe(true);
      expect(gameLostBoard[2][2].isIncorrectlyFlagged).toBe(true);
    });
  });
});
