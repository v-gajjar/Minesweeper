function Tile({ tile, onClick, onContextMenu }) {

  const setTileClasses = (selectedTile) => {
    let tileClasses = "tile";

    if (selectedTile.hasMine) {
      tileClasses = tileClasses + " mine";
    }
    if (selectedTile.isFlagged) {
      tileClasses = tileClasses + " flagged";
    }
    if (selectedTile.isOpened) {
      tileClasses = tileClasses + " opened";
    }

    return tileClasses;
  };

  return (
    <div
      className={setTileClasses(tile)}
      data-row={tile.x}
      data-col={tile.y}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {tile.isOpened && tile.adjacementMinesCount > 0 && (
        <span>{tile.adjacementMinesCount}</span>
      )}
    </div>
  );
}

export default Tile;
