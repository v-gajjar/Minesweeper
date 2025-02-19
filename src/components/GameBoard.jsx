import Tile from "./Tile";

function GameBoard({ board, boardSize, onClick, onContextMenu }) {

  // --rows is a CSS variable used set grid-template-rows 
  // --columns is a CSS variable used set grid-template-columns
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
            key={`tile-${rowIndex}-${colIndex}`}
            onClick={onClick}
            onContextMenu={onContextMenu}
          ></Tile>
        ))
      )}
    </div>
  );
}

export default GameBoard;
