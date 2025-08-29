import { render } from '@testing-library/react';
import GameBoard from '../../src/components/GameBoard';

describe('Game Win Condition', () => {
  it('renders board and verifies cell count', () => {
    const boardSize = { rowCount: 9, columnCount: 9 };
    const board = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => ({
        isOpen: true,
        isMine: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );

    const { container } = render(
      <GameBoard boardSize={boardSize} board={board} />
    );

    const cells = container.querySelectorAll('.cell');
    expect(cells.length).toBe(81);
  });
});
