
import classNames from "classnames";

function Tile({ tile, onClick, onContextMenu }) {

  const tileClass = classNames({
    'tile' : true,
    'mine' : tile.hasMine,
    'flagged' : tile.isFlagged,
    'opened' : tile.isOpened
  })

  const renderTileContents = () => {
  
    if ( tile.isFlagged) {
      return <span>&#127987;</span>;
    }
    if (tile.isOpened ) {
      if ( tile.hasMine ){
        return  <span>&#128163;</span>;
      }
      if ( tile.adjacentMinesCount > 0 ){
         return <span>{tile.adjacentMinesCount}</span>;
      }
    }

    return <span></span>;
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
