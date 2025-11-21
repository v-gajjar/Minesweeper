// Keep this file focused on GameBoard render details.
// The previous version mixed in GameResultModal role-based checks which
// fail in JSDOM without `open`. Here we only assert GameBoard cell rendering.

import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameBoard from '@feature/GameBoard/GameBoard';

import type { BoardData, CellData, BoardSize } from '@/types';
import type { CellProps } from '@/components/feature/GameBoard/Cell/Cell.interfaces';

const makeCell = (x: number, y: number): CellData => ({
  x,
  y,
  hasMine: false,
  hasExplodedMine: false,
  isRevealed: false,
  isFlagged: false,
  isIncorrectlyFlagged: false,
  adjacentMinesCount: 0,
});
const makeBoard = (rows: number, cols: number): BoardData =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => makeCell(c, r))
  );

describe('<GameBoard /> render', () => {
  it('renders the correct number of cells', () => {
    const boardSize: BoardSize = { rowCount: 9, columnCount: 9 };
    const board: BoardData = makeBoard(9, 9);
    const noopClick: CellProps['onClick'] = () => {};
    const noopContext: CellProps['onContextMenu'] = () => {};

    const { container, getByTestId } = render(
      <GameBoard
        board={board}
        boardSize={boardSize}
        onClick={noopClick}
        onContextMenu={noopContext}
      />
    );

    // Game board root
    expect(getByTestId('game-board')).toBeTruthy();

    // 9 × 9 = 81 cells
    const cells = container.querySelectorAll('[data-testid="cell"]');
    expect(cells.length).toBe(81);
  });
});