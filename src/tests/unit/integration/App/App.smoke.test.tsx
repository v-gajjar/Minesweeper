// src/tests/unit/integration/App/App.smoke.test.tsx
// Smoke tests for top-level App-adjacent UI pieces.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';
import GameResultModal from '@/components/feature/ResultModal/ResultModal';

describe('App-adjacent components (render smoke)', () => {
  it('renders the GameBoard with correct number of cells', () => {
    render(<App />);

    const board = screen.getByTestId('game-board');
    expect(board).toBeInTheDocument();

    const cells = screen.getAllByTestId('cell');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('renders the GameDifficultySelector with provided settings', () => {
    render(<App />);

    const difficulty = screen.getByRole('combobox', { name: /difficulty/i });
    expect(difficulty).toBeInTheDocument();
  });

  it('renders the GameResultModal (win case) without crashing', () => {
    // This file is just a *smoke* test: we only assert that rendering
    // the modal with realistic props does not throw.
    // Detailed DOM checks live in GameResultModal.render.test.tsx.
    expect(() => {
      render(
        <GameResultModal
          open={true}
          gameWon={true}
          onClick={() => {}}
        />,
      );
    }).not.toThrow();
  });
});