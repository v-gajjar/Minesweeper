import { useEffect, useState } from "react";
import classNames from "classnames";

function GameResultModal({ gameWon, onClick }){


  const [modalStateClass, setModalStateClass ] = useState("modalEntrance")
  const message = gameWon ? "Congratulations, you won!" : "Game Over!";
  const gameResultClass = gameWon ? "gameWonModal" : "gameLostModal";

  // Combine animation + result style into one class
  const modalClass = classNames(modalStateClass, gameResultClass);

  // Start entrance-to-visible transition after mount
  useEffect(
    () => setModalStateClass("modalVisible"), 
    []
  );

  function closeModal() {
    setModalStateClass("modalExit")
    setTimeout(onClick, 300); // Wait for the transition to finish before calling onClick (Make sure 500ms matches your CSS transition duration)
  }
  //useEffect and useState are used to manage the the CSS class state for the modal dialog (initially modalEntrance)
  //The starting class is initially "modalEntrance" and changes to "modalVisible" after the component mounts.
  //When the closeModal function is called, it sets the class is changed to to "modalExit" and calls the onClick function passed as a prop.
  //This allows for a smooth transition effect when the modal is closed.


  return (
    <dialog id="gameResultModal" className={modalClass}>
      <p>{message}</p>
      <button id="gameResultModalCloseButton" onClick={closeModal}>Play again</button>
    </dialog>
  );
}

export default GameResultModal;