import classNames from 'classnames';
import type { ResultModalProps } from '@/components/feature/ResultModal/ResultModal.interface';
import styles from '@components/feature/ResultModal/ResultModal.module.css';

function ResultModal({ open = false, gameWon, onClick }: ResultModalProps) {
  if (!open) return null;

  const message = gameWon ? 'You Won!' : 'Game Over!';
  const gameResultClass = gameWon ? styles.gameWonModal : styles.gameLostModal;
  const modalClass = classNames(styles.resultModal, gameResultClass);

  return (
    <div className={styles.modalOverlay} data-testid={`result-modal`}>
      <div
        id='gameResultModal'
        data-state={open ? 'open' : 'closed'}
        className={modalClass}
        role='dialog'
        aria-labelledby='game-result-message'
        aria-describedby='game-result-description'
        onAnimationEnd={() => {}}
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
