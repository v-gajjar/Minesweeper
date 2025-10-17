import { useEffect, useState } from 'react';

import classNames from 'classnames';
import type { ResultModalProps } from '@/components/feature/ResultModal/ResultModal.interface';
import styles from '@components/feature/ResultModal/ResultModal.module.css';

function ResultModal({ gameWon, onClick }: ResultModalProps) {
  const [modalStateClass, setModalStateClass] = useState(styles.modalEntrance);
  const message = gameWon ? 'You Won!' : 'Game Over!';
  const gameResultClass = gameWon ? styles.gameWonModal : styles.gameLostModal;

  // Combine animation + result style into one class
  const modalClass = classNames(styles.resultModal, modalStateClass, gameResultClass);

  // Start entrance-to-visible transition after mount
  useEffect(() => setModalStateClass(styles.modalVisible), []);

  function closeModal() {
    setModalStateClass(styles.modalExit);
    setTimeout(onClick, 300); // Wait for the transition to finish before calling onClick (Make sure 500ms matches your CSS transition duration)
  }
  //useEffect and useState are used to manage the the CSS class state for the modal dialog (initially modalEntrance)
  //The starting class is initially "modalEntrance" and changes to "modalVisible" after the component mounts.
  //When the closeModal function is called, it sets the class is changed to to "modalExit" and calls the onClick function passed as a prop.
  //This allows for a smooth transition effect when the modal is closed.

  return (
    <dialog
      id='gameResultModal'
      className={modalClass}
      data-testid='result-modal'
      aria-labelledby='game-result-message'
      aria-describedby='game-result-description'
    >
      <p id='game-result-message' className={styles.resultModalMessage}>{message}</p>
      <button
        aria-label='Play again'
        id='gameResultModalCloseButton'
        onClick={closeModal}
        className={styles.resultModalButton}
      >
        Play again
      </button>
    </dialog>
  );
}

export default ResultModal;
