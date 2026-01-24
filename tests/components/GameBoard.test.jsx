import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameBoard from '@/components/GameBoard/GameBoard.jsx';

describe('GameBoard Component', () => {
  it('renders the GameBoard component', () => {
    render(<GameBoard />);
    const gameBoardElement = screen.getByTestId('game-board');
    expect(gameBoardElement).toBeInTheDocument();
  });
});