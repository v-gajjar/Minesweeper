import React from "react";
import { CellData } from "../types";
import classNames from "classnames";

interface Props {
  cell: CellData;
  onClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number) => void;
}

const Cell: React.FC<Props> = ({ cell, onClick, onRightClick }) => {
  const handleClick = () => {
    onClick(cell.x, cell.y);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick(cell.x, cell.y);
  };

  const isIncorrectlyFlagged = cell.isFlagged && !cell.hasMine;

  const cellClass = classNames("cell", {
    revealed: cell.isRevealed,
    mine: cell.hasMine && cell.isRevealed,
    flagged: cell.isFlagged,
    exploded: cell.hasExplodedMine,
    incorrect: isIncorrectlyFlagged,
  });

  return (
    <div
      data-testid={`cell-${cell.x}-${cell.y}`}
      className={cellClass}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {cell.isFlagged && !cell.isRevealed && <span>🚩</span>}
      {cell.hasExplodedMine && <span>💥</span>}
      {cell.isRevealed && cell.hasMine && !cell.hasExplodedMine && <span>💣</span>}
      {cell.isRevealed && !cell.hasMine && cell.adjacentMines > 0 && (
        <span>{cell.adjacentMines}</span>
      )}
    </div>
  );
};

export default Cell;