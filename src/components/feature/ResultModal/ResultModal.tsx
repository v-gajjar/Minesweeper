import { useState, useEffect } from 'react';
import classNames from 'classnames';
import type { ResultModalProps } from '@/components/feature/ResultModal/ResultModal.interface';
import styles from '@components/feature/ResultModal/ResultModal.module.css';

function ResultModal({ open = false, gameWon, onClick }: ResultModalProps) {
  const [shouldRender, setShouldRender] = useState(open);
  const [animationClass, setAnimationClass] = useState('');

  const message = gameWon ? 'You Won!' : 'Game Over!';
  const gameResultClass = gameWon ? styles.gameWonModal : styles.gameLostModal;

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setAnimationClass(styles.modalEnter);
    } else if (shouldRender) {
      setAnimationClass(styles.modalExit);
    }
  }, [open, shouldRender]);

  // When exit animation ends, unmount the modal
  const handleAnimationEnd = () => {
    if (!open) {
      setShouldRender(false);
    }
  };

  const modalClass = classNames(
    styles.resultModal,
    animationClass,
    gameResultClass
  );

  if (!shouldRender) return null;

  return (
    <div className={styles.modalOverlay} data-testid={`result-modal`}>
      <div
        id='gameResultModal'
        className={modalClass}
        role='dialog'
        aria-labelledby='game-result-message'
        aria-describedby='game-result-description'
        onAnimationEnd={handleAnimationEnd}
      >
        <p id='game-result-message' className={styles.resultModalMessage}>
          {message}
        </p>
        <button
          aria-label='Play again'
          id='gameResultModalCloseButton'
          onClick={onClick}
          className={styles.resultModalButton}
        >
          Play again
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
