// tests/unit/App.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameBoard from '@feature/GameBoard/GameBoard';
import DifficultySelect from '@feature/DifficultySelect/DifficultySelect';
import RemainingFlagsCounter from '@feature/RemainingFlagsCounter/RemainingFlagsCounter';
import ResultModal from '@feature/ResultModal/ResultModal';

// Minimal mock data
const mockBoard = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ({})));
const mockBoardSize = { rowCount: 9, columnCount: 9 };
const mockDifficulty = { level: 'easy' };

describe('App surface components', () => {
  it('renders the game board', () => {
    render(<GameBoard board={mockBoard} boardSize={mockBoardSize} />);
    const el = screen.getByTestId('game-board');
    expect(el).toBeDefined();
    expect(document.body.contains(el)).toBe(true);
  });

  it('renders the difficulty selector', () => {
    render(
      <DifficultySelect
        gameDifficultySettings={mockDifficulty}
        onChange={() => {}}
      />
    );
    const el = screen.getByTestId('difficulty-select');
    expect(el).toBeDefined();
    expect(document.body.contains(el)).toBe(true);
  });

  it('renders the remaining flags counter with the correct value', () => {
    const mockRemainingFlagsCount = 10;
    render(<RemainingFlagsCounter remainingFlagsCount={mockRemainingFlagsCount} />);

    // Assert by visible text without jest-dom matchers
    const label = screen.getByText(/remaining flags/i);
    expect(label).toBeDefined();
    expect(document.body.contains(label)).toBe(true);

    const value = screen.getByText(String(mockRemainingFlagsCount));
    expect(value).toBeDefined();
    expect(value.textContent).toBe(String(mockRemainingFlagsCount));
  });

  it('renders a result modal', () => {
    render(<ResultModal open={true} result="win" onClick={() => {}} />);
    const el = screen.getByTestId('result-modal');
    expect(el).toBeDefined();
    expect(document.body.contains(el)).toBe(true);    
  });
});