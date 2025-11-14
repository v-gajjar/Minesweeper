// src/components/feature/GameTimer/useGameTimer.ts
import { useEffect, useState } from 'react';

type TimerState = {
  time: number; // elapsed seconds
  isRunning: boolean;
};

// ---- module-level shared state ----
let timerState: TimerState = {
  time: 0,
  isRunning: false,
};

let intervalId: number | null = null;
const listeners = new Set<(state: TimerState) => void>();

function notifyListeners() {
  for (const listener of listeners) {
    listener(timerState);
  }
}

function setTimerState(partial: Partial<TimerState>) {
  timerState = { ...timerState, ...partial };
  notifyListeners();
}

// ---- core timer controls ----
function startInternal() {
  if (timerState.isRunning) return;

  setTimerState({ isRunning: true });

  intervalId = window.setInterval(() => {
    setTimerState({ time: timerState.time + 1 });
  }, 1000);
}

function stopInternal() {
  if (!timerState.isRunning) return;

  setTimerState({ isRunning: false });

  if (intervalId !== null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
}

function resetInternal() {
  setTimerState({ time: 0, isRunning: false });

  if (intervalId !== null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
}

// ---- public API used by GameTimer.tsx ----
export function useGameTimer(): TimerState {
  const [state, setState] = useState<TimerState>(timerState);

  useEffect(() => {
    const listener = (next: TimerState) => setState(next);
    listeners.add(listener);

    // sync immediately
    setState(timerState);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return state;
}

export function timerStart() {
  startInternal();
}

export function timerStop() {
  stopInternal();
}

export function timerReset() {
  resetInternal();
}

export function formatMMSS(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `${mm}:${ss}`;
}