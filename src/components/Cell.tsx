import classNames from "classnames";
import { Bomb, X, Flag } from "@phosphor-icons/react";
import type { CellProps } from "./Cell.interfaces";
import useLongPress from "../hooks/useLongPress";

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
      case 1: return { color: "blue" };
      case 2: return { color: "green" };
      case 3: return { color: "red" };
      case 4: return { color: "darkblue" };
      case 5: return { color: "brown" };
      case 6: return { color: "lightblue" };
      case 7: return { color: "purple" };
      case 8: return { color: "pink" };
      default: return { color: "black" };
    }
  };

  const renderCellContents = () => {
    if (!cell.isRevealed && !cell.isFlagged) return null;
    if (cell.isIncorrectlyFlagged) {
      return (
        <span data-testid="x-icon">
          <X size={20} color="#c01c28" weight="bold" />
        </span>
      );
    }
    if (cell.isFlagged) return <Flag size={20} color="#c01c28" weight="fill" />;
    if (cell.hasMine) return <Bomb size={20} weight="fill" />;
    if (cell.adjacentMinesCount > 0) {
      const number = cell.adjacentMinesCount;
      return <span style={getNumberedCellColour(number)}>{number}</span>;
    }
    return null;
  };

  // Use long-press hook:
  // - On mobile: triggers onContextMenu after long press
  // - On desktop: triggers onContextMenu on right-click
  // Prevents double invocation by not attaching onContextMenu directly
  const longPress = useLongPress(() => {
    if (onContextMenu) {
      const evt = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
      onContextMenu(evt as any);
    }
  }, 450);

  return (
    <div
      ref={longPress.ref as any}
      className={cellClass}
      data-testid="cell"
      data-row={cell.x}
      data-col={cell.y}
      onClick={onClick}
    >
      {renderCellContents()}
    </div>
  );
}

export default Cell;
