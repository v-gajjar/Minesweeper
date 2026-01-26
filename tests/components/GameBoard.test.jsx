// tests/components/GameBoard.test.jsx

import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GameBoard from '@feature/GameBoard/GameBoard';
import { createMockBoard, createMockBoardSize } from '../mocks/boardMocks';

/**
 * GameBoard Component Tests
 *
 * Tests the main game grid component which:
 * - Renders a grid of Cell components based on board data
 * - Applies CSS grid variables for dynamic sizing
 * - Handles click and right-click events on cells
 */
describe('GameBoard Component', () => {
  /**
   * Rendering Tests
   * Verify the board renders correctly with different configurations
   */
  describe('rendering', () => {
    // Verify small board renders correct cell count
    it('renders correct number of cells for 2x2 board', () => {
      const board = createMockBoard(2, 2);
      const boardSize = createMockBoardSize(2, 2);

      const { container } = render(
        <GameBoard board={board} boardSize={boardSize} />
      );

      const cells = container.querySelectorAll('[data-testid="cell"]');
      expect(cells).toHaveLength(4);
    });

    // Verify standard 9x9 beginner board renders all 81 cells
    it('renders correct number of cells for 9x9 board', () => {
      const board = createMockBoard(9, 9);
      const boardSize = createMockBoardSize(9, 9);

      const { container } = render(
        <GameBoard board={board} boardSize={boardSize} />
      );

      const cells = container.querySelectorAll('[data-testid="cell"]');
      expect(cells).toHaveLength(81);
    });

    // Verify CSS custom properties are set for grid layout
    it('applies correct CSS grid style variables', () => {
      const board = createMockBoard(3, 4);
      const boardSize = createMockBoardSize(3, 4);

      const { container } = render(
        <GameBoard board={board} boardSize={boardSize} />
      );

      const boardDiv = container.querySelector('[data-testid="game-board"]');
      expect(boardDiv.style.getPropertyValue('--rows')).toBe('3');
      expect(boardDiv.style.getPropertyValue('--columns')).toBe('4');
    });
  });

  /**
   * Interaction Tests
   * Verify click handlers are called correctly
   */
  describe('interactions', () => {
    // Verify left-click triggers onClick handler
    it('calls onClick handler when a cell is clicked', () => {
      const board = createMockBoard(2, 2);
      const boardSize = createMockBoardSize(2, 2);
      const onClick = vi.fn();

      const { getAllByTestId } = render(
        <GameBoard
          board={board}
          boardSize={boardSize}
          onClick={onClick}
        />
      );

      fireEvent.click(getAllByTestId('cell')[0]);
      expect(onClick).toHaveBeenCalledOnce();
    });

    // Verify onClick receives correct x,y coordinates
    it('calls onClick with correct cell coordinates', () => {
      const board = createMockBoard(2, 2);
      const boardSize = createMockBoardSize(2, 2);
      const onClick = vi.fn();

      const { getAllByTestId } = render(
        <GameBoard
          board={board}
          boardSize={boardSize}
          onClick={onClick}
        />
      );

      fireEvent.click(getAllByTestId('cell')[0]);
      expect(onClick).toHaveBeenCalledWith(0, 0);
    });

    // Verify right-click triggers onContextMenu handler (for flagging)
    it('calls onContextMenu handler on right-click', () => {
      const board = createMockBoard(2, 2);
      const boardSize = createMockBoardSize(2, 2);
      const onContextMenu = vi.fn();

      const { getAllByTestId } = render(
        <GameBoard
          board={board}
          boardSize={boardSize}
          onContextMenu={onContextMenu}
        />
      );

      fireEvent.contextMenu(getAllByTestId('cell')[0]);
      expect(onContextMenu).toHaveBeenCalledOnce();
    });

    // Verify onContextMenu receives correct x,y coordinates
    it('calls onContextMenu with correct cell coordinates', () => {
      const board = createMockBoard(2, 2);
      const boardSize = createMockBoardSize(2, 2);
      const onContextMenu = vi.fn();

      const { getAllByTestId } = render(
        <GameBoard
          board={board}
          boardSize={boardSize}
          onContextMenu={onContextMenu}
        />
      );

      // Click second cell (index 1) - should be row 0, col 1
      fireEvent.contextMenu(getAllByTestId('cell')[1]);
      expect(onContextMenu).toHaveBeenCalledWith(0, 1);
    });
  });
});