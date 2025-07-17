import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GameResultModal from "../../src/components/GameResultModal";

describe("GameResultModal Component", () => {
  it("renders win message correctly", () => {
    render(<GameResultModal gameWon={true} onClick={() => {}} />);
    const modal = screen.getByTestId("result-modal");
    expect(modal).not.toBeNull();
    expect(modal.textContent).toContain("🎉 You Win!");
  });

  it("renders lose message correctly", () => {
    render(<GameResultModal gameWon={false} onClick={() => {}} />);
    const modal = screen.getByTestId("result-modal");
    expect(modal).not.toBeNull();
    expect(modal.textContent).toContain("💥 You Lose 💥");
  });

  it("calls onClick when play again button is clicked", () => {
    const mockClick = vi.fn();
    render(<GameResultModal gameWon={false} onClick={mockClick} />);
    const button = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
  });
});
