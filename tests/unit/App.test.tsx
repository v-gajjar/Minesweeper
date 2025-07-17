// tests/unit/GameResultModal.test.tsx
import { render } from "@testing-library/react";
import GameResultModal from "../../src/components/GameResultModal";
import { describe, it, expect } from "vitest";

describe("GameResultModal", () => {
  it("renders the win modal correctly", () => {
    const { getByTestId, getByText } = render(
      <GameResultModal gameWon={true} onClick={() => {}} />,
    );
    expect(getByTestId("result-modal")).toBeTruthy();
    expect(getByText(/you win/i)).toBeTruthy();
  });

  it("renders the loss modal correctly", () => {
    const { getByTestId, getByText } = render(
      <GameResultModal gameWon={false} onClick={() => {}} />,
    );
    expect(getByTestId("result-modal")).toBeTruthy();
    expect(getByText(/you lose/i)).toBeTruthy();
  });
});
