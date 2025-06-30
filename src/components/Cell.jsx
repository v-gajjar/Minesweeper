//import { useLongPress } from '@use-gesture/react';
import { useRef, useCallback } from 'react';
import classNames from "classnames";
import { Bomb, X, Flag } from "@phosphor-icons/react";


export function useLongPress(callback = () => {}, threshold = 500) {
  const timerRef = useRef();
  const startTimeRef = useRef();

  const start = useCallback((event) => {
    event.preventDefault();
    startTimeRef.current = Date.now();
    
    timerRef.current = setTimeout(() => {
      timerRef.current = null;// Does not sound like making sense.
      callback(event);//Does do it twice? Or halfway?
    }, threshold);
  }, [callback, threshold]);
  
  const end = useCallback(() => {
    const duration = Date.now() - startTimeRef.current;

    if (duration < threshold) {
      clearTimeout(timerRef.current);
    }
  }, [threshold]);

  return () => ({
    //onPointerDown: start,
    //onPointerUp: leave,
    onTouchStart: start,
    onTouchEnd: end,
    onTouchCancel: end,
  });
}

function Cell({ cell, onClick, onContextMenu }) {
  const bind = useLongPress(
    (event) => {
    // Handle long press as a right-click or flag gesture
      onContextMenu(event);
    },
    {
      threshold: 500, // Long press threshold in milliseconds
    }
  );
  
  const cellClass = classNames({
    'cell' : true,
    'mine' : cell.hasMine,
    'exploded' : cell.hasExplodedMine,
    'flagged' : cell.isFlagged,
    'revealed' : cell.isRevealed
  })

  const getNumberedCellColour = (number) => {
    switch(number){
      case 1: return {color: "blue"};
      case 2: return {color: "green"};
      case 3: return {color: "red"};
      case 4: return {color: "darkblue"};
      case 5: return {color: "brown"};
      case 6: return {color: "lightblue"};
      case 7: return {color: "purple"};
      case 8: return {color: "pink"};
      default: return {color: "black"}
    }
  }

  const renderCellContents = () => {
    
    if ( !cell.isRevealed && !cell.isFlagged ) return null;
  
    if ( cell.isIncorrectlyFlagged ){
      return <X size={20} color="#c01c28" weight="bold" />
    }
    if ( cell.isFlagged) {
      return <Flag size={20} color="#c01c28" weight="fill" />
    }
    if ( cell.hasMine ){
      return <Bomb size={20} weight="fill" />
    }
    if ( cell.adjacentMinesCount > 0 ){
      const number = cell.adjacentMinesCount;
      return <span style={getNumberedCellColour(number)}>{number}</span>;
    }
  }

  return (
    <div
      className={`no-touch-action ${cellClass}`}
      data-testid="cell"
      data-row={cell.x}
      data-col={cell.y}
      onClick={onClick}
      onContextMenu={onContextMenu}
      {...bind()} // Add gesture handling
    >
      {renderCellContents()}
    </div>
  );
}

export default Cell;
