function GameResultModal({ gameWon, onClick }){

    const message = gameWon ? "Congratulations, you won!" : "Game Over!";

    return (
        <dialog id="gameResultModal" >
        <h1>{message}</h1>
        <button id="gameResultModalCloseButton" onClick={onClick}>Play again</button>
      </dialog>
    );
}

export default GameResultModal;