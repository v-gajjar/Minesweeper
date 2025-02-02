
import classNames from "classnames";

function Tile({ tile, onClick, onContextMenu }) {

  const tileClass = classNames({
    'tile' : true,
    'mine' : tile.hasMine,
    'flagged' : tile.isFlagged,
    'opened' : tile.isOpened
  })

  return (
    <div
      className={tileClass}
      data-row={tile.x}
      data-col={tile.y}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {tile.isOpened && tile.adjacentMinesCount > 0 && (
        <span>{tile.adjacentMinesCount}</span>
      )}
    </div>
  );
}

export default Tile;
