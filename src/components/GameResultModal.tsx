import React, { forwardRef } from "react";
import type { CoordinateType, CellData } from "../types"; // adjust path if needed

interface GameResultModalProps {
  gameWon: boolean;
  onClick: () => void;
}

const GameResultModal = forwardRef<HTMLDialogElement, GameResultModalProps>(
  ({ gameWon, onClick }, ref) => {
    return (
      <dialog id="gameResultModal" ref={ref}>
        <h2>{gameWon ? "You Win!" : "You Lose!"}</h2>
        <button onClick={onClick}>Close</button>
      </dialog>
    );
  },
);

export default GameResultModal;
