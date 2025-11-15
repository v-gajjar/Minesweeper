import type { CSSProperties } from 'react';
import Cell from '@/components/feature/GameBoard/Cell/Cell';
import styles from '@/components/feature/GameBoard/GameBoard.module.css';
import type { GameBoardProps } from '@feature/GameBoard/GameBoard.interfaces';

function GameBoard({
  board,
  boardSize,
  onClick,
  onContextMenu,
  hintLocation,
}: GameBoardProps) {
  // CSS custom properties to control the grid layout
  const style = {
    '--rows': `${boardSize.rowCount}`,
    '--columns': `${boardSize.columnCount}`,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={styles.board}
      data-testid='game-board'
      role='grid'
      aria-label={`Minesweeper grid ${boardSize.rowCount} by ${boardSize.columnCount}`}
    >
      {board.map((rows, rowIndex) =>
        rows.map((_, colIndex) => (
          <Cell
            cell={board[rowIndex][colIndex]}
            key={`cell-${rowIndex}-${colIndex}`}
            onClick={onClick}
            onContextMenu={onContextMenu}
            isHint={
              hintLocation != null &&
              hintLocation.x === rowIndex &&
              hintLocation.y === colIndex
            }
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
