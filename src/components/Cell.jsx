//import { useLongPress } from '@use-gesture/react';
import { useRef, useCallback } from 'react';
import classNames from "classnames";
import { Bomb, X, Flag } from "@phosphor-icons/react";


export function useLongPress(callback, threshold = 500) {
  const timerRef = useRef();
  const cellRef = useRef();
  const longPressTriggeredRef = useRef(false);

  const start = useCallback((event) => {
    longPressTriggeredRef.current = false;
    event.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    cellRef.current = event.currentTarget ? event.currentTarget.dataset : {};
    
    //
    timerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      timerRef.current = null;
      callback(cellRef.current);
    }, threshold);
  }, [callback, threshold]);
  
  const end = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return [() => ({
    //onPointerDown: start,
    //onPointerUp: leave,
    // doing this instead of contextMenu for testing on desktop
    // now you can use long mouse left-click as well as right click.
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: end,
    onTouchStart: start,
    onTouchEnd: end,
    onTouchCancel: end,
  }),
  longPressTriggeredRef
  ];
}

function Cell({ cell, onClick, onContextMenu, onMobileToggleFlag }) {
  
  const [bind, longPressTriggeredRef] = useLongPress(
    ({ row, col }) => {
      onMobileToggleFlag(row, col);
    },
    500
  );
  
  // Handler to prevent onClick if long-press happened
  const handleClick = (e) => {
    if (longPressTriggeredRef.current) {
      // Swallow the click after long-press
      longPressTriggeredRef.current = false; // reset for next interaction
      return;
    }
    onClick(e);
  };
  
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
      onClick={handleClick}
      onContextMenu={onContextMenu}
      {...bind()} // Add gesture handling
    >
      {renderCellContents()}
    </div>
  );
}

export default Cell;
