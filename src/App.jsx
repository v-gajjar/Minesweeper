import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [board, setBoard] = useState([]);
  const [gameDifficultyLevel, setGameDifficultyLevel] = useState("easy");
  const [gridSize, setGridSize] = useState(9);
  const [numberOfMines, setNumberOfMines] = useState(10)

  useEffect(() => {
    generateBoard();
  }, [gridSize]);

  const onGameDifficultyLevelChanged = (event) => {
    const value = event.target.value;
    console.log("game difficulty level changed to: " + value);
    setGameDifficultyLevel(value);

    switch(value){
      case "easy":
        setGridSize(9);
        setNumberOfMines(10);
        assignMines(10);
        break;
      case "medium":
        setGridSize(16);
        setNumberOfMines(40);
        assignMines(40);
        break;
      case "hard":
        setGridSize(20);
        setNumberOfMines(80);
        assignMines(80);
        break;
    }
  }

  const assignMines = (numberOfMines) => {
    
    let allowocatedMines = 0;

    while ( allowocatedMines < numberOfMines ){
      let cellX = Math.floor(Math.random() * gridSize);
      let cellY = Math.floor(Math.random() * gridSize);

      let tile = board[cellX][cellY];

      if ( ! tile.hasMine){
        tile.hasMine = true;
        console.log(tile);
        allowocatedMines++;
      }
    }
  }

  const leftClickTile = (event) => {
    console.log("left clicked on tile...")
  }

  const rightClickTile = (event) => {
    event.preventDefault();

    console.log("right clicked on tile...")
  }

  const generateBoard = () => {

    let numRows = gridSize;
    let numCols = gridSize;

    let cells = [];

    for ( var i = 0; i < numRows; i++ ){
      const row = [];
      cells.push(row);

      for ( var j = 0; j < numCols; j++ ){
        row.push({
          x: i,
          y: j,
          hasMine: false,
        })
      }
    }
    console.log(cells);
    setBoard(cells);
  
  }
 
  return (

    <>
      <div className="wrapper">
      <h1 className="game-title">Minesweeper</h1>
      <div className='game-difficulty-select-wrapper'>
      <label>Select game difficulty: </label>
        <select 
          value={gameDifficultyLevel}
          onChange={onGameDifficultyLevelChanged}
          name="game-difficulty-select" 
          id="game-difficulty-select"
        >
          <option value="easy">Beginnner</option>
          <option value="medium">Intermediate</option>
          <option value="hard">Advance</option>
        </select>
      </div>
      <div className="board ">
      {board.map((rows, rowIndex) => (
        <div key={rowIndex}>
          {rows.map((col, colIndex) => (
            <div className="tile" data-row={rowIndex} data-col={colIndex} key={colIndex} onClick={leftClickTile} onContextMenu={rightClickTile}></div>
          ))}
        </div>
      ))}
    </div>
    </div>
    </>
  )
}

export default App
