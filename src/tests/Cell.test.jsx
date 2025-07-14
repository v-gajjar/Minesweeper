// src/tests/Cell.test.jsx
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Cell from '../components/Cell'; // Adjust path if needed

const mockCell = (overrides = {}) => ({
  x: 0,
  y: 0,
  hasMine: false,
  hasExplodedMine: false,
  isFlagged: false,
  isRevealed: false,
  isIncorrectlyFlagged: false,
  adjacentMinesCount: 0,
  ...overrides,
});

describe('Cell Component', () => {
  it('renders an empty cell when not revealed or flagged', () => {
    const cell = mockCell();
    const { getByTestId } = render(<Cell cell={cell} />);
    const cellElement = getByTestId('cell');
    expect(cellElement).toBeInTheDocument();
    expect(cellElement.textContent).toBe('');
  });

  it('shows a number when revealed and has adjacent mines', () => {
    const cell = mockCell({ isRevealed: true, adjacentMinesCount: 3 });
    const { getByText } = render(<Cell cell={cell} />);
    expect(getByText('3')).toBeInTheDocument();
  });

  it('shows a bomb icon if revealed and hasMine is true', () => {
    const cell = mockCell({ isRevealed: true, hasMine: true });
    const { container } = render(<Cell cell={cell} />);
    const bombIcon = container.querySelector('svg');
    expect(bombIcon).toBeTruthy();
  });

  it('shows a flag icon if cell is flagged and not revealed', () => {
    const cell = mockCell({ isFlagged: true });
    const { container } = render(<Cell cell={cell} />);
    const flagIcon = container.querySelector('svg');
    expect(flagIcon).toBeTruthy();
  });

  it('shows an X icon if incorrectly flagged', () => {
    const cell = mockCell({ isIncorrectlyFlagged: true });
    const { container } = render(<Cell cell={cell} />);
    const xIcon = container.querySelector('svg');
    expect(xIcon).toBeTruthy();
  });

  it('calls onClick when cell is clicked', () => {
    const onClick = vi.fn();
    const cell = mockCell();
    const { getByTestId } = render(<Cell cell={cell} onClick={onClick} />);
    fireEvent.click(getByTestId('cell'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onContextMenu when cell is right-clicked', () => {
    const onContextMenu = vi.fn();
    const cell = mockCell();
    const { getByTestId } = render(<Cell cell={cell} onContextMenu={onContextMenu} />);
    fireEvent.contextMenu(getByTestId('cell'));
    expect(onContextMenu).toHaveBeenCalledOnce();
  });
});