// tests/components/ResultsModal.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultModal from '@feature/ResultModal/ResultModal';

/**
 * ResultModal Component Tests
 *
 * Tests the game over modal which appears when:
 * - Player wins (revealed all non-mine cells)
 * - Player loses (clicked on a mine)
 *
 * The modal displays "Game Over!" and a "Play again" button
 * to restart the game.
 */
describe('ResultModal Component', () => {
  /**
   * Rendering Tests
   * Verify the modal shows/hides based on open prop
   */
  describe('rendering', () => {
    // Verify modal renders when open is true
    it('renders when open is true', () => {
      render(<ResultModal open={true} result="win" onClick={() => {}} />);

      expect(screen.getByTestId('result-modal')).toBeDefined();
    });

    // Verify modal doesn't render when open is false
    it('does not render when open is false', () => {
      render(<ResultModal open={false} result="win" onClick={() => {}} />);

      expect(screen.queryByTestId('result-modal')).toBeNull();
    });

    // Verify the game over message displays
    it('displays game result message', () => {
      render(<ResultModal open={true} result="win" onClick={() => {}} />);

      expect(screen.getByText('Game Over!')).toBeDefined();
    });

    // Verify the play again button is present
    it('displays play again button', () => {
      render(<ResultModal open={true} result="win" onClick={() => {}} />);

      expect(screen.getByRole('button', { name: /play again/i })).toBeDefined();
    });

    // Verify modal has correct ARIA role for accessibility
    it('has correct dialog role', () => {
      render(<ResultModal open={true} result="win" onClick={() => {}} />);

      expect(screen.getByRole('dialog')).toBeDefined();
    });
  });

  /**
   * Interaction Tests
   * Verify the onClick callback fires to restart the game
   */
  describe('interactions', () => {
    // Verify clicking play again calls onClick handler
    it('calls onClick when play again button is clicked', () => {
      const onClick = vi.fn();

      render(<ResultModal open={true} result="win" onClick={onClick} />);

      const button = screen.getByRole('button', { name: /play again/i });
      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledOnce();
    });

    // Verify onClick works after a win
    it('calls onClick when button is clicked after win', () => {
      const onClick = vi.fn();

      render(<ResultModal open={true} result="win" onClick={onClick} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledOnce();
    });

    // Verify onClick works after a loss
    it('calls onClick when button is clicked after lose', () => {
      const onClick = vi.fn();

      render(<ResultModal open={true} result="lose" onClick={onClick} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});