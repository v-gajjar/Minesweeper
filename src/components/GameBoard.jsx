import Cell from "./Cell";

function GameBoard({ board, boardSize, onClick, onContextMenu, onMobileToggleFlag }) {

  // --rows is a CSS variable used set grid-template-rows 
  // --columns is a CSS variable used set grid-template-columns
  const style = {
    "--rows": `${boardSize.rowCount}`,
    "--columns": `${boardSize.columnCount}`,
  };

  return (
    <div style={style} id="board">
      {board.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <Cell
            cell={board[rowIndex][colIndex]}
            key={`cell-${rowIndex}-${colIndex}`}
            onClick={onClick}
            onContextMenu={onContextMenu}
            onMobileToggleFlag={onMobileToggleFlag}
          ></Cell>
        ))
      )}
    </div>
  );
}

export default GameBoard;
