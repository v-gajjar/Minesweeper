import { useState, useEffect } from 'react'
import GameDifficultyLevel from './GameDifficultyLevel';
import './App.css'

function App() {

  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [minesLeft, setMinesLeft] = useState(0);
 
  const [gameDifficultySettings, setGameDifficultySettings] = useState({
    level: GameDifficultyLevel.EASY,
    boardSize: 9,
    numberOfMines: 10
  })

  useEffect(() => {

    if ( gameWon ){
      const gameWonModal = document.getElementById("gameWonModal");
      gameWonModal.showModal();
    }

  }, [gameWon])

  useEffect(() => {
    
    if ( gameOver ){
      const gameOverModal = document.getElementById("gameOverModal");
      gameOverModal.showModal();
    }

  }, [gameOver])


  useEffect(() => {
    generateBoard();
  }, [gameDifficultySettings]);

  const onGameDifficultyLevelChanged = (event) => {
    const value = event.target.value;
    console.log("game difficulty level changed to: " + value);

    switch(value){
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
  }

  const onGameWonModalClosed = () => {
    const gameWonModal = document.getElementById("gameWonModal");
    gameWonModal.close();
    setGameWon(false);
    generateBoard();
  }

  const onGameOverModalClosed = () => {
    const gameOverModal = document.getElementById("gameOverModal");
    gameOverModal.close();
    setGameOver(false);
    generateBoard();
  }

  const assignMines = (grid, numberOfMines) => {
    
    let allocatedMines = 0;

    while ( allocatedMines < numberOfMines ){
      let boardSize = gameDifficultySettings.boardSize;
;

      let cellX = Math.floor(Math.random() * boardSize);
      let cellY = Math.floor(Math.random() * boardSize);
      let tile = grid[cellX][cellY];

      if ( ! tile.hasMine){
        tile.hasMine = true;
        allocatedMines++;
      }
    }
  }

  const countAdjacentMines = (selectedTile, tiles) => {
    const boardSize = gameDifficultySettings.boardSize;
    let adjacentMinesCount = 0;
    
    let x = selectedTile.x;
    let y = selectedTile.y;

    for( var i = -1; i <= 1; i++){
      for( var j = -1; j <= 1; j++ ){

        let xPos = x+i;
        let yPos = y+j;

        if ( xPos < 0 || xPos >= boardSize || yPos < 0 || yPos >= boardSize ){
          continue;
        } 
        let neighbourTile = tiles[xPos][yPos];

        if ( ! neighbourTile.hasMine){
          continue;
        }

        adjacentMinesCount++
      }
    }
    return adjacentMinesCount;
  }

  const calculateAdjacementMinesForEachTile = (tiles) => {
      const boardSize = gameDifficultySettings.boardSize;

      for( var i = 0; i < boardSize; i++ ){
        for (var j = 0; j < boardSize; j++ ){
          let currentTile = tiles[i][j];
          if (! currentTile.hasMine ){
            const numberOfMines = countAdjacentMines(currentTile, tiles);

            currentTile.adjacementMinesCount = numberOfMines;
          }
        }
      }
  }

  const openTile = (x, y, currentBoard) => {
    console.log("openTile");
    const boardSize = gameDifficultySettings.boardSize;

    if ( x < 0 || x >= boardSize || y < 0 || y >= boardSize || currentBoard[x][y].isOpened ) {
        
        console.log(currentBoard);
        return;
    }
    currentBoard[x][y].isOpened = true;

    if (currentBoard[x][y].hasMine) {
      setGameOver(true);
      return currentBoard;
    } 
    else if ( currentBoard[x][y].adjacementMinesCount === 0 ) {
        for ( let i = -1; i <= 1; i++ ) {
        	for ( let j = -1; j <= 1; j++ ) {
                openTile( x+i, y+j, currentBoard);
            }
        }
    }

    return currentBoard;
  }

  const checkIfGameWon = (gameBoard) => {
    const boardSize = gameDifficultySettings.boardSize;

    console.log("check if game won...")
    let  gameWon = true;

    for ( var i = 0; i < boardSize; i++ ){
      for (var j = 0; j < boardSize; j++ ){
        let tile = gameBoard[i][j];

        if ( ! tile.isOpened && ! tile.isFlagged){
          gameWon = false;
          break;
        }
        if ( tile.isOpened && tile.hasMine){
          gameWon = false;
          break;
        }
      }
    }
    console.log( "game won: " + gameWon);
    if ( gameWon){
      setGameWon(true);
    }
  }

  const leftClickTile = (event) => {
    let target = event.target;
    let rowIndex = parseInt(target.dataset.row);
    let colIndex = parseInt(target.dataset.col);

    let selectedTile = board[rowIndex][colIndex];

    if ( selectedTile.isOpened  ){
      return;
    }

    let currentBoard = [...board];

    const updatedBoard = openTile(selectedTile.x, selectedTile.y, currentBoard);

    setBoard(updatedBoard);
    checkIfGameWon(updatedBoard);
  }

  const rightClickTile = (event) => {
    event.preventDefault();

    let target = event.target;
    let rowIndex = parseInt(target.dataset.row);
    let colIndex = parseInt(target.dataset.col);

    let selectedTile = board[rowIndex][colIndex];

    if ( selectedTile.isOpened ){
      return;
    }

    let updatedBoard = board.map((row) => {
      return row.map((tile) => {

        if ( tile.x === rowIndex && tile.y === colIndex ){
          if ( ! tile.isFlagged ){
              tile.isFlagged = true;
              setMinesLeft(minesLeft - 1);
          }
          else {
            tile.isFlagged = false;
            setMinesLeft(minesLeft + 1);
          }
        }
        return tile;
      });
    });
    setBoard(updatedBoard);
    checkIfGameWon(updatedBoard);
  }

  const generateBoard = () => {

    let numRows = gameDifficultySettings.boardSize;
    let numCols = gameDifficultySettings.boardSize;

    let cells = [];

    for ( var i = 0; i < numRows; i++ ){
      const row = [];
      cells.push(row);

      for ( var j = 0; j < numCols; j++ ){
        row.push({
          x: i,
          y: j,
          hasMine: false,
          isOpened: false,
          isFlagged: false,
          adjacementMinesCount: null
        })
      }
    }
    assignMines(cells, gameDifficultySettings.numberOfMines);
    calculateAdjacementMinesForEachTile(cells);
    setMinesLeft(gameDifficultySettings.numberOfMines);
    setBoard(cells);

    console.log(cells);
  }

  const setTileClasses = (tile) => {
    let tileClasses = "tile";

    if ( tile.hasMine ){
      tileClasses = tileClasses + " mine";
    }
    if ( tile.isFlagged ){
      tileClasses = tileClasses + " flagged";
    }
    if ( tile.isOpened ){
      tileClasses = tileClasses + " opened";
    }

    return tileClasses;
  }
 
  return (

    <>
      <div className="wrapper">
      <h1 className="game-title">Minesweeper</h1>
      <div className='game-difficulty-select-wrapper'>
      <label>Select game difficulty: </label>
        <select 
          value={gameDifficultySettings.level}
          onChange={onGameDifficultyLevelChanged}
          name="game-difficulty-select" 
          id="game-difficulty-select"
        >
          <option value={GameDifficultyLevel.EASY}>Beginnner</option>
          <option value={GameDifficultyLevel.MEDIUM}>Intermediate</option>
          <option value={GameDifficultyLevel.HARD}>Advance</option>
        </select>
      </div>
      <div id="minesLeftIndicator">mines left: {minesLeft}</div>
      <div>
        { gameOver && 
          <dialog id="gameOverModal">
            <h1>Game Over!</h1>
            <button id="closeGameOverModal" onClick={onGameOverModalClosed}>Play again</button>
          </dialog>
        }
        {
          gameWon && 
          <dialog id="gameWonModal">
          <h1>Congratulations, you won!</h1>
          <button id="closeGameWonModal" onClick={onGameWonModalClosed}>Play again</button>
        </dialog>
        }
      </div>
      <div className="board ">
      {board.map((rows, rowIndex) => (
        <div key={rowIndex}>
          {rows.map((col, colIndex) => (
            <div 
              className={setTileClasses(board[rowIndex][colIndex])} 
              data-row={rowIndex} 
              data-col={colIndex} 
              key={colIndex} 
              onClick={leftClickTile} 
              onContextMenu={rightClickTile}>
                { 
                  board[rowIndex][colIndex].isOpened && 
                  board[rowIndex][colIndex].adjacementMinesCount > 0 &&
                    <span>{board[rowIndex][colIndex].adjacementMinesCount}</span> 
                }
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
    </>
  )
}

export default App
