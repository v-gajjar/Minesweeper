import Tile from "./Tile";

function GameBoard({ board, onClick, onContextMenu }) {
  return (
    <div className="board ">
      {board.map((rows, rowIndex) => (
        <div key={rowIndex}>
          {rows.map((col, colIndex) => (
            <Tile
              tile={board[rowIndex][colIndex]}
              key={colIndex}
              onClick={onClick}
              onContextMenu={onContextMenu}
            ></Tile>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
