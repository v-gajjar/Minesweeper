import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GameBoard from "../../src/components/GameBoard";
import GameDifficultySelector from "../../src/components/GameDifficultySelector";
import RemainingFlagsCounter from "../../src/components/RemainingFlagsCounter";
import GameResultModal from "../../src/components/GameResultModal";
import { CellData } from "../../src/components/Cell";
import { GameDifficultyLevel } from "../../src/enum/GameDifficultyLevel";

// ✅ Minimal valid board
const mockCell: CellData = {
  x: 0,
  y: 0,
  hasMine: false,
  isRevealed: false,
  isFlagged: false,
  adjacentMinesCount: 0,
};

const mockBoard: CellData[][] = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: 9 }, (_, col) => ({ ...mockCell, x: row, y: col })),
);

const mockBoardSize = { rowCount: 9, columnCount: 9 };

const mockDifficulty = {
  level: GameDifficultyLevel.EASY, // ✅ fixed this line
  boardSize: mockBoardSize,
  mineCount: 10,
  label: "Beginner",
};

const mockFlagsRemaining = 10;

describe("App Component", () => {
  it("renders the game board", () => {
    const { getByTestId } = render(
      <GameBoard
        board={mockBoard}
        boardSize={mockBoardSize}
        onClick={() => {}}
        onContextMenu={() => {}}
      />,
    );
    expect(getByTestId("game-board")).toBeTruthy();
  });

  it("renders the difficulty selector", () => {
    const { getByTestId } = render(
      <GameDifficultySelector
        gameDifficultySettings={mockDifficulty}
        onChange={() => {}}
      />,
    );
    expect(getByTestId("difficulty-select")).toBeTruthy();
  });

  it("renders the remaining flags counter", () => {
    const { getByTestId } = render(
      <RemainingFlagsCounter remainingFlagsCount={mockFlagsRemaining} />,
    );
    expect(getByTestId("flags-remaining")).toBeTruthy();
  });

  it("renders a result modal", () => {
    const { getByTestId } = render(
      <GameResultModal gameWon={true} onClick={() => {}} />,
    );
    expect(getByTestId("result-modal")).toBeTruthy();
  });
});
