import { useState, useEffect } from "react";

import GameStatus from "./enum/GameStatus";
import { GAME_DIFFICULTY_LEVEL_SETTINGS } from "./config/gameDifficultyLevelSettings";

import GameDifficultySelector from "./components/GameDifficultySelector";
import GameBoard from "./components/GameBoard";
import GameResultModal from "./components/GameResultModal";
import RemainingFlagsCounter from "./components/RemainingFlagsCounter";

import "./App.css";


function App() {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState(GameStatus.GAME_NOT_STARTED);
  const [remainingFlagsCount, setRemainingFlagsCount] = useState(0);
  const [minesNeedPlacing, setMinesNeedPlacing] = useState(true);
  const [safeTilesCount, setSafeTilesCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [flagLocations, setFlagLocations] = useState([]);
 
  const [gameDifficultySettings, setGameDifficultySettings] = useState(GAME_DIFFICULTY_LEVEL_SETTINGS.EASY);

  useEffect(() => {
    if (gameHasEnded()) {
      const gameResultModal = document.getElementById("gameResultModal");
      gameResultModal.showModal();
    }
  }, [gameStatus]);

  useEffect(() => {

    setupNewGame();
  }, [gameDifficultySettings]);

  const onGameDifficultyLevelChanged = (event) => {
    const selectedLevel = event.target.value;

    const difficultyLevel = Object.values(GAME_DIFFICULTY_LEVEL_SETTINGS).find(
      (difficultySetting) => selectedLevel === difficultySetting.level
    );

    if (! difficultyLevel) {
      return;
    }

    setGameStatus(GameStatus.GAME_NOT_STARTED);
    setGameDifficultySettings(difficultyLevel)
  };

  const onGameResultModalClosed = () => {
    const gameResultModal = document.getElementById("gameResultModal");
    gameResultModal.close();
    
    setupNewGame();
  };

  const getRandomlyPlacedMineLocations = (currentTile, currentBoard, mineCount, boardSize) => {
    const rowCount = boardSize.rowCount;
    const columnCount = boardSize.columnCount;

    let allocatedMines = 0;

    const newMineLocations = [];
    
    while (allocatedMines < mineCount) {
      let row = Math.floor(Math.random() * rowCount);
      let col = Math.floor(Math.random() * columnCount);

      let tile = currentBoard[row][col];

      if ( tile.x === currentTile.x && tile.y === currentTile.y ){
        // The first tile that is subjected to a left click should be ignored when placing a mine
        // to make the game a bit easier/fairer - the user cannot lose on the 
        // the first left click
        continue;
      }
      // check for a duplication location in the newMineLocations array and skip if found
      if ( newMineLocations.some((location) => location.x === tile.x && location.y === tile.y) ){
        continue;
      }

      if (!tile.hasMine ) {
        newMineLocations.push({x: tile.x, y: tile.y});
        allocatedMines++;
      }
    }

    return newMineLocations;
  };

  const getTilesWithMines = (newMineLocations, currentBoard) => {
    const tilesWithMines = [];

    for( const location of newMineLocations){
      const currentTile = currentBoard[location.x][location.y];

      const updatedTile = {
        ...currentTile,
        hasMine: true
      }
      tilesWithMines.push( updatedTile );
    }
    return tilesWithMines;
  }

  const getAjdacentMinesCount = (selectedTile, tiles, boardSize) => {
    let adjacentMinesCount = 0;

    let x = selectedTile.x;
    let y = selectedTile.y;

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        let xPos = x + i;
        let yPos = y + j;

        if (isOffBoard(xPos, yPos, boardSize)) {
          continue;
        }
        let neighbourTile = tiles[xPos][yPos];

        if ( neighbourTile.hasMine ) {
          adjacentMinesCount++;
        }
      }
    }
    return adjacentMinesCount;
  };

  const getIncorrectlyFlaggedTiles = (gameBoard, currentFlagLocations) => {
    const updatedTiles = [];

    for (const flagLocation of currentFlagLocations) {
      let tile = gameBoard[flagLocation.x][flagLocation.y];

      if (tile.hasMine) continue;

      const updatedTile = {
        ...tile,
        isIncorrectlyFlagged: true,
      };
      updatedTiles.push(updatedTile);
    }

    return updatedTiles;
  };

  const getRevealedMineTiles = (gameBoard, currentMineLocations) => {
    const updatedTiles = [];

    for (const mineLocation of currentMineLocations) {
      let tile = gameBoard[mineLocation.x][mineLocation.y];

      if (tile.isFlagged) continue;

      const updatedTile = {
        ...tile,
        isOpened: true,
      };
      updatedTiles.push(updatedTile);
    }

    return updatedTiles;
  };

  const isOffBoard = (x, y, boardSize) => {
    const rowCount = boardSize.rowCount;
    const columnCount = boardSize.columnCount;

    if (
      x < 0 || x >= rowCount || y < 0 || y >= columnCount 
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  const updateBoard = (currentBoard, updatedTiles) => {
    const updatedBoard = [...currentBoard];

    for ( const tile of updatedTiles ){
      const updatedTile = { ...tile };
      updatedBoard[tile.x][tile.y] = updatedTile;
    }
    return updatedBoard;
  };

  const hasTile = (x, y, tiles) => {
    return tiles.some((tile) => tile.x === x && tile.y === y)
  }

  const openTile = (x, y, currentBoard, boardSize, openedTiles = []) => {

    if ( isOffBoard(x, y, boardSize) || hasTile(x, y, openedTiles) ) {
      return;
    }

    const tile = currentBoard[x][y];
    
    const updatedTile = {
      ...tile,
      isFlagged: false,
      isOpened: true
    }

    if (updatedTile.hasMine) {
      updatedTile.hasExplodedMine = true;
      openedTiles.push(updatedTile);
      return openedTiles;
    } 
    updatedTile.adjacentMinesCount = getAjdacentMinesCount(
      updatedTile,
      currentBoard,
      boardSize
    );
    openedTiles.push(updatedTile);

    if (updatedTile.adjacentMinesCount === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          openTile(x + i, y + j, currentBoard, boardSize, openedTiles);
        }
      }
    }

    return openedTiles;
  };

  const coordinatesMatch = ({x: x1, y: y1}, {x: x2, y: y2}) => {
      return x1 === x2 && y1 === y2
  }

  const getFilteredFlagLocations = (currentFlagLocations, tiles) => {

    const updatedFlagLocations = currentFlagLocations.filter(location => 
      !tiles.some(tile => coordinatesMatch(location, tile))
    );

    return updatedFlagLocations;
  }

  const onTileLeftClicked = (event) => {
    let target = event.target;
    let rowIndex = parseInt(target.dataset.row);
    let colIndex = parseInt(target.dataset.col);

    let selectedTile = board[rowIndex][colIndex];

    if (selectedTile.isOpened) {
      return;
    }

    const currentBoard = [...board];

    if ( minesNeedPlacing ){
      const newMineLocations = getRandomlyPlacedMineLocations(
        selectedTile,
        currentBoard,
        gameDifficultySettings.mineCount,
        gameDifficultySettings.boardSize,
      );

      const tilesWithMines = getTilesWithMines(newMineLocations, currentBoard);
      const boardWithMines = updateBoard(currentBoard, tilesWithMines);
      
      setMineLocations(newMineLocations);
      setMinesNeedPlacing(false);
      setBoard(prevBoard => boardWithMines);
    }

    const openedTiles = openTile(
      selectedTile.x, 
      selectedTile.y, 
      currentBoard, 
      gameDifficultySettings.boardSize
    );
    console.log( "opened tiles: ");
    console.log( JSON.stringify(openedTiles) );

    const updatedBoard = updateBoard(currentBoard, openedTiles);

    if (selectedTile.hasMine ){

      const revealedMineTiles = getRevealedMineTiles(currentBoard, mineLocations);
      const incorrectlyFlaggedTiles = getIncorrectlyFlaggedTiles(currentBoard, flagLocations);

      const updatedTiles = [...revealedMineTiles,...incorrectlyFlaggedTiles ];

      const gameLostBoard = updateBoard(currentBoard, updatedTiles);

      updateGameState(
        gameLostBoard,
        selectedTile,
        openedTiles,
        []
      );
      return;

    }


    const updatedFlagLocations = getFilteredFlagLocations(flagLocations, openedTiles);
    
    updateGameState(
      currentBoard,
      selectedTile,
      openedTiles,
      updatedFlagLocations
    );
  };

  const updateGameState = ( updatedBoard, selectedTile, openedTiles, updatedFlagLocations ) => {

    let openedTilesCount = openedTiles.length;
    const flagsCount = updatedFlagLocations.length;
    const mineCount = gameDifficultySettings.mineCount;

    let remainingFlagsCount = mineCount - flagsCount;

    setFlagLocations(updatedFlagLocations);
    setRemainingFlagsCount(remainingFlagsCount);
    setBoard(updatedBoard);

    if (selectedTile.hasMine) {
      setGameStatus(GameStatus.GAME_LOST);
    } 
    else if (safeTilesCount - openedTilesCount === 0) {
      setGameStatus(GameStatus.GAME_WON);
    } 
    else {
      setSafeTilesCount(
        safeTilesCount - openedTilesCount
      );
      setGameStatus(GameStatus.GAME_IN_PROGRESS);
    }
  };

  const onTileRightClicked = (event) => {
    event.preventDefault();

    let target = event.currentTarget;
    let rowIndex = parseInt(target.dataset.row);
    let colIndex = parseInt(target.dataset.col);

    let selectedTile = board[rowIndex][colIndex];

    if (selectedTile.isOpened) {
      return;
    }

    let updatedBoard = [...board];
    let flagCount = remainingFlagsCount;
    
    const isFlagged = selectedTile.isFlagged ? false : true;

    let updatedTile = {
      ...selectedTile,
      isFlagged: isFlagged
    }
    updatedBoard[rowIndex][colIndex] = updatedTile;

    let updatedFlagLocations = [];

    if ( isFlagged ){
      flagCount  = flagCount - 1;
      updatedFlagLocations = [...flagLocations, {x: selectedTile.x, y: selectedTile.y}];
    }
    else {
      flagCount = flagCount + 1;
      updatedFlagLocations = flagLocations.filter(
        (flagLocation) => !coordinatesMatch(flagLocation, selectedTile)
      );
    }
    setRemainingFlagsCount(flagCount);
    setFlagLocations(updatedFlagLocations);
    setBoard(updatedBoard);
  };

  const getBoard = (boardSize) => {

    const rowCount = boardSize.rowCount;
    const columnCount = boardSize.columnCount;
    const newBoard = [];

    for (var i = 0; i < rowCount; i++) {
      const row = [];
      newBoard.push(row);

      for (var j = 0; j < columnCount; j++) {
        row.push({
          x: i,
          y: j,
          hasMine: false,
          isOpened: false,
          isFlagged: false,
          adjacentMinesCount: null,
        });
      }
    }

    return newBoard;
  }

  const setupNewGame = () => {

    const boardSize = gameDifficultySettings.boardSize;
    const rowCount = boardSize.rowCount;
    const columnCount = boardSize.columnCount;
    const mineCount = gameDifficultySettings.mineCount;

    const newBoard = getBoard(boardSize);

    setMineLocations([]);
    setFlagLocations([]);
    setMinesNeedPlacing(true);
    setGameStatus(GameStatus.GAME_NOT_STARTED);
    setRemainingFlagsCount(gameDifficultySettings.mineCount);
    setSafeTilesCount(rowCount * columnCount - mineCount);
    setBoard(newBoard);
  };

  const gameHasEnded = () => {
    switch (gameStatus) {
      case GameStatus.GAME_LOST:
        return true;
      case GameStatus.GAME_WON:
        return true;
      default:
        return false;
    }
  };

  const userWonGame = () => {
    if (gameStatus === GameStatus.GAME_WON) {
      return true;
    }
    return false;
  };

  return (
      <div className="wrapper">
        <h1 className="game-title">Minesweeper</h1>
        <GameDifficultySelector
          gameDifficultySettings={gameDifficultySettings}
          onChange={onGameDifficultyLevelChanged}
        ></GameDifficultySelector>
        <RemainingFlagsCounter remainingFlagsCount={remainingFlagsCount}></RemainingFlagsCounter>
        { gameHasEnded() && 
            <GameResultModal
              gameWon={userWonGame()}
              onClick={onGameResultModalClosed}
            ></GameResultModal>
        }
        <GameBoard
          board={board}
          boardSize={gameDifficultySettings.boardSize}
          onClick={onTileLeftClicked}
          onContextMenu={onTileRightClicked}
        ></GameBoard>
      </div>
  );
}

export default App;
