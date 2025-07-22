import React from "react";
import { CellData } from "../types";

type Props = {
  x: number;
  y: number;
  data: CellData;
  onClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number) => void;
};

const Cell: React.FC<Props> = ({ x, y, data, onClick, onRightClick }) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick(x, y);
  };

  return (
    <div
      className={`cell ${data.isRevealed ? "revealed" : ""}`}
      onClick={() => onClick(x, y)}
      onContextMenu={handleContextMenu}
      data-testid="cell"
    >
      {data.isRevealed
        ? data.hasMine
          ? "💣"
          : data.adjacentMines || ""
        : data.isFlagged
          ? "🚩"
          : ""}
    </div>
  );
};

export default Cell;
