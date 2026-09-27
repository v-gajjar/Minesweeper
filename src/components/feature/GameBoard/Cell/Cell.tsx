// Cell.tsx
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Bomb, X, Flag } from '@phosphor-icons/react';
import type { CellProps } from '@/components/feature/GameBoard/Cell/Cell.interfaces';
import styles from '@components/feature/GameBoard/Cell/Cell.module.css';

function Cell({ cell, onClick, onContextMenu }: CellProps) {
  const cellClass = classNames({
    [styles.cell]: true,
    [styles.mine]: cell.hasMine,
    [styles.exploded]: cell.hasExplodedMine,
    [styles.flagged]: cell.isFlagged,
    [styles.revealed]: cell.isRevealed,
  });

  const { t } = useTranslation();

  const renderCellContents = () => {
    if (!cell.isRevealed && !cell.isFlagged) return null;

    if (cell.isIncorrectlyFlagged) {
      return (
        <span data-testid='x-icon'>
          <X size={20} className={styles.crossIcon} weight='bold' />
        </span>
      );
    }

    if (cell.isFlagged) {
      return <Flag size={20} className={styles.flagIcon} weight='fill' />;
    }
    if (cell.hasMine) {
      return <Bomb size={20} className={styles.bombIcon} weight='fill' />;
    }
    if (cell.adjacentMinesCount > 0) {
      const number = cell.adjacentMinesCount!;
      const cellNumberClass = styles[`num${number}`];
      return <span className={cellNumberClass}>{number}</span>;
    }
  };

  const getAriaLabel = () => {
    if (cell.isFlagged) {
      return t('common:ariaFlaggedCell');
    }
    if (cell.isRevealed) {
      if (cell.hasMine) {
        return cell.hasExplodedMine ? t('common:ariaExplodedMine') : t('common:ariaMine');
      }
      if (cell.adjacentMinesCount > 0) {
        return cell.adjacentMinesCount === 1 
          ? t('common:ariaCellWithOneAdjacentMine')
          : t('common:ariaCellWithAdjacentMines', {adjacentMinesCount: cell.adjacentMinesCount});
      }
      return t('common:ariaEmptyRevealedCell');
    }
    return t('common:ariaUnrevealedCell');
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
