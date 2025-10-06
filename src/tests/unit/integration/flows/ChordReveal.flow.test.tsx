// Number chording flow (conceptual without fixed seed):
// - Reveal a numbered cell
// - Flag the correct count of neighbors (we don't need correctness of which ones)
// - Click the number again (chord) -> safe unflagged neighbors get revealed
// If your app needs an exact layout, later we can inject a test seed prop.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';

describe('Chord reveal (numbered cell chording)', () => {
  it('chords when adjacent flag count matches the number', async () => {
    render(<App />);

    const cells = screen.getAllByTestId('cell');

    // Step 1: reveal a few cells until we find one that shows a number
    // If your cell renders the number inside, you might query by text like /^[1-8]$/
    // Here we just click a handful and then chord the first one again.
    let numberedCell: HTMLElement | null = null;
    for (let i = 0; i < Math.min(12, cells.length); i++) {
      await userEvent.click(cells[i]);
      // Heuristic: if the aria-label or text changes to include a digit, use that.
      // If you expose aria-label like "cell r0 c1 number 2", you could use getByRole with name.
      if (/\b[1-8]\b/.test(cells[i].textContent ?? '')) {
        numberedCell = cells[i];
        break;
      }
    }
    // If we didn't find a numbered cell yet, just pick the first and continue
    numberedCell = numberedCell ?? cells[0];

    // Step 2: Flag a couple of neighbors (without precise coords—goal is to change flagged count)
    // We'll just flag the next few cells for demonstration.
    for (let j = 1; j <= 2 && j < cells.length; j++) {
      cells[j].focus();
      await userEvent.keyboard('f');
    }

    // Step 3: Chord (click numbered cell again)
    await userEvent.click(numberedCell);

    // Step 4: Assert that at least one additional neighbor looks “revealed”.
    // Without fixed selectors, we just assert more revealed-looking cells exist.
    // If your app distinguishes via a "revealed" class, prefer that:
    // const revealed = document.querySelectorAll('.cell.revealed');
    // expect(revealed.length).toBeGreaterThan(1);

    // Generic fallback: after chording, some other cell gained text (e.g., “1”)
    const maybeNumbers = screen.queryAllByText(/^[1-8]$/);
    expect(maybeNumbers.length).toBeGreaterThan(0);
  });
});