import type { CSSProperties } from 'react';
import Cell from './Cell';
import type { GameBoardProps } from './GameBoard.interfaces';

function GameBoard({
  board,
  boardSize,
  ...handlers
}: GameBoardProps) {
  // CSS custom properties to control the grid layout
  const style = {
    '--rows': `${boardSize.rowCount}`,
    '--columns': `${boardSize.columnCount}`,
  } as CSSProperties;

  return (
    <div style={style} className='board' id='board' data-testid='game-board'>
      {board.map((rows, rowIndex) =>
        rows.map((_, colIndex) => (
          <Cell
            cell={board[rowIndex][colIndex]}
            key={`cell-${rowIndex}-${colIndex}`}
            {...handlers}
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
