import React from "react";
import Cell from "./Cell";
import { CellData } from "../types";

type Props = {
  board: CellData[][];
  onCellClick: (x: number, y: number) => void;
  onCellRightClick: (x: number, y: number) => void;
};

const GameBoard: React.FC<Props> = ({
  board,
  onCellClick,
  onCellRightClick,
}) => {
  return (
    <div
      data-testid="game-board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
      }}
    >
      {board.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            data={cell}
            onClick={() => onCellClick(x, y)}
            onRightClick={() => onCellRightClick(x, y)}
          />
        )),
      )}
    </div>
  );
};

export default GameBoard;
