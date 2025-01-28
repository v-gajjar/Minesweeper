function GameResultModal({ gameWon, onClick }){
    return (
        <dialog id="gameResultModal" >
        <h1>{gameWon ? "Congratulations, you won!" : "Game Over!"}</h1>
        <button id="gameResultModalCloseButton" onClick={onClick}>Play again</button>
      </dialog>
    );
}

export default GameResultModal;