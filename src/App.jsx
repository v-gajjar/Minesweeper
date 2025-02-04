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
    setGameStatus(GameStatus.GAME_NOT_STARTED);
    generateBoard();
  };

  const assignMines = (grid, numberOfMines, boardSize) => {
    let allocatedMines = 0;

    while (allocatedMines < numberOfMines) {
      let cellX = Math.floor(Math.random() * boardSize);
      let cellY = Math.floor(Math.random() * boardSize);
      let tile = grid[cellX][cellY];

      if (!tile.hasMine) {
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

        if (xPos < 0 || xPos >= boardSize || yPos < 0 || yPos >= boardSize) {
          continue;
        }
        let neighbourTile = tiles[xPos][yPos];

        if (!neighbourTile.hasMine) {
          continue;
        }

        adjacentMinesCount++;
      }
    }
    return adjacentMinesCount;
  };

  const calculateAdjacentMinesForEachTile = (tiles, boardSize) => {
    for (var i = 0; i < boardSize; i++) {
      for (var j = 0; j < boardSize; j++) {
        let currentTile = tiles[i][j];
        if (!currentTile.hasMine) {
          const numberOfMines = countAdjacentMines(
            currentTile,
            tiles,
            boardSize
          );

          currentTile.adjacentMinesCount = numberOfMines;
        }
      }
    }
  };

  const openAllMines = (gameBoard) => {
    let updatedBoard = gameBoard.map((row) => {
      return row.map((tile) => {
        if (tile.hasMine) {
          tile.isFlagged = false;
          tile.isOpened = true;
        }
        return tile;
      });
    });

    return updatedBoard;
  };

  const openTile = (x, y, currentBoard) => {
    const boardSize = gameDifficultySettings.boardSize;

    if (
      x < 0 ||
      x >= boardSize ||
      y < 0 ||
      y >= boardSize ||
      currentBoard[x][y].isOpened 
    ) {
      return;
    }
    if ( currentBoard[x][y].isFlagged ){
      currentBoard[x][y].isFlagged = false;
    }
    currentBoard[x][y].isOpened = true;

    if (currentBoard[x][y].hasMine) {
      const updatedBoard = openAllMines(currentBoard);
      return currentBoard;
    } else if (currentBoard[x][y].adjacentMinesCount === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          openTile(x + i, y + j, currentBoard);
        }
      }
    }

    return currentBoard;
  };

  const checkIfGameWon = (gameBoard) => {
    const boardSize = gameDifficultySettings.boardSize;

    let gameWon = true;

    for (var i = 0; i < boardSize; i++) {
      for (var j = 0; j < boardSize; j++) {
        let tile = gameBoard[i][j];

        if (!tile.isOpened && !tile.isFlagged) {
          gameWon = false;
          break;
        }
        if (tile.isOpened && tile.hasMine) {
          gameWon = false;
          break;
        }
      }
    }
    if (gameWon) {
      setGameStatus(GameStatus.GAME_WON);
    } else {
      setGameStatus(GameStatus.GAME_IN_PROGRESS);
    }
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

    const updatedBoard = openTile(selectedTile.x, selectedTile.y, currentBoard);
    let remainingFlags = countRemainingFlags(updatedBoard);
    setRemainingFlags(remainingFlags);
    setBoard(updatedBoard);
   

    if (selectedTile.hasMine) {
      setGameStatus(GameStatus.GAME_LOST);
    } else {
      checkIfGameWon(updatedBoard);
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

    let updatedBoard = board.map((row) => {
      return row.map((tile) => {
        if (tile.x === rowIndex && tile.y === colIndex) {
          if (!tile.isFlagged) {
            tile.isFlagged = true;
            setRemainingFlags(remainingFlags - 1);
          } else {
            tile.isFlagged = false;
            setRemainingFlags(remainingFlags + 1);
          }
        }
        return tile;
      });
    });
    setBoard(updatedBoard);
    checkIfGameWon(updatedBoard);
  };

  const generateBoard = () => {
    let numRows = gameDifficultySettings.boardSize;
    let numCols = gameDifficultySettings.boardSize;

    let tiles = [];

    for (var i = 0; i < numRows; i++) {
      const row = [];
      tiles.push(row);

      for (var j = 0; j < numCols; j++) {
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
    assignMines(
      tiles,
      gameDifficultySettings.numberOfMines,
      gameDifficultySettings.boardSize
    );
    calculateAdjacentMinesForEachTile(
      tiles,
      gameDifficultySettings.boardSize
    );
    setRemainingFlags(gameDifficultySettings.numberOfMines);
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
