import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cell from './Cell';

describe('Cell', () => {
  const defaultCell = {
    x: 0,
    y: 0,
    hasMine: false,
    isRevealed: false,
    isFlagged: false,
    hasExplodedMine: false,
    isIncorrectlyFlagged: false,
    adjacentMinesCount: 0,
  };

  it('should render an incorrectly flagged cell', () => {
    render(<Cell 
      cell={{ ...defaultCell, isFlagged: true, isIncorrectlyFlagged: true }} 
      onClick={() => {}}
      onContextMenu={() => {}}
    />);
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
  });

  it('should render adjacent mines count when revealed', () => {
    render(<Cell 
      cell={{ ...defaultCell, isRevealed: true, adjacentMinesCount: 3 }} 
      onClick={() => {}}
      onContextMenu={() => {}}
    />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});