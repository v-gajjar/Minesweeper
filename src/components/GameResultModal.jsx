function GameResultModal({ gameWon, onClick }){
    return (
        <dialog id={gameWon ? "gameWonModal" : "gameOverModal"} >
        <h1>{gameWon ? "Congratulations, you won!" : "Game Over!"}</h1>
        <button id={gameWon ?  "gameWonModal" : "gameOverModal"} onClick={onClick}>Play again</button>
      </dialog>
    );
}

export default GameResultModal;