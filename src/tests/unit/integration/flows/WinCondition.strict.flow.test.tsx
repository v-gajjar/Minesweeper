// Strict win condition flow test.
// Part A: flagging alone should NOT trigger a win banner.
// Includes a JSDOM polyfill for HTMLDialogElement.showModal/close
// so that <App /> can call them without crashing.

import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';

// ---- Dialog polyfill so App's showModal() won't crash in JSDOM ---------------
beforeAll(() => {
  if (!HTMLDialogElement.prototype.showModal) {
    // No-op + set attribute to simulate open state (optional for your UI)
    // This keeps your App logic happy without needing a real browser.
    // eslint-disable-next-line func-names
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute('open', '');
    };
  }
  if (!HTMLDialogElement.prototype.close) {
    // eslint-disable-next-line func-names
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute('open');
    };
  }
});

// Flexible "win" text matcher: covers "You Won!/You Win", etc.
const winRegex = /you (win|won)|congrats|victory/i;

describe('Strict win condition (no premature win)', () => {
  it('does not show a win banner just by flagging cells', async () => {
    render(<App />);

    // Flag a bunch of cells; we are not asserting which are actual mines.
    const cells = screen.getAllByTestId('cell');
    for (let i = 0; i < Math.min(10, cells.length); i++) {
      cells[i].focus();
      await userEvent.keyboard('f');
    }

    // Assert we did NOT win merely by matching a count of flags.
    const premature = screen.queryByText(winRegex);
    expect(premature).toBeNull();
  });
});