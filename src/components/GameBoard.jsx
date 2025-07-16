// src/components/GameBoard.jsx
import Cell from "./Cell";

function GameBoard({ board, boardSize, onClick, onContextMenu }) {
  // CSS custom properties to control the grid layout
  const style = {
    "--rows": `${boardSize.rowCount}`,
    "--columns": `${boardSize.columnCount}`,
  };

  return (
    <div style={style} className="board" id="board" data-testid="game-board">
      {board.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <Cell
            cell={board[rowIndex][colIndex]}
            key={`cell-${rowIndex}-${colIndex}`}
            onClick={onClick}
            onContextMenu={onContextMenu}
          />
        )),
      )}
    </div>
  );
}

export default GameBoard;
