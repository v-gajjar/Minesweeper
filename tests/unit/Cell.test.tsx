import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Cell from "../../src/components/Cell";
import { CellData } from "../../src/types";

describe("Cell Component", () => {
  it("displays 💣 emoji when revealed and has mine", () => {
    const cell: CellData = {
      x: 0,
      y: 0,
      isRevealed: true,
      hasMine: true,
      isFlagged: false,
      adjacentMines: 0,
    };

    render(
      <Cell
        x={cell.x}
        y={cell.y}
        data={cell}
        onClick={() => {}}
        onRightClick={() => {}}
      />,
    );

    const emojiSpan = screen.getByText("💣");
    expect(emojiSpan).not.toBeNull();
    expect(emojiSpan.textContent).toBe("💣");
  });
});
