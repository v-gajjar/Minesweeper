// Basic render test for <App />.
// Verifies that key UI parts mount. This is a *render-only* smoke test.

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('<App /> render', () => {
  it('mounts and shows the main UI parts', () => {
    render(<App />);

    // ✅ Board exists (GameBoard sets this test id)
    const board = screen.getByTestId('game-board');
    expect(board).toBeTruthy();

    // ✅ Difficulty selector (adjust if your control is different)
    // If it's not a <select>, you might use a button that opens a menu.
    const difficulty = screen.getByRole('combobox', { name: /difficulty/i });
    expect(difficulty).toBeTruthy();
  });
});
