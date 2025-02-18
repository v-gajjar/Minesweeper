import Tile from "./Tile";

function GameBoard({ board, boardSize, onClick, onContextMenu }) {

  const style = {
    "--rows": `${boardSize.rowCount}`,
    "--columns": `${boardSize.columnCount}`,
  };

  return (
    <div style={style} className="board ">
      {board.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <Tile
            tile={board[rowIndex][colIndex]}
            key={(1 + colIndex) * (1 + rowIndex)}
            onClick={onClick}
            onContextMenu={onContextMenu}
          ></Tile>
        ))
      )}
    </div>
  );
}

export default GameBoard;
