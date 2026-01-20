import { describe, it, expect } from 'vitest';
import {
  getFilteredFlagLocations,
  getIncorrectlyFlaggedCells,
  getRevealedMineCells,
  coordinatesMatch,
} from '../../src/utils/cellUtils';
import type { CellData } from '../../src/types';

// Helper to generate mock CellData objects for tests
const makeCell = (
  x: number,
  y: number,
  overrides: Partial<Omit<CellData, 'adjacentMinesCount'>> & { adjacentMinesCount?: number } = {}
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
    it('returns true when both coordinates match exactly', () => {
      const a = { x: 1, y: 2 };
      const b = { x: 1, y: 2 };

      expect(coordinatesMatch(a, b)).toBe(true);
    });

    it('returns false when any coordinate differs', () => {
      const a = { x: 1, y: 2 };
      const b = { x: 3, y: 2 };

      expect(coordinatesMatch(a, b)).toBe(false);
    });
  });

  describe('getFilteredFlagLocations', () => {
    it('removes flags that match provided cell coordinates', () => {
      const flags = [
        { x: 0, y: 0 },
        { x: 1, y: 1 }, // this one matches a cell and should be removed
        { x: 2, y: 2 },
      ];

      const cells = [{ x: 1, y: 1 }];
      const result = getFilteredFlagLocations(flags, cells);

      expect(result).toEqual([
        { x: 0, y: 0 },
        { x: 2, y: 2 },
      ]);
    });

    it('returns original flags when no flags match any cells', () => {
      const flags = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];

      const cells = [{ x: 99, y: 99 }]; // no match anywhere
      const result = getFilteredFlagLocations(flags, cells);

      expect(result).toEqual(flags);
    });

    it('returns original flags when the cells list is empty', () => {
      const flags = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ];

      const cells: [] = [];
      const result = getFilteredFlagLocations(flags, cells);

      expect(result).toEqual(flags);
    });
  });

  describe('getIncorrectlyFlaggedCells', () => {
    it('marks flagged non-mine cells as incorrectly flagged', () => {
      const board = [
        [makeCell(0, 0, { hasMine: false }), makeCell(0, 1, { hasMine: true })],
        [makeCell(1, 0, { hasMine: false }), makeCell(1, 1, { hasMine: false })],
      ];

      const flags = [{ x: 0, y: 0 }]; // flag placed on a non-mine cell
      const result = getIncorrectlyFlaggedCells(board, flags);

      expect(result).toHaveLength(1);
      expect(result[0].x).toBe(0);
      expect(result[0].y).toBe(0);
      expect(result[0].hasMine).toBe(false);
      expect(result[0].isIncorrectlyFlagged).toBe(true);
    });

    it('ignores flags that correctly mark mines', () => {
      const board = [[makeCell(0, 0, { hasMine: true })]];

      const flags = [{ x: 0, y: 0 }]; // flag placed ON a mine
      const result = getIncorrectlyFlaggedCells(board, flags);

      expect(result).toHaveLength(0);
    });

    it('returns empty list when there are no flagged locations', () => {
      const board = [[makeCell(0, 0, { hasMine: false })]];
      const flags: [] = [];

      const result = getIncorrectlyFlaggedCells(board, flags);

      expect(result).toEqual([]);
    });
  });

  describe('getRevealedMineCells', () => {
    it('reveals all unflagged mine cells', () => {
      const board = [
        [
          makeCell(0, 0, { hasMine: true }), // unflagged mine
          makeCell(0, 1, { hasMine: false }),
        ],
        [
          makeCell(1, 0, { hasMine: true, isFlagged: true }), // flagged mine
          makeCell(1, 1, { hasMine: false }),
        ],
      ];

      const mineLocations = [
        { x: 0, y: 0 }, // this one should be revealed
        { x: 1, y: 0 }, // flagged mine, should be skipped
      ];

      const result = getRevealedMineCells(board, mineLocations);

      expect(result).toHaveLength(1);
      expect(result[0].x).toBe(0);
      expect(result[0].y).toBe(0);
      expect(result[0].isRevealed).toBe(true);
    });

    it('skips mines that are flagged', () => {
      const board = [[makeCell(0, 0, { hasMine: true, isFlagged: true })]];

      const mineLocations = [{ x: 0, y: 0 }];
      const result = getRevealedMineCells(board, mineLocations);

      expect(result).toHaveLength(0);
    });

    it('returns empty list when no mine locations are provided', () => {
      const board = [[makeCell(0, 0, { hasMine: false })]];
      const mineLocations: [] = [];

      const result = getRevealedMineCells(board, mineLocations);

      expect(result).toEqual([]);
    });
  });
});