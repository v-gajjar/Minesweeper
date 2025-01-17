import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [board, setBoard] = useState([]);
  const [gameDifficultyLevel, setGameDifficultyLevel] = useState("easy");

  useEffect(() => {
    console.log("started up...");
    generateBoard();
  }, []);

  const onGameDifficultyLevelChanged = (event) => {
    console.log("game difficulty level changed to: " + event.target.value);
    setGameDifficultyLevel(event.target.value);
  }

  const leftClickTile = (event) => {
    console.log("left clicked on tile...")
  }

  const rightClickTile = (event) => {
    event.preventDefault();

    console.log("right clicked on tile...")
  }

  const generateBoard = () => {
    let numRows = 9;
    let numCols = 9;

    let cells = [];


    for ( var i = 0; i < numRows; i++ ){
      const row = [];
      cells.push(row);

      for ( var j = 0; j < numCols; j++ ){
        row.push({
          x: i,
          y: j
        })
      }
    }
    console.log(cells);
    setBoard(cells);
  
  }
 
  return (

    <>
      <h1>React Minesweeper Game</h1>
      <div className="wrapper">
      <div className='game-difficulty-select-wrapper'>
      <label htmlFor="game-difficulty-select">Select game difficulty:</label>
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
      <div className="board easy">
      {board.map((rows, rowIndex) => (
        <div key={rowIndex}>
          {rows.map((col, colIndex) => (
            <div className="tile" key={colIndex} onClick={leftClickTile} onContextMenu={rightClickTile}></div>
          ))}
        </div>
      ))}
    </div>
    </div>
    </>
  )
}

export default App
