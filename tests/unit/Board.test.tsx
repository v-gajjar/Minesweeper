import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GameBoard from "../../src/components/GameBoard";

describe("Board Component", () => {
  const mockBoardSize = { rowCount: 9, columnCount: 9 };

  const mockBoard = Array.from({ length: 9 }, (_, x) =>
    Array.from({ length: 9 }, (_, y) => ({
      x,
      y,
      isOpen: false,
      hasMine: false,
      neighborMines: 0,
      isFlagged: false,
    })),
  );

  it("renders correct number of cells", () => {
    const { container } = render(
      <GameBoard
        boardSize={mockBoardSize}
        board={mockBoard}
        onCellClick={() => {}}
        onCellRightClick={() => {}}
      />,
    );

    const cells = container.querySelectorAll('[data-testid="cell"]');
    expect(cells).toHaveLength(81);
  });
});
