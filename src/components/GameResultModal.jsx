import { useEffect, useState } from "react";

function GameResultModal({ gameWon, onClick }){
  const [className, setClass] = useState("dialoguePre")
  useEffect(() => setClass("dialogueMid"), []);
  const message = gameWon ? "Congratulations, you won!" : "Game Over!";
  const className2 = gameWon ? "dialogueWin" : "dialogueLose";

  function closeDialogue() {
    setClass("dialoguePost")
    setTimeout(onClick, 500); // Wait for the transition to finish before calling onClick (Make sure 500ms matches your CSS transition duration)
  }
  //useEffect and useState are used to manage the className state for the modal dialog.
  //The className is initially set to "dialoguePre" and changes to "dialogueMid" after the component mounts.
  //When the closeDialogue function is called, it sets the className to "dialoguePost" and calls the onClick function passed as a prop.
  //This allows for a smooth transition effect when the modal is closed.
  //As a totally unrelated note, and this comment shouldn't be here, but all other comments were written entirely by AI, and they're fucking spot on.

  return (
    <dialog id="gameResultModal" className={className + " " + className2}>
      <h1>{message}</h1>
      <button id="gameResultModalCloseButton" onClick={closeDialogue}>Play again</button>
    </dialog>
  );
}

export default GameResultModal;