import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import GameBoard from "../../src/components/GameBoard";
import { CellData } from "../../src/types";

describe("GameBoard Component", () => {
  it("renders the correct number of cells", () => {
    const rows = 5;
    const cols = 5;

    const mockBoard: CellData[][] = Array.from({ length: rows }, (_, x) =>
      Array.from({ length: cols }, (_, y) => ({
        x,
        y,
        isRevealed: false,
        hasMine: false,
        isFlagged: false,
        adjacentMines: 0,
      })),
    );

    const { container } = render(
      <GameBoard
        board={mockBoard}
        onCellClick={() => {}}
        onCellRightClick={() => {}}
      />,
    );

    const cells = container.querySelectorAll('[data-testid="cell"]');
    expect(cells.length).toBe(rows * cols);
  });
});
