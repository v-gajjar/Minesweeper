import { render } from '@testing-library/react';
import GameBoard from '../components/GameBoard';

describe('Game Win Condition', () => {
  it('renders board and verifies cell count', () => {
    const boardSize = { rowCount: 5, columnCount: 5 };
    const board = Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => ({
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
    expect(cells.length).toBe(25);
  });
});