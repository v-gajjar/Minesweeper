// tests/unit/GameBoard.test.jsx
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GameBoard from '../../src/components/GameBoard';

const mockBoard = [
  [
    { x: 0, y: 0, hasMine: false, isRevealed: false },
    { x: 1, y: 0, hasMine: false, isRevealed: false }
  ],
  [
    { x: 0, y: 1, hasMine: false, isRevealed: false },
    { x: 1, y: 1, hasMine: false, isRevealed: false }
  ]
];

const boardSize = { rowCount: 2, columnCount: 2 };

describe('GameBoard Component', () => {
  it('renders correct number of Cell components', () => {
    const { container } = render(
      <GameBoard board={mockBoard} boardSize={boardSize} />
    );
    const cellDivs = container.querySelectorAll('[data-testid="cell"]');
    expect(cellDivs.length).toBe(4);
  });

  it('applies correct CSS grid style variables', () => {
    const { container } = render(
      <GameBoard board={mockBoard} boardSize={boardSize} />
    );
    const boardDiv = container.querySelector('#board');
    expect(boardDiv.style.getPropertyValue('--rows')).toBe('2');
    expect(boardDiv.style.getPropertyValue('--columns')).toBe('2');
  });

  it('calls onClick handler when a cell is clicked', () => {
    const onClick = vi.fn();
    const { getAllByTestId } = render(
      <GameBoard board={mockBoard} boardSize={boardSize} onClick={onClick} />
    );
    fireEvent.click(getAllByTestId('cell')[0]);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onContextMenu handler on right-click', () => {
    const onContextMenu = vi.fn();
    const { getAllByTestId } = render(
      <GameBoard
        board={mockBoard}
        boardSize={boardSize}
        onContextMenu={onContextMenu}
      />
    );
    fireEvent.contextMenu(getAllByTestId('cell')[0]);
    expect(onContextMenu).toHaveBeenCalledOnce();
  });
});
