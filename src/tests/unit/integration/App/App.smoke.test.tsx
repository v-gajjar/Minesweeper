import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import GameBoard from '@feature/GameBoard/GameBoard';
import GameDifficultySelector from '@feature/GameDifficultySelector/GameDifficultySelector';
import GameResultModal from '@feature/GameResultModal/GameResultModal';

// ✅ Use your real app types so TS enforces correct shapes
import type { BoardData, CellData, BoardSize } from '@/types';
import type { CellProps } from '@/components/feature/GameBoard/Cell/Cell.interfaces';
import type { GameDifficultySelectorProps } from '@feature/GameDifficultySelector/GameDifficultySelector.interfaces';

// ──────────────────────────────────────────────
// Helpers: make a valid board (no legacy fields)
// ──────────────────────────────────────────────
const defaultCell = (x: number, y: number): CellData => ({
  x,
  y,
  hasMine: false,
  hasExplodedMine: false,
  isRevealed: false,          // (not "isOpen")
  isFlagged: false,
  isIncorrectlyFlagged: false,
  adjacentMinesCount: 0,      // (not "neighborMines")
});

const makeBoard = (rows: number, cols: number): BoardData =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => defaultCell(c, r))
  );

// ──────────────────────────────────────────────
// Mocks
// ──────────────────────────────────────────────
const boardSize: BoardSize = { rowCount: 9, columnCount: 9 };
const board: BoardData = makeBoard(9, 9);

// Handlers required by GameBoardProps
const noopClick: CellProps['onClick'] = () => {};
const noopContext: CellProps['onContextMenu'] = () => {};

// Difficulty settings must match the selector's interface
const mockDifficulty: GameDifficultySelectorProps['gameDifficultySettings'] = {
  level: 'Easy',
  boardSize,                  // matches BoardSize
  mineCount: 10,
  label: 'Easy (9×9, 10 mines)',
};

describe('App-adjacent components (render smoke)', () => {
  it('renders the GameBoard with correct number of cells', () => {
    const { container, getByTestId } = render(
      <GameBoard
        board={board}
        boardSize={boardSize}
        onClick={noopClick}
        onContextMenu={noopContext}
      />
    );

    // Board container exists
    expect(getByTestId('game-board')).toBeTruthy();

    // 9 × 9 = 81 cells (adjust test id if your Cell uses a different one)
    const cells = container.querySelectorAll('[data-testid="cell"]');
    expect(cells.length).toBe(81);
  });

  it('renders the GameDifficultySelector with provided settings', () => {
    const { getByTestId } = render(
      <GameDifficultySelector
        gameDifficultySettings={mockDifficulty}
        onChange={() => {}}
      />
    );
    // Update this test id if your selector uses a different one
    expect(getByTestId('difficulty-select')).toBeTruthy();
  });

  it('renders the GameResultModal (win case) with expected message', () => {
    const { getByTestId, getByText } = render(
      <GameResultModal gameWon={true} onClick={() => {}} />
    );
    const modal = getByTestId('result-modal');
    expect(modal).toBeTruthy();

    // Message text in your component
    expect(getByText(/you won!/i)).toBeTruthy();
  });
});