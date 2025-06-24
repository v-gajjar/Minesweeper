import { useEffect, useRef } from "react";
import Cell from "./Cell";

function GameBoard({ board, boardSize, onClick, onContextMenu }) {

  // --rows is a CSS variable used set grid-template-rows 
  // --columns is a CSS variable used set grid-template-columns
  const style = {
    "--rows": `${boardSize.rowCount}`,
    "--columns": `${boardSize.columnCount}`,
  };

  const boardContainerRef = useRef(null);

  useEffect(()=> {

      // scroll doesn't automatically reset when board size is changed
      // so reset to 0 for better UX 
      boardContainerRef.current.scrollLeft = 0;

  }, [boardSize])

  return (
    <div id="boardContainer" ref={boardContainerRef}>
      <div style={style} id="board ">
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
