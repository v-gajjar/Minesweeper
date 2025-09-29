import { Flag } from '@phosphor-icons/react';
import { memo } from 'react';
import type { RemainingFlagsCounterProps } from '@feature/RemainingFlagsCounter/RemainingFlagsCounter.interface';

function RemainingFlagsCounter({
  remainingFlagsCount,
}: RemainingFlagsCounterProps) {
  return (
    <div id='remainingFlagsCounter' data-testid='flags-remaining'>
      <Flag size={25} color='#c01c28' weight='fill' aria-hidden='true' />
      <span id='remainingFlagsLabel'>Remaining Flags:</span>
      <span id='remainingFlagsCount'>{remainingFlagsCount}</span>
    </div>
  );
}

export default memo(RemainingFlagsCounter);
