import { useEffect, useState } from "react";
import "./App.css";
import { GameDifficultyLevel } from "./enum/GameDifficultyLevel";
import { difficultySettings } from "./config/gameDifficultyLevelSettings";
import GameResultModal from "./components/GameResultModal";

import {
  CellData,
  CoordinateType,
  GameStatus,
  GameDifficultySettings,
} from "./types";
import {
  getBoard,
  getMineLocations,
  getCellsWithMines,
  revealCell,
  updateBoard,
  updateGameState,
} from "./minesweeperUtils";

const App = () => {
  const [difficultyLevel, setDifficultyLevel] = useState<GameDifficultyLevel>(
    GameDifficultyLevel.EASY,
  );
  const [settings, setSettings] = useState<GameDifficultySettings>(
    difficultySettings[difficultyLevel],
  );
  const [board, setBoard] = useState<CellData[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.GAME_NOT_STARTED,
  );
  const [mineLocations, setMineLocations] = useState<CoordinateType[]>([]);
  const [safeCellsCount, setSafeCellsCount] = useState<number>(0);
  const [remainingFlagsCount, setRemainingFlagsCount] = useState<number>(0);

  // Update board when difficulty changes
  useEffect(() => {
    const newSettings = difficultySettings[difficultyLevel];
    setSettings(newSettings);

    const newBoard = getBoard(newSettings.boardSize);
    setBoard(newBoard);
    setGameStatus(GameStatus.GAME_NOT_STARTED);
    setMineLocations([]);
    setRemainingFlagsCount(newSettings.mineCount);
    setSafeCellsCount(
      newSettings.boardSize.rowCount * newSettings.boardSize.columnCount -
        newSettings.mineCount,
    );
  }, [difficultyLevel]);

  const resetGame = () => {
    const newBoard = getBoard(settings.boardSize);
    setBoard(newBoard);
    setGameStatus(GameStatus.GAME_NOT_STARTED);
    setMineLocations([]);
    setRemainingFlagsCount(settings.mineCount);
    setSafeCellsCount(
      settings.boardSize.rowCount * settings.boardSize.columnCount -
        settings.mineCount,
    );
  };

  const handleCellClick = (cell: CellData) => {
    if (
      gameStatus === GameStatus.GAME_WON ||
      gameStatus === GameStatus.GAME_LOST
    )
      return;
    if (cell.isFlagged || cell.isRevealed) return;

    let newBoard = board;

    // First click logic
    if (gameStatus === GameStatus.GAME_NOT_STARTED) {
      const mines = getMineLocations(
        cell,
        settings.boardSize,
        settings.mineCount,
      );
      const boardWithMines = getCellsWithMines(board, mines);
      setMineLocations(mines);
      setGameStatus(GameStatus.GAME_IN_PROGRESS);
      newBoard = boardWithMines;
    }

    const revealed = revealCell(cell.x, cell.y, newBoard);
    const updated = updateBoard(newBoard, revealed);

    updateGameState(
      updated,
      cell,
      revealed,
      getFlagLocations(updated),
      mineLocations,
      setBoard,
      setGameStatus,
      setSafeCellsCount,
      setRemainingFlagsCount,
    );
  };

  const handleRightClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: CellData,
  ) => {
    event.preventDefault();
    if (cell.isRevealed || gameStatus !== GameStatus.GAME_IN_PROGRESS) return;

    const newBoard = board.map((row) =>
      row.map((c) =>
        c.x === cell.x && c.y === cell.y
          ? { ...c, isFlagged: !c.isFlagged }
          : c,
      ),
    );
    setBoard(newBoard);

    const flags = getFlagLocations(newBoard);
    setRemainingFlagsCount(settings.mineCount - flags.length);
  };

  const getFlagLocations = (b: CellData[][]): CoordinateType[] => {
    return b
      .flat()
      .filter((c) => c.isFlagged)
      .map((c) => ({ x: c.x, y: c.y }));
  };
  return (
    <div className="wrapper">
      <header>
        <h1 className="game-title">Minesweeper</h1>
      </header>

      <div className="game-difficulty-select-wrapper">
        <label>
          Difficulty:
          <select
            value={difficultyLevel}
            onChange={(e) =>
              setDifficultyLevel(e.target.value as GameDifficultyLevel)
            }
          >
            <option value={GameDifficultyLevel.EASY}>Easy</option>
            <option value={GameDifficultyLevel.MEDIUM}>Medium</option>
            <option value={GameDifficultyLevel.HARD}>Hard</option>
          </select>
        </label>
      </div>

      <div id="remainingFlagsCounter">
        <div id="remainingFlagsCounter">
          <div>
            <span>Remaining Left: {remainingFlagsCount}</span>
            {gameStatus === GameStatus.GAME_LOST && (
              <>
                <br />
                <p className="gameLostModal">💥 You Lose 💥</p>
                <button onClick={resetGame}>Play Again?</button>
              </>
            )}
            {gameStatus === GameStatus.GAME_WON && (
              <>
                <br />
                <p className="gameWonModal">🎉 You Win! 🎉</p>
                <button onClick={resetGame}>Play Again?</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div id="boardContainer">
        <div
          id="board"
          style={
            {
              "--columns": board[0]?.length ?? 0,
              "--rows": board.length ?? 0,
            } as React.CSSProperties
          }
        >
          {board.map((row) =>
            row.map((cell) => (
              <div
                key={`${cell.x}-${cell.y}`}
                className={`cell ${cell.isRevealed ? "revealed" : ""} ${
                  cell.isFlagged ? "flagged" : ""
                } ${
                  gameStatus === GameStatus.GAME_LOST && cell.hasMine
                    ? "mine exploded"
                    : ""
                }`}
                onClick={() => handleCellClick(cell)}
                onContextMenu={(e) => handleRightClick(e, cell)}
              >
                {cell.isFlagged
                  ? "🚩"
                  : cell.isRevealed
                    ? cell.hasMine
                      ? "💣"
                      : cell.adjacentMines || ""
                    : ""}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
