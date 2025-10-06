// Verifies the board renders with the right number of cells (9 × 9 = 81)

import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameBoard from '@feature/GameBoard/GameBoard';

// ✅ Import your real types so TS enforces the correct shape
import type { BoardData, CellData, BoardSize } from '@/types';
import type { CellProps } from '@/components/feature/GameBoard/Cell/Cell.interfaces';

// Build one valid CellData (current field names)
const makeCell = (x: number, y: number): CellData => ({
  x,
  y,
  hasMine: false,
  hasExplodedMine: false,
  isRevealed: true,           // ← was isOpen; using revealed since this test mimics a "win"
  isFlagged: false,
  isIncorrectlyFlagged: false,
  adjacentMinesCount: 0,      // ← was neighborMines
});

// Build a 9×9 BoardData
const makeBoard = (rows: number, cols: number): BoardData =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => makeCell(c, r))
  );

describe('Game Win Condition (render only)', () => {
  it('renders board and verifies cell count', () => {
    const boardSize: BoardSize = { rowCount: 9, columnCount: 9 };
    const board: BoardData = makeBoard(9, 9);

    // Required handlers for GameBoardProps
    const noopClick: CellProps['onClick'] = () => {};
    const noopContext: CellProps['onContextMenu'] = () => {};

    const { container } = render(
      <GameBoard
        boardSize={boardSize}
        board={board}
        onClick={noopClick}
        onContextMenu={noopContext}
      />
    );

    // Prefer the Cell test id if available
    const cells = container.querySelectorAll('[data-testid="cell"]');
    expect(cells.length).toBe(81);
  });
});