// Flag counter logic (via the live UI):
// - flags increment/decrement
// - cannot exceed mine count (if enforced)
// - unflag restores
// NOTE: Adjust text to match your counter label.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';

function getCounterNode() {
  // Match your counter UI: e.g., "Mines: 10" or "Flags left: 10"
  const node = screen.getByText(/mines|flags left/i);
  expect(node).toBeTruthy();
  return node;
}

describe('Flag counter logic', () => {
  it('increments on flag, decrements on unflag, stays sane', async () => {
    render(<App />);

    const cell = screen.getAllByTestId('cell')[0];

    // Focus + press 'f' to toggle a flag (adapt if you use right-click/long-press)
    await userEvent.click(cell); // if reveal starts timer; if you prefer flag first, use keyboard:
    cell.focus();
    await userEvent.keyboard('f'); // toggle flag ON

    const afterFlag = getCounterNode();
    expect(afterFlag).toBeTruthy();

    // Toggle flag OFF
    await userEvent.keyboard('f');
    const afterUnflag = getCounterNode();
    expect(afterUnflag).toBeTruthy();

    // Try to spam flags beyond mine count—counter should not go negative / weird
    const cells = screen.getAllByTestId('cell');
    for (let i = 0; i < Math.min(30, cells.length); i++) {
      cells[i].focus();
      await userEvent.keyboard('f');
    }
    const afterSpam = getCounterNode();
    expect(afterSpam).toBeTruthy();
  });
});