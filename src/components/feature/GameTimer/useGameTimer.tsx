import { useSyncExternalStore } from 'react';

export type TimerState = {
  time: number; // elapsed seconds
  isRunning: boolean; // ticking or paused
  autoArmed: boolean; // if true, first reveal should auto-start
};

let state: TimerState = { time: 0, isRunning: false, autoArmed: true };
const subscribers = new Set<() => void>();

// --- store plumbing ---
function emit() {
  subscribers.forEach((cb) => cb());
}
function setState(patch: Partial<TimerState>) {
  state = { ...state, ...patch };
  emit();
}

// --- ticking (module-level interval) ---
let intervalId: number | null = null;
function startTicker() {
  if (intervalId != null) return;
  intervalId = window.setInterval(() => {
    if (state.isRunning) {
      setState({ time: state.time + 1 });
    }
  }, 1000);
}
function stopTicker() {
  if (intervalId != null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// --- public hook ---
export function useGameTimer(): TimerState {
  return useSyncExternalStore(
    (cb) => {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },
    () => state,
    () => state
  );
}

// --- public API (controls) ---
export function timerStart(): void {
  if (!state.isRunning) {
    setState({ isRunning: true });
    startTicker();
  }
}

export function timerStop(): void {
  if (state.isRunning) {
    setState({ isRunning: false });
  }
  stopTicker();
}

export function timerReset(): void {
  setState({ time: 0, isRunning: false, autoArmed: true });
  stopTicker();
}

export function timerArmAutoStart(): void {
  setState({ autoArmed: true });
}

export function timerDisarmAutoStart(): void {
  setState({ autoArmed: false });
}

export function timerIsAutoArmed(): boolean {
  return state.autoArmed;
}

// --- helpers ---
export function formatMMSS(t: number): string {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
