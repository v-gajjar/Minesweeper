// src/tests/unit/components/GameResultModal/GameResultModal.render.test.tsx
// Render + behavior tests for <GameResultModal />

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GameResultModal from '@/components/feature/ResultModal/ResultModal';

describe('<GameResultModal />', () => {
  it('renders WIN message when gameWon=true', () => {
    render(<GameResultModal open={true} gameWon={true} onClick={() => {}} />);

    const modal = screen.getByTestId('result-modal');
    expect(modal).toBeTruthy();

    const msg = modal.querySelector('#game-result-message');
    expect(msg && /you won!/i.test(msg.textContent || '')).toBe(true);

    const btn = modal.querySelector('#gameResultModalCloseButton');
    expect(btn).toBeTruthy();
  });

  it('renders LOSE message when gameWon=false', () => {
    render(<GameResultModal open={true} gameWon={false} onClick={() => {}} />);

    const modal = screen.getByTestId('result-modal');
    expect(modal).toBeTruthy();

    const msg = modal.querySelector('#game-result-message');
    expect(msg && /game over!/i.test(msg.textContent || '')).toBe(true);

    const btn = modal.querySelector('#gameResultModalCloseButton');
    expect(btn).toBeTruthy();
  });

  it('calls onClick when "Play again" is clicked', () => {
    const onClose = vi.fn();

    render(<GameResultModal open={true} gameWon={true} onClick={onClose} />);

    const modal = screen.getByTestId('result-modal');
    const btn = modal.querySelector(
      '#gameResultModalCloseButton',
    ) as HTMLButtonElement | null;

    expect(btn).toBeTruthy();

    fireEvent.click(btn!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});