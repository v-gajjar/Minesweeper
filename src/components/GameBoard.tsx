import type { CSSProperties } from "react";
import Cell from "./Cell";
import type { GameBoardProps } from "./GameBoard.interfaces";

function GameBoard({ board, boardSize, onClick, onContextMenu }: GameBoardProps) {
  const style = {
    "--rows": `${boardSize.rowCount}`,
    "--columns": `${boardSize.columnCount}`,
  } as CSSProperties;

  // Hardening against iOS callout/selection on the grid container
  const boardInteractionStyle: React.CSSProperties = {
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    userSelect: "none",
    touchAction: "manipulation",
  };

  return (
    <div
      style={{ ...style, ...boardInteractionStyle }}
      className="board"
      id="board"
      data-testid="game-board"
    >
      {board.map((rows, rowIndex) =>
        rows.map((_, colIndex) => (
          <Cell
            cell={board[rowIndex][colIndex]}
            key={`cell-${rowIndex}-${colIndex}`}
            onClick={onClick}
            onContextMenu={onContextMenu}
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
