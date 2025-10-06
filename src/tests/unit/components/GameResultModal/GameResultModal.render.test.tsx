// src/tests/unit/components/GameResultModal/GameResultModal.render.test.tsx
// Render + behavior tests for <GameResultModal />
// Uses data-testid/IDs (dialog lacks `open` in JSDOM).
// Avoids userEvent for the delayed-close test to prevent fake-timer hangs.

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GameResultModal from '@/components/feature/GameResultModal/GameResultModal';

describe('<GameResultModal />', () => {
  it('renders WIN message when gameWon=true', () => {
    render(<GameResultModal gameWon={true} onClick={() => {}} />);

    const modal = screen.getByTestId('result-modal');
    expect(modal).toBeTruthy();

    const msg = modal.querySelector('#game-result-message');
    expect(msg && /you won!/i.test(msg.textContent || '')).toBe(true);

    const btn = modal.querySelector('#gameResultModalCloseButton');
    expect(btn).toBeTruthy();
  });

  it('renders LOSE message when gameWon=false', () => {
    render(<GameResultModal gameWon={false} onClick={() => {}} />);

    const modal = screen.getByTestId('result-modal');
    expect(modal).toBeTruthy();

    const msg = modal.querySelector('#game-result-message');
    expect(msg && /game over!/i.test(msg.textContent || '')).toBe(true);

    const btn = modal.querySelector('#gameResultModalCloseButton');
    expect(btn).toBeTruthy();
  });

  it('calls onClick AFTER 300ms when "Play again" is clicked', () => {
    vi.useFakeTimers();
    try {
      const onClose = vi.fn();

      render(<GameResultModal gameWon={true} onClick={onClose} />);

      const modal = screen.getByTestId('result-modal');
      const btn = modal.querySelector('#gameResultModalCloseButton') as HTMLButtonElement | null;
      expect(btn).toBeTruthy();

      // Synchronous click; no async userEvent machinery
      fireEvent.click(btn!);

      // Not called immediately
      expect(onClose).toHaveBeenCalledTimes(0);

      // Just before threshold
      vi.advanceTimersByTime(299);
      expect(onClose).toHaveBeenCalledTimes(0);

      // Cross the 300ms timeout
      vi.advanceTimersByTime(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});