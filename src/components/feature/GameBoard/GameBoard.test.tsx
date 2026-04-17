import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import GameBoard from './GameBoard';

afterEach(cleanup);

describe('GameBoard component', () => {
  it('renders GameBoard and displays cells', () => {
    const mockBoard = [
      [
        { isRevealed: false, hasMine: false, isFlagged: false, adjacentMinesCount: 0, x: 0, y: 0 },
        { isRevealed: false, hasMine: true, isFlagged: true, adjacentMinesCount: 1, x: 0, y: 1 }
      ],
      [
        { isRevealed: true, hasMine: false, isFlagged: false, adjacentMinesCount: 1, x: 1, y: 0 },
        { isRevealed: false, hasMine: false, isFlagged: false, adjacentMinesCount: 2, x: 1, y: 1 }
      ]
    ];

    render(
      <GameBoard
        boardSize={{ rowCount: 2, columnCount: 2 }}
        board={mockBoard}
        onClick={() => {}}
        onContextMenu={() => {}}
      />
    );

    expect(screen.getAllByTestId('cell')).toHaveLength(4);
  });
});
