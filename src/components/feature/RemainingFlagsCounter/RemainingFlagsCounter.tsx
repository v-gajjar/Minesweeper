// RemainingFlagsCounter.tsx
import { Flag } from '@phosphor-icons/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { RemainingFlagsCounterProps } from '@feature/RemainingFlagsCounter/RemainingFlagsCounter.interface';
import styles from '@feature/RemainingFlagsCounter/RemainingFlagsCounter.module.css';

function RemainingFlagsCounter({
  remainingFlagsCount,
}: RemainingFlagsCounterProps) {

  const { t } = useTranslation();

  return (
    <div className={styles.remainingFlagsCounter}>
      <Flag size={25} color='#c01c28' weight='fill' aria-hidden='true' />
      <span className={styles.remainingFlagsLabel}>{t('common:remainingFlags')}:</span>
      <span className={styles.remainingFlagsCount}>{remainingFlagsCount}</span>
    </div>
  );
}

export default memo(RemainingFlagsCounter);
