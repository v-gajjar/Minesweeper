// tests/unit/App.test.jsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameBoard from '@feature/GameBoard/GameBoard';
import DifficultySelect from '@feature/DifficultySelect/DifficultySelect';
import RemainingFlagsCounter from '@feature/RemainingFlagsCounter/RemainingFlagsCounter';
import ResultModal from '@feature/ResultModal/ResultModal';
import { createMockBoard, createMockBoardSize } from '../mocks/boardMocks';

/**
 * App Surface Component Tests
 *
 * Smoke tests to verify all main UI components render without crashing.
 * These are lightweight integration tests that ensure components can be
 * mounted with minimal props.
 *
 * For detailed component behavior, see individual test files in tests/components/
 */
describe('App surface components', () => {
  /**
   * GameBoard smoke test
   */
  describe('GameBoard', () => {
    it('renders the game board', () => {
      const board = createMockBoard(9, 9);
      const boardSize = createMockBoardSize(9, 9);

      render(<GameBoard board={board} boardSize={boardSize} />);

      expect(screen.getByTestId('game-board')).toBeDefined();
    });
  });

  /**
   * DifficultySelect smoke test
   */
  describe('DifficultySelect', () => {
    it('renders the difficulty selector', () => {
      const mockDifficulty = { level: 'EASY' };

      render(
        <DifficultySelect
          gameDifficultySettings={mockDifficulty}
          onChange={() => {}}
        />
      );

      expect(screen.getByTestId('difficulty-select')).toBeDefined();
    });
  });

  /**
   * RemainingFlagsCounter smoke tests
   */
  describe('RemainingFlagsCounter', () => {
    // Verify counter renders with typical flag count
    it('renders with correct value', () => {
      render(<RemainingFlagsCounter remainingFlagsCount={10} />);

      expect(screen.getByText(/remaining flags/i)).toBeDefined();
      expect(screen.getByText('10')).toBeDefined();
    });

    // Verify counter handles zero (edge case)
    it('renders with zero flags', () => {
      render(<RemainingFlagsCounter remainingFlagsCount={0} />);

      expect(screen.getByText('0')).toBeDefined();
    });
  });

  /**
   * ResultModal smoke tests
   */
  describe('ResultModal', () => {
    // Verify modal renders for win state
    it('renders when open with win result', () => {
      render(<ResultModal open={true} result="win" onClick={() => {}} />);

      expect(screen.getByTestId('result-modal')).toBeDefined();
    });

    // Verify modal renders for lose state
    it('renders when open with lose result', () => {
      render(<ResultModal open={true} result="lose" onClick={() => {}} />);

      expect(screen.getByTestId('result-modal')).toBeDefined();
    });

    // Verify modal respects open={false}
    it('does not render when closed', () => {
      render(<ResultModal open={false} result="win" onClick={() => {}} />);

      expect(screen.queryByTestId('result-modal')).toBeNull();
    });
  });
});