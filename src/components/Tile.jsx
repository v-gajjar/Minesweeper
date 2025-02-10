
import classNames from "classnames";

function Tile({ tile, onClick, onContextMenu }) {

  const tileClass = classNames({
    'tile' : true,
    'mine' : tile.hasMine,
    'flagged' : tile.isFlagged,
    'opened' : tile.isOpened
  })

  const renderTileContents = () => {
  
    if ( tile.isCorrectlyFlagged === false ){
      return <>&#10060;</>
    }
    if ( tile.isFlagged) {
      return <>&#127987;</>;
    }
    if (tile.isOpened ) {
      if ( tile.hasMine ){
        return  <>&#128163;</>;
      }
      if ( tile.adjacentMinesCount > 0 ){
         return <span>{tile.adjacentMinesCount}</span>;
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
