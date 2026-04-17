// GameBoard.tsx
import { useTranslation } from 'react-i18next';
import type { CSSProperties } from 'react';
import Cell from '@/components/feature/GameBoard/Cell/Cell';
import styles from '@/components/feature/GameBoard/GameBoard.module.css';
import type { GameBoardProps } from '@feature/GameBoard/GameBoard.interfaces';

function GameBoard({
  board,
  boardSize,
  onClick,
  onContextMenu,
}: GameBoardProps) {
  // CSS custom properties to control the grid layout
  const style = {
    '--rows': `${boardSize.rowCount}`,
    '--columns': `${boardSize.columnCount}`,
  } as CSSProperties;

  const { t } = useTranslation();

  return (
    <div
      style={style}
      className={styles.board}
      data-testid='game-board'
      role='grid'
      aria-label={t('common:ariaBoardDescription',
        { rowCount: boardSize.rowCount, columnCount: boardSize.columnCount}
      )}
    >
      {board.map((rows, rowIndex) =>
        rows.map((_, colIndex) => (
          <Cell
            cell={board[rowIndex][colIndex]}
            key={`cell-${rowIndex}-${colIndex}`}
            onClick={onClick}
            onContextMenu={onContextMenu}
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
