import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameBoard from '@feature/GameBoard/GameBoard';
import DifficultySelect from '@feature/DifficultySelect/DifficultySelect';
import RemainingFlagsCounter from '@feature/RemainingFlagsCounter/RemainingFlagsCounter';
import ResultModal from '@feature/ResultModal/ResultModal';

// Minimal mock data
const mockBoard = Array(9).fill(Array(9).fill({}));
const mockBoardSize = { rowCount: 9, columnCount: 9 };
const mockDifficulty = { level: 'easy' };
const mockFlagsRemaining = 10;

describe('App Component', () => {
  it('renders the game board', () => {
    const { getByTestId } = render(
      <GameBoard board={mockBoard} boardSize={mockBoardSize} />
    );
    expect(getByTestId('game-board')).toBeTruthy();
  });

  it('renders the difficulty selector', () => {
    const { getByTestId } = render(
      <DifficultySelect
        gameDifficultySettings={mockDifficulty}
        onChange={() => {}}
      />
    );
    expect(getByTestId('difficulty-select')).toBeTruthy();
  });

  it('renders the remaining flags counter', () => {
    const { getByTestId } = render(
      <RemainingFlagsCounter flagsRemaining={mockFlagsRemaining} />
    );
    expect(getByTestId('flags-remaining')).toBeTruthy();
  });

  it('renders a result modal', () => {
    const { getByTestId } = render(
      <ResultModal isOpen={true} onClose={() => {}} result='win' />
    );
    expect(getByTestId('result-modal')).toBeTruthy();
  });
});
