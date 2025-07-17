// GameBoard.tsx
import React from "react";
import Cell from "./Cell";
import type { CellData } from "../types";

interface Props {
  board: CellData[][];
  boardSize: { rowCount: number; columnCount: number };
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const GameBoard: React.FC<Props> = ({
  board,
  boardSize,
  onClick,
  onContextMenu,
}) => {
  return (
    <div
      id="board"
      style={
        {
          "--rows": boardSize.rowCount,
          "--columns": boardSize.columnCount,
        } as React.CSSProperties
      }
      data-testid="game-board"
    >
      {board.flat().map((cell) => (
        <Cell
          key={`${cell.x}-${cell.y}`}
          cell={cell}
          onClick={onClick}
          onContextMenu={onContextMenu}
        />
      ))}
    </div>
  );
};

export default GameBoard;
