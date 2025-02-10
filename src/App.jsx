import { useState, useEffect } from "react";

import GameDifficultyLevel from "./enum/GameDifficultyLevel";
import GameStatus from "./enum/GameStatus";
import GameDifficultySelector from "./components/GameDifficultySelector";
import GameBoard from "./components/GameBoard";
import GameResultModal from "./components/GameResultModal";
import RemainingFlagsIndicator from "./components/RemainingFlagsIndicator";

import "./App.css";


function App() {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState(GameStatus.GAME_NOT_STARTED);
  const [remainingFlags, setRemainingFlags] = useState(0);
  const [minesHaveBeenAssigned, setMinesHaveBeenAssigned] = useState(false);
  const [numberOfRemainingSafeTiles, setNumberOfRemainingSafeTiles] = useState(0);

  const [gameDifficultySettings, setGameDifficultySettings] = useState({
    level: GameDifficultyLevel.EASY,
    boardSize: 9,
    numberOfMines: 10,
  });

  useEffect(() => {
    if (gameHasEnded()) {
      const gameResultModal = document.getElementById("gameResultModal");
      gameResultModal.showModal();
    }
  }, [gameStatus]);

  useEffect(() => {
    generateBoard();
  }, [gameDifficultySettings]);

  const onGameDifficultyLevelChanged = (event) => {
    const value = event.target.value;

    setGameStatus(GameStatus.GAME_NOT_STARTED);

    switch (value) {
      case GameDifficultyLevel.EASY:
        setGameDifficultySettings({
          level: GameDifficultyLevel.EASY,
          boardSize: 9,
          numberOfMines: 10,
        });
        break;
      case GameDifficultyLevel.MEDIUM:
        setGameDifficultySettings({
          level: GameDifficultyLevel.MEDIUM,
          boardSize: 16,
          numberOfMines: 40,
        });
        break;
      case GameDifficultyLevel.HARD:
        setGameDifficultySettings({
          level: GameDifficultyLevel.HARD,
          boardSize: 20,
          numberOfMines: 80,
        });
        break;
    }
  };

  const onGameResultModalClosed = () => {
    const gameResultModal = document.getElementById("gameResultModal");
    gameResultModal.close();
    
    generateBoard();
  };

  const assignMines = (currentTile, grid, numberOfMines, boardSize) => {
    let allocatedMines = 0;

    while (allocatedMines < numberOfMines) {
      let cellX = Math.floor(Math.random() * boardSize);
      let cellY = Math.floor(Math.random() * boardSize);

      let tile = grid[cellX][cellY];

      if ( tile.x == currentTile.x && tile.y == currentTile.y ){
        // The first tile that is subjected to a left click should be ignored when placing a mine
        // to make the game a bit easier/fairer - the user cannot lose on the 
        // the first left click
        continue;
      }

      if (!tile.hasMine ) {
        tile.hasMine = true;
        allocatedMines++;
      }
    }
  };

  const countAdjacentMines = (selectedTile, tiles, boardSize) => {
    let adjacentMinesCount = 0;

    let x = selectedTile.x;
    let y = selectedTile.y;

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        let xPos = x + i;
        let yPos = y + j;

        if (isOffBoard(xPos, yPos, boardSize, boardSize)) {
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

  const openAllMines = (gameBoard) => {
    let updatedBoard = gameBoard.map((row) => {
      return row.map((tile) => {
        if (tile.hasMine ) {
          if ( tile.isFlagged ){
            tile.isCorrectlyFlagged = true;
          }
          else {
            tile.isOpened = true;
          }
        }
        else if ( tile.isFlagged ){
          tile.isCorrectlyFlagged = false
        }
        return tile;
      });
    });

    return updatedBoard;
  };

  const isOffBoard = (x, y, numberOfRows, numberOfCols) => {
    if (
      x < 0 || x >= numberOfRows || y < 0 || y >= numberOfCols 
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  const openTile = (x, y, currentBoard, tilesOpenedOnClick) => {
    const boardSize = gameDifficultySettings.boardSize;

    if ( isOffBoard(x, y, boardSize, boardSize) || currentBoard[x][y].isOpened ) {
      return;
    }

    let currentTile = currentBoard[x][y];

    if ( currentTile.isFlagged ){
      currentTile.isFlagged = false;
    }
    currentTile.isOpened = true;

    if (currentTile.hasMine) {
      const updatedBoard = openAllMines(currentBoard);
      return [updatedBoard, tilesOpenedOnClick];
    } 
    currentTile.adjacentMinesCount = countAdjacentMines(
      currentTile,
      currentBoard,
      boardSize
    );
    tilesOpenedOnClick.push(currentTile);

    if (currentTile.adjacentMinesCount === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          openTile(x + i, y + j, currentBoard, tilesOpenedOnClick);
        }
      }
    }

    return [currentBoard, tilesOpenedOnClick];
  };

  const countRemainingFlags = (currentBoard) => {
      let remainingFlags = gameDifficultySettings.numberOfMines;

      for( var i = 0; i < currentBoard.length; i++ ){
        for( var j = 0; j < currentBoard[i].length; j++ ){
          let selectedTile = currentBoard[i][j];
          
          if ( selectedTile.isFlagged ){
            remainingFlags--;
          }
        }
      }
      return remainingFlags;
  }

  const onTileLeftClicked = (event) => {
    let target = event.target;
    let rowIndex = parseInt(target.dataset.row);
    let colIndex = parseInt(target.dataset.col);

    let selectedTile = board[rowIndex][colIndex];

    if (selectedTile.isOpened) {
      return;
    }

    let currentBoard = [...board];

    if ( ! minesHaveBeenAssigned ){
      assignMines(
        selectedTile,
        currentBoard,
        gameDifficultySettings.numberOfMines,
        gameDifficultySettings.boardSize
      );
      setMinesHaveBeenAssigned(true);
    }

    const [updatedBoard, tilesOpenedOnClick] = openTile(
      selectedTile.x, 
      selectedTile.y, 
      currentBoard, 
      [/* tiles opened on click*/]
    );
    
    updateGameState(
      updatedBoard,
      selectedTile,
      tilesOpenedOnClick,
    
    );
  };

  const updateGameState = ( updatedBoard, selectedTile, tilesOpenedOnClick ) => {

    let numberOfTilesOpenedOnClick = tilesOpenedOnClick.length;
    let remainingFlags = countRemainingFlags(updatedBoard);

    setRemainingFlags(remainingFlags);
    setBoard(updatedBoard);

    if (selectedTile.hasMine) {
      setGameStatus(GameStatus.GAME_LOST);
    } 
    else if (numberOfRemainingSafeTiles - numberOfTilesOpenedOnClick === 0) {
      setGameStatus(GameStatus.GAME_WON);
    } 
    else {
      setNumberOfRemainingSafeTiles(
        numberOfRemainingSafeTiles - numberOfTilesOpenedOnClick
      );
      setGameStatus(GameStatus.GAME_IN_PROGRESS);
    }
  };

  const onTileRightClicked = (event) => {
    event.preventDefault();

    let target = event.target;
    let rowIndex = parseInt(target.dataset.row);
    let colIndex = parseInt(target.dataset.col);

    let selectedTile = board[rowIndex][colIndex];

    if (selectedTile.isOpened) {
      return;
    }

    let updatedBoard = [...board];
    
    const isFlagged = selectedTile.isFlagged ? false : true;

    let updatedTile = {
      ...selectedTile,
      isFlagged: isFlagged
    }
    updatedBoard[rowIndex][colIndex] = updatedTile;

    if ( isFlagged ){
      setRemainingFlags(remainingFlags - 1)
    }
    else {
      setRemainingFlags(remainingFlags + 1);
    }
    setBoard(updatedBoard);
  };

  const generateBoard = () => {
    let numberOfRows = gameDifficultySettings.boardSize;
    let numberOfCols = gameDifficultySettings.boardSize;
    let numberOfMines = gameDifficultySettings.numberOfMines;

    let tiles = [];

    for (var i = 0; i < numberOfRows; i++) {
      const row = [];
      tiles.push(row);

      for (var j = 0; j < numberOfCols; j++) {
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
    setMinesHaveBeenAssigned(false);
    setGameStatus(GameStatus.GAME_NOT_STARTED);
    setRemainingFlags(gameDifficultySettings.numberOfMines);
    setNumberOfRemainingSafeTiles(numberOfRows * numberOfCols - numberOfMines);
    setBoard(tiles);
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
    <>
      <div className="wrapper">
        <h1 className="game-title">Minesweeper</h1>
        <GameDifficultySelector
          gameDifficultySettings={gameDifficultySettings}
          onChange={onGameDifficultyLevelChanged}
        ></GameDifficultySelector>
        <RemainingFlagsIndicator remainingFlags={remainingFlags}></RemainingFlagsIndicator>
        <>
          {gameHasEnded() && (
            <GameResultModal
              gameWon={userWonGame()}
              onClick={onGameResultModalClosed}
            ></GameResultModal>
          )}
        </>
        <GameBoard
          board={board}
          onClick={onTileLeftClicked}
          onContextMenu={onTileRightClicked}
        ></GameBoard>
      </div>
    </>
  );
}

export default App;
