import React from "react";

interface Props {
  gameWon: boolean;
  onClick: () => void;
}

const GameResultModal: React.FC<Props> = ({ gameWon, onClick }) => {
  return (
    <div
      data-testid="result-modal"
      className={gameWon ? "gameWonModal" : "gameLostModal"}
    >
      <p>{gameWon ? "🎉 You Win!" : "💥 You Lose 💥"}</p>
      <button onClick={onClick}>Play Again?</button>
    </div>
  );
};

export default GameResultModal;
