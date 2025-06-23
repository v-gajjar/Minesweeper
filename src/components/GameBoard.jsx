import { useEffect, useRef } from "react";
import Cell from "./Cell";

function GameBoard({ board, boardSize, onClick, onContextMenu }) {

  // --rows is a CSS variable used set grid-template-rows 
  // --columns is a CSS variable used set grid-template-columns
  const style = {
    "--rows": `${boardSize.rowCount}`,
    "--columns": `${boardSize.columnCount}`,
  };

  const myRef = useRef(null);

  useEffect(()=> {

      myRef.current.scrollLeft = 0;

  }, [boardSize])

  return (
    <div id="boardWrapper" ref={myRef}>
      <div style={style} className="board ">
        {board.map((rows, rowIndex) =>
          rows.map((col, colIndex) => (
            <Cell
              cell={board[rowIndex][colIndex]}
              key={`cell-${rowIndex}-${colIndex}`}
              onClick={onClick}
              onContextMenu={onContextMenu}
            ></Cell>
          ))
        )}
      </div>
    </div>
  );
}

export default GameBoard;
