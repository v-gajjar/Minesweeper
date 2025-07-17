import { render } from "@testing-library/react";
import Board from "../../src/components/GameBoard";
import React from "react";
import { CellData } from "../../src/components/Cell";

describe("Board Component", () => {
  it("renders the correct number of cells", () => {
    const boardSize = { rowCount: 3, columnCount: 3 };

    const board: CellData[][] = Array.from(
      { length: boardSize.rowCount },
      (_, x) =>
        Array.from({ length: boardSize.columnCount }, (_, y) => ({
          x,
          y,
          hasMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMinesCount: 0,
        })),
    );

    const { container } = render(
      <Board
        board={board}
        boardSize={boardSize}
        onClick={() => {}}
        onContextMenu={() => {}}
      />,
    );

    const cells = container.querySelectorAll('[data-testid^="cell-"]');
    expect(cells.length).toBe(boardSize.rowCount * boardSize.columnCount);
  });
});
