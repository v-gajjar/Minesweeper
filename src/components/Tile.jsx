
import classNames from "classnames";
import { Bomb, X, Flag } from "@phosphor-icons/react";

function Tile({ tile, onClick, onContextMenu }) {

  const tileClass = classNames({
    'tile' : true,
    'mine' : tile.hasMine,
    'exploded' : tile.hasExplodedMine,
    'flagged' : tile.isFlagged,
    'opened' : tile.isOpened
  })

  const getNumberedTileColour = (number) => {
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

  const renderTileContents = () => {
  
    if ( tile.isIncorrectlyFlagged ){
      return <X size={20} color="#c01c28" weight="bold" />
    }
    if ( tile.isFlagged) {
      return <Flag size={20} color="#c01c28" weight="fill" />
    }
    if (tile.isOpened ) {
      if ( tile.hasMine ){
        return <Bomb size={20} weight="fill" />
      }
      if ( tile.adjacentMinesCount > 0 ){
          const number = tile.adjacentMinesCount;

         return <span style={getNumberedTileColour(number)}>{number}</span>;
      }
    }

    return null;
  }

  return (
    <div
      className={tileClass}
      data-row={tile.x}
      data-col={tile.y}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {renderTileContents()}
    </div>
  );
}

export default Tile;
