// tests/components/RemainingFlagsCounter.test.jsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RemainingFlagsCounter from '@feature/RemainingFlagsCounter/RemainingFlagsCounter';

/**
 * RemainingFlagsCounter Component Tests
 *
 * Tests the flag counter display which shows players how many flags
 * they have remaining to place. Calculated as: totalMines - flagsPlaced
 *
 * Can display:
 * - Positive numbers (flags remaining)
 * - Zero (all flags placed)
 * - Negative numbers (more flags placed than mines exist)
 */
describe('RemainingFlagsCounter Component', () => {
  /**
   * Rendering Tests
   * Verify the counter displays correctly for various flag counts
   */
  describe('rendering', () => {
    // Verify the label text is present
    it('renders the counter label', () => {
      render(<RemainingFlagsCounter remainingFlagsCount={10} />);

      expect(screen.getByText(/remaining flags/i)).toBeDefined();
    });

    // Verify positive flag count displays correctly
    it('displays the correct flag count', () => {
      render(<RemainingFlagsCounter remainingFlagsCount={10} />);

      expect(screen.getByText('10')).toBeDefined();
    });

    // Verify zero flags displays (all flags used)
    it('displays zero flags', () => {
      render(<RemainingFlagsCounter remainingFlagsCount={0} />);

      expect(screen.getByText('0')).toBeDefined();
    });

    // Verify negative count displays (player placed more flags than mines)
    it('displays negative flags when over-flagged', () => {
      render(<RemainingFlagsCounter remainingFlagsCount={-3} />);

      expect(screen.getByText('-3')).toBeDefined();
    });

    // Verify component updates when flag count prop changes
    it('updates when flag count changes', () => {
      const { rerender } = render(
        <RemainingFlagsCounter remainingFlagsCount={10} />
      );

      expect(screen.getByText('10')).toBeDefined();

      // Simulate flag being placed (count decreases)
      rerender(<RemainingFlagsCounter remainingFlagsCount={5} />);

      expect(screen.getByText('5')).toBeDefined();
    });
  });
});