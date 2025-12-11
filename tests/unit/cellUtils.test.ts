import { describe, it, expect } from 'vitest';
import {
  getFilteredFlagLocations,
  getIncorrectlyFlaggedCells,
  getRevealedMineCells,
  coordinatesMatch,
} from '../../src/utils/cellUtils';
import type { BoardData, CellData, BoardSize, Coordinate } from '@/types';

// Helper to generate mock CellData objects for tests
const makeCell = (
  x: number,
  y: number,
  overrides: Partial<CellData> = {}
): CellData => ({
  x,
  y,
  hasMine: false,
  isRevealed: false,
  isFlagged: false,
  ...overrides,
});

// ------------------------------------------------------
// coordinatesMatch tests
// ------------------------------------------------------
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

// ------------------------------------------------------
// getFilteredFlagLocations tests
// ------------------------------------------------------
describe('getFilteredFlagLocations', () => {
  it('removes flags that match provided cell coordinates', () => {
    const flags = [
      { x: 0, y: 0 },
      { x: 1, y: 1 }, // this one matches a cell and should be removed
      { x: 2, y: 2 },
    ];

    const cells = [{ x: 1, y: 1 }];
    const result = getFilteredFlagLocations(flags, cells);

    // Only the non-matching flags should remain
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

    const cells: [] = []; // nothing to filter against
    const result = getFilteredFlagLocations(flags, cells);

    expect(result).toEqual(flags);
  });

  // ------------------------------------------------------
  // getIncorrectlyFlaggedCells tests
  // ------------------------------------------------------

  it('marks flagged non-mine cells as incorrectly flagged', () => {
    const board = [
      [makeCell(0, 0, { hasMine: false }), makeCell(0, 1, { hasMine: true })],
      [makeCell(1, 0, { hasMine: false }), makeCell(1, 1, { hasMine: false })],
    ];

    const flags = [{ x: 0, y: 0 }]; // flag placed on a non-mine cell
    const result = getIncorrectlyFlaggedCells(board, flags);

    // Should return updated version of the flagged non-mine cell
    expect(result).toHaveLength(1);
    expect(result[0].x).toBe(0);
    expect(result[0].y).toBe(0);
    expect(result[0].isIncorrectlyFlagged).toBe(true);
  });

  it('ignores flags that correctly mark mines', () => {
    const board = [
      [
        makeCell(0, 0, { hasMine: false }),
        makeCell(0, 1, { hasMine: true }), // mined cell
      ],
    ];

    const flags = [{ x: 0, y: 1 }]; // flag placed ON a mine
    const result = getIncorrectlyFlaggedCells(board, flags);

    // A correctly placed flag should not be in the result
    expect(result).toHaveLength(0);
  });

  it('returns empty list when there are no flagged locations', () => {
    const board = [[makeCell(0, 0, { hasMine: false })]];
    const flags: [] = []; // nothing flagged
    const result = getIncorrectlyFlaggedCells(board, flags);

    expect(result).toEqual([]);
  });

  // ------------------------------------------------------
  // getRevealedMineCells tests
  // ------------------------------------------------------
  describe('getRevealedMineCells', () => {
    it('reveals all unflagged mine cells', () => {
      // board with two mines, only one unflagged
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

      // only the unflagged mine is returned
      expect(result).toHaveLength(1);
      expect(result[0].x).toBe(0);
      expect(result[0].y).toBe(0);
      expect(result[0].isRevealed).toBe(true);
    });

    it('skips mines that are flagged', () => {
      const board = [[makeCell(0, 0, { hasMine: true, isFlagged: true })]];

      const mineLocations = [{ x: 0, y: 0 }];

      const result = getRevealedMineCells(board, mineLocations);

      // flagged mine should not appear
      expect(result).toHaveLength(0);
    });

    it('returns empty list when no mine locations are provided', () => {
      const board = [[makeCell(0, 0, { hasMine: false })]];
      const mineLocations: [] = [];

      const result = getRevealedMineCells(board, mineLocations);

      // nothing to reveal
      expect(result).toEqual([]);
    });
  });
});
