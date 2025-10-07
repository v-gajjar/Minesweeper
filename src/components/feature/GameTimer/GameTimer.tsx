import React, { memo } from 'react';
import { Clock } from '@phosphor-icons/react';
import {
  useGameTimer,
  timerStart,
  timerStop,
  timerReset,
  formatMMSS,
} from './useGameTimer';
import type { GameTimerProps } from './GameTimer.interface';

function GameTimer({
  showControls = true,
  className,
  disableStart = false,
  title = 'Elapsed time',
}: GameTimerProps) {
  const { time, isRunning } = useGameTimer();

  return (
    <div
      className={className}
      aria-live='polite'
      role='status'
      title={title}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
    >
      <Clock size={20} weight='duotone' aria-hidden='true' />
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
        {formatMMSS(time)}
      </span>

      {showControls && (
        <div style={{ display: 'inline-flex', gap: 6, marginLeft: 6 }}>
          <button
            type='button'
            onClick={() => timerStart()}
            disabled={isRunning || disableStart}
            aria-label='Start timer'
            title='Start'
            style={btnStyle}
          >
            Start
          </button>
          <button
            type='button'
            onClick={() => timerStop()}
            disabled={!isRunning}
            aria-label='Stop timer'
            title='Stop'
            style={btnStyle}
          >
            Stop
          </button>
          <button
            type='button'
            onClick={() => timerReset()}
            aria-label='Reset timer'
            title='Reset'
            style={btnStyle}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '2px 8px',
  borderRadius: 8,
  border: '1px solid #ddd',
  background: 'white',
  cursor: 'pointer',
};

export default memo(GameTimer);
