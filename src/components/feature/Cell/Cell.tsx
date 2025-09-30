import classNames from 'classnames';
import { Bomb, X, Flag } from '@phosphor-icons/react';
import type { CellProps } from '@feature/Cell/Cell.interfaces';


function Cell({ cell, onClick, onContextMenu }: CellProps) {
  const cellClass = classNames({
    cell: true,
    mine: cell.hasMine,
    exploded: cell.hasExplodedMine,
    flagged: cell.isFlagged,
    revealed: cell.isRevealed,
  });

  const getNumberedCellColour = (number: number) => {
    switch (number) {
      case 1:
        return { color: 'blue' };
      case 2:
        return { color: 'green' };
      case 3:
        return { color: 'red' };
      case 4:
        return { color: 'darkblue' };
      case 5:
        return { color: 'brown' };
      case 6:
        return { color: 'lightblue' };
      case 7:
        return { color: 'purple' };
      case 8:
        return { color: 'pink' };
      default:
        return { color: 'black' };
    }
  };

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
      const number = cell.adjacentMinesCount;
      return <span style={getNumberedCellColour(number)}>{number}</span>;
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

  return (
    <button
      type='button'
      className={cellClass}
      data-testid='cell'
      data-row={cell.x}
      data-col={cell.y}
      onClick={onClick}
      role='gridcell'
      aria-label={getAriaLabel()}
      aria-pressed={cell.isFlagged ? true : false}
      aria-disabled={cell.isRevealed}
      onContextMenu={onContextMenu}
    >
      {renderCellContents()}
    </button>
  );
}

export default Cell;
