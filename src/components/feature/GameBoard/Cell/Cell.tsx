import classNames from 'classnames';
import { Bomb, X, Flag } from '@phosphor-icons/react';
import type { CellProps } from '@/components/feature/GameBoard/Cell/Cell.interfaces';
import styles from '@components/feature/GameBoard/Cell/Cell.module.css';

function Cell({ cell, onClick, onContextMenu, isHint }: CellProps) {
  const cellClass = classNames({
    [styles.cell]: true,
    [styles.mine]: cell.hasMine,
    [styles.exploded]: cell.hasExplodedMine,
    [styles.flagged]: cell.isFlagged,
    [styles.revealed]: cell.isRevealed,
    [styles.hint]: isHint,
  });

  const renderCellContents = () => {
    if (!cell.isRevealed && !cell.isFlagged) return null;

    if (cell.isIncorrectlyFlagged) {
      return (
        <span data-testid='x-icon'>
          <X size={20} color='#c01c28' weight='bold' />
        </span>
      );
    }

    if (cell.isFlagged) {
      return <Flag size={20} color='#c01c28' weight='fill' />;
    }
    if (cell.hasMine) {
      return <Bomb size={20} weight='fill' />;
    }
    if (cell.adjacentMinesCount > 0) {
      const number = cell.adjacentMinesCount!;
      const cellNumberClass = styles[`num${number}`];
      return <span className={cellNumberClass}>{number}</span>;
    }
  };

  const getAriaLabel = () => {
    if (cell.isFlagged) {
      return 'Flagged cell';
    }
    if (cell.isRevealed) {
      if (cell.hasMine) {
        return cell.hasExplodedMine ? 'Exploded mine' : 'Mine';
      }
      if (cell.adjacentMinesCount > 0) {
        return `Cell with ${cell.adjacentMinesCount} adjacent mine${cell.adjacentMinesCount === 1 ? '' : 's'}`;
      }
      return 'Empty revealed cell';
    }
    return 'Unrevealed cell';
  };

  const handleContextMenu = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onContextMenu(cell.x, cell.y);
  };

  return (
    <button
      type='button'
      className={cellClass}
      data-testid='cell'
      onClick={() => onClick(cell.x, cell.y)}
      onContextMenu={handleContextMenu}
      role='gridcell'
      aria-label={getAriaLabel()}
      aria-pressed={cell.isFlagged ? true : false}
      aria-disabled={cell.isRevealed}
    >
      {renderCellContents()}
    </button>
  );
}

export default Cell;
