import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameBoard from '@feature/GameBoard/GameBoard';

import type { BoardData, CellData, BoardSize } from '@/types';
import type { CellProps } from '@/components/feature/GameBoard/Cell/Cell.interfaces';

// --- Inline helpers: make a valid CellData/BoardData -------------------------

const defaultCell = (x: number, y: number): CellData => ({
  x,
  y,
  hasMine: false,
  hasExplodedMine: false,
  isRevealed: false,          // <-- was `isOpen`
  isFlagged: false,
  isIncorrectlyFlagged: false,
  adjacentMinesCount: 0,      // <-- was `neighborMines`
});

const makeBoard = (rows: number, cols: number): BoardData =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => defaultCell(c, r))
  );

// --- Test --------------------------------------------------------------------

describe('Board Component', () => {
  const boardSize: BoardSize = { rowCount: 9, columnCount: 9 };
  const board: BoardData = makeBoard(9, 9);

  // Match GameBoardProps: onClick / onContextMenu (not onCellClick/RightClick)
  const noopClick: CellProps['onClick'] = () => {};
  const noopContext: CellProps['onContextMenu'] = () => {};

  it('renders correct number of cells', () => {
    const { container } = render(
      <GameBoard
        boardSize={boardSize}
        board={board}
        onClick={noopClick}
        onContextMenu={noopContext}
      />
    );

    // If your Cell uses a different test id, tweak this selector
    const cells = container.querySelectorAll('[data-testid="cell"]');
    expect(cells).toHaveLength(81); // 9 × 9
  });
});