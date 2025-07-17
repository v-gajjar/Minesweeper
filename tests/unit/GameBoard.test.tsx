import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GameResultModal from "../../src/components/GameResultModal";

describe("GameResultModal Component", () => {
  it("renders win message correctly", () => {
    render(<GameResultModal gameWon={true} onClick={() => {}} />);
    expect(screen.getByTestId("result-modal")).toBeTruthy();
    expect(screen.getByText((text) => /you win/i.test(text))).toBeTruthy();
  });

  it("renders lose message correctly", () => {
    render(<GameResultModal gameWon={false} onClick={() => {}} />);
    expect(screen.getByTestId("result-modal")).toBeTruthy();
    expect(screen.getByText((text) => /you lose/i.test(text))).toBeTruthy();
  });

  it("calls onClick when play again button is clicked", () => {
    const mockClick = vi.fn();
    render(<GameResultModal gameWon={false} onClick={mockClick} />);
    const button = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
  });
});
