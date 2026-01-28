import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameBoard from '../../components/GameBoard/GameBoard';

describe('GameBoard Component', () => {
  it('should render the GameBoard component', () => {
    render(<GameBoard />);
    const gameBoardElement = screen.getByTestId('game-board');
    expect(gameBoardElement).toBeInTheDocument();
  });

});