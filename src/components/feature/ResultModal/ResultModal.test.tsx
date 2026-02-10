import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultModal from './ResultModal';

describe('ResultModal', () => {
  it('does not render when initially closed', () => {
    render(<ResultModal open={false} gameWon={false} onClick={() => {}} />);

    expect(screen.queryByTestId('result-modal')).toBeNull();
  });

  it('renders game over message when open and game is lost', () => {
    render(<ResultModal open={true} gameWon={false} onClick={() => {}} />);

    expect(screen.getByTestId('result-modal')).toBeDefined();
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('Game Over!')).toBeDefined();
    expect(screen.getByRole('button', { name: /play again/i })).toBeDefined();
  });

  it('renders win message when open and game is won', () => {
    render(<ResultModal open={true} gameWon={true} onClick={() => {}} />);

    expect(screen.getByText('You Won!')).toBeDefined();
  });

  it('calls onClick when Play again button is clicked', () => {
    const onClick = vi.fn();

    render(<ResultModal open={true} gameWon={false} onClick={onClick} />);

    const button = screen.getByRole('button', { name: /play again/i });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('keeps modal mounted during close animation and unmounts after animation end', () => {
    const onClick = vi.fn();

    const { rerender } = render(
      <ResultModal open={true} gameWon={false} onClick={onClick} />,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('data-state')).toBe('open');

    // Close the modal – it should remain in the DOM until the exit animation finishes
    rerender(<ResultModal open={false} gameWon={false} onClick={onClick} />);

    const dialogWhileClosing = screen.getByRole('dialog');
    expect(dialogWhileClosing.getAttribute('data-state')).toBe('closed');
    expect(screen.getByTestId('result-modal')).toBeDefined();

    // Simulate animation end to trigger unmount
    fireEvent.animationEnd(dialogWhileClosing);

    expect(screen.queryByTestId('result-modal')).toBeNull();
  });
});
