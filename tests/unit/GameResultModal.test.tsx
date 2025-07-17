import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GameResultModal from "../../src/components/GameResultModal";

describe("GameResultModal Component", () => {
  it("renders win message correctly", () => {
    render(<GameResultModal gameWon={true} onClick={() => {}} />);
    expect(screen.getByTestId("result-modal")).toBeTruthy();
    expect(screen.getByText("🎉 You Win! 🎉")).toBeTruthy();
  });

  it("renders lose message correctly", () => {
    render(<GameResultModal gameWon={false} onClick={() => {}} />);
    expect(screen.getByTestId("result-modal")).toBeTruthy();
    expect(screen.getByText("💥 You Lose 💥")).toBeTruthy();
  });

  it("calls onClick when play again button is clicked", () => {
    const mockClick = vi.fn();
    render(<GameResultModal gameWon={false} onClick={mockClick} />);
    fireEvent.click(screen.getByText("Play Again?"));
    expect(mockClick).toHaveBeenCalled();
  });
});