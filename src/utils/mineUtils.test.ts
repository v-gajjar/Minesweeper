import { describe, it, expect } from 'vitest';
import { getAdjacentMinesCount } from './mineUtils';
import type { BoardData, CellData } from '@/types';

describe('getAdjacentMinesCount', () => {
  it('returns correct count for a cell surrounded by mines', () => {
    // 3x3 board, center cell (1,1) is selected, all neighbors have mines
    const makeCell = (x: number, y: number, hasMine: boolean): CellData => ({
      x,
      y,
      hasMine,
      isFlagged: false,
      isRevealed: false,
      adjacentMinesCount: 0,
    });
    const board: BoardData = [
      [ makeCell(0, 0, true), makeCell(0, 1, true), makeCell(0, 2, true) ],
      [ makeCell(1, 0, true), makeCell(1, 1, false), makeCell(1, 2, true) ],
      [ makeCell(2, 0, true), makeCell(2, 1, true), makeCell(2, 2, true) ],
    ];
    const boardSize = { rowCount: 3, columnCount: 3 };
    const selectedCell = { x: 1, y: 1 };
    const count = getAdjacentMinesCount(selectedCell, board, boardSize);
    expect(count).toBe(8);
  });

  it('returns correct count for a corner cell (0,0) with some adjacent mines', () => {
    const makeCell = (x: number, y: number, hasMine: boolean): CellData => ({
      x,
      y,
      hasMine,
      isFlagged: false,
      isRevealed: false,
      adjacentMinesCount: 0,
    });
    const board: BoardData = [
      [ makeCell(0, 0, false), makeCell(0, 1, true), makeCell(0, 2, false) ],
      [ makeCell(1, 0, true), makeCell(1, 1, false), makeCell(1, 2, false) ],
      [ makeCell(2, 0, false), makeCell(2, 1, false), makeCell(2, 2, false) ],
    ];
    const boardSize = { rowCount: 3, columnCount: 3 };
    const selectedCell = { x: 0, y: 0 };
    const count = getAdjacentMinesCount(selectedCell, board, boardSize);
    expect(count).toBe(2);
  });

  it('returns 0 for a cell with no adjacent mines', () => {
    const makeCell = (x: number, y: number, hasMine: boolean): CellData => ({
      x,
      y,
      hasMine,
      isFlagged: false,
      isRevealed: false,
      adjacentMinesCount: 0,
    });
    const board: BoardData = [
      [ makeCell(0, 0, false), makeCell(0, 1, false), makeCell(0, 2, false) ],
      [ makeCell(1, 0, false), makeCell(1, 1, false), makeCell(1, 2, false) ],
      [ makeCell(2, 0, false), makeCell(2, 1, false), makeCell(2, 2, false) ],
    ];
    const boardSize = { rowCount: 3, columnCount: 3 };
    const selectedCell = { x: 1, y: 1 };
    const count = getAdjacentMinesCount(selectedCell, board, boardSize);
    expect(count).toBe(0);
  });

  it('returns correct count for an edge cell (0,1) with one adjacent mine', () => {
    const makeCell = (x: number, y: number, hasMine: boolean): CellData => ({
      x,
      y,
      hasMine,
      isFlagged: false,
      isRevealed: false,
      adjacentMinesCount: 0,
    });
    const board: BoardData = [
      [ makeCell(0, 0, false), makeCell(0, 1, false), makeCell(0, 2, false) ],
      [ makeCell(1, 0, false), makeCell(1, 1, true), makeCell(1, 2, false) ],
      [ makeCell(2, 0, false), makeCell(2, 1, false), makeCell(2, 2, false) ],
    ];
    const boardSize = { rowCount: 3, columnCount: 3 };
    const selectedCell = { x: 0, y: 1 };
    const count = getAdjacentMinesCount(selectedCell, board, boardSize);
    expect(count).toBe(1);
  });

  it('returns 0 for a single cell board', () => {
    const makeCell = (x: number, y: number, hasMine: boolean): CellData => ({
      x,
      y,
      hasMine,
      isFlagged: false,
      isRevealed: false,
      adjacentMinesCount: 0,
    });
    const board: BoardData = [ [ makeCell(0, 0, false) ] ];
    const boardSize = { rowCount: 1, columnCount: 1 };
    const selectedCell = { x: 0, y: 0 };
    const count = getAdjacentMinesCount(selectedCell, board, boardSize);
    expect(count).toBe(0);
  });
});
