import { describe, it, expect } from 'vitest';
import {
  getFilteredFlagLocations,
  getIncorrectlyFlaggedCells,
  getRevealedMineCells,
  coordinatesMatch,
} from '../../src/utils/cellUtils';
import type { CellData } from '../../src/types';

/**
 * Factory helper for building valid CellData objects.
 * Defaults to a safe, unrevealed, unflagged non-mine cell.
 * Individual properties can be overridden per test.
 */
const makeCell = (
  x: number,
  y: number,
  overrides: Partial<Omit<CellData, 'adjacentMinesCount'>> & {
    adjacentMinesCount?: number;
  } = {}
): CellData => ({
  x,
  y,
  hasMine: false,
  isRevealed: false,
  isFlagged: false,
  adjacentMinesCount: overrides.adjacentMinesCount ?? 0,
  ...overrides,
});

describe('cellUtils', () => {
  describe('coordinatesMatch', () => {
    it('returns true when two coordinate objects refer to the same board position', () => {
      const a = { x: 1, y: 2 };
      const b = { x: 1, y: 2 };

      expect(coordinatesMatch(a, b)).toBe(true);
    });

    it('returns false when either x or y differs', () => {
      const a = { x: 1, y: 2 };
      const b = { x: 3, y: 2 };

      expect(coordinatesMatch(a, b)).toBe(false);
    });
  });

  describe('getFilteredFlagLocations', () => {
    it('removes flags that overlap with existing cell coordinates', () => {
      const flags = [
        { x: 0, y: 0 },
        { x: 1, y: 1 }, // overlaps with a cell and should be removed
        { x: 2, y: 2 },
      ];

      const cells: CellData[] = [makeCell(1, 1)];
      const result = getFilteredFlagLocations(flags, cells);

      // Only flags that do NOT overlap with cells should remain
      expect(result).toEqual([
        { x: 0, y: 0 },
        { x: 2, y: 2 },
      ]);
    });

    it('returns all flags when none overlap with any cell coordinates', () => {
      const flags = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];

      const cells: CellData[] = [makeCell(99, 99)];
      const result = getFilteredFlagLocations(flags, cells);

      expect(result).toEqual(flags);
    });

    it('returns all flags when no cells are provided', () => {
      const flags = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ];

      const cells: CellData[] = [];
      const result = getFilteredFlagLocations(flags, cells);

      expect(result).toEqual(flags);
    });
  });

  describe('getIncorrectlyFlaggedCells', () => {
    it('returns flagged cells that do NOT contain mines', () => {
      const board = [
        [makeCell(0, 0, { hasMine: false }), makeCell(0, 1, { hasMine: true })],
        [
          makeCell(1, 0, { hasMine: false }),
          makeCell(1, 1, { hasMine: false }),
        ],
      ];

      // Flag is placed on a non-mine cell, which is incorrect
      const flags = [{ x: 0, y: 0 }];
      const result = getIncorrectlyFlaggedCells(board, flags);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        x: 0,
        y: 0,
        hasMine: false,
        isIncorrectlyFlagged: true,
      });
    });

    it('does not include flags that correctly mark mines', () => {
      const board = [[makeCell(0, 0, { hasMine: true })]];

      const flags = [{ x: 0, y: 0 }];
      const result = getIncorrectlyFlaggedCells(board, flags);

      expect(result).toHaveLength(0);
    });

    it('returns an empty array when no flags are present', () => {
      const board = [[makeCell(0, 0, { hasMine: false })]];
      const flags: { x: number; y: number }[] = [];

      const result = getIncorrectlyFlaggedCells(board, flags);

      expect(result).toEqual([]);
    });
  });

  describe('getRevealedMineCells', () => {
    it('reveals all unflagged mine cells when the game ends', () => {
      const board = [
        [
          makeCell(0, 0, { hasMine: true }), // unflagged mine
          makeCell(0, 1, { hasMine: false }),
        ],
        [
          makeCell(1, 0, { hasMine: true, isFlagged: true }), // correctly flagged mine
          makeCell(1, 1, { hasMine: false }),
        ],
      ];

      const mineLocations = [
        { x: 0, y: 0 }, // should be revealed
        { x: 1, y: 0 }, // should be skipped (flagged)
      ];

      const result = getRevealedMineCells(board, mineLocations);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        x: 0,
        y: 0,
        isRevealed: true,
      });
    });

    it('does not reveal mines that are already flagged', () => {
      const board = [[makeCell(0, 0, { hasMine: true, isFlagged: true })]];

      const mineLocations = [{ x: 0, y: 0 }];
      const result = getRevealedMineCells(board, mineLocations);

      expect(result).toHaveLength(0);
    });

    it('returns an empty array when there are no mine locations', () => {
      const board = [[makeCell(0, 0, { hasMine: false })]];
      const mineLocations: { x: number; y: number }[] = [];

      const result = getRevealedMineCells(board, mineLocations);

      expect(result).toEqual([]);
    });
  });
});
