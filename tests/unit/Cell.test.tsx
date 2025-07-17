import { render } from "@testing-library/react";
import Cell from "../../src/components/Cell";
import { CellData } from "../../src/types";

it("displays 💣 emoji when revealed and has mine", () => {
  const cell: CellData = {
    x: 0,
    y: 0,
    isRevealed: true,
    isFlagged: false,
    hasMine: true,
    isMine: true,
    hasExplodedMine: false,
    adjacentMines: 0,
  };

  const { container } = render(
    <Cell cell={cell} onClick={() => {}} onRightClick={() => {}} />,
  );

  const emojiSpan = container.querySelector("span");

  expect(emojiSpan).not.toBeNull();
  expect(emojiSpan!.textContent).toBe("💣");
});
