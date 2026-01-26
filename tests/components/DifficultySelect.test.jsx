// tests/components/DifficultySelect.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DifficultySelect from '@feature/DifficultySelect/DifficultySelect';

/**
 * DifficultySelect Component Tests
 *
 * Tests the difficulty dropdown which allows players to choose:
 * - Beginner (EASY): 9x9 board with 10 mines
 * - Intermediate (MEDIUM): 16x16 board with 40 mines
 * - Expert (HARD): 16x30 board with 80 mines
 */
describe('DifficultySelect Component', () => {
  /**
   * Rendering Tests
   * Verify the dropdown renders with all options
   */
  describe('rendering', () => {
    // Verify the select element renders with correct test ID
    it('renders the difficulty selector', () => {
      render(
        <DifficultySelect
          gameDifficultySettings={{ level: 'EASY' }}
          onChange={() => {}}
        />
      );

      expect(screen.getByTestId('difficulty-select')).toBeDefined();
    });

    // Verify all three difficulty options are present
    it('renders all difficulty options', () => {
      render(
        <DifficultySelect
          gameDifficultySettings={{ level: 'EASY' }}
          onChange={() => {}}
        />
      );

      expect(screen.getByText('Beginner')).toBeDefined();
      expect(screen.getByText('Intermediate')).toBeDefined();
      expect(screen.getByText('Expert')).toBeDefined();
    });

    // Verify option values match expected difficulty keys
    it('has correct option values', () => {
      render(
        <DifficultySelect
          gameDifficultySettings={{ level: 'EASY' }}
          onChange={() => {}}
        />
      );

      const select = screen.getByTestId('difficulty-select');
      const options = select.querySelectorAll('option');

      expect(options[0].value).toBe('EASY');
      expect(options[1].value).toBe('MEDIUM');
      expect(options[2].value).toBe('HARD');
    });
  });

  /**
   * Interaction Tests
   * Verify the onChange callback fires correctly when user changes difficulty
   */
  describe('interactions', () => {
    // Verify onChange is called when selection changes
    it('calls onChange when difficulty is changed', () => {
      const onChange = vi.fn();

      render(
        <DifficultySelect
          gameDifficultySettings={{ level: 'EASY' }}
          onChange={onChange}
        />
      );

      const select = screen.getByTestId('difficulty-select');
      fireEvent.change(select, { target: { value: 'HARD' } });

      expect(onChange).toHaveBeenCalledOnce();
    });

    // Verify onChange receives the new difficulty value
    it('calls onChange with the new difficulty value', () => {
      const onChange = vi.fn();

      render(
        <DifficultySelect
          gameDifficultySettings={{ level: 'EASY' }}
          onChange={onChange}
        />
      );

      const select = screen.getByTestId('difficulty-select');
      fireEvent.change(select, { target: { value: 'HARD' } });

      expect(onChange).toHaveBeenCalledWith('HARD');
    });
  });
});