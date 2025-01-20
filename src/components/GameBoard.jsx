
function GameBoard({ board, onClick, onContextMenu }) {

    const setTileClasses = (tile) => {
      let tileClasses = "tile";

      if (tile.hasMine) {
        tileClasses = tileClasses + " mine";
      }
      if (tile.isFlagged) {
        tileClasses = tileClasses + " flagged";
      }
      if (tile.isOpened) {
        tileClasses = tileClasses + " opened";
      }

      return tileClasses;
    };
    
    return (
      <div className="board ">
        {board.map((rows, rowIndex) => (
          <div key={rowIndex}>
            {rows.map((col, colIndex) => (
              <div
                className={setTileClasses(board[rowIndex][colIndex])}
                data-row={rowIndex}
                data-col={colIndex}
                key={colIndex}
                onClick={onClick}
                onContextMenu={onContextMenu}
              >
                {board[rowIndex][colIndex].isOpened &&
                  board[rowIndex][colIndex].adjacementMinesCount > 0 && (
                    <span>
                      {board[rowIndex][colIndex].adjacementMinesCount}
                    </span>
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
}

export default GameBoard;