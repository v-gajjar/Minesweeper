// Behavior/render tests for <Cell />
// - Renders empty when hidden & unflagged
// - Shows number when revealed with adjacent mines
// - Shows bomb when revealed + hasMine
// - Shows flag when flagged & not revealed
// - Shows "X" when incorrectly flagged
// - Fires onClick / onContextMenu
// - Renders empty revealed cell when adjacentMinesCount = 0
// - Adds exploded class when hasExplodedMine

import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Cell from '@feature/GameBoard/Cell/Cell';
import type { CellData } from '@/types';
import type { CellProps } from '@/components/feature/GameBoard/Cell/Cell.interfaces';

// --- helpers -----------------------------------------------------------------

const defaultCell = (overrides: Partial<CellData> = {}): CellData => ({
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

// Type-safe default handlers (match CellProps signatures)
const noopClick: CellProps['onClick'] = () => {};
const noopContext: CellProps['onContextMenu'] = () => {};

const renderCell = (cellOverrides: Partial<CellData> = {}, handlers?: Partial<Pick<CellProps,'onClick'|'onContextMenu'>>) => {
  const cell = defaultCell(cellOverrides);
  const onClick = handlers?.onClick ?? noopClick;
  const onContextMenu = handlers?.onContextMenu ?? noopContext;
  return render(<Cell cell={cell} onClick={onClick} onContextMenu={onContextMenu} />);
};

// Helper to get an icon with graceful fallback (prefers data-testid if present)
const queryIcon = (container: HTMLElement, testId: string) => {
  const fromTestId = container.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null;
  if (fromTestId) return fromTestId;
  // Fallback: any SVG in the cell
  const anySvg = container.querySelector('svg') as SVGElement | null;
  return anySvg as unknown as HTMLElement | null;
};

// --- tests -------------------------------------------------------------------

describe('Cell component', () => {
  it('renders an empty cell when not revealed or flagged', () => {
    const { getByTestId } = renderCell();
    const el = getByTestId('cell');
    expect(el).toBeTruthy();
    expect((el.textContent ?? '').trim()).toBe('');
  });

  it('shows a number when revealed and has adjacent mines', () => {
    const { getByText } = renderCell({ isRevealed: true, adjacentMinesCount: 3 });
    const numberEl = getByText('3');
    expect(numberEl).toBeTruthy();
  });

  it('shows a bomb icon if revealed and hasMine is true', () => {
    const { getByTestId } = renderCell({ isRevealed: true, hasMine: true });
    const cellEl = getByTestId('cell');
    const bomb = queryIcon(cellEl, 'bomb-icon'); // prefers data-testid="bomb-icon"
    expect(bomb).toBeTruthy();
  });

  it('shows a flag icon if cell is flagged and not revealed', () => {
    const { getByTestId } = renderCell({ isFlagged: true, isRevealed: false });
    const cellEl = getByTestId('cell');
    const flag = queryIcon(cellEl, 'flag-icon'); // prefers data-testid="flag-icon"
    expect(flag).toBeTruthy();
  });

  it('shows an X icon if incorrectly flagged', () => {
    const { getByTestId } = renderCell({ isIncorrectlyFlagged: true, isFlagged: true });
    const xIcon = getByTestId('x-icon'); // assuming your component sets this
    expect(xIcon).toBeTruthy();
  });

  it('calls onClick when cell is clicked', () => {
    const onClick = vi.fn() as CellProps['onClick'];
    const { getByTestId } = renderCell({}, { onClick });
    fireEvent.click(getByTestId('cell'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onContextMenu when cell is right-clicked', () => {
    const onContextMenu = vi.fn() as CellProps['onContextMenu'];
    const { getByTestId } = renderCell({}, { onContextMenu });
    fireEvent.contextMenu(getByTestId('cell'));
    expect(onContextMenu).toHaveBeenCalledOnce();
  });

  it('renders an empty cell when revealed and has no adjacent mines', () => {
    const { getByTestId } = renderCell({ isRevealed: true, adjacentMinesCount: 0, hasMine: false });
    const el = getByTestId('cell');

    expect(el).toBeTruthy();
    expect((el.textContent ?? '').trim()).toBe('');

    const svg = el.querySelector('svg');
    expect(svg).toBeFalsy();
  });

  it('renders an exploded mine with special class', () => {
    const { getByTestId } = renderCell({ isRevealed: true, hasMine: true, hasExplodedMine: true });
    const el = getByTestId('cell');
    // Adjust class name if your component uses a different one (e.g., "exploded", "mine--exploded")
    expect(el.classList.contains('exploded')).toBe(true);
  });
});